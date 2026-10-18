/* =========================================================
   HELIOS · interactive solar atlas
   Vanilla Canvas 2D orrery + catalogue + detail system
   ========================================================= */

(() => {
  'use strict';

  const DATA = window.CELESTIAL_DATA;
  const GROUPS = window.CATALOG_GROUPS;
  const DEEP_MISSIONS = window.DEEP_SPACE_MISSIONS;
  const PLANETS = window.PLANET_ORDER;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const TAU = Math.PI * 2;
  const D2R = Math.PI / 180;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const normDeg = (v) => ((v % 360) + 360) % 360;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const pad2 = (n) => String(n).padStart(2, '0');

  const SPEEDS = [
    { mult: 0.25, label: '0.25×' },
    { mult: 1, label: '1×' },
    { mult: 5, label: '5×' },
    { mult: 25, label: '25×' },
    { mult: 100, label: '100×' },
    { mult: 365, label: '365×' }
  ];
  const BASE_DAYS_PER_SECOND = 12;
  const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  const DAY_MS = 86400000;
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const app = $('#app');
  const canvas = $('#orrery');
  const ctx = canvas.getContext('2d');

  const ui = {
    topClock: $('#topClock'),
    metaLabel: $('.meta-label'),
    liveDot: $('.live-dot'),
    catalog: $('#catalog'),
    catalogList: $('#catalogList'),
    catalogScroll: $('#catalogScroll'),
    catalogEmpty: $('#catalogEmpty'),
    catalogSearch: $('#catalogSearch'),
    filterChips: $('#filterChips'),
    catalogClose: $('#catalogClose'),
    navCatalog: $('[data-nav="catalog"]'),
    navOverview: $('[data-nav="overview"]'),
    navOrbits: $('[data-nav="orbits"]'),
    navTime: $('[data-nav="time"]'),
    navDeep: $('[data-nav="deep"]'),
    mobileMenu: $('#mobileMenu'),
    orbitPopover: $('#orbitPopover'),
    timePopover: $('#timePopover'),
    setOrbits: $('#setOrbits'),
    setParams: $('#setParams'),
    setLabels: $('#setLabels'),
    setTrails: $('#setTrails'),
    setBelt: $('#setBelt'),
    setHuman: $('#setHuman'),
    setRings: $('#setRings'),
    resetLayers: $('#resetLayers'),
    quickOrbit: $('#quickOrbit'),
    quickPause: $('#quickPause'),
    quickReset: $('#quickReset'),
    zoomIn: $('#zoomIn'),
    zoomOut: $('#zoomOut'),
    resetViewTop: $('#resetViewTop'),
    speedRange: $('#speedRange'),
    speedLabel: $('#speedLabel'),
    speedNote: $('#speedNote'),
    popoverDate: $('#popoverDate'),
    popoverTime: $('#popoverTime'),
    popoverPause: $('#popoverPause'),
    stepDay: $('#stepDay'),
    resetNow: $('#resetNow'),
    detailPanel: $('#detailPanel'),
    detailContent: $('#detailContent'),
    detailScroll: $('#detailScroll'),
    closeDetail: $('#closeDetail'),
    locateObject: $('#locateObject'),
    selectionBadge: $('#selectionBadge'),
    selectionName: $('#selectionName'),
    clearSelection: $('#clearSelection'),
    hoverCard: $('#hoverCard'),
    deepDock: $('#deepDock'),
    missionTrack: $('#missionTrack'),
    closeDeep: $('#closeDeep'),
    toast: $('#toast'),
    brandHome: $('#brandHome'),
    interactionHint: $('#interactionHint'),
    hero: $('#hero')
  };

  const state = {
    w: window.innerWidth,
    h: window.innerHeight,
    dpr: 1,
    simTime: new Date(),
    paused: false,
    speedIndex: 1,
    selected: null,
    hovered: null,
    filter: 'all',
    search: '',
    deepSpace: false,
    showOrbits: true,
    showParams: false,
    showLabels: true,
    showTrails: true,
    showBelt: true,
    showHuman: true,
    showRings: true,
    baseCx: 0,
    baseCy: 0,
    fitZoom: 1,
    camera: { yaw: -0.53, pitch: 0.63, zoom: 1, panX: 0, panY: 0 },
    defaultCamera: { yaw: -0.53, pitch: 0.63 },
    cameraTween: null,
    userZoomed: false,
    days: 0,
    positions: {},
    hits: [],
    labels: [],
    labelRects: [],
    belt: [],
    stars: [],
    lastFrame: performance.now(),
    lastUiUpdate: 0,
    toastTimer: null,
    pointer: { x: 0, y: 0 },
    pointers: new Map(),
    drag: null,
    pinch: null,
    suppressPick: false,
    collapsedGroups: new Set(),
    frameTime: 0
  };

  const moonsByHost = {};
  const ringsByHost = {};
  const humansByHost = {};

  Object.values(DATA).forEach((obj) => {
    if (obj.category === 'moon' && obj.host) {
      (moonsByHost[obj.host] ||= []).push(obj);
    }
    if (obj.category === 'ring' && obj.host) {
      (ringsByHost[obj.host] ||= []).push(obj);
    }
    if (obj.category === 'human' && obj.host) {
      (humansByHost[obj.host] ||= []).push(obj);
    }
  });

  /* =========================================================
     Small utilities
     ========================================================= */

  function hexToRgb(hex) {
    let h = (hex || '#ffffff').replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgba(hex, a) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r},${g},${b},${a})`;
  }
  function towardWhite(hex, t) {
    const { r, g, b } = hexToRgb(hex);
    return `rgb(${Math.round(lerp(r, 255, t))},${Math.round(lerp(g, 255, t))},${Math.round(lerp(b, 255, t))})`;
  }
  function towardBlack(hex, t) {
    const { r, g, b } = hexToRgb(hex);
    return `rgb(${Math.round(lerp(r, 0, t))},${Math.round(lerp(g, 0, t))},${Math.round(lerp(b, 0, t))})`;
  }
  function normalizeSearch(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, '');
  }
  function formatDate(date) {
    return `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())}`;
  }
  function formatTime(date, seconds = true) {
    return `${pad2(date.getHours())}:${pad2(date.getMinutes())}${seconds ? ':' + pad2(date.getSeconds()) : ''}`;
  }
  function dayCount(date) {
    return (date.getTime() - J2000) / DAY_MS;
  }
  function solveKepler(M, e) {
    M = ((M + Math.PI) % TAU + TAU) % TAU - Math.PI;
    let E = M;
    for (let i = 0; i < 5; i += 1) {
      E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    }
    return E;
  }
  function auToRadius(au) {
    return 84 + 228 * Math.pow(Math.max(au, 0) / 30.1104, 0.43);
  }
  function isDimmed(category) {
    return state.filter !== 'all' && category !== state.filter;
  }
  function activeCategoryFor(obj) {
    return !isDimmed(obj.category);
  }
  function setCanvasFont(size, weight = 400, family = 'sans') {
    if (family === 'mono') {
      ctx.font = `${weight} ${size}px "SFMono-Regular", "Cascadia Code", Consolas, monospace`;
    } else if (family === 'serif') {
      ctx.font = `${weight} ${size}px "STSong", "Songti SC", "Noto Serif SC", serif`;
    } else {
      ctx.font = `${weight} ${size}px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`;
    }
  }

  /* =========================================================
     Time + UI synchronisation
     ========================================================= */

  function currentSpeed() {
    return SPEEDS[state.speedIndex];
  }

  function updateTimeUI(force = false) {
    const now = performance.now();
    if (!force && now - state.lastUiUpdate < 100) return;
    state.lastUiUpdate = now;

    ui.topClock.innerHTML = `${formatDate(state.simTime)} <em>${formatTime(state.simTime, false)}</em>`;
    ui.popoverDate.textContent = formatDate(state.simTime);
    ui.popoverTime.innerHTML = `${formatTime(state.simTime, true)} <i>CST</i>`;
    ui.speedLabel.textContent = currentSpeed().label;
    const rate = BASE_DAYS_PER_SECOND * currentSpeed().mult;
    ui.speedNote.textContent = rate >= 365
      ? `1 秒 ≈ ${(rate / 365.25).toFixed(rate >= 3650 ? 0 : 1)} 年`
      : `1 秒 ≈ ${rate % 1 === 0 ? rate : rate.toFixed(2)} 天`;
    const progress = (state.speedIndex / (SPEEDS.length - 1)) * 100;
    ui.speedRange.style.setProperty('--range-progress', `${progress}%`);
    ui.speedRange.value = String(state.speedIndex);

    if (state.paused) {
      ui.metaLabel.textContent = 'SIMULATION PAUSED · 已暂停';
      ui.liveDot.style.background = '#e2b477';
      ui.liveDot.style.boxShadow = '0 0 0 4px rgba(226,180,119,.07), 0 0 12px rgba(226,180,119,.7)';
    } else {
      ui.metaLabel.textContent = 'LIVE EPHEMERIS · UTC+8';
      ui.liveDot.style.background = '';
      ui.liveDot.style.boxShadow = '';
    }
  }

  function syncPauseUI() {
    const label = state.paused ? '继续运行' : '暂停模拟';
    ui.quickPause.classList.toggle('is-paused', state.paused);
    ui.quickPause.setAttribute('aria-pressed', String(state.paused));
    ui.quickPause.querySelector('span').textContent = label;
    ui.popoverPause.classList.toggle('is-paused', state.paused);
    ui.popoverPause.querySelector('span').textContent = label;
    updateTimeUI(true);
  }

  function togglePause(force) {
    const next = typeof force === 'boolean' ? force : !state.paused;
    if (next === state.paused) return;
    state.paused = next;
    syncPauseUI();
    showToast(state.paused ? '模拟已暂停 · 时间冻结于当前星历' : '模拟继续运行');
  }

  function setSpeedIndex(index) {
    state.speedIndex = clamp(Math.round(index), 0, SPEEDS.length - 1);
    updateTimeUI(true);
    showToast(`模拟速率设为 ${currentSpeed().label} · 1 秒 ≈ ${BASE_DAYS_PER_SECOND * currentSpeed().mult} 天`);
  }

  function resetToNow() {
    state.simTime = new Date();
    updateTimeUI(true);
    showToast('星历已回到此刻 · 所有天体重新定位');
  }

  function stepOneDay() {
    state.simTime = new Date(state.simTime.getTime() + DAY_MS);
    updateTimeUI(true);
    showToast('时间前进 1 个地球日');
  }

  /* =========================================================
     Catalogue
     ========================================================= */

  function buildCatalogue() {
    const html = GROUPS.map((group) => {
      const count = group.objectIds.length;
      const rows = group.objectIds.map((id) => {
        const obj = DATA[id];
        return `
          <button class="object-row" type="button" data-cat-id="${id}" title="${obj.name} · ${obj.suffix}">
            <span class="object-orb" style="--orb-color:${obj.color}"></span>
            <span class="object-copy">
              <span class="object-name">${obj.name}</span>
              <span class="object-en">${obj.en}</span>
            </span>
            <span class="object-type">${obj.badge}</span>
          </button>`;
      }).join('');
      return `
        <section class="catalog-group" data-group="${group.id}">
          <button class="group-toggle" type="button" aria-expanded="true">
            <span class="group-index">${group.index}</span>
            <span class="group-title">${group.title}</span>
            <span class="group-count">${pad2(count)}</span>
            <svg class="group-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>
          </button>
          <div class="group-body">${rows}</div>
        </section>`;
    }).join('');
    ui.catalogList.innerHTML = html;

    ui.catalogList.addEventListener('click', (event) => {
      const row = event.target.closest('[data-cat-id]');
      if (row) {
        openObject(row.dataset.catId, { focus: true });
        if (window.matchMedia('(max-width: 1150px)').matches) closeCatalogue();
        return;
      }
      const toggle = event.target.closest('.group-toggle');
      if (toggle) {
        const group = toggle.closest('.catalog-group');
        const collapsed = group.classList.toggle('is-collapsed');
        toggle.setAttribute('aria-expanded', String(!collapsed));
        if (collapsed) state.collapsedGroups.add(group.dataset.group);
        else state.collapsedGroups.delete(group.dataset.group);
      }
    });

    ui.catalogSearch.addEventListener('input', (event) => {
      state.search = event.target.value;
      applyCatalogueFilter();
    });

    $('#clearSearch').addEventListener('click', () => {
      ui.catalogSearch.value = '';
      state.search = '';
      ui.catalogSearch.focus();
      applyCatalogueFilter();
    });

    ui.filterChips.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      state.filter = button.dataset.filter;
      $$('button', ui.filterChips).forEach((b) => b.classList.toggle('is-active', b === button));
      applyCatalogueFilter();
      const labels = {
        all: '展示全部天体', planet: '仅突出八大行星', moon: '仅突出卫星系统',
        ring: '仅突出行星环系统', small: '仅突出小天体与陨石', human: '仅突出人类造物'
      };
      showToast(labels[state.filter] || '筛选已更新');
    });

    applyCatalogueFilter();
  }

  function buildCategorySearchText(obj) {
    const extra = [obj.suffix, obj.en, obj.badge, obj.categoryLabel, ...(obj.tags || [])].join(' ');
    return normalizeSearch(`${obj.name} ${obj.en} ${extra} ${obj.id}`);
  }

  function applyCatalogueFilter() {
    const query = normalizeSearch(state.search);
    let visibleCount = 0;
    const groupsWithVisible = new Set();

    $$('[data-cat-id]', ui.catalogList).forEach((row) => {
      const obj = DATA[row.dataset.catId];
      const searchMatch = !query || buildCategorySearchText(obj).includes(query);
      const dimmed = state.filter !== 'all' && obj.category !== state.filter;
      row.hidden = !searchMatch;
      row.classList.toggle('is-dimmed', dimmed);
      if (searchMatch) {
        visibleCount += 1;
        groupsWithVisible.add(row.closest('.catalog-group').dataset.group);
      }
    });

    $$('.catalog-group', ui.catalogList).forEach((group) => {
      group.style.display = groupsWithVisible.has(group.dataset.group) ? '' : 'none';
    });

    ui.catalogEmpty.hidden = visibleCount > 0;
    ui.catalog.classList.toggle('is-searching', !!query);
    ui.catalogSearch.closest('.search-box').classList.toggle('has-value', !!query);
  }

  function updateCatalogueSelection() {
    $$('[data-cat-id]', ui.catalogList).forEach((row) => {
      row.classList.toggle('is-selected', row.dataset.catId === state.selected);
    });
  }

  /* =========================================================
     Mission dock
     ========================================================= */

  function buildMissionDock() {
    ui.missionTrack.innerHTML = DEEP_MISSIONS.map((id) => {
      const obj = DATA[id];
      const distance = obj.base.find((b) => b.label.includes('当前距离'))?.value || obj.badge;
      const launch = obj.base.find((b) => b.label.includes('发射日期'))?.value || obj.index;
      return `
        <button class="mission-card" type="button" data-mission-id="${id}">
          <span class="mission-year"><span>${launch || obj.index}</span><i></i></span>
          <strong>${obj.name}</strong>
          <small>${distance} · ${obj.en}</small>
        </button>`;
    }).join('');

    ui.missionTrack.addEventListener('click', (event) => {
      const card = event.target.closest('[data-mission-id]');
      if (!card) return;
      $$('.mission-card', ui.missionTrack).forEach((c) => c.classList.toggle('is-selected', c === card));
      openObject(card.dataset.missionId, { focus: true });
    });
  }

  /* =========================================================
     Navigation / popovers / deep mode
     ========================================================= */

  function setNavActive(name) {
    $$('.nav-item').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.nav === name));
  }

  function closePopovers() {
    [ui.orbitPopover, ui.timePopover].forEach((pop) => {
      pop.hidden = true;
    });
    ui.navOrbits.setAttribute('aria-expanded', 'false');
    ui.navTime.setAttribute('aria-expanded', 'false');
    setNavActive(state.deepSpace ? 'deep' : 'overview');
  }

  function positionPopover(pop, anchor) {
    if (window.innerWidth <= 800) {
      pop.style.left = '';
      return;
    }
    const rect = anchor.getBoundingClientRect();
    const width = pop.offsetWidth || 344;
    const left = clamp(rect.left + rect.width / 2 - width / 2, 12, window.innerWidth - width - 12);
    pop.style.left = `${left}px`;
  }

  function openPopover(which) {
    const isOrbit = which === 'orbits';
    const pop = isOrbit ? ui.orbitPopover : ui.timePopover;
    const anchor = isOrbit ? ui.navOrbits : ui.navTime;
    const wasHidden = pop.hidden;
    closePopovers();
    if (!wasHidden) return;
    pop.hidden = false;
    positionPopover(pop, anchor);
    anchor.setAttribute('aria-expanded', 'true');
    setNavActive(which);
  }

  function closeCatalogue() {
    app.classList.remove('catalog-open');
    app.classList.add('catalog-closed');
    ui.navCatalog.setAttribute('aria-expanded', 'false');
    setNavActive(state.deepSpace ? 'deep' : 'overview');
  }

  function openCatalogue() {
    app.classList.add('catalog-open');
    app.classList.remove('catalog-closed');
    ui.navCatalog.setAttribute('aria-expanded', 'true');
    setNavActive('catalog');
  }

  function toggleCatalogue() {
    const mobile = window.matchMedia('(max-width: 1150px)').matches;
    const open = mobile ? app.classList.contains('catalog-open') : !app.classList.contains('catalog-closed');
    if (open) closeCatalogue();
    else openCatalogue();
  }

  function setDeepMode(enabled) {
    if (enabled === state.deepSpace) {
      ui.deepDock.hidden = !enabled;
      return;
    }
    state.deepSpace = enabled;
    app.classList.toggle('deep-mode', enabled);
    ui.deepDock.hidden = !enabled;
    ui.navDeep.setAttribute('aria-expanded', String(enabled));
    if (enabled) {
      closeDetail();
      if (!state.showHuman) {
        state.showHuman = true;
        ui.setHuman.checked = true;
      }
      setNavActive('deep');
      animateCamera({ yaw: -0.48, pitch: 0.56, zoom: state.fitZoom * 0.92, panX: 0, panY: 0 }, 900);
      showToast('深空足迹已展开 · 点击探测卡查看任务档案');
    } else {
      $$('.mission-card', ui.missionTrack).forEach((c) => c.classList.remove('is-selected'));
      setNavActive('overview');
      showToast('已返回太阳系全景');
    }
  }

  function resetAll() {
    setDeepMode(false);
    closeDetail();
    closePopovers();
    state.filter = 'all';
    state.search = '';
    ui.catalogSearch.value = '';
    $$('button', ui.filterChips).forEach((b) => b.classList.toggle('is-active', b.dataset.filter === 'all'));
    applyCatalogueFilter();
    resetView();
    setNavActive('overview');
    showToast('太阳系全景 · 视角与筛选已重置');
  }

  /* =========================================================
     View / camera
     ========================================================= */

  function computeLayout() {
    state.w = window.innerWidth;
    state.h = window.innerHeight;
    const compact = state.w <= 1150;
    const catalogVisible = compact ? app.classList.contains('catalog-open') : !app.classList.contains('catalog-closed');
    let left = 0;
    if (!compact && catalogVisible) {
      left = state.w > 1320 ? 356 : 334;
    }
    state.baseCx = left + (state.w - left) * 0.53;
    state.baseCy = state.h * 0.51;
    state.fitZoom = clamp(Math.min(state.w / 1440, state.h / 900) * 1.06, 0.58, 1.28);
    if (!state.userZoomed && !state.selected && !state.deepSpace) {
      state.camera.zoom = state.fitZoom;
    }
    state.camera.zoom = clamp(state.camera.zoom, 0.3, 9);
  }

  function resizeCanvas() {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.w * state.dpr);
    canvas.height = Math.round(state.h * state.dpr);
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    computeLayout();
  }

  function handleResize() {
    const oldFit = state.fitZoom;
    resizeCanvas();
    if (state.camera.zoom === oldFit && !state.userZoomed) state.camera.zoom = state.fitZoom;
    if (state.cameraTween) state.cameraTween = null;
    updateTimeUI(true);
  }

  function getProjection() {
    const { yaw, pitch, zoom, panX, panY } = state.camera;
    return {
      cy: Math.cos(yaw),
      sy: Math.sin(yaw),
      sp: Math.sin(pitch),
      cp: Math.cos(pitch),
      zoom,
      cx: state.baseCx + panX,
      cyScreen: state.baseCy + panY
    };
  }

  function projectWith(p, x, y, z) {
    const rx = x * p.cy - z * p.sy;
    const rz = x * p.sy + z * p.cy;
    return {
      x: p.cx + rx * p.zoom,
      y: p.cyScreen + (rz * p.sp - y * p.cp) * p.zoom,
      depth: rz * p.cp + y * p.sp,
      rx,
      rz
    };
  }

  function project(x, y, z) {
    return projectWith(getProjection(), x, y, z);
  }

  function animateCamera(to, duration = 820) {
    const from = { ...state.camera };
    state.cameraTween = {
      from,
      to: { ...from, ...to },
      start: performance.now(),
      duration: REDUCED_MOTION ? 1 : duration
    };
  }

  function updateCameraTween(now) {
    if (!state.cameraTween) return;
    const t = clamp((now - state.cameraTween.start) / state.cameraTween.duration, 0, 1);
    const e = easeOutCubic(t);
    const { from, to } = state.cameraTween;
    state.camera.yaw = lerp(from.yaw, to.yaw, e);
    state.camera.pitch = lerp(from.pitch, to.pitch, e);
    state.camera.zoom = lerp(from.zoom, to.zoom, e);
    state.camera.panX = lerp(from.panX, to.panX, e);
    state.camera.panY = lerp(from.panY, to.panY, e);
    if (t >= 1) state.cameraTween = null;
  }

  function resetView(showMessage = true) {
    state.userZoomed = false;
    animateCamera({
      yaw: state.defaultCamera.yaw,
      pitch: state.defaultCamera.pitch,
      zoom: state.fitZoom,
      panX: 0,
      panY: 0
    }, 900);
    if (showMessage) showToast('视角已重置 · 黄道面全景');
  }

  function zoomBy(factor, anchorX = state.w / 2, anchorY = state.h / 2) {
    state.cameraTween = null;
    state.userZoomed = true;
    const oldZoom = state.camera.zoom;
    const next = clamp(oldZoom * factor, 0.32, 8.5);
    if (next === oldZoom) return;
    const dx = anchorX - state.baseCx - state.camera.panX;
    const dy = anchorY - state.baseCy - state.camera.panY;
    state.camera.panX = anchorX - state.baseCx - dx * (next / oldZoom);
    state.camera.panY = anchorY - state.baseCy - dy * (next / oldZoom);
    state.camera.zoom = next;
  }

  function cameraFocusObject(obj) {
    const anchorId = obj.host || obj.id;
    const anchor = state.positions[anchorId] || state.positions[obj.id] || state.positions.sun;
    if (!anchor) return;
    const world = anchor.world || { x: 0, y: 0, z: 0 };
    const zoom = clamp((obj.focusZoom || 2.2) * Math.max(0.82, state.fitZoom), 0.7, 9);
    const p = getProjection();
    const rx = world.x * p.cy - world.z * p.sy;
    const rz = world.x * p.sy + world.z * p.cy;
    const offsetX = rx * zoom;
    const offsetY = (rz * p.sp - world.y * p.cp) * zoom;

    const panelOpen = app.classList.contains('panel-open') && window.innerWidth > 800;
    const panelWidth = panelOpen ? Math.min(440, window.innerWidth * 0.4) : 0;
    const catalogOpen = window.innerWidth > 1150 && !app.classList.contains('catalog-closed');
    const left = catalogOpen ? (window.innerWidth > 1320 ? 356 : 334) : 14;
    const desiredX = panelOpen
      ? left + (window.innerWidth - panelWidth - left) * 0.53
      : left + (window.innerWidth - left) * 0.53;
    const desiredY = state.h * 0.5;

    animateCamera({
      zoom,
      panX: desiredX - state.baseCx - offsetX,
      panY: desiredY - state.baseCy - offsetY
    }, 950);
  }

  /* =========================================================
     Selection + detail panel
     ========================================================= */

  function openObject(id, options = {}) {
    const obj = DATA[id];
    if (!obj) return;
    state.selected = id;
    app.classList.add('panel-open');
    ui.detailPanel.setAttribute('aria-hidden', 'false');
    renderDetail(obj);
    updateCatalogueSelection();
    updateSelectionBadge();
    closePopovers();
    if (options.focus) cameraFocusObject(obj);
    if (window.innerWidth <= 800 && app.classList.contains('catalog-open')) closeCatalogue();
    if (options.toast !== false && !state.deepSpace) {
      // The detail panel itself is the feedback; no toast needed.
    }
  }

  function closeDetail(clear = true) {
    app.classList.remove('panel-open');
    ui.detailPanel.setAttribute('aria-hidden', 'true');
    if (clear) {
      state.selected = null;
      updateCatalogueSelection();
      updateSelectionBadge();
    }
  }

  function updateSelectionBadge() {
    if (!state.selected) {
      ui.selectionBadge.hidden = true;
      return;
    }
    const obj = DATA[state.selected];
    ui.selectionName.textContent = `${obj.name} · ${obj.categoryLabel}`;
    ui.selectionBadge.hidden = false;
  }

  function renderDetail(obj) {
    const visualClass = [
      obj.category === 'human' || obj.visualType === 'probe' ? 'is-probe' : '',
      obj.category === 'star' ? 'is-sun' : '',
      obj.visualType === 'meteor' ? 'is-meteor' : '',
      obj.visualType === 'comet' ? 'is-comet' : ''
    ].filter(Boolean).join(' ');

    const baseCells = obj.base.map((item) => `
      <div class="stat-cell">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        ${item.note ? `<small>${item.note}</small>` : ''}
      </div>`).join('');

    const orbitCells = obj.orbitMetrics.map((item) => `
      <div><span>${item.label}</span><strong>${item.value}</strong></div>`).join('');

    const layerBar = obj.structure.layers?.length ? `
      <div class="layer-bar">
        ${obj.structure.layers.map((layer) => `<span style="width:${layer.pct}%;background:${layer.color}"></span>`).join('')}
      </div>
      <div class="layer-labels">
        ${obj.structure.layers.map((layer) => `<span><i style="background:${layer.color}"></i>${layer.label}</span>`).join('')}
      </div>` : '';

    const features = obj.structure.features.map((f) => `
      <div class="feature-item"><span>${f.label}</span><p>${f.text}</p></div>`).join('');

    const relatedMoons = (obj.relatedMoons || []).map((id) => `
      <button class="moon-chip" type="button" data-detail-goto="${id}">${DATA[id].name}</button>`).join('');
    const relatedRings = (obj.relatedRings || []).map((id) => `
      <button class="moon-chip" type="button" data-detail-goto="${id}">${DATA[id].name}</button>`).join('');

    const timeline = obj.exploration.map((item) => `
      <div class="timeline-item">
        <time>${item.year}</time>
        <strong>${item.title}</strong>
        <p>${item.text}</p>
      </div>`).join('');

    const tags = obj.tags.map((tag) => `<span class="detail-tag">${tag}</span>`).join('');

    ui.detailContent.innerHTML = `
      <header class="detail-hero" style="--detail-color:${obj.detailColor || obj.color};--orb-size:${obj.visualSize || 56}px;--orb-gradient:${obj.orbGradient || 'radial-gradient(circle at 33% 29%, #fff, #8e9aaa 45%, #202733)'};--ring-color:${obj.ringColor || obj.detailColor || obj.color}">
        <div class="detail-topline">
          <span class="detail-index">${obj.index} / ${obj.en}</span>
          <span class="detail-status">完整数据与轨道参数已同步</span>
          <button class="detail-close" type="button" data-detail-close aria-label="关闭详情">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg>
          </button>
        </div>
        <div class="detail-visual ${visualClass}">
          <div class="visual-glow"></div>
          <div class="visual-orbit"></div>
          <div class="visual-body"></div>
          ${obj.ring ? '<div class="visual-ring"></div>' : ''}
        </div>
        <div class="detail-title-wrap">
          <span class="detail-category">${obj.categoryLabel}</span>
          <h2 class="detail-title">${obj.name}<em>・${obj.suffix}</em></h2>
          <div class="detail-en">${obj.en} · ${obj.badge}</div>
        </div>
        <p class="detail-desc">${obj.desc}</p>
        <div class="detail-tags">${tags}</div>
      </header>

      <section class="detail-section">
        <div class="section-heading"><span class="section-number">01</span><h3>基础档案</h3></div>
        <div class="stat-grid">${baseCells}</div>
      </section>

      <section class="detail-section">
        <div class="section-heading"><span class="section-number">02</span><h3>轨道参数</h3></div>
        ${buildOrbitFigure(obj)}
        <div class="orbit-params">${orbitCells}</div>
        <p class="orbit-note">${obj.orbitNote || ''}</p>
      </section>

      <section class="detail-section">
        <div class="section-heading"><span class="section-number">03</span><h3>结构特征</h3></div>
        <p class="structure-intro">${obj.structure.intro}</p>
        ${layerBar}
        <div class="feature-list">${features}</div>
        ${(relatedMoons || relatedRings) ? `
          <div class="related-moons">
            ${relatedMoons ? '<span>卫星 /</span>' + relatedMoons : ''}
            ${relatedRings ? '<span>环系 /</span>' + relatedRings : ''}
          </div>` : ''}
      </section>

      <section class="detail-section">
        <div class="section-heading"><span class="section-number">04</span><h3>探索记录</h3></div>
        <div class="timeline">${timeline}</div>
        <p class="detail-footnote">数据为科普展示用途，基于 NASA / JPL、ESA 与 IAU 公开资料整理；轨道根数与天体位置采用 J2000 近似模型。</p>
      </section>
    `;

    ui.detailScroll.scrollTop = 0;
  }

  function buildOrbitFigure(obj) {
    const diagram = obj.diagram || { kind: 'orbit', angle: 0 };
    const kind = diagram.kind;
    let content = '';
    let legend = '<span><i></i>当前轨道位置</span>';

    if (kind === 'galactic') {
      content = `
        <path d="M28 86 C70 53 126 44 192 49 C255 54 294 36 318 15" fill="none" stroke="${obj.color}" stroke-opacity=".32" stroke-width="1" stroke-dasharray="2 5"/>
        <path d="M33 96 C92 78 168 77 226 55 C264 41 293 31 322 26" fill="none" stroke="#8a6a3f" stroke-opacity=".35" stroke-width=".8"/>
        <ellipse cx="170" cy="61" rx="114" ry="32" fill="none" stroke="#88a7c7" stroke-opacity=".09" transform="rotate(-8 170 61)"/>
        <ellipse cx="170" cy="61" rx="77" ry="22" fill="none" stroke="#88a7c7" stroke-opacity=".08" transform="rotate(-8 170 61)"/>
        <circle cx="236" cy="42" r="4.2" fill="${obj.color}" filter="none"/>
        <circle cx="236" cy="42" r="9" fill="none" stroke="${obj.color}" stroke-opacity=".25"/>
        <circle cx="96" cy="80" r="3" fill="#d7c8b0" fill-opacity=".68"/>
        <text x="245" y="38" fill="#cfc0a7" font-size="7.5" font-family="sans-serif">太阳</text>
        <text x="80" y="98" fill="#6e7785" font-size="6.5" font-family="sans-serif">银河系中心方向</text>
        <path d="M88 80 l6 -4 l6 4 l-6 4z" fill="none" stroke="#6d7786" stroke-opacity=".6"/>
      `;
      legend = '<span><i style="background:#e6c58d"></i>绕银心轨道</span>';
    } else if (kind === 'probe') {
      content = `
        <path d="M46 93 C104 83 169 61 270 28" fill="none" stroke="${obj.detailColor || '#8ad7f6'}" stroke-opacity=".48" stroke-width="1" stroke-dasharray="2.5 5"/>
        <path d="M46 93 C104 83 169 61 270 28" fill="none" stroke="${obj.detailColor || '#8ad7f6'}" stroke-opacity=".12" stroke-width="5"/>
        <circle cx="46" cy="93" r="3.5" fill="#72b7e4"/>
        <circle cx="46" cy="93" r="8" fill="none" stroke="#72b7e4" stroke-opacity=".25"/>
        <text x="26" y="111" fill="#728092" font-size="7" font-family="sans-serif">${diagram.start || '地球'}</text>
        <path d="M266 21 l4 7 l7 4 l-7 4 l-4 7 l-4 -7 l-7 -4 l7 -4z" fill="${obj.detailColor || '#8ad7f6'}" fill-opacity=".9"/>
        <circle cx="270" cy="32" r="12" fill="none" stroke="${obj.detailColor || '#8ad7f6'}" stroke-opacity=".2"/>
        <text x="236" y="56" fill="#8b98a8" font-size="7" font-family="sans-serif">${diagram.end || '深空'}</text>
        <path d="M122 26v77M282 22v77" stroke="#738091" stroke-opacity=".12" stroke-dasharray="1 5"/>
        <text x="124" y="34" fill="#4f5968" font-size="5.5" font-family="monospace">HELIOPAUSE</text>
      `;
      legend = '<span><i style="background:#8ad7f6"></i>飞行轨迹（示意）</span>';
    } else if (kind === 'impact') {
      content = `
        <path d="M18 98 C88 80 124 76 170 77 C224 78 280 84 324 98" fill="none" stroke="#8d7356" stroke-opacity=".32"/>
        <ellipse cx="170" cy="65" rx="49" ry="15" fill="#6f5a44" fill-opacity=".12" stroke="#a28564" stroke-opacity=".35"/>
        <ellipse cx="170" cy="65" rx="31" ry="9" fill="#17130f" fill-opacity=".8" stroke="#9b7c58" stroke-opacity=".25"/>
        <path d="M121 65 H219 M170 50 V83" stroke="#d1b185" stroke-opacity=".16"/>
        <path d="M188 25 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z" fill="${obj.detailColor || '#c09a74'}" fill-opacity=".92"/>
        <path d="M188 25 C176 35 164 43 158 50" fill="none" stroke="${obj.detailColor || '#c09a74'}" stroke-opacity=".55" stroke-dasharray="2 4"/>
        <text x="196" y="24" fill="#8b8073" font-size="7" font-family="sans-serif">${obj.name}</text>
        <text x="128" y="100" fill="#675d50" font-size="6" font-family="monospace">IMPACT CRATER</text>
        <text x="42" y="48" fill="#5a6573" font-size="6" font-family="monospace">SURFACE · EARTH</text>
      `;
      legend = '<span><i style="background:#c09a74"></i>撞击遗迹</span>';
    } else if (kind === 'moon') {
      const host = DATA[diagram.hostId];
      content = `
        <ellipse cx="170" cy="62" rx="99" ry="42" fill="none" stroke="${obj.detailColor || obj.color}" stroke-opacity=".4" stroke-width=".9" stroke-dasharray="3 4" transform="rotate(-9 170 62)"/>
        <ellipse cx="170" cy="62" rx="61" ry="25" fill="none" stroke="#8794a4" stroke-opacity=".1" transform="rotate(-9 170 62)"/>
        <circle cx="170" cy="62" r="14" fill="${host.color}" fill-opacity=".8"/>
        <circle cx="170" cy="62" r="20" fill="none" stroke="${host.color}" stroke-opacity=".2"/>
        <circle cx="262" cy="48" r="4" fill="${obj.color}"/>
        <circle cx="262" cy="48" r="9" fill="none" stroke="${obj.color}" stroke-opacity=".28"/>
        <text x="67" y="111" fill="#737f8f" font-size="6.5" font-family="sans-serif">${host.name}</text>
        <text x="228" y="25" fill="#8b98a8" font-size="7" font-family="sans-serif">${obj.name}</text>
        <path d="M197 61 h32" stroke="#6c7786" stroke-opacity=".2" stroke-dasharray="2 4"/>
        <text x="145" y="113" fill="#525d6c" font-size="5.5" font-family="monospace">${obj.orbitMetrics[0].value}</text>
      `;
      legend = '<span><i style="background:#d9d3c7"></i>绕母星轨道</span>';
    } else {
      let source = obj;
      if (kind === 'host' && diagram.hostId) source = DATA[diagram.hostId];
      const e = source.physical?.e ?? 0.02;
      const rx = clamp(112 * (1 - clamp(e, 0, 0.9) * 0.26), 54, 112);
      const ry = clamp(rx * Math.sqrt(Math.max(0.03, 1 - e * e)), 17, 78);
      const focusX = 178;
      const centerX = focusX - rx * e;
      const centerY = 61;
      const angle = diagram.angle != null ? diagram.angle : 1.5;
      const markerX = centerX + rx * Math.cos(angle);
      const markerY = centerY + ry * Math.sin(angle);
      const color = source.detailColor || source.color || obj.color;

      content = `
        <g transform="rotate(-6 ${focusX} ${centerY})">
          <ellipse cx="${centerX}" cy="${centerY}" rx="${rx}" ry="${ry}" fill="none" stroke="${color}" stroke-opacity=".48" stroke-width="1"/>
          <ellipse cx="${centerX}" cy="${centerY}" rx="${rx}" ry="${ry}" fill="none" stroke="${color}" stroke-opacity=".1" stroke-width="6"/>
          <path d="M${centerX - rx - 3} ${centerY}H${centerX + rx + 3}" stroke="#7b8798" stroke-opacity=".09" stroke-dasharray="2 5"/>
          <circle cx="${focusX}" cy="${centerY}" r="4.2" fill="#e9bd69"/>
          <circle cx="${focusX}" cy="${centerY}" r="9" fill="none" stroke="#e9bd69" stroke-opacity=".24"/>
          <circle cx="${markerX}" cy="${markerY}" r="4" fill="${color}" stroke="#0a0e16" stroke-width="1"/>
          <circle cx="${markerX}" cy="${markerY}" r="9" fill="none" stroke="${color}" stroke-opacity=".22"/>
          <text x="${focusX + 10}" y="${centerY - 8}" fill="#8f7d5d" font-size="6" font-family="sans-serif">太阳</text>
          <text x="${markerX + 10}" y="${markerY - 5}" fill="${color}" font-size="6.5" font-family="sans-serif">${source.name}</text>
          <text x="${centerX - rx}" y="${centerY + ry + 16}" fill="#566171" font-size="5.8" font-family="monospace">PERIHELION</text>
          <text x="${centerX + rx - 40}" y="${centerY - ry - 8}" fill="#566171" font-size="5.8" font-family="monospace">APHELION</text>
        </g>
        <text x="20" y="22" fill="#596473" font-size="6" font-family="monospace">ORBITAL PLANE · J2000</text>
        <g stroke="#8ea0b4" stroke-opacity=".13">
          <path d="M20 108H320M20 14V108"/>
          <path d="M20 79H320M20 50H320" stroke-dasharray="1 7"/>
        </g>
      `;
      if (kind === 'host') legend = `<span><i style="background:${color}"></i>${source.name}轨道</span>`;
      else legend = '<span><i></i>当前轨道位置</span>';
    }

    return `
      <div class="orbit-figure">
        <span class="fig-label">${kind === 'host' ? 'HOST ORBIT · 轨道线图示' : kind === 'moon' ? 'SATELLITE ORBIT · 轨道线图示' : 'ORBITAL SECTION · 轨道线图示'}</span>
        <svg viewBox="0 0 340 121" role="img" aria-label="${obj.name}轨道线示意图">${content}</svg>
        <div class="fig-legend">${legend}</div>
      </div>`;
  }

  ui.detailContent.addEventListener('click', (event) => {
    if (event.target.closest('[data-detail-close]')) {
      closeDetail();
      return;
    }
    const goto = event.target.closest('[data-detail-goto]');
    if (goto) openObject(goto.dataset.detailGoto, { focus: true });
  });

  /* =========================================================
     Asset generation
     ========================================================= */

  function generateStars() {
    const count = Math.round(clamp((state.w * state.h) / 6200, 150, 430));
    state.stars = Array.from({ length: count }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: i < count * 0.035 ? 1 + Math.random() * 0.8 : 0.25 + Math.random() * 0.8,
      alpha: 0.18 + Math.random() * 0.65,
      phase: Math.random() * TAU,
      speed: 0.35 + Math.random() * 0.9,
      warm: Math.random() > 0.8,
      cross: i < count * 0.018
    }));
  }

  function generateBelt() {
    state.belt = Array.from({ length: 320 }, () => {
      const a = 2.08 + Math.pow(Math.random(), 0.8) * 1.24;
      return {
        a,
        phase: Math.random() * TAU,
        periodDays: 365.256 * Math.pow(a, 1.5),
        incl: (Math.random() - 0.5) * 0.14,
        y: (Math.random() - 0.5) * 13,
        size: 0.35 + Math.random() * 0.8,
        alpha: 0.18 + Math.random() * 0.55
      };
    });
  }

  /* =========================================================
     Astronomy helpers
     ========================================================= */

  function orbitPointFromE(obj, E) {
    const p = obj.physical;
    const aPx = auToRadius(p.a);
    const xv = aPx * (Math.cos(E) - p.e);
    const zv = aPx * Math.sqrt(1 - p.e * p.e) * Math.sin(E);
    const peri = p.peri * D2R;
    const xr = xv * Math.cos(peri) - zv * Math.sin(peri);
    const zr = xv * Math.sin(peri) + zv * Math.cos(peri);
    const inc = p.i * D2R;
    return { x: xr, y: zr * Math.sin(inc) * 0.68, z: zr * Math.cos(inc) };
  }

  function bodyWorld(obj, days) {
    const p = obj.physical;
    if (!p) return { x: 0, y: 0, z: 0 };
    const M = normDeg(p.M0 + (360 / p.periodDays) * days) * D2R;
    const E = solveKepler(M, p.e);
    const point = orbitPointFromE(obj, E);
    point.E = E;
    return point;
  }

  function outerProbeWorld(obj) {
    if (!obj.deepPos) return null;
    const nr = auToRadius(30.1104);
    const r = nr * obj.deepPos.radius;
    return {
      x: Math.cos(obj.deepPos.angle) * r,
      y: Math.sin(obj.deepPos.angle * 1.7) * 10,
      z: Math.sin(obj.deepPos.angle) * r
    };
  }

  function preparePositions(days) {
    state.days = days;
    const positions = {};
    const sunPos = project(0, 0, 0);
    positions.sun = { ...sunPos, world: { x: 0, y: 0, z: 0 }, radius: 0 };
    state.positions = positions;

    Object.values(DATA).forEach((obj) => {
      if (!obj.physical) return;
      const world = bodyWorld(obj, days);
      const screen = project(world.x, world.y, world.z);
      positions[obj.id] = { ...screen, world, radius: obj.size || 2 };
    });

    Object.values(DATA).forEach((obj) => {
      if (!obj.deepPos) return;
      const world = outerProbeWorld(obj);
      const screen = project(world.x, world.y, world.z);
      positions[obj.id] = { ...screen, world, radius: 1 };
    });
  }

  function getOrbitPoints(obj) {
    if (obj._orbitPoints) return obj._orbitPoints;
    const points = [];
    const count = obj.physical?.e > 0.7 ? 260 : 180;
    for (let i = 0; i <= count; i += 1) {
      points.push(orbitPointFromE(obj, (i / count) * TAU));
    }
    obj._orbitPoints = points;
    return points;
  }

  /* =========================================================
     Drawing primitives
     ========================================================= */

  function drawStars(t) {
    const w = state.w;
    const h = state.h;
    for (const star of state.stars) {
      const twinkle = 0.72 + Math.sin(t * star.speed + star.phase) * 0.28;
      const alpha = star.alpha * twinkle;
      const x = star.x * w;
      const y = star.y * h;
      ctx.beginPath();
      ctx.arc(x, y, star.r, 0, TAU);
      ctx.fillStyle = star.warm
        ? `rgba(248,226,190,${alpha})`
        : `rgba(208,225,248,${alpha})`;
      ctx.fill();
      if (star.cross) {
        ctx.strokeStyle = `rgba(201,222,248,${alpha * 0.34})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(x - 4, y);
        ctx.lineTo(x + 4, y);
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x, y + 4);
        ctx.stroke();
      }
    }
  }

  function drawOrbitLines(t) {
    const p = getProjection();
    const visible = state.showOrbits;
    const ordered = [
      ...PLANETS.map((id) => DATA[id]),
      DATA.ceres, DATA.vesta, DATA.pallas, DATA.halley
    ];

    for (const obj of ordered) {
      if (!obj.physical) continue;
      const dim = isDimmed(obj.category);
      if (!visible && state.selected !== obj.id) continue;
      const points = getOrbitPoints(obj);
      const selected = state.selected === obj.id;
      const baseAlpha = selected ? 0.72 : dim ? 0.035 : state.deepSpace ? 0.075 : 0.155;
      const color = selected ? '#e8c98e' : obj.color;
      const lineWidth = selected ? 1.35 : 0.72;
      if (selected) {
        ctx.save();
        ctx.strokeStyle = 'rgba(230,197,141,.08)';
        ctx.lineWidth = 7;
        ctx.beginPath();
        points.forEach((pt, i) => {
          const s = projectWith(p, pt.x, pt.y, pt.z);
          if (i === 0) ctx.moveTo(s.x, s.y); else ctx.lineTo(s.x, s.y);
        });
        ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath();
      points.forEach((pt, i) => {
        const s = projectWith(p, pt.x, pt.y, pt.z);
        if (i === 0) ctx.moveTo(s.x, s.y); else ctx.lineTo(s.x, s.y);
      });
      ctx.strokeStyle = rgba(color, baseAlpha);
      ctx.lineWidth = lineWidth;
      if (obj.id === 'halley') ctx.setLineDash([3, 6]);
      else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);

      if (state.showTrails && !dim && !state.deepSpace && obj.physical) {
        drawOrbitTrail(obj, p);
      }
    }
  }

  function drawOrbitTrail(obj, p) {
    const pos = state.positions[obj.id];
    if (!pos) return;
    const points = getOrbitPoints(obj);
    const count = Math.floor((pos.world.E / TAU) * (points.length - 1));
    const trail = 20;
    ctx.save();
    ctx.lineCap = 'round';
    for (let k = 1; k <= trail; k += 1) {
      const i = count - k;
      const iPrev = i - 1;
      if (iPrev < 0) break;
      const a = projectWith(p, points[iPrev].x, points[iPrev].y, points[iPrev].z);
      const b = projectWith(p, points[i].x, points[i].y, points[i].z);
      const alpha = (1 - k / trail) * 0.26;
      ctx.strokeStyle = rgba(obj.color, alpha);
      ctx.lineWidth = 1.45 * (1 - k / trail) + 0.35;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBelt(t) {
    if (!state.showBelt) return;
    const p = getProjection();
    const smallFocus = state.filter === 'small';
    const dim = state.filter !== 'all' && !smallFocus;
    const deep = state.deepSpace;
    ctx.save();
    for (const particle of state.belt) {
      const theta = particle.phase + (TAU * state.days) / particle.periodDays;
      const r = auToRadius(particle.a);
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const y = particle.y + Math.sin(theta * 2 + particle.incl) * 5;
      const s = projectWith(p, x, y, z);
      if (s.x < -20 || s.x > state.w + 20 || s.y < -20 || s.y > state.h + 20) continue;
      const alpha = particle.alpha * (deep ? 0.09 : dim ? 0.2 : smallFocus ? 0.95 : 0.46);
      ctx.beginPath();
      ctx.arc(s.x, s.y, particle.size * (smallFocus ? 1.25 : 1), 0, TAU);
      ctx.fillStyle = smallFocus ? `rgba(220,194,152,${alpha})` : `rgba(160,172,187,${alpha})`;
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSun(t) {
    const sun = state.positions.sun;
    const radius = DATA.sun.size * clamp(Math.pow(state.camera.zoom, 0.32), 0.8, 1.75);
    const pulse = 1 + Math.sin(t * 1.2) * 0.025;
    const dim = isDimmed('star') ? 0.2 : 1;
    ctx.save();
    ctx.globalAlpha = state.deepSpace ? 0.62 * dim : dim;

    const glow = ctx.createRadialGradient(sun.x, sun.y, radius * 0.2, sun.x, sun.y, radius * 7.8);
    glow.addColorStop(0, 'rgba(255,233,182,.62)');
    glow.addColorStop(0.12, 'rgba(255,197,101,.26)');
    glow.addColorStop(0.38, 'rgba(245,154,61,.09)');
    glow.addColorStop(1, 'rgba(240,140,50,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, radius * 7.8, 0, TAU);
    ctx.fill();

    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 34; i += 1) {
      const angle = (i / 34) * TAU + t * 0.03;
      const len = radius * (1.5 + ((i * 7) % 9) * 0.11);
      ctx.strokeStyle = `rgba(255,197,103,${0.018 + (i % 4) * 0.006})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(sun.x + Math.cos(angle) * radius * 1.15, sun.y + Math.sin(angle) * radius * 1.15);
      ctx.lineTo(sun.x + Math.cos(angle) * len, sun.y + Math.sin(angle) * len);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';

    const core = ctx.createRadialGradient(
      sun.x - radius * 0.24, sun.y - radius * 0.26, radius * 0.04,
      sun.x, sun.y, radius * pulse
    );
    core.addColorStop(0, '#fffdf0');
    core.addColorStop(0.25, '#ffe5a0');
    core.addColorStop(0.58, '#ffc260');
    core.addColorStop(0.86, '#e88a30');
    core.addColorStop(1, '#9e4d12');
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, radius * pulse, 0, TAU);
    ctx.fillStyle = core;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sun.x, sun.y, radius * 1.02, 0, TAU);
    ctx.strokeStyle = 'rgba(255,225,164,.38)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.restore();

    registerHit('sun', sun.x, sun.y, Math.max(radius + 8, 18), 3);
    queueLabel('sun', sun.x, sun.y, radius, 3);
  }

  function drawPlanetBody(obj, pos, radius, t, options = {}) {
    const hovered = state.hovered === obj.id;
    const selected = state.selected === obj.id;
    const dim = isDimmed(obj.category);
    const deepDim = state.deepSpace && obj.category !== 'human';
    const alpha = selected || hovered ? 1 : dim ? 0.25 : deepDim ? 0.38 : 1;
    const color = obj.color;
    const p = getProjection();
    const sunPos = state.positions.sun;
    const lightX = sunPos.x - pos.x;
    const lightY = sunPos.y - pos.y;
    const lightLen = Math.hypot(lightX, lightY) || 1;
    const lx = (lightX / lightLen) * radius * 0.38;
    const ly = (lightY / lightLen) * radius * 0.38;
    const r = Math.max(1.5, radius);

    ctx.save();
    ctx.globalAlpha = alpha;

    if (obj.id === 'earth' || obj.id === 'venus' || obj.id === 'jupiter' || obj.id === 'saturn' || obj.id === 'uranus' || obj.id === 'neptune') {
      const atmo = ctx.createRadialGradient(pos.x, pos.y, r * 0.82, pos.x, pos.y, r * 2.45);
      atmo.addColorStop(0, rgba(color, 0.12));
      atmo.addColorStop(0.5, rgba(color, 0.045));
      atmo.addColorStop(1, rgba(color, 0));
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r * 2.45, 0, TAU);
      ctx.fill();
    }

    if (hovered || selected) {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r + 8 + Math.sin(t * 2.2) * 1.5, 0, TAU);
      ctx.strokeStyle = selected ? 'rgba(230,197,141,.55)' : 'rgba(230,238,248,.26)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const sphere = ctx.createRadialGradient(pos.x + lx, pos.y + ly, r * 0.06, pos.x, pos.y, r * 1.06);
    sphere.addColorStop(0, towardWhite(color, 0.76));
    sphere.addColorStop(0.24, towardWhite(color, 0.23));
    sphere.addColorStop(0.64, color);
    sphere.addColorStop(0.9, towardBlack(color, 0.55));
    sphere.addColorStop(1, towardBlack(color, 0.82));
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, TAU);
    ctx.fillStyle = sphere;
    ctx.fill();

    ctx.save();
    ctx.clip();
    if (obj.id === 'jupiter' || obj.id === 'saturn') {
      const bands = obj.id === 'jupiter' ? 7 : 6;
      for (let i = 0; i < bands; i += 1) {
        const yy = pos.y - r + (i + 0.5) * (r * 2 / bands);
        const h = (r * 2 / bands) * (0.62 + (i % 3) * 0.1);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,239,211,.105)' : 'rgba(63,35,20,.14)';
        ctx.beginPath();
        ctx.ellipse(pos.x, yy, r * 0.99, h * 0.48, 0, 0, TAU);
        ctx.fill();
      }
      if (obj.id === 'jupiter' && r > 8) {
        ctx.fillStyle = 'rgba(148,58,39,.48)';
        ctx.beginPath();
        ctx.ellipse(pos.x + r * 0.2, pos.y + r * 0.28, r * 0.28, r * 0.135, -0.2, 0, TAU);
        ctx.fill();
      }
    }
    if (obj.id === 'earth' && r > 6) {
      ctx.fillStyle = 'rgba(81,135,86,.55)';
      ctx.beginPath();
      ctx.ellipse(pos.x - r * 0.28, pos.y - r * 0.15, r * 0.33, r * 0.2, -0.5, 0, TAU);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(pos.x + r * 0.24, pos.y + r * 0.2, r * 0.22, r * 0.14, 0.5, 0, TAU);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.33)';
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y - r * 0.74, r * 0.4, r * 0.1, 0, 0, TAU);
      ctx.fill();
    }
    if (obj.id === 'mars' && r > 6) {
      ctx.fillStyle = 'rgba(255,238,217,.48)';
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y - r * 0.78, r * 0.3, r * 0.08, 0, 0, TAU);
      ctx.fill();
    }
    ctx.restore();

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r + 0.4, 0, TAU);
    ctx.strokeStyle = rgba(towardWhite(color, 0.5), 0.24);
    ctx.lineWidth = 0.55;
    ctx.stroke();

    if (obj.category === 'small' && r > 2.7) {
      ctx.fillStyle = 'rgba(30,25,20,.34)';
      ctx.beginPath();
      ctx.arc(pos.x + r * 0.3, pos.y - r * 0.18, r * 0.22, 0, TAU);
      ctx.fill();
    }

    ctx.restore();
    registerHit(obj.id, pos.x, pos.y, Math.max(r + 6, 10), obj.category === 'small' ? 2 : 4);
    queueLabel(obj.id, pos.x, pos.y, r, obj.category === 'star' ? 3 : 4);
  }

  function drawPlanetRing(planet, pos, radius, t, front) {
    if (!state.showRings) return;
    const ringObj = (ringsByHost[planet.id] || [])[0];
    if (!ringObj) return;
    const selected = state.selected === ringObj.id;
    const hovered = state.hovered === ringObj.id;
    const dim = isDimmed('ring');
    const deepDim = state.deepSpace;
    if (deepDim && !selected && !hovered) return;

    const isUranus = planet.id === 'uranus';
    const isSaturn = planet.id === 'saturn';
    const flatten = isUranus ? 0.76 : isSaturn ? 0.26 : 0.2;
    const rotation = isUranus ? 0.72 : -0.22 + state.camera.yaw * 0.12;
    const alphaBase = selected || hovered ? 0.95 : dim ? 0.16 : deepDim ? 0.26 : 0.72;

    const bands = isSaturn
      ? [
          { in: 1.24, out: 1.53, alpha: 0.24, color: '#9d8e74' },
          { in: 1.55, out: 1.93, alpha: 0.65, color: '#e0cca2' },
          { in: 1.94, out: 1.99, alpha: 0.16, color: '#7e705d' },
          { in: 2.02, out: 2.27, alpha: 0.47, color: '#cbb78f' },
          { in: 2.29, out: 2.31, alpha: 0.12, color: '#95876e' },
          { in: 2.34, out: 2.36, alpha: 0.3, color: '#c4b08b' }
        ]
      : isUranus
        ? [
            { in: 1.7, out: 1.716, alpha: 0.36, color: '#b6dadd' },
            { in: 1.84, out: 1.855, alpha: 0.5, color: '#c4e3e4' },
            { in: 2.0, out: 2.012, alpha: 0.3, color: '#89b6bc' },
            { in: 2.16, out: 2.172, alpha: 0.22, color: '#7da6ad' }
          ]
        : isSaturn
          ? []
          : [
              { in: 1.55, out: 1.85, alpha: 0.18, color: '#a99884' },
              { in: 1.95, out: 2.2, alpha: 0.1, color: '#8e8172' }
            ];

    ctx.save();
    ctx.globalAlpha = selected || hovered ? 1 : 1;
    ctx.translate(pos.x, pos.y);
    ctx.rotate(rotation);
    for (const band of bands) {
      const rx = radius * band.out;
      const ry = rx * flatten;
      const start = front ? 0 : 0;
      const end = front ? Math.PI : TAU;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, start, end);
      ctx.strokeStyle = rgba(band.color, band.alpha * alphaBase);
      ctx.lineWidth = Math.max(0.8, radius * (band.out - band.in) * 0.8);
      ctx.stroke();
      if (isSaturn && band.alpha > 0.4) {
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, start, end);
        ctx.strokeStyle = `rgba(255,240,207,${0.12 * alphaBase})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    if (selected || hovered) {
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 2.38, radius * 2.38 * flatten, 0, 0, front ? Math.PI : TAU);
      ctx.strokeStyle = 'rgba(230,197,141,.24)';
      ctx.lineWidth = 0.55;
      ctx.setLineDash([2, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();

    if (!front) {
      const markerAngle = ringObj.ringMarkerAngle || 0.6;
      const mx = pos.x + Math.cos(markerAngle) * radius * 2.8;
      const my = pos.y + Math.sin(markerAngle) * radius * 1.7;
      ctx.save();
      ctx.translate(mx, my);
      ctx.beginPath();
      ctx.ellipse(0, 0, 4.5, 1.7, -0.3, 0, TAU);
      ctx.strokeStyle = selected ? '#f1d49f' : rgba(ringObj.color, hovered ? 0.9 : 0.42);
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
      registerHit(ringObj.id, mx, my, 8, 2);
      queueLabel(ringObj.id, mx, my, 4.5, 6);
      state.positions[ringObj.id] = { x: mx, y: my, world: pos.world, radius: 4.5 };
    }
  }

  function drawMoon(obj, hostPos, t) {
    const dist = obj.moonOrbit.distance * Math.pow(state.camera.zoom, 0.55);
    const angle = obj.moonOrbit.phase + (TAU * state.days / obj.moonOrbit.periodDays) * (obj.moonOrbit.retrograde ? -1 : 1);
    const p = getProjection();
    const lx = Math.cos(angle) * dist;
    const lz = Math.sin(angle) * dist * 0.9;
    const offset = projectWith(p, lx, 0, lz);
    const sx = hostPos.x + (offset.x - p.cx);
    const sy = hostPos.y + (offset.y - p.cyScreen);
    const r = Math.max(1.15, obj.size * clamp(Math.pow(state.camera.zoom, 0.25), 0.85, 1.6));
    const selected = state.selected === obj.id;
    const hovered = state.hovered === obj.id;
    const dim = isDimmed('moon');
    const parentSelected = state.selected === obj.host;
    const showOrbit = state.showOrbits && (state.filter === 'moon' || parentSelected || state.camera.zoom > 1.8 || hovered);
    const deepDim = state.deepSpace;

    if (showOrbit && !deepDim) {
      ctx.save();
      ctx.translate(hostPos.x, hostPos.y);
      ctx.rotate(-0.22 + state.camera.yaw * 0.1);
      ctx.beginPath();
      ctx.ellipse(0, 0, dist, dist * 0.9 * Math.sin(state.camera.pitch), 0, 0, TAU);
      ctx.strokeStyle = selected
        ? 'rgba(230,197,141,.48)'
        : rgba(obj.color, dim ? 0.07 : 0.16);
      ctx.lineWidth = 0.55;
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    const alpha = selected || hovered ? 1 : dim ? 0.16 : deepDim ? 0.3 : 0.92;
    const color = obj.color;
    ctx.save();
    ctx.globalAlpha = alpha;
    if (selected || hovered) {
      ctx.beginPath();
      ctx.arc(sx, sy, r + 5 + Math.sin(t * 2.7) * 1.2, 0, TAU);
      ctx.strokeStyle = selected ? 'rgba(230,197,141,.62)' : 'rgba(230,238,248,.4)';
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
    const g = ctx.createRadialGradient(sx - r * 0.3, sy - r * 0.35, r * 0.08, sx, sy, r * 1.1);
    g.addColorStop(0, towardWhite(color, 0.7));
    g.addColorStop(0.55, color);
    g.addColorStop(1, towardBlack(color, 0.72));
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, TAU);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();

    state.positions[obj.id] = { x: sx, y: sy, world: hostPos.world, radius: r };
    registerHit(obj.id, sx, sy, Math.max(6, r + 3), 2);
    queueLabel(obj.id, sx, sy, r, 6);
  }

  function drawHumanHostObject(obj, hostPos, t) {
    if (!state.showHuman) return;
    const dist = obj.humanOrbit.distance * Math.pow(state.camera.zoom, 0.5);
    const angle = obj.humanOrbit.phase + (TAU * state.days / obj.humanOrbit.periodDays);
    const p = getProjection();
    const offset = projectWith(p, Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
    const sx = hostPos.x + (offset.x - p.cx);
    const sy = hostPos.y + (offset.y - p.cyScreen);
    const selected = state.selected === obj.id;
    const hovered = state.hovered === obj.id;
    const dim = isDimmed('human');
    const deep = state.deepSpace;
    const alpha = selected || hovered ? 1 : dim ? 0.18 : deep ? 0.82 : 0.62;
    const size = 3.2 + Math.sin(t * 1.8 + obj.humanOrbit.phase) * 0.35;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(sx, sy);
    ctx.rotate(angle * 0.5);
    ctx.strokeStyle = selected ? '#f1d49f' : obj.detailColor;
    ctx.fillStyle = selected ? '#f1d49f' : obj.detailColor;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.8, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.8, 0);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = alpha * 0.6;
    ctx.beginPath();
    ctx.moveTo(-size * 2.2, 0);
    ctx.lineTo(size * 2.2, 0);
    ctx.stroke();
    ctx.restore();

    state.positions[obj.id] = { x: sx, y: sy, world: hostPos.world, radius: size };
    registerHit(obj.id, sx, sy, 8, 3);
    queueLabel(obj.id, sx, sy, size, 7);
  }

  function drawOuterProbes(t) {
    if (!state.showHuman) return;
    const p = getProjection();
    for (const id of ['voyager1', 'voyager2', 'pioneer10', 'pioneer11', 'newHorizons']) {
      const obj = DATA[id];
      const pos = state.positions[id];
      if (!pos) continue;
      const selected = state.selected === id;
      const hovered = state.hovered === id;
      const dim = isDimmed('human');
      const alpha = selected || hovered ? 1 : dim ? 0.15 : state.deepSpace ? 1 : 0.5;
      const pulse = 1 + Math.sin(t * 2 + id.length) * 0.18;
      const size = (state.deepSpace ? 5.3 : 3.4) * pulse;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(pos.x, pos.y);
      ctx.rotate(t * 0.12 + id.length);
      ctx.fillStyle = selected ? '#f3d9a7' : obj.detailColor;
      ctx.shadowColor = obj.detailColor;
      ctx.shadowBlur = state.deepSpace ? 15 : 7;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.45, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.45, 0);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = rgba(obj.detailColor, 0.7);
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(-size * 1.9, 0);
      ctx.lineTo(-size * 0.8, 0);
      ctx.moveTo(size * 0.8, 0);
      ctx.lineTo(size * 1.9, 0);
      ctx.stroke();
      ctx.restore();

      if (selected || hovered) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size + 10 + Math.sin(t * 2.3) * 1.4, 0, TAU);
        ctx.strokeStyle = selected ? 'rgba(230,197,141,.6)' : 'rgba(138,215,246,.4)';
        ctx.lineWidth = 0.7;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      registerHit(id, pos.x, pos.y, Math.max(9, size + 5), 3);
      queueLabel(id, pos.x, pos.y, size, state.deepSpace ? 5 : 8);
    }
  }

  function drawMeteorites(t) {
    const shouldShow = state.filter === 'small' || ['baringer', 'hoba'].includes(state.selected) || state.hovered === 'baringer' || state.hovered === 'hoba';
    if (!shouldShow) return;
    const earth = state.positions.earth;
    if (!earth) return;
    for (const id of ['baringer', 'hoba']) {
      const obj = DATA[id];
      if (!obj.meteorMarker) continue;
      const angle = obj.meteorMarker.angle;
      const dist = obj.meteorMarker.radius * 1.4;
      const sx = earth.x + Math.cos(angle) * dist;
      const sy = earth.y + Math.sin(angle) * dist * 0.7;
      const selected = state.selected === id;
      const hovered = state.hovered === id;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(angle);
      ctx.fillStyle = selected ? '#f0c88b' : obj.detailColor;
      ctx.globalAlpha = selected || hovered ? 1 : 0.85;
      ctx.beginPath();
      ctx.moveTo(0, -3.4);
      ctx.lineTo(2.7, 1.8);
      ctx.lineTo(-2.7, 1.8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = 'rgba(214,176,120,.28)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(earth.x, earth.y);
      ctx.lineTo(sx, sy);
      ctx.stroke();
      state.positions[id] = { x: sx, y: sy, world: earth.world, radius: 3 };
      registerHit(id, sx, sy, 8, 1);
      queueLabel(id, sx, sy, 4, 7);
    }
  }

  function drawCometTail(t) {
    const halley = state.positions.halley;
    if (!halley) return;
    const sun = state.positions.sun;
    if (!sun) return;
    const dx = halley.x - sun.x;
    const dy = halley.y - sun.y;
    const len = Math.hypot(dx, dy) || 1;
    const dirX = dx / len;
    const dirY = dy / len;
    const tailLen = 28 + Math.sin(t * 0.7) * 4;
    const dim = isDimmed('small');
    const alpha = dim ? 0.12 : 0.48;
    const gradient = ctx.createLinearGradient(
      halley.x, halley.y,
      halley.x + dirX * tailLen, halley.y + dirY * tailLen
    );
    gradient.addColorStop(0, `rgba(171,238,243,${alpha})`);
    gradient.addColorStop(0.4, `rgba(130,205,218,${alpha * 0.36})`);
    gradient.addColorStop(1, 'rgba(120,190,210,0)');
    ctx.save();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(halley.x, halley.y);
    ctx.lineTo(halley.x + dirX * tailLen, halley.y + dirY * tailLen);
    ctx.stroke();
    ctx.restore();
  }

  function drawDeepTrajectories(t) {
    if (!state.showHuman) return;
    const earth = state.positions.earth || state.positions.sun;
    const p = getProjection();
    if (!earth) return;
    for (const id of ['voyager1', 'voyager2', 'pioneer10', 'pioneer11', 'newHorizons']) {
      const obj = DATA[id];
      const pos = state.positions[id];
      if (!pos) continue;
      const selected = state.selected === id;
      const hovered = state.hovered === id;
      const dx = pos.x - earth.x;
      const dy = pos.y - earth.y;
      const cx1 = earth.x + dx * 0.34 - dy * 0.17;
      const cy1 = earth.y + dy * 0.34 + dx * 0.17;
      const cx2 = earth.x + dx * 0.76 - dy * 0.06;
      const cy2 = earth.y + dy * 0.76 + dx * 0.06;
      const alpha = state.deepSpace ? (selected || hovered ? 0.74 : 0.28) : 0.085;
      const path = new Path2D();
      path.moveTo(earth.x, earth.y);
      path.bezierCurveTo(cx1, cy1, cx2, cy2, pos.x, pos.y);
      ctx.save();
      ctx.strokeStyle = rgba(obj.detailColor, alpha);
      ctx.lineWidth = state.deepSpace ? (selected ? 1.15 : 0.72) : 0.5;
      ctx.setLineDash(state.deepSpace ? [3, 7] : [2, 9]);
      ctx.lineDashOffset = -t * 18;
      ctx.stroke(path);
      ctx.setLineDash([]);
      if (state.deepSpace) {
        const u = ((t * 0.085 + obj.deepPos.angle * 0.2) % 1 + 1) % 1;
        const mt = 1 - u;
        const bx = mt * mt * mt * earth.x + 3 * mt * mt * u * cx1 + 3 * mt * u * u * cx2 + u * u * u * pos.x;
        const by = mt * mt * mt * earth.y + 3 * mt * mt * u * cy1 + 3 * mt * u * u * cy2 + u * u * u * pos.y;
        ctx.fillStyle = rgba(obj.detailColor, 0.8);
        ctx.shadowColor = obj.detailColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(bx, by, 1.5, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }

    if (state.deepSpace) {
      const nr = auToRadius(30.1104);
      const center = project(0, 0, 0);
      const points = [];
      for (let i = 0; i <= 120; i += 1) {
        const a = (i / 120) * TAU;
        points.push(projectWith(p, Math.cos(a) * nr * 1.12, 0, Math.sin(a) * nr * 1.12));
      }
      ctx.beginPath();
      points.forEach((pt, i) => i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
      ctx.strokeStyle = 'rgba(119,164,191,.11)';
      ctx.lineWidth = 0.75;
      ctx.setLineDash([2, 9]);
      ctx.stroke();
      ctx.setLineDash([]);
      const label = projectWith(p, 0, 0, -nr * 1.12);
      ctx.fillStyle = 'rgba(118,147,169,.55)';
      ctx.font = '6px "Cascadia Code", Consolas, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('HELIOPAUSE · 日球层顶', label.x, label.y - 7);
      ctx.textAlign = 'left';
    }
  }

  function drawSmallBodies(t) {
    for (const id of ['ceres', 'vesta', 'pallas', 'halley']) {
      const obj = DATA[id];
      const pos = state.positions[id];
      if (!pos) continue;
      const dim = isDimmed('small');
      const selected = state.selected === id;
      const hovered = state.hovered === id;
      const alpha = selected || hovered ? 1 : dim ? 0.16 : 0.82;
      const radius = Math.max(1.2, obj.size * clamp(Math.pow(state.camera.zoom, 0.25), 0.7, 1.6));
      ctx.save();
      ctx.globalAlpha = alpha;
      if (id === 'halley') {
        ctx.fillStyle = '#c6f1f3';
        ctx.shadowColor = '#9ce6ed';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, Math.max(1.7, radius * 0.75), 0, TAU);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        const g = ctx.createRadialGradient(pos.x - radius * 0.35, pos.y - radius * 0.35, radius * 0.08, pos.x, pos.y, radius * 1.1);
        g.addColorStop(0, towardWhite(obj.color, 0.62));
        g.addColorStop(0.55, obj.color);
        g.addColorStop(1, towardBlack(obj.color, 0.68));
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, TAU);
        ctx.fillStyle = g;
        ctx.fill();
      }
      if (selected || hovered) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 6 + Math.sin(t * 2.3) * 1.3, 0, TAU);
        ctx.strokeStyle = selected ? 'rgba(230,197,141,.6)' : 'rgba(230,238,248,.3)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
      ctx.restore();
      registerHit(id, pos.x, pos.y, Math.max(7, radius + 4), 1);
      queueLabel(id, pos.x, pos.y, radius, 7);
    }
  }

  /* =========================================================
     Labels
     ========================================================= */

  function registerHit(id, x, y, radius, priority = 0) {
    state.hits.push({ id, x, y, radius, priority });
  }

  function queueLabel(id, x, y, radius, priority = 5) {
    state.labels.push({ id, x, y, radius, priority });
  }

  function shouldShowLabel(obj) {
    const selected = state.selected === obj.id;
    const hovered = state.hovered === obj.id;
    if (selected || hovered) return true;
    if (!state.showLabels) return false;
    if (obj.id === 'sun' || PLANETS.includes(obj.id)) return !state.deepSpace || obj.category === 'human';
    if (obj.category === 'moon') {
      const parentSelected = state.selected === obj.host;
      return state.filter === 'moon' || parentSelected || state.camera.zoom > 2.15;
    }
    if (obj.category === 'ring') return state.filter === 'ring' || state.camera.zoom > 2.45;
    if (obj.category === 'human') {
      if (obj.host && state.deepSpace && state.w < 720) return false;
      return state.deepSpace || state.filter === 'human' || state.camera.zoom > 2.5;
    }
    if (obj.category === 'small') return state.filter === 'small' || obj.id === 'halley';
    return true;
  }

  function drawLabels(t) {
    state.labelRects = [];
    const sorted = [...state.labels].sort((a, b) => a.priority - b.priority);
    for (const item of sorted) {
      const obj = DATA[item.id];
      if (!obj) continue;
      if (!shouldShowLabel(obj)) continue;
      if (state.deepSpace && obj.category !== 'human' && !['sun'].includes(obj.id)) continue;

      const selected = state.selected === obj.id;
      const hovered = state.hovered === obj.id;
      const dim = isDimmed(obj.category);
      const deepDim = state.deepSpace && obj.category !== 'human';
      const alpha = selected || hovered ? 1 : dim || deepDim ? 0.28 : 0.92;
      const primary = obj.id === 'sun' || PLANETS.includes(obj.id);
      const showParams = state.showParams && (primary || obj.category === 'small') && obj.physical;
      const paramsText = showParams
        ? `a ${obj.physical.a.toFixed(2)} AU  ·  e ${obj.physical.e.toFixed(3)}`
        : '';
      const name = obj.name;
      const sub = obj.en;
      const fontSize = selected || hovered ? (primary ? 12 : 11) : primary ? 10.5 : 9;
      const enSize = primary ? 6.4 : 5.8;

      setCanvasFont(fontSize, selected || hovered ? 500 : 400, primary ? 'serif' : 'sans');
      const nameWidth = ctx.measureText(name).width;
      setCanvasFont(enSize, 400, 'mono');
      const enWidth = ctx.measureText(sub).width;
      const paramsWidth = paramsText ? (() => { setCanvasFont(5.6, 400, 'mono'); return ctx.measureText(paramsText).width; })() : 0;
      const boxW = Math.max(nameWidth, enWidth, paramsWidth) + 16;
      const boxH = showParams ? 32 : primary ? 23 : 20;
      const gap = item.radius + 10;
      const preferRight = item.x < state.w * 0.7;
      const sideOrder = preferRight ? ['right', 'left'] : ['left', 'right'];
      const candidates = [];
      for (const side of sideOrder) {
        const direction = side === 'right' ? 1 : -1;
        candidates.push(
          { side, dx: direction * gap, dy: primary ? -7 : -5 },
          { side, dx: direction * gap * 0.88, dy: primary ? -22 : -18 },
          { side, dx: direction * gap * 0.88, dy: primary ? 17 : 14 }
        );
      }

      let chosen = null;
      for (const candidate of candidates) {
        let rectX = candidate.side === 'right'
          ? item.x + candidate.dx
          : item.x + candidate.dx - boxW;
        let rectY = item.y + candidate.dy - 12;
        rectX = clamp(rectX, 8, state.w - boxW - 8);
        rectY = clamp(rectY, 80, state.h - boxH - 52);
        const rect = { x: rectX, y: rectY, w: boxW, h: boxH };
        const overlaps = state.labelRects.some((r) =>
          rect.x < r.x + r.w && rect.x + rect.w > r.x && rect.y < r.y + r.h && rect.y + rect.h > r.y
        );
        if (!overlaps) {
          chosen = { ...candidate, rect };
          break;
        }
        if (!chosen) chosen = { ...candidate, rect, overlaps: true };
      }
      if (!chosen) continue;
      if (chosen.overlaps && !selected && !hovered && !primary) continue;
      state.labelRects.push(chosen.rect);

      const rect = chosen.rect;
      const rightSide = chosen.side === 'right';
      const dotX = rightSide ? rect.x - 5 : rect.x + rect.w + 5;
      const dotY = rect.y + 13;

      ctx.save();
      ctx.globalAlpha = alpha;
      const pulse = selected ? 0.6 + Math.sin(t * 2.4) * 0.2 : 0.24;

      ctx.strokeStyle = selected ? 'rgba(230,229,216,.42)' : `rgba(167,183,202,${primary ? 0.13 : 0.08})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(item.x + (rightSide ? item.radius + 3 : -item.radius - 3), item.y);
      ctx.lineTo(dotX, dotY - 1);
      ctx.stroke();

      ctx.fillStyle = selected ? 'rgba(240,208,150,.9)' : `rgba(210,224,242,${pulse + 0.22})`;
      ctx.beginPath();
      ctx.arc(dotX, dotY - 1, selected ? 1.6 : 1.05, 0, TAU);
      ctx.fill();

      ctx.textAlign = rightSide ? 'left' : 'right';
      const textX = rightSide ? rect.x + 1 : rect.x + rect.w - 1;
      const textY = rect.y + 12;
      ctx.textBaseline = 'alphabetic';
      setCanvasFont(fontSize, selected || hovered ? 500 : 400, primary ? 'serif' : 'sans');
      ctx.fillStyle = selected
        ? '#f4d59f'
        : hovered
          ? '#ffffff'
          : obj.category === 'human'
            ? '#b9e5f4'
            : primary
              ? '#e8e7e1'
              : '#a7b0bc';
      ctx.shadowColor = 'rgba(0,0,0,.75)';
      ctx.shadowBlur = 7;
      ctx.fillText(name, textX, textY);
      ctx.shadowBlur = 0;

      setCanvasFont(enSize, 400, 'mono');
      ctx.fillStyle = selected ? 'rgba(233,198,137,.62)' : 'rgba(137,151,167,.56)';
      ctx.fillText(sub, textX, textY + 9);
      if (showParams) {
        setCanvasFont(5.6, 400, 'mono');
        ctx.fillStyle = selected ? 'rgba(233,198,137,.5)' : 'rgba(117,131,147,.46)';
        ctx.fillText(paramsText, textX, textY + 18);
      }
      ctx.restore();
    }
  }

  /* =========================================================
     Main render
     ========================================================= */

  function draw(t) {
    ctx.clearRect(0, 0, state.w, state.h);
    state.hits = [];
    state.labels = [];

    const days = dayCount(state.simTime);
    preparePositions(days);
    drawStars(t);
    drawOrbitLines(t);
    drawBelt(t);
    drawDeepTrajectories(t);
    drawSun(t);

    if (state.showRings) {
      for (const id of PLANETS) {
        const planet = DATA[id];
        if (planet.ring) drawPlanetRing(planet, state.positions[id], Math.max(2, planet.size * clamp(Math.pow(state.camera.zoom, 0.3), 0.8, 1.6)), t, false);
      }
    }

    const systemOrder = PLANETS
      .map((id) => ({ id, depth: state.positions[id]?.depth || 0 }))
      .sort((a, b) => a.depth - b.depth);

    for (const { id } of systemOrder) {
      const planet = DATA[id];
      const pos = state.positions[id];
      if (!pos) continue;
      const radius = Math.max(1.5, planet.size * clamp(Math.pow(state.camera.zoom, 0.3), 0.8, 1.6));

      drawPlanetBody(planet, pos, radius, t);
      drawCometTail(t);

      const moons = moonsByHost[id] || [];
      moons.forEach((moon) => drawMoon(moon, pos, t));

      const humans = humansByHost[id] || [];
      humans.forEach((human) => drawHumanHostObject(human, pos, t));
    }

    if (state.showRings) {
      for (const id of systemOrder.map((s) => s.id)) {
        const planet = DATA[id];
        if (!planet.ring) continue;
        const pos = state.positions[id];
        const radius = Math.max(2, planet.size * clamp(Math.pow(state.camera.zoom, 0.3), 0.8, 1.6));
        drawPlanetRing(planet, pos, radius, t, true);
      }
    }

    drawSmallBodies(t);
    drawMeteorites(t);
    drawOuterProbes(t);
    drawLabels(t);

    if (state.hovered && state.hovered !== state.selected) {
      const hit = state.hits.find((h) => h.id === state.hovered);
      if (hit) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(hit.x, hit.y, hit.radius + 4 + Math.sin(t * 3) * 1.2, 0, TAU);
        ctx.strokeStyle = 'rgba(225,237,250,.24)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  /* =========================================================
     Interaction helpers
     ========================================================= */

  function pickHit(x, y) {
    for (let i = state.hits.length - 1; i >= 0; i -= 1) {
      const hit = state.hits[i];
      if (Math.hypot(x - hit.x, y - hit.y) <= hit.radius) return hit;
    }
    return null;
  }

  function updateHover(x, y) {
    const hit = pickHit(x, y);
    const nextId = hit?.id || null;
    if (nextId !== state.hovered) {
      state.hovered = nextId;
      canvas.classList.toggle('is-hovering', !!nextId);
    }
    if (nextId) {
      const obj = DATA[nextId];
      const primaryValue = obj.base?.[2]?.value || obj.categoryLabel;
      ui.hoverCard.hidden = false;
      ui.hoverCard.querySelector('.hover-type').textContent = `${obj.categoryLabel} · ${obj.badge}`;
      ui.hoverCard.querySelector('.hover-name').textContent = obj.name;
      ui.hoverCard.querySelector('.hover-data').textContent = `${primaryValue} · 点击查看详情`;
      const cardW = ui.hoverCard.offsetWidth || 150;
      const cardH = ui.hoverCard.offsetHeight || 58;
      let left = x + 5;
      let top = y + 5;
      if (left + cardW + 18 > state.w) left = x - cardW - 12;
      if (top + cardH + 18 > state.h) top = y - cardH - 12;
      ui.hoverCard.style.left = `${Math.max(8, left)}px`;
      ui.hoverCard.style.top = `${Math.max(8, top)}px`;
    } else {
      ui.hoverCard.hidden = true;
    }
  }

  function hideHover() {
    state.hovered = null;
    ui.hoverCard.hidden = true;
    canvas.classList.remove('is-hovering');
  }

  function showToast(message) {
    clearTimeout(state.toastTimer);
    ui.toast.textContent = message;
    ui.toast.classList.add('is-visible');
    state.toastTimer = setTimeout(() => ui.toast.classList.remove('is-visible'), 2600);
  }

  function syncLayerControls() {
    ui.quickOrbit.classList.toggle('is-active', state.showOrbits);
    ui.quickOrbit.setAttribute('aria-pressed', String(state.showOrbits));
    ui.quickOrbit.querySelector('span').textContent = state.showOrbits ? '显示轨道线' : '隐藏轨道线';
    ui.setOrbits.checked = state.showOrbits;
    ui.setParams.checked = state.showParams;
    ui.setLabels.checked = state.showLabels;
    ui.setTrails.checked = state.showTrails;
    ui.setBelt.checked = state.showBelt;
    ui.setHuman.checked = state.showHuman;
    ui.setRings.checked = state.showRings;
  }

  function resetLayers() {
    state.showOrbits = true;
    state.showParams = false;
    state.showLabels = true;
    state.showTrails = true;
    state.showBelt = true;
    state.showHuman = true;
    state.showRings = true;
    syncLayerControls();
    showToast('轨道图层已恢复默认');
  }

  /* =========================================================
     Event bindings
     ========================================================= */

  function bindUI() {
    // Navigation
    $$('.nav-item').forEach((button) => {
      button.addEventListener('click', () => {
        const nav = button.dataset.nav;
        if (nav === 'overview') {
          resetAll();
        } else if (nav === 'catalog') {
          closePopovers();
          toggleCatalogue();
        } else if (nav === 'orbits') {
          openPopover('orbits');
        } else if (nav === 'time') {
          openPopover('time');
        } else if (nav === 'deep') {
          closePopovers();
          setDeepMode(!state.deepSpace);
        }
      });
    });

    ui.brandHome.addEventListener('click', (event) => {
      event.preventDefault();
      resetAll();
    });

    ui.mobileMenu.addEventListener('click', () => {
      toggleCatalogue();
    });
    ui.catalogClose.addEventListener('click', closeCatalogue);

    $$('.popover-close').forEach((button) => {
      button.addEventListener('click', closePopovers);
    });

    // Layers
    ui.setOrbits.addEventListener('change', () => { state.showOrbits = ui.setOrbits.checked; syncLayerControls(); });
    ui.setParams.addEventListener('change', () => { state.showParams = ui.setParams.checked; });
    ui.setLabels.addEventListener('change', () => { state.showLabels = ui.setLabels.checked; });
    ui.setTrails.addEventListener('change', () => { state.showTrails = ui.setTrails.checked; });
    ui.setBelt.addEventListener('change', () => { state.showBelt = ui.setBelt.checked; });
    ui.setHuman.addEventListener('change', () => { state.showHuman = ui.setHuman.checked; });
    ui.setRings.addEventListener('change', () => { state.showRings = ui.setRings.checked; });
    ui.resetLayers.addEventListener('click', resetLayers);

    ui.quickOrbit.addEventListener('click', () => {
      state.showOrbits = !state.showOrbits;
      syncLayerControls();
      showToast(state.showOrbits ? '轨道线已显示' : '轨道线已隐藏');
    });

    // Time
    ui.quickPause.addEventListener('click', () => togglePause());
    ui.popoverPause.addEventListener('click', () => togglePause());
    ui.speedRange.addEventListener('input', () => setSpeedIndex(Number(ui.speedRange.value)));
    ui.stepDay.addEventListener('click', stepOneDay);
    ui.resetNow.addEventListener('click', resetToNow);

    // View
    ui.zoomIn.addEventListener('click', () => zoomBy(1.24));
    ui.zoomOut.addEventListener('click', () => zoomBy(1 / 1.24));
    ui.resetViewTop.addEventListener('click', () => resetView());
    ui.quickReset.addEventListener('click', () => resetView());

    // Detail
    ui.closeDetail.addEventListener('click', () => closeDetail());
    ui.clearSelection.addEventListener('click', () => closeDetail());
    ui.locateObject.addEventListener('click', () => {
      if (!state.selected) return;
      cameraFocusObject(DATA[state.selected]);
      showToast(`正在定位 ${DATA[state.selected].name}`);
    });

    ui.deepDock.addEventListener('click', (event) => {
      if (event.target.closest('#closeDeep')) {
        setDeepMode(false);
      }
    });
    ui.closeDeep.addEventListener('click', () => setDeepMode(false));

    document.addEventListener('pointerdown', (event) => {
      if (!event.target.closest('[data-popover]') && !event.target.closest('[data-nav]')) {
        closePopovers();
      }
    });

    document.addEventListener('keydown', (event) => {
      const tag = event.target.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      if (event.key === 'Escape') {
        if (!ui.orbitPopover.hidden || !ui.timePopover.hidden) closePopovers();
        else if (app.classList.contains('panel-open')) closeDetail();
        else if (app.classList.contains('catalog-open')) closeCatalogue();
        else if (state.deepSpace) setDeepMode(false);
      } else if (event.key === '/' && !typing) {
        event.preventDefault();
        openCatalogue();
        ui.catalogSearch.focus();
      } else if (event.code === 'Space' && !typing) {
        event.preventDefault();
        togglePause();
      }
    });

    window.addEventListener('resize', handleResize);

    // Canvas: pointer / wheel
    canvas.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return;
      state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      state.pointer.x = event.clientX;
      state.pointer.y = event.clientY;
      state.suppressPick = false;

      if (state.pointers.size === 2) {
        const pts = [...state.pointers.values()];
        state.pinch = {
          distance: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
          zoom: state.camera.zoom
        };
        state.drag = null;
        return;
      }
      if (state.pointers.size === 1) {
        state.drag = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          lastX: event.clientX,
          lastY: event.clientY,
          yaw: state.camera.yaw,
          pitch: state.camera.pitch,
          moved: false
        };
        canvas.setPointerCapture?.(event.pointerId);
        canvas.classList.add('is-dragging');
        state.cameraTween = null;
      }
    });

    canvas.addEventListener('pointermove', (event) => {
      state.pointer.x = event.clientX;
      state.pointer.y = event.clientY;
      if (state.pointers.has(event.pointerId)) {
        state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      }

      if (state.pointers.size === 2 && state.pinch) {
        const pts = [...state.pointers.values()];
        const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (state.pinch.distance > 10) {
          state.camera.zoom = clamp(state.pinch.zoom * (distance / state.pinch.distance), 0.32, 8.5);
          state.userZoomed = true;
        }
        return;
      }

      if (state.drag && state.drag.pointerId === event.pointerId) {
        const dx = event.clientX - state.drag.startX;
        const dy = event.clientY - state.drag.startY;
        if (Math.hypot(dx, dy) > 4) {
          state.drag.moved = true;
          state.suppressPick = true;
        }
        state.camera.yaw = state.drag.yaw - dx * 0.005;
        state.camera.pitch = clamp(state.drag.pitch + dy * 0.0042, 0.13, 1.39);
        hideHover();
        return;
      }

      updateHover(event.clientX, event.clientY);
    });

    function finishPointer(event) {
      const wasDrag = state.drag && state.drag.moved;
      const canPick = state.pointers.size === 1 && !wasDrag && !state.suppressPick && event.type === 'pointerup';
      state.pointers.delete(event.pointerId);
      if (state.pointers.size < 2) state.pinch = null;
      if (state.drag?.pointerId === event.pointerId) {
        state.drag = null;
        canvas.classList.remove('is-dragging');
      }
      if (canPick) {
        const hit = pickHit(event.clientX, event.clientY);
        if (hit) openObject(hit.id, { focus: false });
      }
      state.suppressPick = false;
    }

    canvas.addEventListener('pointerup', finishPointer);
    canvas.addEventListener('pointercancel', finishPointer);
    canvas.addEventListener('pointerleave', () => {
      if (!state.drag) hideHover();
    });

    window.addEventListener('pointerup', (event) => {
      if (!state.drag || state.drag.pointerId !== event.pointerId) return;
      state.pointers.delete(event.pointerId);
      if (state.pointers.size < 2) state.pinch = null;
      state.drag = null;
      canvas.classList.remove('is-dragging');
      state.suppressPick = false;
    });

    canvas.addEventListener('wheel', (event) => {
      event.preventDefault();
      hideHover();
      state.cameraTween = null;
      const factor = Math.exp(-event.deltaY * 0.0011);
      zoomBy(factor, event.clientX, event.clientY);
    }, { passive: false });

    canvas.addEventListener('dblclick', () => resetView());

    // Hover card moves with cursor even when no hit remains
    window.addEventListener('pointermove', (event) => {
      if (event.target === canvas) updateHover(event.clientX, event.clientY);
    });
  }

  /* =========================================================
     Main loop
     ========================================================= */

  function tick(now) {
    const dt = Math.min((now - state.lastFrame) / 1000, 0.12);
    state.lastFrame = now;
    state.frameTime = now / 1000;

    if (!state.paused) {
      const daysPerSecond = BASE_DAYS_PER_SECOND * currentSpeed().mult;
      state.simTime = new Date(state.simTime.getTime() + dt * daysPerSecond * DAY_MS);
    }

    updateCameraTween(now);
    updateTimeUI();
    draw(now / 1000);
    requestAnimationFrame(tick);
  }

  /* =========================================================
     Boot
     ========================================================= */

  function handleHash() {
    const raw = decodeURIComponent(window.location.hash.replace(/^#/, '')).trim().toLowerCase();
    if (!raw) return;
    if (raw === 'deep' || raw === 'deep-space') {
      setDeepMode(true);
      return;
    }
    const match = Object.values(DATA).find((obj) => obj.id.toLowerCase() === raw);
    if (match) openObject(match.id, { focus: true });
  }

  function boot() {
    resizeCanvas();
    generateStars();
    generateBelt();
    buildCatalogue();
    buildMissionDock();
    bindUI();
    syncLayerControls();
    syncPauseUI();
    state.camera.zoom = state.fitZoom;
    state.camera.panX = 0;
    state.camera.panY = 0;
    updateTimeUI(true);
    if (window.innerWidth <= 1150) {
      app.classList.remove('catalog-open');
    } else {
      app.classList.remove('catalog-closed');
    }
    ui.navCatalog.setAttribute('aria-expanded', String(window.innerWidth > 1150));
    requestAnimationFrame((now) => {
      state.lastFrame = now;
      requestAnimationFrame(tick);
    });
    window.addEventListener('hashchange', handleHash);
    if (window.location.hash) setTimeout(handleHash, 120);
  }

  boot();
})();
