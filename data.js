/* =========================================================
   HELIOS · celestial archive
   Physical values are rounded for presentation. Orbital
   elements are J2000 Keplerian approximations.
   ========================================================= */

const CELESTIAL_DATA = {
  sun: {
    id: 'sun', name: '太阳', suffix: '太阳系中心恒星', en: 'SUN', category: 'star',
    categoryLabel: '中心恒星', badge: 'G2V', index: 'STAR—01',
    color: '#ffc766', detailColor: '#ffc766',
    orbGradient: 'radial-gradient(circle at 33% 29%, #fff8da 0%, #ffd778 32%, #f2a53d 62%, #7d3e0e 100%)',
    size: 31, visualSize: 84, focusZoom: 1.5,
    desc: '一颗 G2V 型主序星，以自身引力约束着八大行星、数百万颗小天体与无尽的尘埃。它每秒把约 6 亿吨氢聚变为氦，也是这张星图唯一的坐标系原点。',
    tags: ['G2V 主序星', '46 亿年', '占太阳系 99.86% 质量'],
    base: [
      { label: '平均半径', value: '696,340 km', note: '109 × 地球' },
      { label: '质量', value: '1.989×10³⁰ kg', note: '333,000 × 地球' },
      { label: '公转周期', value: '2.25 亿年', note: '绕银河系中心' },
      { label: '自转周期', value: '25.4 天', note: '赤道区域' }
    ],
    orbitMetrics: [
      { label: '日地距离', value: '1.000 AU' },
      { label: '黄道倾角', value: '7.25°' },
      { label: '轨道速度', value: '220 km/s' }
    ],
    diagram: { kind: 'galactic' },
    orbitNote: '太阳绕银心运行的轨道速度约为 220 km/s，完成一圈约需 2.25 亿年。',
    structure: {
      intro: '太阳没有固体表面。可见光球之下，是对流层、辐射层与温度超过 1,500 万 K 的核聚变核心。',
      layers: [
        { label: '核心', pct: 26, color: '#ffe1a1' },
        { label: '辐射层', pct: 38, color: '#eab45e' },
        { label: '对流层', pct: 24, color: '#c98942' },
        { label: '光球', pct: 12, color: '#8f592c' }
      ],
      features: [
        { label: '大气构成', text: '氢约 73%、氦约 25%，其余为氧、碳、铁等重元素。日冕温度可达百万 K。' },
        { label: '能量机制', text: '核心的质子—质子链反应每秒消耗约 6 亿吨氢，释放的能量经数十万年才能抵达表面。' },
        { label: '活动周期', text: '太阳活动约以 11 年为周期起伏，黑子、耀斑与日冕物质抛射驱动着整个日球层。' }
      ]
    },
    exploration: [
      { year: '1610', title: '伽利略记录太阳黑子', text: '人类第一次用望远镜系统观测太阳表面，确认黑子会随自转移动。' },
      { year: '1995', title: 'SOHO 升空', text: '持续监测太阳内部、日冕与太阳风，成为服役时间最长的太阳观测台之一。' },
      { year: '2018', title: '帕克太阳探测器发射', text: '2018 年升空，2021 年首次穿越日冕，创下人类探测器最接近太阳的纪录。' }
    ]
  },

  mercury: {
    id: 'mercury', name: '水星', suffix: '距离太阳最近的行星', en: 'MERCURY', category: 'planet',
    categoryLabel: '类地行星', badge: 'TERRESTRIAL', index: 'PLANET—01',
    color: '#baa996', detailColor: '#c2ad96',
    orbGradient: 'radial-gradient(circle at 35% 30%, #e0d4c3 0%, #a99a89 36%, #62574d 70%, #211c18 100%)',
    size: 3.1, visualSize: 50, focusZoom: 3.0,
    physical: { a: 0.38710, e: 0.20563, i: 7.005, node: 48.331, peri: 77.456, M0: 174.796, periodDays: 87.969 },
    desc: '太阳系中最小、离太阳最近的行星。没有真正的大气层守护，昼夜温差接近 600 ℃，表面布满与月球相似的撞击坑。',
    tags: ['铁质巨核', '无大气', '昼夜温差 600 ℃'],
    base: [
      { label: '平均半径', value: '2,439.7 km', note: '0.383 × 地球' },
      { label: '质量', value: '3.301×10²³ kg', note: '0.055 × 地球' },
      { label: '公转周期', value: '87.97 天', note: '一年最短' },
      { label: '自转周期', value: '58.65 天', note: '3:2 自旋轨道共振' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '0.387 AU' },
      { label: '轨道倾角', value: '7.00°' },
      { label: '离心率', value: '0.206' }
    ],
    diagram: { kind: 'orbit', angle: 1.35 },
    orbitNote: '水星轨道偏心率高达 0.206，是八大行星中轨道最扁的一颗；近日点与远日点日距相差约 2,400 万 km。',
    structure: {
      intro: '水星拥有异常巨大的铁镍核心，约占整颗行星质量的 70%。薄薄的硅酸盐外壳记录着四十多亿年的撞击史。',
      layers: [
        { label: '铁镍核心', pct: 61, color: '#9e8770' },
        { label: '硅酸盐地幔', pct: 27, color: '#786c60' },
        { label: '岩石外壳', pct: 12, color: '#4c443d' }
      ],
      features: [
        { label: '大气', text: '仅有极其稀薄的散逸层，包含氢、氦、氧、钠和钾，无法形成有效的气候系统。' },
        { label: '地表', text: '卡洛里盆地直径约 1,550 km；极区永久阴影坑内保存着水冰。' },
        { label: '内部', text: '巨大的铁核至今可能仍有部分熔融，并产生微弱的全球磁场。' }
      ]
    },
    exploration: [
      { year: '1974', title: '水手 10 号首次飞越', text: '三次飞越水星，首次拍摄到约 45% 的表面，发现其微弱磁场。' },
      { year: '2011', title: '信使号进入轨道', text: '成为首个环绕水星的探测器，确认极区水冰并绘制完整表面图。' },
      { year: '2026', title: 'BepiColombo 接近目标', text: '欧日联合任务正在逐步减速，计划进入水星轨道，研究其内部与磁层。' }
    ]
  },

  venus: {
    id: 'venus', name: '金星', suffix: '逆向自转的岩质行星', en: 'VENUS', category: 'planet',
    categoryLabel: '类地行星', badge: 'TERRESTRIAL', index: 'PLANET—02',
    color: '#e2b477', detailColor: '#e7bd82',
    orbGradient: 'radial-gradient(circle at 33% 27%, #fff1c9 0%, #e9c386 34%, #a9773e 68%, #3b2814 100%)',
    size: 4.6, visualSize: 56, focusZoom: 2.7,
    physical: { a: 0.72333, e: 0.00677, i: 3.395, node: 76.681, peri: 131.533, M0: 50.447, periodDays: 224.701 },
    desc: '地球的“姊妹行星”，却被浓密的二氧化碳大气与硫酸云层包裹。失控温室效应让地表温度足以熔化铅，也让它在夜空中格外明亮。',
    tags: ['失控温室', '逆向自转', '表面 464 ℃'],
    base: [
      { label: '平均半径', value: '6,051.8 km', note: '0.949 × 地球' },
      { label: '质量', value: '4.867×10²⁴ kg', note: '0.815 × 地球' },
      { label: '公转周期', value: '224.70 天', note: '一个金星年' },
      { label: '自转周期', value: '−243.02 天', note: '逆向，慢于公转' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '0.723 AU' },
      { label: '轨道倾角', value: '3.39°' },
      { label: '离心率', value: '0.007' }
    ],
    diagram: { kind: 'orbit', angle: 4.35 },
    orbitNote: '金星轨道接近正圆。它以 243 个地球日逆向自转一周，因此一个金星日比一个金星年更长。',
    structure: {
      intro: '金星内部与地球相似，但厚重的大气彻底改写了它的命运。96.5% 的二氧化碳制造了太阳系最强的温室效应。',
      layers: [
        { label: '铁镍核心', pct: 31, color: '#b98546' },
        { label: '岩石地幔', pct: 54, color: '#8c5f32' },
        { label: '玄武岩地壳', pct: 15, color: '#5b3d21' }
      ],
      features: [
        { label: '大气', text: '96.5% CO₂、3.5% N₂，地表气压约为地球的 92 倍；云层由硫酸液滴构成。' },
        { label: '地表', text: '平均温度 464 ℃，超过 80% 的表面由火山玄武岩覆盖，分布着大量盾状火山与高原。' },
        { label: '自转', text: '自转方向与多数行星相反，可能与早期巨大撞击或大气潮汐作用有关。' }
      ]
    },
    exploration: [
      { year: '1970', title: '金星 7 号软着陆', text: '首个在另一颗行星表面成功通信的探测器，传回约 23 分钟数据。' },
      { year: '1990', title: '麦哲伦号测绘雷达', text: '以合成孔径雷达穿透云层，绘制了 98% 的金星表面。' },
      { year: '2010', title: '拂晓号长期观测', text: '日本拂晓号进入金星轨道，持续研究大气环流与硫酸云动力学。' }
    ]
  },

  earth: {
    id: 'earth', name: '地球', suffix: '人类的蓝色家园', en: 'EARTH', category: 'planet',
    categoryLabel: '类地行星', badge: 'TERRESTRIAL', index: 'PLANET—03',
    color: '#72b7e4', detailColor: '#79c4ef',
    orbGradient: 'radial-gradient(circle at 31% 28%, #e7fbff 0%, #78c7e8 24%, #287dbb 52%, #102d55 78%, #06111f 100%)',
    size: 4.8, visualSize: 58, focusZoom: 2.7, ring: false,
    physical: { a: 1.00000, e: 0.01671, i: 0.000, node: 0.0, peri: 102.947, M0: 357.517, periodDays: 365.256 },
    desc: '目前已知唯一孕育生命的行星。液态水海洋覆盖了七成表面，一层富含氧气的薄大气与磁场共同守护着这颗淡蓝色星球。',
    tags: ['宜居世界', '液态水海洋', '板块构造'],
    base: [
      { label: '平均半径', value: '6,371.0 km', note: '极半径 6,356.8 km' },
      { label: '质量', value: '5.972×10²⁴ kg', note: '1 个地球质量' },
      { label: '公转周期', value: '365.256 天', note: '一个恒星年' },
      { label: '自转周期', value: '23h 56m 04s', note: '一个恒星日' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '1.000 AU' },
      { label: '轨道倾角', value: '0.000°' },
      { label: '离心率', value: '0.017' }
    ],
    diagram: { kind: 'orbit', angle: 5.6 },
    orbitNote: '地球轨道定义黄道基准面。公转速度约 29.8 km/s，约 365.256 天绕太阳一周。',
    structure: {
      intro: '一个由金属核心、黏性岩石地幔和破碎板块组成的活跃世界。水、碳与氮在岩石—海洋—大气之间持续循环。',
      layers: [
        { label: '铁镍内核', pct: 19, color: '#e7c76f' },
        { label: '地幔', pct: 66, color: '#a56b46' },
        { label: '地壳与海洋', pct: 15, color: '#3d87ba' }
      ],
      features: [
        { label: '大气', text: '78% 氮、21% 氧、0.9% 氩，以及水汽和二氧化碳；平流层臭氧吸收紫外线。' },
        { label: '地表', text: '约 71% 被海洋覆盖，最高点珠峰 8,849 m；板块运动持续重塑大陆。' },
        { label: '磁场', text: '液态外核对流产生全球磁场，偏转太阳风并形成极光。' },
        { label: '卫星', text: '拥有唯一一颗天然卫星——月球，地月系统质心位于地表以下约 1,700 km。' }
      ]
    },
    relatedMoons: ['moon'],
    exploration: [
      { year: '1968', title: '阿波罗 8 号绕月', text: '人类首次离开地球轨道并拍摄“地球升起”，重新定义了家园的尺度。' },
      { year: '1990', title: '旅行者 1 号回望', text: '在 60 亿公里之外拍下“暗淡蓝点”，成为最具象征意义的地球影像。' },
      { year: '2018', title: '持续轨道观测', text: '数百颗对地观测卫星与空间站共同监测气候、海洋、冰盖与大气。' }
    ]
  },

  mars: {
    id: 'mars', name: '火星', suffix: '红色类地行星', en: 'MARS', category: 'planet',
    categoryLabel: '类地行星', badge: 'TERRESTRIAL', index: 'PLANET—04',
    color: '#d4775f', detailColor: '#df856c',
    orbGradient: 'radial-gradient(circle at 32% 28%, #ffd0b0 0%, #d7815f 30%, #96442f 62%, #34130d 100%)',
    size: 3.7, visualSize: 52, focusZoom: 2.9,
    physical: { a: 1.52368, e: 0.09340, i: 1.850, node: 49.579, peri: 336.041, M0: 19.412, periodDays: 686.980 },
    desc: '因表面氧化铁而呈现锈红色。火星拥有太阳系最高的火山、最长的峡谷和极冠水冰，也是人类探测器最密集的异星世界。',
    tags: ['奥林匹斯山', '水冰极冠', '古代河流'],
    base: [
      { label: '平均半径', value: '3,389.5 km', note: '0.532 × 地球' },
      { label: '质量', value: '6.417×10²³ kg', note: '0.107 × 地球' },
      { label: '公转周期', value: '686.98 天', note: '1.881 地球年' },
      { label: '自转周期', value: '24h 37m 22s', note: '与地球接近' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '1.524 AU' },
      { label: '轨道倾角', value: '1.85°' },
      { label: '离心率', value: '0.093' }
    ],
    diagram: { kind: 'orbit', angle: 0.55 },
    orbitNote: '火星轨道偏心率 0.093，南北半球季节长度差异明显；冲日时与地球距离可缩短至约 5,500 万 km。',
    structure: {
      intro: '火星内部早已冷却分异，地核富含硫。表面保存着河谷、三角洲与沉积岩层，证明远古曾有稳定液态水。',
      layers: [
        { label: '铁硫核心', pct: 27, color: '#c99668' },
        { label: '硅酸盐地幔', pct: 58, color: '#94553e' },
        { label: '富铁地壳', pct: 15, color: '#5e2d20' }
      ],
      features: [
        { label: '大气', text: '约 95% CO₂，平均气压仅 0.6% 地球；尘暴可在数周内覆盖整颗行星。' },
        { label: '地表', text: '奥林匹斯山高约 22 km；水手号峡谷绵延 4,000 km；极冠由水冰和干冰组成。' },
        { label: '内部', text: '2018 年 InSight 首次直接测量火星地震，揭示其地壳比预期更厚、地核为液态。' }
      ]
    },
    exploration: [
      { year: '1976', title: '海盗 1 号着陆', text: '首次成功在火星表面长期工作，并完成生命探测实验。' },
      { year: '2012', title: '好奇号登陆盖尔撞击坑', text: '确认古代淡水湖泊环境，发现有机分子与活跃的甲烷循环。' },
      { year: '2021', title: '毅力号与机智号', text: '在耶泽罗撞击坑采集岩芯样本，机智号完成另一颗行星上的首次动力飞行。' }
    ]
  },

  jupiter: {
    id: 'jupiter', name: '木星', suffix: '太阳系最大的气态巨行星', en: 'JUPITER', category: 'planet',
    categoryLabel: '气态巨行星', badge: 'GAS GIANT', index: 'PLANET—05',
    color: '#d8b18d', detailColor: '#ddb994',
    orbGradient: 'radial-gradient(circle at 30% 26%, #fff0d7 0%, #e7c7a4 26%, #b8805d 48%, #714731 68%, #241710 100%)',
    size: 11.4, visualSize: 76, focusZoom: 2.3, ring: true, ringColor: '#a99780',
    physical: { a: 5.20260, e: 0.04839, i: 1.303, node: 100.556, peri: 14.754, M0: 19.650, periodDays: 4332.589 },
    desc: '一颗由氢和氦主导的巨行星，质量是其余七颗行星总和的 2.5 倍。大红斑、极光和四颗伽利略卫星构成了一个微缩太阳系。',
    tags: ['大红斑', '95 颗卫星', '最强磁场'],
    base: [
      { label: '赤道半径', value: '71,492 km', note: '11.2 × 地球' },
      { label: '质量', value: '1.898×10²⁷ kg', note: '317.8 × 地球' },
      { label: '公转周期', value: '11.86 年', note: '约 4,333 天' },
      { label: '自转周期', value: '9h 55m 30s', note: '太阳系最快' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '5.203 AU' },
      { label: '轨道倾角', value: '1.30°' },
      { label: '离心率', value: '0.048' }
    ],
    diagram: { kind: 'orbit', angle: 2.2 },
    orbitNote: '木星与太阳的引力共同塑造了主小行星带结构，其拉格朗日点聚集着大量特洛伊小行星。',
    structure: {
      intro: '木星没有明确表面，大气向下逐渐过渡为液态金属氢与岩冰核心。强大的快速自转把云层拉成明暗相间的条带。',
      layers: [
        { label: '氢氦大气', pct: 18, color: '#d8bca2' },
        { label: '液态氢层', pct: 48, color: '#a9876c' },
        { label: '金属氢层', pct: 28, color: '#726156' },
        { label: '岩冰核心', pct: 6, color: '#3d3833' }
      ],
      features: [
        { label: '大气', text: '约 90% 氢、10% 氦，含氨、甲烷、硫化氢与水；东西向急流速度可超过 500 km/h。' },
        { label: '大红斑', text: '一个持续数百年的反气旋风暴，直径仍大于地球；2010 年代以来持续收缩变形。' },
        { label: '磁场', text: '磁场强度约为地球的 20,000 倍，磁层延伸至土星轨道附近，两极极光极其明亮。' },
        { label: '环系', text: '由尘埃组成的暗弱环，主要来自小卫星撞击碎屑，直到旅行者 1 号飞掠才被确认。' }
      ]
    },
    relatedMoons: ['io', 'europa', 'ganymede', 'callisto'],
    exploration: [
      { year: '1979', title: '旅行者 1 号揭示光环', text: '首次发现木星暗淡的尘埃环、极区极光与木卫一活火山。' },
      { year: '1995', title: '伽利略号进入轨道', text: '成为首个木星轨道器，投放大气探针并详细研究伽利略卫星。' },
      { year: '2016', title: '朱诺号抵达', text: '沿极轨穿越辐射带，测量木星内部结构、重力场与极区风暴。' },
      { year: '2031', title: 'JUICE 计划抵达', text: '欧空局木星冰卫星探测器将重点研究木卫三、木卫四与木卫二。' }
    ]
  },

  saturn: {
    id: 'saturn', name: '土星', suffix: '拥有壮观光环的行星', en: 'SATURN', category: 'planet',
    categoryLabel: '气态巨行星', badge: 'GAS GIANT', index: 'PLANET—06',
    color: '#e0c99a', detailColor: '#e6d1a4',
    orbGradient: 'radial-gradient(circle at 30% 26%, #fff7dc 0%, #efdcad 28%, #c3a26b 52%, #8a6b42 72%, #2e2417 100%)',
    size: 9.6, visualSize: 74, focusZoom: 2.5, ring: true, ringColor: '#d9c49a',
    physical: { a: 9.55491, e: 0.05415, i: 2.489, node: 113.715, peri: 92.432, M0: 317.020, periodDays: 10759.22 },
    desc: '太阳系中最轻的行星，平均密度甚至低于水。宽阔的主环由无数冰粒组成，卡西尼缝与细密环纹让它成为最优雅的世界。',
    tags: ['壮丽环系', '146 颗卫星', '密度最低'],
    base: [
      { label: '赤道半径', value: '60,268 km', note: '9.45 × 地球' },
      { label: '质量', value: '5.683×10²⁶ kg', note: '95.2 × 地球' },
      { label: '公转周期', value: '29.45 年', note: '约 10,759 天' },
      { label: '自转周期', value: '10h 33m 38s', note: '差动自转' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '9.555 AU' },
      { label: '轨道倾角', value: '2.49°' },
      { label: '离心率', value: '0.054' }
    ],
    diagram: { kind: 'orbit', angle: 3.7 },
    orbitNote: '土星轨道周期约 29.45 年；赤道面与轨道面夹角 26.7°，因此从地球看环系张角会周期性变化。',
    structure: {
      intro: '土星的大气以氢氦为主，云顶之下没有固体边界。环系从约 66,900 km 延伸至 480,000 km，却平均只有数十米厚。',
      layers: [
        { label: '氢氦大气', pct: 20, color: '#ead7aa' },
        { label: '液态氢层', pct: 50, color: '#bda477' },
        { label: '金属氢层', pct: 24, color: '#81715a' },
        { label: '岩冰核心', pct: 6, color: '#423c33' }
      ],
      features: [
        { label: '大气', text: '以氢氦为主，云顶温度约 −178 ℃。北极存在稳定的六边形急流，边长约 14,500 km。' },
        { label: '环系', text: '主环分为 C、B、A 环，卡西尼缝宽约 4,800 km；冰粒尺寸从微米到数米不等。' },
        { label: '卫星', text: '已确认 146 颗卫星。泰坦拥有浓厚氮大气与甲烷湖海，土卫二南极喷射水汽羽流。' },
        { label: '季节', text: '一个土星年相当于 29.5 个地球年，每个季节持续约七年。' }
      ]
    },
    relatedMoons: ['titan', 'enceladus'],
    relatedRings: ['ring-saturn'],
    exploration: [
      { year: '1980', title: '旅行者 1 号飞掠', text: '首次近距离拍摄环系细节，发现土卫六浓厚大气与环中的“辐条”。' },
      { year: '2004', title: '卡西尼号进入轨道', text: '在土星系统工作 13 年，发现土卫二羽流、绘制环系并研究季节变化。' },
      { year: '2005', title: '惠更斯登陆泰坦', text: '人类首次在太阳系外侧天体表面软着陆，传回泰坦地表与大气数据。' },
      { year: '2017', title: '壮丽终章', text: '卡西尼号主动坠入土星大气，结束任务以避免污染可能宜居的卫星。' }
    ]
  },

  uranus: {
    id: 'uranus', name: '天王星', suffix: '侧躺自转的冰巨行星', en: 'URANUS', category: 'planet',
    categoryLabel: '冰巨行星', badge: 'ICE GIANT', index: 'PLANET—07',
    color: '#9fd5d6', detailColor: '#a9e0e0',
    orbGradient: 'radial-gradient(circle at 31% 27%, #e6ffff 0%, #b8e7e6 29%, #71b9bf 59%, #2f6772 82%, #10252d 100%)',
    size: 7.4, visualSize: 62, focusZoom: 2.6, ring: true, ringColor: '#a6c9ce',
    physical: { a: 19.21845, e: 0.04717, i: 0.773, node: 74.230, peri: 170.964, M0: 142.238, periodDays: 30688.5 },
    desc: '太阳系中唯一“侧躺”自转的行星。自转轴倾角接近 98°，导致它每 42 年经历一次极端极昼与极夜。淡青色来自大气中的甲烷。',
    tags: ['98° 轴倾角', '冰巨行星', '13 道窄环'],
    base: [
      { label: '赤道半径', value: '25,559 km', note: '4.01 × 地球' },
      { label: '质量', value: '8.681×10²⁵ kg', note: '14.5 × 地球' },
      { label: '公转周期', value: '84.01 年', note: '约 30,689 天' },
      { label: '自转周期', value: '−17h 14m', note: '逆向自转' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '19.218 AU' },
      { label: '轨道倾角', value: '0.77°' },
      { label: '离心率', value: '0.047' }
    ],
    diagram: { kind: 'orbit', angle: 5.1 },
    orbitNote: '天王星自转轴倾斜 97.8°，几乎与轨道面平行，可能源于太阳系早期的一次巨大撞击。',
    structure: {
      intro: '天王星内部常被称为“冰”巨行星，实际上由水、氨和甲烷组成的高温高压流体层构成，而不是固体冰。',
      layers: [
        { label: '氢氦大气', pct: 16, color: '#c6eceb' },
        { label: '冰幔流体', pct: 62, color: '#7fbac0' },
        { label: '岩石核心', pct: 22, color: '#456c77' }
      ],
      features: [
        { label: '大气', text: '氢 83%、氦 15%、甲烷 2.3%。甲烷吸收红光，使行星呈现青蓝色。' },
        { label: '极端季节', text: '极区可连续 42 年处在阳光中，然后进入 42 年长夜；大气中曾观测到短暂亮斑。' },
        { label: '环系', text: '13 道已知窄环，主要由深色颗粒组成。ε 环最亮，宽度仅约 20–100 km。' },
        { label: '卫星', text: '28 颗卫星，多以莎士比亚与蒲柏作品中的人物命名；天卫三、天卫四为最大两颗，天卫一最明亮。' }
      ]
    },
    relatedMoons: ['ariel', 'titania'],
    relatedRings: ['ring-uranus'],
    exploration: [
      { year: '1781', title: '赫歇尔发现天王星', text: '威廉·赫歇尔用望远镜发现这颗行星，首次扩展了人类已知的太阳系边界。' },
      { year: '1977', title: '掩星发现环系', text: '天文学家在恒星掩星观测中发现天王星环，这是继土星后首次发现的行星环。' },
      { year: '1986', title: '旅行者 2 号飞掠', text: '唯一一次近距离探访，发现 10 颗新卫星、磁场异常并拍摄了暗淡的环系。' }
    ]
  },

  neptune: {
    id: 'neptune', name: '海王星', suffix: '太阳系最外侧的行星', en: 'NEPTUNE', category: 'planet',
    categoryLabel: '冰巨行星', badge: 'ICE GIANT', index: 'PLANET—08',
    color: '#6f9beb', detailColor: '#82aaf0',
    orbGradient: 'radial-gradient(circle at 31% 27%, #dfeaff 0%, #8db2f0 27%, #3f6bc8 58%, #1b3475 82%, #081329 100%)',
    size: 7.1, visualSize: 60, focusZoom: 2.6, ring: true, ringColor: '#7e98c9',
    physical: { a: 30.11039, e: 0.00859, i: 1.770, node: 131.722, peri: 44.971, M0: 259.909, periodDays: 60182.0 },
    desc: '遥远、幽蓝而风暴猛烈。海王星拥有太阳系最快的风，风速可超过 2,100 km/h；它的发现来自数学预测，而非偶然的望远镜巡天。',
    tags: ['超音速风暴', '数学发现', '弧段环'],
    base: [
      { label: '赤道半径', value: '24,764 km', note: '3.88 × 地球' },
      { label: '质量', value: '1.024×10²⁶ kg', note: '17.1 × 地球' },
      { label: '公转周期', value: '164.8 年', note: '约 60,182 天' },
      { label: '自转周期', value: '16h 06m', note: '快速自转' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '30.110 AU' },
      { label: '轨道倾角', value: '1.77°' },
      { label: '离心率', value: '0.009' }
    ],
    diagram: { kind: 'orbit', angle: 2.55 },
    orbitNote: '海王星轨道接近正圆。由于距太阳平均 45 亿 km，它接收的阳光只有地球的约 1/900。',
    structure: {
      intro: '海王星与天王星结构相似，但内部热流更强，驱动着太阳系最猛烈的天气系统。',
      layers: [
        { label: '氢氦大气', pct: 17, color: '#abc5f6' },
        { label: '水氨冰幔', pct: 60, color: '#557fd3' },
        { label: '岩石核心', pct: 23, color: '#2c4a91' }
      ],
      features: [
        { label: '大气', text: '氢 80%、氦 19%、甲烷 1.5%。甲烷与少量未知物质共同形成深蓝色调。' },
        { label: '风暴', text: '1989 年旅行者 2 号拍摄到大暗斑；后续哈勃观测到暗斑生灭与高速风带。' },
        { label: '环系', text: '5 道主要环，其中亚当斯环包含亮弧段，颗粒受海卫一引力约束成团。' },
        { label: '卫星', text: '16 颗已知卫星。海卫一是唯一大型逆行卫星，可能是被捕获的柯伊伯带天体。' }
      ]
    },
    relatedMoons: ['triton'],
    relatedRings: ['ring-neptune'],
    exploration: [
      { year: '1846', title: '笔尖上的发现', text: '勒维耶根据天王星轨道摄动计算位置，伽勒在当晚找到海王星。' },
      { year: '1989', title: '旅行者 2 号飞掠', text: '唯一一次近距离探访，发现大暗斑、超音速风和海卫一冰火山。' },
      { year: '2019', title: '暗斑新生与消亡', text: '哈勃首次记录到海王星暗斑的形成、漂移与消散全过程。' }
    ]
  },

  moon: {
    id: 'moon', name: '月球', suffix: '地球唯一天然卫星', en: 'MOON', category: 'moon',
    categoryLabel: '天然卫星 · 地月系', badge: 'EARTH I', index: 'MOON—01',
    color: '#c7c2b7', detailColor: '#d3cec2',
    orbGradient: 'radial-gradient(circle at 35% 30%, #f2ede2 0%, #b9b3a7 38%, #766f64 70%, #292620 100%)',
    size: 2.2, visualSize: 46, focusZoom: 4.4,
    host: 'earth', moonOrbit: { distance: 17, periodDays: 27.322, phase: 0.7 },
    desc: '地球潮汐的塑造者，也是人类唯一踏足过的地外天体。它被潮汐锁定，永远以同一面朝向地球，背面则保存着更完整的地质记录。',
    tags: ['潮汐锁定', '阿波罗登陆', '45.1 亿年'],
    base: [
      { label: '平均半径', value: '1,737.4 km', note: '0.273 × 地球' },
      { label: '质量', value: '7.342×10²² kg', note: '0.0123 × 地球' },
      { label: '公转周期', value: '27.322 天', note: '恒星月' },
      { label: '自转周期', value: '27.322 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '384,400 km' },
      { label: '轨道倾角', value: '5.15°' },
      { label: '离心率', value: '0.055' }
    ],
    diagram: { kind: 'moon', hostId: 'earth', angle: 2.0 },
    orbitNote: '月球每年远离地球约 3.8 cm。它的引力稳定了地球自转轴倾角，也制造了海洋潮汐。',
    structure: {
      intro: '月球有一个小铁核、厚实的硅酸盐地幔和富含斜长石的浅色高地。正面的大型月海由玄武岩熔岩填充。',
      layers: [
        { label: '铁核', pct: 20, color: '#b7a179' },
        { label: '硅酸盐地幔', pct: 60, color: '#8b8479' },
        { label: '月壳', pct: 20, color: '#5e5b53' }
      ],
      features: [
        { label: '地表', text: '正面月海占约 31%，背面仅约 2%；南极—艾特肯盆地直径约 2,500 km。' },
        { label: '大气', text: '几乎没有大气，仅有极稀薄的钠、氦、氢散逸层，昼夜温差约 300 ℃。' },
        { label: '水冰', text: '极区永久阴影坑内已确认水冰存在，是未来月面基地的重要资源。' },
        { label: '潮汐', text: '月球引力与太阳引力共同形成地球潮汐，并因潮汐摩擦使地球自转逐渐变慢。' }
      ]
    },
    exploration: [
      { year: '1969', title: '阿波罗 11 号登陆', text: '阿姆斯特朗与奥尔德林在静海着陆，人类首次踏足另一个天体。' },
      { year: '2019', title: '嫦娥四号登陆月背', text: '人类首次在月球背面软着陆，玉兔二号开展长期巡视。' },
      { year: '2024', title: '嫦娥六号采样返回', text: '从月球背面南极—艾特肯盆地采集样品并带回地球。' }
    ]
  },

  io: {
    id: 'io', name: '木卫一', suffix: '太阳系火山活动最剧烈的世界', en: 'IO', category: 'moon',
    categoryLabel: '伽利略卫星', badge: 'JUPITER I', index: 'MOON—02',
    color: '#e5cc66', detailColor: '#e7d16e',
    orbGradient: 'radial-gradient(circle at 34% 30%, #fff9c5 0%, #eadb79 33%, #b99c35 65%, #574613 100%)',
    size: 1.8, visualSize: 38, focusZoom: 5.2,
    host: 'jupiter', moonOrbit: { distance: 18, periodDays: 1.769, phase: 0.2 },
    desc: '被木星潮汐力反复揉搓的火山世界。表面覆盖硫与二氧化硫霜，数百座火山不断喷发，羽流可高达数百公里。',
    tags: ['潮汐加热', '400+ 活火山', '硫磺地表'],
    base: [
      { label: '平均半径', value: '1,821.6 km', note: '略大于月球' },
      { label: '质量', value: '8.932×10²² kg', note: '1.22 × 月球' },
      { label: '公转周期', value: '1.769 天', note: '木星内侧伽利略卫星' },
      { label: '自转周期', value: '1.769 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '421,700 km' },
      { label: '轨道倾角', value: '0.05°' },
      { label: '离心率', value: '0.004' }
    ],
    diagram: { kind: 'moon', hostId: 'jupiter', angle: 4.4 },
    orbitNote: '木卫一处于 1:2:4 轨道共振链中，轨道离心率被持续“搅动”，潮汐加热使其内部保持熔融。',
    structure: {
      intro: '一个被潮汐能加热的岩石世界。硅酸盐地幔之下可能存在全球岩浆海洋，表面几乎没有撞击坑。',
      layers: [
        { label: '铁核', pct: 22, color: '#c59c53' },
        { label: '岩浆地幔', pct: 58, color: '#e2b947' },
        { label: '硫磺地壳', pct: 20, color: '#9a7b27' }
      ],
      features: [
        { label: '火山', text: '洛基火山口直径约 200 km，喷发功率可达数十太瓦；普洛米修斯羽流高度超过 100 km。' },
        { label: '大气', text: '极稀薄的二氧化硫、氯化钠与原子氧，随火山活动不断补充。' },
        { label: '极光', text: '木星磁场与木卫一大气相互作用，在木星极区形成明亮的极光足迹。' }
      ]
    },
    exploration: [
      { year: '1610', title: '伽利略发现四卫', text: '伽利略用望远镜发现木卫一至木卫四，为日心说提供了关键证据。' },
      { year: '1979', title: '旅行者 1 号发现火山', text: '首次在另一颗天体上观测到活跃火山喷发。' },
      { year: '1999', title: '伽利略号近距离飞掠', text: '多次穿越木卫一附近，测量火山温度与磁场相互作用。' }
    ]
  },

  europa: {
    id: 'europa', name: '木卫二', suffix: '冰壳下的海洋世界', en: 'EUROPA', category: 'moon',
    categoryLabel: '伽利略卫星', badge: 'JUPITER II', index: 'MOON—03',
    color: '#c9bea6', detailColor: '#d5cab4',
    orbGradient: 'radial-gradient(circle at 33% 29%, #fffdf0 0%, #dbd0b9 34%, #9f9179 65%, #443d31 100%)',
    size: 1.7, visualSize: 38, focusZoom: 5.2,
    host: 'jupiter', moonOrbit: { distance: 22, periodDays: 3.551, phase: 2.2 },
    desc: '光滑的冰壳下隐藏着一片全球性液态海洋，含水量约为地球海洋的两倍。纵横交错的红褐色裂纹让这颗卫星成为寻找地外生命的热点。',
    tags: ['地下海洋', '冰壳', '潜在宜居'],
    base: [
      { label: '平均半径', value: '1,560.8 km', note: '0.90 × 月球' },
      { label: '质量', value: '4.800×10²² kg', note: '0.65 × 月球' },
      { label: '公转周期', value: '3.551 天', note: '与木星潮汐锁定' },
      { label: '自转周期', value: '3.551 天', note: '同步自转' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '671,034 km' },
      { label: '轨道倾角', value: '0.47°' },
      { label: '离心率', value: '0.009' }
    ],
    diagram: { kind: 'moon', hostId: 'jupiter', angle: 1.1 },
    orbitNote: '木卫二轨道略微偏心，木星潮汐力使冰壳反复形变，为地下海洋提供持续能量。',
    structure: {
      intro: '一个分化完全的岩石—金属世界，外部被约 15–25 km 厚的冰壳包裹，下方可能存在 60–150 km 深的液态水海洋。',
      layers: [
        { label: '岩石核心', pct: 55, color: '#9c8b73' },
        { label: '液态海洋', pct: 25, color: '#79a8b9' },
        { label: '冰壳', pct: 20, color: '#d8d1c3' }
      ],
      features: [
        { label: '冰壳', text: '表面非常年轻，撞击坑稀少；线状裂纹与混沌地形指示冰壳曾发生移动和再冻结。' },
        { label: '海洋', text: '盐度可能接近地球海洋，与岩石海底接触，具备水—岩反应提供的化学能。' },
        { label: '羽流', text: '哈勃曾探测到疑似水汽羽流；若被证实，将为了解海洋成分提供直接样本。' }
      ]
    },
    exploration: [
      { year: '1979', title: '旅行者号拍摄裂纹', text: '旅行者 2 号拍摄到复杂线状地形，首次暗示冰壳下可能存在流动物质。' },
      { year: '1997', title: '伽利略号确认海洋', text: '磁场与表面形变数据支持全球性导电海洋的存在。' },
      { year: '2030', title: '欧罗巴快船抵达', text: 'NASA 欧罗巴快船计划 2030 年抵达，将对冰壳与海洋宜居性进行详细评估。' }
    ]
  },

  ganymede: {
    id: 'ganymede', name: '木卫三', suffix: '太阳系最大的卫星', en: 'GANYMEDE', category: 'moon',
    categoryLabel: '伽利略卫星', badge: 'JUPITER III', index: 'MOON—04',
    color: '#b6a993', detailColor: '#c5b8a2',
    orbGradient: 'radial-gradient(circle at 33% 29%, #f6efe0 0%, #c6b9a5 34%, #8d7f6b 66%, #373129 100%)',
    size: 2.3, visualSize: 44, focusZoom: 4.8,
    host: 'jupiter', moonOrbit: { distance: 28, periodDays: 7.155, phase: 4.5 },
    desc: '太阳系中最大的卫星，直径甚至超过水星。它是唯一已知拥有自身磁场的卫星，冰壳之下很可能也存在咸水海洋。',
    tags: ['最大卫星', '自身磁场', '地下海洋'],
    base: [
      { label: '平均半径', value: '2,634.1 km', note: '0.41 × 地球' },
      { label: '质量', value: '1.482×10²³ kg', note: '2.02 × 月球' },
      { label: '公转周期', value: '7.155 天', note: '木星第三颗伽利略卫星' },
      { label: '自转周期', value: '7.155 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '1,070,412 km' },
      { label: '轨道倾角', value: '0.20°' },
      { label: '离心率', value: '0.001' }
    ],
    diagram: { kind: 'moon', hostId: 'jupiter', angle: 5.5 },
    orbitNote: '木卫三参与 1:2:4 拉普拉斯共振，与木卫一、木卫二形成稳定的周期锁定。',
    structure: {
      intro: '一个由岩石核心、冰质地幔与厚冰壳组成的分化世界。其内部海洋可能夹在高压冰层之间。',
      layers: [
        { label: '铁核', pct: 22, color: '#b39b7d' },
        { label: '岩石地幔', pct: 40, color: '#8d7b67' },
        { label: '冰层与海洋', pct: 38, color: '#b8c4c4' }
      ],
      features: [
        { label: '地表', text: '古老暗区与较年轻的亮纹地形交错，说明冰壳曾经历构造运动。' },
        { label: '磁场', text: '拥有内生偶极磁场，并在木星磁场中产生极光；这也是推断地下海洋的重要线索。' },
        { label: '大气', text: '极稀薄的氧气散逸层，可能来自冰面受辐射分解产生。' }
      ]
    },
    exploration: [
      { year: '1610', title: '伽利略发现', text: '与木卫一、木卫二、木卫四一同被发现，是最早被确认的卫星系统。' },
      { year: '1996', title: '伽利略号发现磁场', text: '首次确认卫星拥有自身磁场，并拍摄到表面详细结构。' },
      { year: '2034', title: 'JUICE 环绕木卫三', text: '欧空局 JUICE 计划进入木卫三轨道，成为首个环绕地球以外卫星的探测器。' }
    ]
  },

  callisto: {
    id: 'callisto', name: '木卫四', suffix: '布满古老撞击坑的卫星', en: 'CALLISTO', category: 'moon',
    categoryLabel: '伽利略卫星', badge: 'JUPITER IV', index: 'MOON—05',
    color: '#8f8779', detailColor: '#a39a8b',
    orbGradient: 'radial-gradient(circle at 34% 30%, #d7d0c1 0%, #8e877a 38%, #5c564d 68%, #211f1b 100%)',
    size: 2.1, visualSize: 42, focusZoom: 4.8,
    host: 'jupiter', moonOrbit: { distance: 35, periodDays: 16.689, phase: 5.8 },
    desc: '太阳系中撞击坑最密集的天体之一，表面已经约四十亿年没有被地质活动改写。它是研究早期太阳系撞击历史的天然档案。',
    tags: ['撞击坑档案', '古老地表', '潜在地下海洋'],
    base: [
      { label: '平均半径', value: '2,410.3 km', note: '0.378 × 地球' },
      { label: '质量', value: '1.076×10²³ kg', note: '1.47 × 月球' },
      { label: '公转周期', value: '16.689 天', note: '木星最外侧伽利略卫星' },
      { label: '自转周期', value: '16.689 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '1,882,709 km' },
      { label: '轨道倾角', value: '0.19°' },
      { label: '离心率', value: '0.007' }
    ],
    diagram: { kind: 'moon', hostId: 'jupiter', angle: 0.4 },
    orbitNote: '木卫四位于木星主要辐射带之外，是未来载人木星系统任务相对温和的潜在中转站。',
    structure: {
      intro: '约一半为岩石、一半为冰的分化程度较低的世界。内部可能仍保留未完全分异的原始物质。',
      layers: [
        { label: '岩石—冰核', pct: 55, color: '#827567' },
        { label: '冰质地幔', pct: 30, color: '#a39b8d' },
        { label: '古老冰壳', pct: 15, color: '#6e685e' }
      ],
      features: [
        { label: '地表', text: '瓦尔哈拉多环盆地直径约 3,800 km，是太阳系最大撞击构造之一。' },
        { label: '大气', text: '极稀薄的二氧化碳与氧气散逸层，由太阳风与辐射作用于冰面产生。' },
        { label: '海洋', text: '伽利略号磁场数据暗示冰壳下可能存在导电层，但证据不如木卫二充分。' }
      ]
    },
    exploration: [
      { year: '1610', title: '伽利略发现', text: '作为四颗伽利略卫星中最外侧的一颗被记录。' },
      { year: '1997', title: '伽利略号近距离测绘', text: '多次飞掠拍摄高分辨率影像，并发现可能的内部导电层。' },
      { year: '2030s', title: 'JUICE 多次飞掠', text: 'JUICE 将对木卫四进行多次近距离探测，评估其内部结构与宜居性。' }
    ]
  },

  titan: {
    id: 'titan', name: '土卫六', suffix: '拥有浓厚大气的橙色卫星', en: 'TITAN', category: 'moon',
    categoryLabel: '土星卫星群', badge: 'SATURN VI', index: 'MOON—06',
    color: '#e0a95e', detailColor: '#e6b66c',
    orbGradient: 'radial-gradient(circle at 34% 30%, #ffe6ae 0%, #e0a95e 37%, #a56a2d 68%, #3b2410 100%)',
    size: 2.5, visualSize: 46, focusZoom: 4.5,
    host: 'saturn', moonOrbit: { distance: 34, periodDays: 15.945, phase: 1.6 },
    desc: '太阳系中唯一拥有浓厚大气的卫星，也是除地球外唯一表面存在稳定液体的世界。甲烷和乙烷构成湖泊、河流与降雨。',
    tags: ['浓厚氮大气', '甲烷湖海', '惠更斯登陆'],
    base: [
      { label: '平均半径', value: '2,574.7 km', note: '0.404 × 地球' },
      { label: '质量', value: '1.345×10²³ kg', note: '1.83 × 月球' },
      { label: '公转周期', value: '15.945 天', note: '土星最大卫星' },
      { label: '自转周期', value: '15.945 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '1,221,870 km' },
      { label: '轨道倾角', value: '0.35°' },
      { label: '离心率', value: '0.029' }
    ],
    diagram: { kind: 'moon', hostId: 'saturn', angle: 3.1 },
    orbitNote: '泰坦轨道偏心率为 0.029，与土星环系外侧的共振结构共同影响其长期演化。',
    structure: {
      intro: '一个冰岩世界，表面温度约 −179 ℃。厚厚的氮气大气与甲烷循环，使它成为研究行星气候与生命化学的天然实验室。',
      layers: [
        { label: '岩石核心', pct: 48, color: '#a27643' },
        { label: '高压冰层', pct: 30, color: '#c49a63' },
        { label: '甲烷地壳', pct: 22, color: '#e0b875' }
      ],
      features: [
        { label: '大气', text: '约 95% 氮、5% 甲烷，地表气压是地球的 1.45 倍，橙色雾霾由有机气溶胶组成。' },
        { label: '地表', text: '北极分布着克拉肯海、丽姬亚海等液态甲烷—乙烷水域，南极有干涸湖床。' },
        { label: '气候', text: '存在甲烷云、降雨与沙尘风暴；大气环流呈现与地球相似的全球翻转模式。' }
      ]
    },
    exploration: [
      { year: '1655', title: '惠更斯发现泰坦', text: '克里斯蒂安·惠更斯发现土星最大卫星，并记录其橙色外观。' },
      { year: '2005', title: '惠更斯号登陆', text: '卡西尼任务释放的惠更斯号在泰坦表面着陆，首次传回外侧卫星地表影像。' },
      { year: '2028', title: '蜻蜓号启程', text: 'NASA 蜻蜓号核动力旋翼机计划飞往泰坦，在多个地点寻找生命前化学证据。' }
    ]
  },

  enceladus: {
    id: 'enceladus', name: '土卫二', suffix: '喷射冰羽的海洋卫星', en: 'ENCELADUS', category: 'moon',
    categoryLabel: '土星卫星群', badge: 'SATURN II', index: 'MOON—07',
    color: '#e9f1ee', detailColor: '#e9f3f0',
    orbGradient: 'radial-gradient(circle at 34% 30%, #ffffff 0%, #e4eeeb 38%, #b8cbc7 68%, #53625f 100%)',
    size: 1.3, visualSize: 34, focusZoom: 5.5,
    host: 'saturn', moonOrbit: { distance: 24, periodDays: 1.370, phase: 4.0 },
    desc: '一颗雪白的小卫星，南极裂纹不断向太空喷射水汽与冰粒。这些羽流补给土星的 E 环，也让土卫二成为寻找生命化学的重要目标。',
    tags: ['冰羽喷发', '地下海洋', 'E 环源头'],
    base: [
      { label: '平均半径', value: '252.1 km', note: '0.0395 × 地球' },
      { label: '质量', value: '1.080×10²⁰ kg', note: '1.80×10⁻⁵ 地球' },
      { label: '公转周期', value: '1.370 天', note: '土星 E 环轨道' },
      { label: '自转周期', value: '1.370 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '238,040 km' },
      { label: '轨道倾角', value: '0.009°' },
      { label: '离心率', value: '0.005' }
    ],
    diagram: { kind: 'moon', hostId: 'saturn', angle: 0.6 },
    orbitNote: '土卫二与土卫四存在 1:2 轨道共振，潮汐力维持了其内部热量与南极羽流活动。',
    structure: {
      intro: '冰壳之下是一个全球性液态海洋，海底可能存在热液活动。羽流中的盐与有机分子为研究海洋成分提供了直接样本。',
      layers: [
        { label: '岩石核心', pct: 44, color: '#aebbb7' },
        { label: '液态海洋', pct: 38, color: '#86b9c4' },
        { label: '冰壳', pct: 18, color: '#e5eae7' }
      ],
      features: [
        { label: '羽流', text: '南极虎纹裂缝喷出的水汽羽流含盐、二氧化硅与有机分子，部分冰粒逃逸补给 E 环。' },
        { label: '地表', text: '反照率接近 1，是太阳系最反射阳光的表面之一；南极年龄可能不足一亿年。' },
        { label: '海洋', text: '卡西尼号重力与热辐射数据表明，南极下方存在局部或全球性的液态水层。' }
      ]
    },
    exploration: [
      { year: '1789', title: '赫歇尔发现', text: '威廉·赫歇尔记录到土星第二颗已知卫星。' },
      { year: '2005', title: '卡西尼发现羽流', text: '首次观测到南极冰羽，并穿越羽流进行采样分析。' },
      { year: '2017', title: '确认海底热液线索', text: '羽流中的纳米二氧化硅颗粒指示海底热液活动，强化了宜居性讨论。' }
    ]
  },

  ariel: {
    id: 'ariel', name: '天卫一', suffix: '天王星最明亮的卫星', en: 'ARIEL', category: 'moon',
    categoryLabel: '冰巨星卫星', badge: 'URANUS I', index: 'MOON—08',
    color: '#c0c3c1', detailColor: '#cbd0cd',
    orbGradient: 'radial-gradient(circle at 34% 30%, #e7e9e7 0%, #bcc1bf 37%, #858b89 68%, #2f3231 100%)',
    size: 1.6, visualSize: 35, focusZoom: 5.0,
    host: 'uranus', moonOrbit: { distance: 15, periodDays: 2.520, phase: 4.8 },
    desc: '天王星第四大卫星，也是冰卫星中最明亮的一颗。表面纵横的峡谷与年轻的平原暗示，它曾被潮汐加热重塑，地下可能仍残留薄层液态水。',
    tags: ['天王星最亮卫星', '峡谷地貌', '潮汐加热'],
    base: [
      { label: '平均半径', value: '578.9 km', note: '0.091 × 地球' },
      { label: '质量', value: '1.251×10²¹ kg', note: '0.017 × 月球' },
      { label: '公转周期', value: '2.520 天', note: '天王星第四大卫星' },
      { label: '自转周期', value: '2.520 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '190,900 km' },
      { label: '轨道倾角', value: '0.26°' },
      { label: '离心率', value: '0.001' }
    ],
    diagram: { kind: 'moon', hostId: 'uranus', angle: 4.7 },
    orbitNote: '天卫一运行在天王星赤道面附近。由于天王星几乎侧躺，从地球视角看，它的卫星轨道会呈现接近竖直的朝向。',
    structure: {
      intro: '约三分之二为冰、三分之一为岩石的分化世界。表面既有古老撞击坑，也有明显较年轻的峡谷与流状地形。',
      layers: [
        { label: '岩石核心', pct: 48, color: '#969b98' },
        { label: '冰质地幔', pct: 38, color: '#b3b8b5' },
        { label: '冰壳', pct: 14, color: '#cdd1ce' }
      ],
      features: [
        { label: '地表', text: '卡恰峡谷系统纵横交错，谷底分布着可能由冰火山或构造运动形成的年轻平原。' },
        { label: '内部', text: '潮汐加热可能曾使其冰壳变薄，形成地下海洋；目前是否仍有液态水尚无定论。' },
        { label: '观测', text: '旅行者 2 号在 1986 年拍摄到其南半球约 35% 的表面细节，其余仍需新任务补全。' }
      ]
    },
    exploration: [
      { year: '1851', title: '拉塞尔发现', text: '威廉·拉塞尔发现天卫一与天卫二，扩展了当时已知的天王星系统。' },
      { year: '1986', title: '旅行者 2 号飞掠', text: '唯一一次近距离探测，拍摄到峡谷与撞击坑并存的地貌。' },
      { year: '未来', title: '天王星系统任务', text: '多个天王星轨道器提案将天卫一列为重点观测目标，以寻找残余海洋的证据。' }
    ]
  },

  titania: {
    id: 'titania', name: '天卫三', suffix: '天王星最大的卫星', en: 'TITANIA', category: 'moon',
    categoryLabel: '冰巨星卫星', badge: 'URANUS III', index: 'MOON—09',
    color: '#b8b4ac', detailColor: '#c3beb5',
    orbGradient: 'radial-gradient(circle at 34% 30%, #dedad2 0%, #b3afa7 37%, #7c7972 68%, #2d2c29 100%)',
    size: 1.7, visualSize: 36, focusZoom: 5.0,
    host: 'uranus', moonOrbit: { distance: 21, periodDays: 8.706, phase: 2.8 },
    desc: '天王星最大的卫星，表面交错的峡谷与撞击坑记录着早期地质活动。它可能曾拥有内部海洋，如今大部分已冻结。',
    tags: ['天王星最大卫星', '峡谷地形', '冰岩世界'],
    base: [
      { label: '平均半径', value: '788.4 km', note: '0.123 × 地球' },
      { label: '质量', value: '3.400×10²¹ kg', note: '0.046 × 月球' },
      { label: '公转周期', value: '8.706 天', note: '天王星第三颗卫星' },
      { label: '自转周期', value: '8.706 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '435,910 km' },
      { label: '轨道倾角', value: '0.34°' },
      { label: '离心率', value: '0.001' }
    ],
    diagram: { kind: 'moon', hostId: 'uranus', angle: 1.7 },
    orbitNote: '天卫三几乎位于天王星赤道面内，而天王星几乎侧躺，因此其卫星系统也随行星“竖立”公转。',
    structure: {
      intro: '约一半冰、一半岩石的分化世界。表面相对年轻，说明内部曾在潮汐加热作用下发生地质重塑。',
      layers: [
        { label: '岩石核心', pct: 46, color: '#918c83' },
        { label: '冰质地幔', pct: 42, color: '#aaa79f' },
        { label: '冰壳', pct: 12, color: '#c4c0b7' }
      ],
      features: [
        { label: '地表', text: '梅西纳峡谷长约 1,500 km，深数公里，可能由冰壳扩张与断裂形成。' },
        { label: '撞击坑', text: ' Gertrude 撞击坑直径约 326 km，是已观测到的最大卫星撞击构造之一。' },
        { label: '内部', text: '可能曾存在薄液态水层，但如今大多冻结；未来探测需确认残余海洋。' }
      ]
    },
    exploration: [
      { year: '1787', title: '赫歇尔发现', text: '威廉·赫歇尔发现天卫三与天卫四，扩展了天王星卫星系统。' },
      { year: '1986', title: '旅行者 2 号飞掠', text: '唯一一次近距离影像显示其峡谷与撞击坑地貌。' },
      { year: '未来', title: '天王星轨道器提案', text: '多国正在论证天王星旗舰任务，将系统研究其卫星与环系。' }
    ]
  },

  triton: {
    id: 'triton', name: '海卫一', suffix: '逆向公转的冰火山卫星', en: 'TRITON', category: 'moon',
    categoryLabel: '冰巨星卫星', badge: 'NEPTUNE I', index: 'MOON—10',
    color: '#d7c6c4', detailColor: '#e0d2cf',
    orbGradient: 'radial-gradient(circle at 34% 30%, #fff4ed 0%, #dcc8c4 36%, #a58f8d 66%, #413736 100%)',
    size: 1.9, visualSize: 38, focusZoom: 5.0,
    host: 'neptune', moonOrbit: { distance: 25, periodDays: 5.877, phase: 5.0, retrograde: true },
    desc: '太阳系唯一大型逆行卫星，可能是被海王星捕获的柯伊伯带天体。表面温度低至 −235 ℃，却仍有活跃的氮气冰火山。',
    tags: ['逆行轨道', '冰火山', '被捕获天体'],
    base: [
      { label: '平均半径', value: '1,353.4 km', note: '0.212 × 地球' },
      { label: '质量', value: '2.139×10²² kg', note: '0.29 × 月球' },
      { label: '公转周期', value: '5.877 天', note: '逆向公转' },
      { label: '自转周期', value: '5.877 天', note: '潮汐锁定' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '354,759 km' },
      { label: '轨道倾角', value: '156.9°' },
      { label: '离心率', value: '0.000' }
    ],
    diagram: { kind: 'moon', hostId: 'neptune', angle: 3.8 },
    orbitNote: '海卫一轨道倾角约 157°，逆行且接近圆形，潮汐演化使其正在缓慢向海王星靠近，最终可能被撕裂成环。',
    structure: {
      intro: '一个冰质地幔包裹岩石核心的世界。表面覆盖氮冰、水冰与甲烷冰，并持续被稀薄氮气大气重塑。',
      layers: [
        { label: '岩石核心', pct: 52, color: '#a08c87' },
        { label: '冰质地幔', pct: 36, color: '#c5b2ae' },
        { label: '氮冰壳', pct: 12, color: '#e0d4cf' }
      ],
      features: [
        { label: '冰火山', text: '旅行者 2 号拍摄到深色氮气喷柱，高度可达 8 km，是太阳系已知最冷的火山活动。' },
        { label: '大气', text: '极稀薄的氮气大气，表面气压约为地球的十万分之一，随风形成条纹状霜层。' },
        { label: '来源', text: '逆行轨道与高倾角支持它原为柯伊伯带天体，后被海王星引力捕获的假说。' }
      ]
    },
    exploration: [
      { year: '1846', title: '拉塞尔发现', text: '威廉·拉塞尔在发现海王星仅 17 天后找到海卫一。' },
      { year: '1989', title: '旅行者 2 号飞掠', text: '拍摄到冰火山喷柱、表面纹理与稀薄大气。' },
      { year: '未来', title: '海卫一探测构想', text: '“三叉戟”等任务提案计划重返海王星系统，研究海卫一的活跃地质与起源。' }
    ]
  },

  'ring-saturn': {
    id: 'ring-saturn', name: '土星环', suffix: '主环、卡西尼缝与暗环体系', en: 'SATURN RINGS', category: 'ring',
    categoryLabel: '行星环系统 · 土星', badge: 'RING SYSTEM', index: 'RING—01',
    color: '#d8c49a', detailColor: '#dccaa3',
    orbGradient: 'radial-gradient(circle at 33% 29%, #fff4d7 0%, #ddca9e 35%, #ad9268 66%, #4b3b24 100%)',
    size: 2.6, visualSize: 70, focusZoom: 2.8, ring: true,
    host: 'saturn', ringMarkerAngle: 0.7,
    desc: '太阳系最壮观的环系，由无数冰粒与岩石碎屑构成。从内侧 C 环到外侧 A 环，宽度超过 6 万公里，平均厚度却只有约十米。',
    tags: ['主环 A / B / C', '卡西尼缝', '冰粒组成'],
    base: [
      { label: '主环外径', value: '140,220 km', note: '距土星中心' },
      { label: '环系厚度', value: '10–100 m', note: '主环平均' },
      { label: '环系质量', value: '约 1.5×10¹⁹ kg', note: '大部分为水冰' },
      { label: '环系年龄', value: '1–4 亿年', note: '可能远年轻于土星' }
    ],
    orbitMetrics: [
      { label: '母星半长轴', value: '9.555 AU' },
      { label: '环面倾角', value: '26.7°' },
      { label: '颗粒速度', value: '约 17 km/s' }
    ],
    diagram: { kind: 'host', hostId: 'saturn' },
    orbitNote: '环系位于土星洛希极限内，颗粒无法聚集为卫星；卡西尼缝由土卫一轨道共振清扫形成。',
    structure: {
      intro: '主环分为 C、B、A 三个亮环，外侧还有 F、G、E 等暗环。颗粒尺寸从尘埃到房屋大小不等，99% 以上为水冰。',
      layers: [
        { label: 'C 环', pct: 17, color: '#82755f' },
        { label: 'B 环', pct: 35, color: '#d7c39b' },
        { label: '卡西尼缝', pct: 8, color: '#16161a' },
        { label: 'A 环', pct: 24, color: '#bfa77d' },
        { label: 'F / G / E', pct: 16, color: '#7b7468' }
      ],
      features: [
        { label: '主环', text: 'B 环最亮最厚，A 环外侧有恩克缝；卡西尼缝宽约 4,800 km，可容纳一个水星。' },
        { label: '动力学', text: '环粒在土星引力下以不同速度公转，小卫星与密度波雕刻出细密环纹。' },
        { label: '雨', text: '卡西尼号发现环物质持续沿磁力线落入土星大气，形成“环雨”。' }
      ]
    },
    exploration: [
      { year: '1610', title: '伽利略首次观测', text: '伽利略看到环的“耳朵”，但未能识别其真实形态。' },
      { year: '1655', title: '惠更斯识别环', text: '惠更斯提出土星被一个扁平环环绕；卡西尼随后发现环缝。' },
      { year: '2004', title: '卡西尼号精细测绘', text: '13 年轨道观测揭示环的年龄、动力学与“环雨”过程。' }
    ]
  },

  'ring-uranus': {
    id: 'ring-uranus', name: '天王星环', suffix: '窄环与尘埃环组成的暗弱系统', en: 'URANUS RINGS', category: 'ring',
    categoryLabel: '行星环系统 · 天王星', badge: '13 RINGS', index: 'RING—02',
    color: '#9ac8cd', detailColor: '#a7d5d9',
    orbGradient: 'radial-gradient(circle at 33% 29%, #e8ffff 0%, #b5dee0 36%, #679ba2 68%, #233a40 100%)',
    size: 2.0, visualSize: 64, focusZoom: 2.8, ring: true,
    host: 'uranus', ringMarkerAngle: 2.1,
    desc: '由 13 道已知细窄环组成的暗弱系统，几乎与天王星自转轴垂直。ε 环最亮，宽度只有几十公里，却清晰勾勒出天王星的侧躺姿态。',
    tags: ['13 道环', 'ε 窄环', '1977 年发现'],
    base: [
      { label: '已知环数', value: '13 道', note: '9 道主环 + 4 道尘埃环' },
      { label: 'ε 环宽度', value: '20–100 km', note: '最亮窄环' },
      { label: '环系半径', value: '41,800–51,150 km', note: '距行星中心' },
      { label: '颗粒组成', value: '深色岩石/冰', note: '反照率极低' }
    ],
    orbitMetrics: [
      { label: '母星半长轴', value: '19.218 AU' },
      { label: '环面倾角', value: '97.8°' },
      { label: '公转周期', value: '84.01 年' }
    ],
    diagram: { kind: 'host', hostId: 'uranus' },
    orbitNote: '环系与天王星赤道面一致，而自转轴几乎躺倒，因此从地球视角看环系会呈现罕见的竖直姿态。',
    structure: {
      intro: '天王星环由深色颗粒组成，反射率极低，直到 1977 年通过恒星掩星才被发现。环的边界由牧羊卫星引力维持。',
      layers: [
        { label: '6 / 5 / 4 环', pct: 26, color: '#54777c' },
        { label: 'α / β 环', pct: 24, color: '#789ba0' },
        { label: 'ε 环', pct: 36, color: '#afd0d2' },
        { label: '尘埃环', pct: 14, color: '#3c565a' }
      ],
      features: [
        { label: '发现', text: '1977 年天文学家在观测天王星掩星时，发现恒星亮度出现规律性闪烁。' },
        { label: '结构', text: '主环非常窄且边缘锐利，牧羊卫星天卫六、天卫七等可能负责约束颗粒。' },
        { label: '探测', text: '旅行者 2 号在 1986 年确认了 11 道环，后续哈勃与地面观测补全尘埃环。' }
      ]
    },
    exploration: [
      { year: '1977', title: '掩星发现环', text: '在天王星遮挡恒星时探测到环系造成的亮度变化。' },
      { year: '1986', title: '旅行者 2 号确认', text: '近距离影像确认了 11 道环，并发现环中的小卫星。' },
      { year: '2000s', title: '哈勃补全尘埃环', text: '发现外层的 µ 与 ν 尘埃环，形成更完整的 13 环系统。' }
    ]
  },

  'ring-jupiter': {
    id: 'ring-jupiter', name: '木星环', suffix: '由尘埃组成的稀薄暗环', en: 'JUPITER RINGS', category: 'ring',
    categoryLabel: '行星环系统 · 木星', badge: 'DUST RING', index: 'RING—03',
    color: '#b9a48e', detailColor: '#c3b19b',
    orbGradient: 'radial-gradient(circle at 33% 29%, #fff0d6 0%, #d9c1a6 36%, #9c7d61 68%, #382a1e 100%)',
    size: 1.8, visualSize: 62, focusZoom: 2.6, ring: true,
    host: 'jupiter', ringMarkerAngle: 3.6,
    desc: '木星拥有一个非常稀薄的尘埃环系统，由四部分组成。颗粒主要来自小卫星受到微陨石撞击后抛出的碎屑，直到 1979 年才被旅行者 1 号发现。',
    tags: ['尘埃环', '1979 年发现', '小卫星碎屑'],
    base: [
      { label: '环系结构', value: '4 部分', note: '晕环 / 主环 / 薄纱环' },
      { label: '主环宽度', value: '约 6,500 km', note: '距中心 122,500 km' },
      { label: '环系厚度', value: '数千米', note: '尘埃主导' },
      { label: '颗粒来源', value: '微陨石撞击', note: '来自阿德拉斯泰娅等小卫星' }
    ],
    orbitMetrics: [
      { label: '母星半长轴', value: '5.203 AU' },
      { label: '环面倾角', value: '0.05°' },
      { label: '公转周期', value: '11.86 年' }
    ],
    diagram: { kind: 'host', hostId: 'jupiter' },
    orbitNote: '木星环与赤道面几乎重合。由于颗粒寿命很短，环必须由持续的小卫星撞击不断补充。',
    structure: {
      intro: '木星环由极细的深色尘埃组成，反射率很低。晕环、主环和两道薄纱环共同延伸至木卫五轨道附近。',
      layers: [
        { label: '晕环', pct: 25, color: '#5f5042' },
        { label: '主环', pct: 40, color: '#b39d86' },
        { label: '薄纱环', pct: 35, color: '#7e6c5b' }
      ],
      features: [
        { label: '发现', text: '1979 年旅行者 1 号在飞掠木星时首次拍摄到环系，1990 年代伽利略号进一步确认结构。' },
        { label: '动力学', text: '主环由阿德拉斯泰娅与墨提斯等小卫星的撞击尘埃补充，寿命可能只有数百年。' },
        { label: '观测', text: '木星环极其暗弱，通常需要红外或高对比度成像才能从木星强光中分离。' }
      ]
    },
    exploration: [
      { year: '1979', title: '旅行者 1 号发现', text: '首次拍摄到木星环，成为第三颗被确认拥有环系的行星。' },
      { year: '1996', title: '伽利略号确认结构', text: '在木星阴影中观测到环的散射光，揭示尘埃颗粒分布。' },
      { year: '2016', title: '朱诺号补充观测', text: '从极轨视角研究木星环与磁层、辐射环境的相互作用。' }
    ]
  },

  'ring-neptune': {
    id: 'ring-neptune', name: '海王星环', suffix: '含明亮弧段结构的暗环', en: 'NEPTUNE RINGS', category: 'ring',
    categoryLabel: '行星环系统 · 海王星', badge: '5 RINGS', index: 'RING—04',
    color: '#789bc9', detailColor: '#89a9d2',
    orbGradient: 'radial-gradient(circle at 33% 29%, #e3efff 0%, #91b7ec 37%, #486fbd 68%, #13234d 100%)',
    size: 1.7, visualSize: 58, focusZoom: 2.8, ring: true,
    host: 'neptune', ringMarkerAngle: 4.7,
    desc: '海王星拥有五道主要环，最外侧的亚当斯环包含数个明亮弧段。这些弧段被海卫一的轨道共振与牧羊卫星引力约束，像一串散落的星尘。',
    tags: ['5 道主要环', '弧段结构', '旅行者 2 号'],
    base: [
      { label: '主要环数', value: '5 道', note: 'Galle / Le Verrier / Lassell / Arago / Adams' },
      { label: '亚当斯环半径', value: '62,930 km', note: '含亮弧段' },
      { label: '环系年龄', value: '可能很年轻', note: '受撞击与潮汐影响' },
      { label: '颗粒组成', value: '冰与深色尘埃', note: '反射率低' }
    ],
    orbitMetrics: [
      { label: '母星半长轴', value: '30.110 AU' },
      { label: '环面倾角', value: '0.5°' },
      { label: '公转周期', value: '164.8 年' }
    ],
    diagram: { kind: 'host', hostId: 'neptune' },
    orbitNote: '海王星环与赤道面接近，弧段颗粒集中在稳定轨道区域，尚未扩散成均匀环带。',
    structure: {
      intro: '由深色冰粒与尘埃组成的暗弱环系。亚当斯环中的“自由”“平等”“博爱”弧段最为明亮，也最受关注。',
      layers: [
        { label: 'Galle 环', pct: 28, color: '#3e5a82' },
        { label: 'Le Verrier 环', pct: 24, color: '#5b7ba6' },
        { label: 'Adams 环', pct: 34, color: '#93abd0' },
        { label: '亮弧段', pct: 14, color: '#d7e3f4' }
      ],
      features: [
        { label: '发现', text: '1984 年地面掩星观测首次暗示环系存在，1989 年旅行者 2 号确认。' },
        { label: '弧段', text: '亚当斯环的亮弧段由牧羊卫星伽拉忒亚的 42:43 共振维持，颗粒被约束在狭窄经度范围。' },
        { label: '未来', text: '海卫一逆向轨道正逐渐向内迁移，未来可能与海王星环发生复杂相互作用。' }
      ]
    },
    exploration: [
      { year: '1984', title: '掩星暗示环系', text: '地面观测在海王星掩星事件中探测到亮度异常。' },
      { year: '1989', title: '旅行者 2 号确认', text: '飞掠期间拍摄到 5 道环及亚当斯环的明亮弧段。' },
      { year: '2022', title: '韦布首次红外成像', text: '詹姆斯·韦布空间望远镜首次清晰拍摄海王星环，补充其尘埃结构。' }
    ]
  },

  ceres: {
    id: 'ceres', name: '谷神星', suffix: '主带中最大的矮行星', en: 'CERES', category: 'small',
    categoryLabel: '主带矮行星', badge: 'DWARF PLANET', index: 'SMALL—01',
    color: '#a8a39a', detailColor: '#b5afa5',
    orbGradient: 'radial-gradient(circle at 34% 30%, #ddd8ce 0%, #aaa49a 38%, #726c63 68%, #2b2823 100%)',
    size: 2.6, visualSize: 42, focusZoom: 3.6,
    physical: { a: 2.7658, e: 0.0758, i: 10.593, node: 80.305, peri: 73.597, M0: 291.375, periodDays: 1681.63 },
    desc: '小行星带中最大的天体，也是唯一位于主带内的矮行星。它占据主带约三分之一的质量，地下可能存在含盐水冰。',
    tags: ['主带矮行星', '含水矿物', 'Dawn 探测'],
    base: [
      { label: '平均半径', value: '473 km', note: '主带最大天体' },
      { label: '质量', value: '9.38×10²⁰ kg', note: '约占主带 1/3' },
      { label: '公转周期', value: '4.60 年', note: '约 1,682 天' },
      { label: '自转周期', value: '9h 04m', note: '快速自转' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '2.766 AU' },
      { label: '轨道倾角', value: '10.59°' },
      { label: '离心率', value: '0.076' }
    ],
    diagram: { kind: 'orbit', angle: 0.8 },
    orbitNote: '谷神星位于主带中部，轨道倾角约 10.6°，与木星的长期共振塑造了其轨道演化。',
    structure: {
      intro: '一个岩石核心与含水地幔组成的矮行星。表面明亮的碳酸盐沉积物暗示地下盐水曾上升至地表。',
      layers: [
        { label: '岩石核心', pct: 52, color: '#8e877d' },
        { label: '含水地幔', pct: 34, color: '#aeb5b6' },
        { label: '硅酸盐地壳', pct: 14, color: '#69635b' }
      ],
      features: [
        { label: '亮斑', text: '奥卡托撞击坑内的 Cerealia Facula 由碳酸钠盐组成，是地下卤水活动的证据。' },
        { label: '水冰', text: '极区永久阴影坑中可能存在水冰；地下可能保存含盐液态水储层。' },
        { label: '地形', text: '阿胡纳山是一座孤立冰火山，高度约 4 km，与周围平坦地形形成鲜明对比。' }
      ]
    },
    exploration: [
      { year: '1801', title: '皮亚齐发现', text: '被命名为谷神星，是人类发现的第一颗小行星。' },
      { year: '2015', title: '黎明号进入轨道', text: '成为首个环绕矮行星的探测器，发现亮斑与冰火山地貌。' },
      { year: '2018', title: '任务结束', text: '黎明号在燃料耗尽后结束任务，留下谷神星完整地形图。' }
    ]
  },

  vesta: {
    id: 'vesta', name: '灶神星', suffix: '拥有巨大撞击盆地的原行星', en: 'VESTA', category: 'small',
    categoryLabel: '主带小行星', badge: 'PROTOPLANET', index: 'SMALL—02',
    color: '#b2a68e', detailColor: '#c0b49b',
    orbGradient: 'radial-gradient(circle at 34% 30%, #e7ddc8 0%, #b8ab93 38%, #81745e 68%, #332c22 100%)',
    size: 2.3, visualSize: 40, focusZoom: 3.6,
    physical: { a: 2.3615, e: 0.0887, i: 7.140, node: 103.810, peri: 150.860, M0: 20.860, periodDays: 1325.75 },
    desc: '主带中第二大的天体，具有分化的铁核与玄武岩地壳，像一颗未能长成行星的“原行星”。南极的巨大撞击盆地几乎占据了整颗天体的一半。',
    tags: ['分化原行星', '巨大撞击盆地', 'HED 陨石来源'],
    base: [
      { label: '平均半径', value: '262.7 km', note: '平均直径 525 km' },
      { label: '质量', value: '2.59×10²⁰ kg', note: '主带总质量约 9%' },
      { label: '公转周期', value: '3.63 年', note: '约 1,326 天' },
      { label: '自转周期', value: '5h 20m', note: '太阳系最快自转之一' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '2.362 AU' },
      { label: '轨道倾角', value: '7.14°' },
      { label: '离心率', value: '0.089' }
    ],
    diagram: { kind: 'orbit', angle: 3.1 },
    orbitNote: '灶神星与谷神星共享主带空间，但形成于不同区域；其碎片通过 3:1 柯克伍德空隙进入地球附近。',
    structure: {
      intro: '一个已发生全球分异的原行星，拥有铁镍核、橄榄石地幔和玄武岩地壳。它记录了太阳系早期岩浆海洋的证据。',
      layers: [
        { label: '铁镍核', pct: 25, color: '#a18b70' },
        { label: '橄榄石地幔', pct: 55, color: '#93836d' },
        { label: '玄武岩地壳', pct: 20, color: '#6e6051' }
      ],
      features: [
        { label: '雷亚希尔维亚盆地', text: '南极巨型撞击盆地直径约 505 km，深达 19 km，几乎覆盖灶神星南半球。' },
        { label: '地形', text: '赤道附近存在巨大的平行沟槽，可能由古代撞击引发全球性断层。' },
        { label: '陨石联系', text: '约占地球陨石 6% 的 HED 陨石被认为来自灶神星，是行星分异过程的直接样本。' }
      ]
    },
    exploration: [
      { year: '1807', title: '奥伯斯发现', text: '海因里希·奥伯斯发现灶神星，它是第四颗被发现的小行星。' },
      { year: '2011', title: '黎明号进入轨道', text: '首次环绕主带天体，拍摄南极巨型撞击盆地的高清影像。' },
      { year: '2012', title: '转向谷神星', text: '黎明号完成灶神星观测后飞往谷神星，成为首个环绕两个地外天体的探测器。' }
    ]
  },

  pallas: {
    id: 'pallas', name: '智神星', suffix: '高倾角轨道上的主带小行星', en: 'PALLAS', category: 'small',
    categoryLabel: '主带小行星', badge: 'ASTEROID', index: 'SMALL—03',
    color: '#989e9d', detailColor: '#a7adad',
    orbGradient: 'radial-gradient(circle at 34% 30%, #d5d7d4 0%, #9da2a1 38%, #696e6e 68%, #282b2b 100%)',
    size: 2.2, visualSize: 38, focusZoom: 3.6,
    physical: { a: 2.7722, e: 0.2313, i: 34.84, node: 173.024, peri: 310.049, M0: 78.228, periodDays: 1686.33 },
    desc: '主带第三大天体，却以 34.8° 的高轨道倾角独树一帜。表面布满撞击坑，一颗巨大的古代撞击可能塑造了它不规则的形状。',
    tags: ['主带第三大', '高倾角轨道', '撞击坑密集'],
    base: [
      { label: '平均半径', value: '256 km', note: '不规则形状' },
      { label: '质量', value: '2.04×10²⁰ kg', note: '主带第三大' },
      { label: '公转周期', value: '4.62 年', note: '约 1,686 天' },
      { label: '自转周期', value: '7h 49m', note: '轴向倾斜大' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '2.772 AU' },
      { label: '轨道倾角', value: '34.84°' },
      { label: '离心率', value: '0.231' }
    ],
    diagram: { kind: 'orbit', angle: 5.0 },
    orbitNote: '智神星轨道倾角高达 34.8°，且偏心率 0.231，在主带中非常独特，可能受到早期行星迁移影响。',
    structure: {
      intro: '一个未完全分化的碳质天体，内部可能保留原始物质。表面撞击坑分布不均，存在大型盆地与明亮溅射物。',
      layers: [
        { label: '原始核心', pct: 50, color: '#777b79' },
        { label: '含水地幔', pct: 32, color: '#949a98' },
        { label: '碳质风化层', pct: 18, color: '#505452' }
      ],
      features: [
        { label: '形状', text: '智神星形状不规则，南半球有巨大的撞击盆地，赤道附近存在约 30 km 的撞击坑。' },
        { label: '轨道', text: '高倾角使其远离主带主要平面，与木星、土星的共振历史复杂。' },
        { label: '表面', text: '光谱显示含水矿物，暗示它可能曾经历水蚀变，是研究主带挥发物的关键目标。' }
      ]
    },
    exploration: [
      { year: '1802', title: '奥伯斯发现', text: '第二颗被人类发现的小行星，以希腊智慧女神雅典娜的别称命名。' },
      { year: '2023', title: '哈勃高分辨率观测', text: '哈勃拍摄到智神星表面的撞击坑与不寻常亮斑，为未来探测提供依据。' },
      { year: '2029', title: '灵神星任务旁路', text: 'NASA 灵神星探测器在前往金属小行星途中对智神星进行远距离观测。' }
    ]
  },

  halley: {
    id: 'halley', name: '哈雷彗星', suffix: '最著名的周期彗星', en: '1P/HALLEY', category: 'small',
    categoryLabel: '周期彗星', badge: 'PERIODIC COMET', index: 'SMALL—04',
    color: '#9adce2', detailColor: '#a5e4e9',
    orbGradient: 'radial-gradient(circle at 34% 30%, #eaffff 0%, #b8eaed 34%, #78b6c0 64%, #26434a 100%)',
    size: 2.0, visualSize: 42, focusZoom: 1.7, comet: true, visualType: 'comet',
    physical: { a: 17.834, e: 0.96714, i: 162.26, node: 58.42, peri: 111.33, M0: 274.0, periodDays: 27509 },
    desc: '人类记录最多、最著名的周期彗星，约每 75 年回归一次。它来自柯伊伯带外的奥尔特云，以逆行轨道穿越太阳系内侧。',
    tags: ['75 年回归', '逆行轨道', '1986 年探测'],
    base: [
      { label: '平均半径', value: '约 5.5 km', note: '不规则冰核' },
      { label: '质量', value: '约 2.2×10¹⁴ kg', note: '冰与尘埃混合' },
      { label: '公转周期', value: '约 75.3 年', note: '2061 年回归' },
      { label: '自转周期', value: '约 2.2 天', note: '不规则自转' }
    ],
    orbitMetrics: [
      { label: '半长轴', value: '17.834 AU' },
      { label: '轨道倾角', value: '162.26°' },
      { label: '离心率', value: '0.967' }
    ],
    diagram: { kind: 'orbit', angle: 0.1 },
    orbitNote: '哈雷彗星近日点仅 0.586 AU，远日点约 35.1 AU；逆行且高倾角轨道使其与行星轨道面形成巨大夹角。',
    structure: {
      intro: '一个由水冰、二氧化碳冰与尘埃组成的“脏雪球”。靠近太阳时，冰升华形成彗发与两条彗尾。',
      layers: [
        { label: '尘埃壳', pct: 34, color: '#6f7778' },
        { label: '水冰', pct: 42, color: '#9fc8cc' },
        { label: '挥发性冰', pct: 24, color: '#d7eeee' }
      ],
      features: [
        { label: '彗尾', text: '尘埃尾呈白色弯曲，离子尾呈蓝色笔直；两者可延伸数千万公里。' },
        { label: '流星雨', text: '每年 5 月的宝瓶座 η 流星雨与 10 月的猎户座流星雨均来自哈雷彗星碎片。' },
        { label: '核', text: '1986 年乔托号拍摄到其暗黑、花生状彗核，表面仅约 4% 活跃。' }
      ]
    },
    exploration: [
      { year: '1705', title: '哈雷预言回归', text: '爱德蒙·哈雷计算彗星轨道，成功预测 1758 年回归。' },
      { year: '1986', title: '乔托号飞掠', text: '欧洲乔托号在距彗核 596 km 处飞掠，首次拍摄彗核细节。' },
      { year: '2061', title: '下一次回归', text: '哈雷彗星预计于 2061 年再次抵达近日点，下一次为 2134 年。' }
    ]
  },

  baringer: {
    id: 'baringer', name: '巴林杰陨石', suffix: '亚利桑那荒漠中的铁陨石', en: 'BARRINGER METEORITE', category: 'small',
    categoryLabel: '著名陨石 · 美国', badge: 'IMPACT', index: 'SMALL—05',
    color: '#c09a74', detailColor: '#cba681',
    orbGradient: 'radial-gradient(circle at 34% 30%, #e5c4a0 0%, #bd956f 38%, #806044 68%, #32251a 100%)',
    size: 1.4, visualSize: 36, focusZoom: 4.2, visualType: 'meteor',
    host: 'earth', meteorMarker: { angle: 2.4, radius: 23 },
    desc: '约五万年前，一颗直径约 30–50 米的铁镍小行星撞击今美国亚利桑那州，形成直径约 1.2 km 的巴林杰陨石坑。它与“流星陨石坑”同名，是地球上最著名的撞击遗迹之一。',
    tags: ['铁陨石', '巴林杰陨石坑', '约 5 万年前'],
    base: [
      { label: '坠落地点', value: '美国亚利桑那州', note: '35.03°N, 111.02°W' },
      { label: '撞击年代', value: '约 5 万年前', note: '更新世晚期' },
      { label: '陨石坑直径', value: '约 1,186 m', note: '深约 170 m' },
      { label: '母体质量', value: '约 30 万吨', note: '铁镍小行星' }
    ],
    orbitMetrics: [
      { label: '陨石类型', value: '铁陨石' },
      { label: '撞击速度', value: '约 12.8 km/s' },
      { label: '能量释放', value: '约 10 Mt TNT' }
    ],
    diagram: { kind: 'impact' },
    orbitNote: '陨石本身已在大气与撞击中大部分气化，残片散布在坑周围；它没有可供观测的独立轨道。',
    structure: {
      intro: '主要为铁镍合金，含少量硫化物与硅酸盐包裹体。撞击瞬间释放的能量相当于约千万吨 TNT。',
      layers: [
        { label: '铁镍合金', pct: 82, color: '#a77d57' },
        { label: '硫化物', pct: 10, color: '#7f6448' },
        { label: '硅酸盐包裹体', pct: 8, color: '#554433' }
      ],
      features: [
        { label: '陨石坑', text: '巴林杰陨石坑位于科罗拉多高原，是保存最完好的大型撞击坑之一。' },
        { label: '残片', text: '坑周围发现大量铁陨石碎片，最大块体重达数百公斤。' },
        { label: '科学意义', text: '19 世纪末，丹尼尔·巴林杰首次系统论证该坑由陨石撞击形成，推动了撞击地质学。' }
      ]
    },
    exploration: [
      { year: '1903', title: '巴林杰系统研究', text: '丹尼尔·巴林杰购买坑区并钻探，试图寻找巨大铁陨石母体。' },
      { year: '1960s', title: '撞击成因确立', text: '冲击石英与柯石英的发现，确认陨石坑为高速撞击形成。' },
      { year: '今日', title: '行星科学课堂', text: '作为保存最完好的撞击坑之一，持续用于研究撞击过程与行星表面演化。' }
    ]
  },

  hoba: {
    id: 'hoba', name: '霍巴陨石', suffix: '地球上已知最大的完整陨石', en: 'HOBA METEORITE', category: 'small',
    categoryLabel: '著名陨石 · 纳米比亚', badge: 'IRON METEORITE', index: 'SMALL—06',
    color: '#a8a0a0', detailColor: '#b8b0ae',
    orbGradient: 'radial-gradient(circle at 34% 30%, #d7d1ce 0%, #aaa3a0 38%, #74706e 68%, #2b2928 100%)',
    size: 1.6, visualSize: 38, focusZoom: 4.2, visualType: 'meteor',
    host: 'earth', meteorMarker: { angle: 4.0, radius: 26 },
    desc: '1920 年发现于纳米比亚霍巴农场，重约 60 吨，是地球上已知最大的完整陨石。它约 8 万年前坠落，因形状扁平而几乎完整保存至今。',
    tags: ['约 60 吨', '最大完整陨石', '纳米比亚'],
    base: [
      { label: '发现地点', value: '纳米比亚霍巴', note: '19.59°S, 17.93°E' },
      { label: '质量', value: '约 60 吨', note: '已知最大完整陨石' },
      { label: '坠落年代', value: '约 8 万年前', note: '未形成明显撞击坑' },
      { label: '类型', value: '铁陨石', note: '镍含量约 16%' }
    ],
    orbitMetrics: [
      { label: '母体来源', value: '小行星核心' },
      { label: '坠落类型', value: '低速进入' },
      { label: '现存状态', value: '原地保护' }
    ],
    diagram: { kind: 'impact' },
    orbitNote: '霍巴陨石未形成典型撞击坑，可能以较低速度穿越大气并在地表碎裂，故其原始轨道难以重建。',
    structure: {
      intro: '一块富含镍的铁陨石，表面因长期风化形成深色氧化壳。其扁平形状可能是进入大气时烧蚀塑形所致。',
      layers: [
        { label: '铁镍合金', pct: 84, color: '#8d8886' },
        { label: '镍富集相', pct: 10, color: '#aaa3a0' },
        { label: '风化壳', pct: 6, color: '#4d4947' }
      ],
      features: [
        { label: '发现', text: '农场主在使用犁地时意外撞击到这块巨大金属体，随后被确认是铁陨石。' },
        { label: '保存', text: '陨石一直留在发现地，周围修建了下沉式观景平台，未进行大规模迁移。' },
        { label: '科研', text: '霍巴陨石为研究铁陨石母体冷却速率与行星核形成提供了重要样本。' }
      ]
    },
    exploration: [
      { year: '1920', title: '意外发现', text: '在纳米比亚农场整地时发现巨大金属块，后确认为铁陨石。' },
      { year: '1950s', title: '确认世界之最', text: '测量确认其质量约 60 吨，超过此前的所有完整陨石。' },
      { year: '今日', title: '国家 Monument', text: '霍巴陨石被列为纳米比亚国家纪念物，是当地重要的科学教育地标。' }
    ]
  },

  iss: {
    id: 'iss', name: '国际空间站', suffix: '人类近地轨道上的前哨站', en: 'ISS', category: 'human',
    categoryLabel: '近地轨道 · 载人设施', badge: 'LEO', index: 'HUMAN—01',
    color: '#c9d7e8', detailColor: '#cfe0f1',
    orbGradient: 'radial-gradient(circle at 33% 29%, #f0f6ff 0%, #b9cbdd 40%, #6f839a 70%, #262d39 100%)',
    size: 1.2, visualSize: 40, focusZoom: 4.6, visualType: 'probe',
    host: 'earth', humanOrbit: { distance: 9.5, periodDays: 0.064, phase: 2.5 },
    desc: '自 1998 年起在轨组装的模块化空间站，是人类在近地轨道上持续驻留最久的建筑。它每 92 分钟绕地球一圈，已是最大的人造天体之一。',
    tags: ['持续载人', '400 km 轨道', '国际协作'],
    base: [
      { label: '发射质量', value: '约 420 吨', note: '多国模块组装' },
      { label: '在轨尺寸', value: '109 × 73 m', note: '太阳能翼展最大' },
      { label: '轨道高度', value: '约 400 km', note: '近地轨道' },
      { label: '运行周期', value: '92.7 分钟', note: '约 28,800 km/h' }
    ],
    orbitMetrics: [
      { label: '近地点', value: '约 408 km' },
      { label: '轨道倾角', value: '51.64°' },
      { label: '离心率', value: '0.0003' }
    ],
    diagram: { kind: 'host', hostId: 'earth' },
    orbitNote: '国际空间站每 92 分钟绕地球一周，每天经历约 16 次日出。轨道高度需定期抬升以抵消大气阻力。',
    structure: {
      intro: '由加压舱段、桁架、太阳能电池翼和实验模块组成。生命保障系统循环利用水与空气，是长期太空生活的实验平台。',
      layers: [
        { label: '实验舱', pct: 34, color: '#a7bdd6' },
        { label: '桁架与散热', pct: 30, color: '#8598ad' },
        { label: '太阳能翼', pct: 24, color: '#d8b96c' },
        { label: '生活支持', pct: 12, color: '#6e8297' }
      ],
      features: [
        { label: '载人', text: '通常维持 6–7 名乘员轮换，连续载人记录自 2000 年 11 月开始。' },
        { label: '科研', text: '开展微重力材料、生命科学、地球观测与深空医学实验。' },
        { label: '轨道', text: '轨道倾角 51.6°，便于俄罗斯联盟号与中国、美国发射场抵达。' }
      ]
    },
    exploration: [
      { year: '1998', title: '首个模块入轨', text: '俄罗斯曙光号功能货舱发射，拉开国际空间站组装序幕。' },
      { year: '2000', title: '首批长期乘员', text: '远征 1 号抵达，空间站开始连续载人运行。' },
      { year: '2030', title: '计划退役', text: '多国计划在 2030 年前后结束空间站运行，转向商业空间站。' }
    ]
  },

  hubble: {
    id: 'hubble', name: '哈勃空间望远镜', suffix: '改写宇宙认知的太空之眼', en: 'HUBBLE', category: 'human',
    categoryLabel: '近地轨道 · 空间望远镜', badge: 'LEO TELESCOPE', index: 'HUMAN—02',
    color: '#9dd3e8', detailColor: '#a9dcef',
    orbGradient: 'radial-gradient(circle at 33% 29%, #edfbff 0%, #a9d3e4 40%, #5f8198 70%, #1e2a35 100%)',
    size: 1.1, visualSize: 40, focusZoom: 4.6, visualType: 'probe',
    host: 'earth', humanOrbit: { distance: 13.5, periodDays: 0.066, phase: 5.4 },
    desc: '1990 年发射的空间望远镜，在地球大气层之外持续观测宇宙。它帮助确定了宇宙加速膨胀，并拍摄了哈勃深场、创生之柱等标志性影像。',
    tags: ['深场观测', '宇宙膨胀', '30+ 年服役'],
    base: [
      { label: '发射质量', value: '11,110 kg', note: '主镜口径 2.4 m' },
      { label: '在轨尺寸', value: '13.2 × 4.2 m', note: '圆柱形镜筒' },
      { label: '轨道高度', value: '约 540 km', note: '近地轨道' },
      { label: '运行周期', value: '95.4 分钟', note: '1990 年发射' }
    ],
    orbitMetrics: [
      { label: '近地点', value: '约 537 km' },
      { label: '轨道倾角', value: '28.47°' },
      { label: '离心率', value: '0.0003' }
    ],
    diagram: { kind: 'host', hostId: 'earth' },
    orbitNote: '哈勃轨道倾角 28.5°，位于大气层之上，避免了空气湍流与大部分紫外吸收。',
    structure: {
      intro: '一台 2.4 米口径的反射式望远镜，配备可见光、紫外与近红外仪器。它的镜筒与太阳能翼构成了极易辨认的轮廓。',
      layers: [
        { label: '光学系统', pct: 36, color: '#9dd3e8' },
        { label: '科学仪器', pct: 28, color: '#7ba8bd' },
        { label: '太阳能翼', pct: 22, color: '#d9b76b' },
        { label: '服务舱', pct: 14, color: '#5a7487' }
      ],
      features: [
        { label: '观测', text: '覆盖紫外、可见光与近红外波段；曾完成多次在轨维修与仪器升级。' },
        { label: '发现', text: '测定哈勃常数、发现宇宙加速膨胀、观测系外行星大气与早期星系。' },
        { label: '深场', text: '哈勃深场在极小视场内揭示数千个遥远星系，改变了人类对宇宙尺度的认识。' }
      ]
    },
    exploration: [
      { year: '1990', title: '发现号发射', text: '哈勃进入近地轨道，随后发现主镜存在球差。' },
      { year: '1993', title: '首次维修任务', text: '航天飞机任务安装校正光学设备，使望远镜达到设计分辨率。' },
      { year: '2021', title: '持续科学观测', text: '在韦布发射后，哈勃继续承担紫外与可见光波段的独特观测任务。' }
    ]
  },

  voyager1: {
    id: 'voyager1', name: '旅行者 1 号', suffix: '飞得最远的人类探测器', en: 'VOYAGER 1', category: 'human',
    categoryLabel: '星际探测器 · 深空', badge: 'INTERSTELLAR', index: 'HUMAN—03',
    color: '#8ad7f6', detailColor: '#95def8',
    orbGradient: 'radial-gradient(circle at 33% 29%, #f0fcff 0%, #9fdef6 38%, #4a8ca7 68%, #152a34 100%)',
    size: 1.2, visualSize: 40, focusZoom: 1.2, visualType: 'probe',
    deepPos: { angle: -0.72, radius: 1.36 },
    desc: '1977 年发射的旅行者 1 号，是迄今飞得最远的人造物体。它先后飞掠木星与土星，2012 年穿越日球层顶，进入星际空间。',
    tags: ['星际空间', '最远人造物', '金唱片'],
    base: [
      { label: '发射质量', value: '825.5 kg', note: '含放射性同位素电源' },
      { label: '当前距离', value: '约 170 AU', note: '2026 年估算' },
      { label: '飞行速度', value: '约 17 km/s', note: '相对太阳' },
      { label: '发射日期', value: '1977.09.05', note: '泰坦 IIIE / 半人马' }
    ],
    orbitMetrics: [
      { label: '日心距离', value: '约 170 AU' },
      { label: '黄道倾角', value: '35.8°' },
      { label: '轨道离心率', value: '> 1' }
    ],
    diagram: { kind: 'probe', start: '地球', end: '星际空间' },
    orbitNote: '旅行者 1 号速度超过太阳系逃逸速度，轨道为双曲线，已不再返回太阳系。',
    structure: {
      intro: '一艘搭载 10 台科学仪器与三块放射性同位素热电池的探测器，携带记录地球声音与图像的“金唱片”。',
      layers: [
        { label: '科学平台', pct: 36, color: '#8ad7f6' },
        { label: '推进与姿控', pct: 28, color: '#709eb2' },
        { label: 'RTG 电源', pct: 22, color: '#d7b36c' },
        { label: '金唱片', pct: 14, color: '#c8a96b' }
      ],
      features: [
        { label: '任务', text: '1979 年飞掠木星、1980 年飞掠土星，借助引力弹弓加速前往太阳系边缘。' },
        { label: '星际穿越', text: '2012 年 8 月穿越日球层顶，成为首个进入星际空间的人造物体。' },
        { label: '通信', text: '以约 23 小时的单程光行时传回数据，预计 2030 年代逐步关闭仪器。' }
      ]
    },
    exploration: [
      { year: '1977', title: '发射升空', text: '在旅行者 2 号之后发射，却因更快的轨迹后来居上。' },
      { year: '1980', title: '土星飞掠完成', text: '在获得泰坦引力助推后驶离黄道面，进入朝向外太阳系的高倾角轨道。' },
      { year: '2012', title: '进入星际空间', text: '等离子体仪器确认穿越日球层顶，成为首个星际探测器。' },
      { year: '2026', title: '持续飞行', text: '约 170 AU 之外，仍在以微弱信号与地球保持联系。' }
    ]
  },

  voyager2: {
    id: 'voyager2', name: '旅行者 2 号', suffix: '唯一造访四颗巨行星的探测器', en: 'VOYAGER 2', category: 'human',
    categoryLabel: '星际探测器 · 深空', badge: 'INTERSTELLAR', index: 'HUMAN—04',
    color: '#8ad7f6', detailColor: '#95def8',
    orbGradient: 'radial-gradient(circle at 33% 29%, #f0fcff 0%, #9fdef6 38%, #4a8ca7 68%, #152a34 100%)',
    size: 1.1, visualSize: 38, focusZoom: 1.2, visualType: 'probe',
    deepPos: { angle: -1.42, radius: 1.16 },
    desc: '1977 年发射的旅行者 2 号，是唯一同时飞掠木星、土星、天王星和海王星的人类探测器。2018 年，它紧随旅行者 1 号进入星际空间。',
    tags: ['四巨行星', '星际空间', '旅行者金唱片'],
    base: [
      { label: '发射质量', value: '825.5 kg', note: '与旅行者 1 号同型' },
      { label: '当前距离', value: '约 142 AU', note: '2026 年估算' },
      { label: '飞行速度', value: '约 15.4 km/s', note: '相对太阳' },
      { label: '发射日期', value: '1977.08.20', note: '泰坦 IIIE / 半人马' }
    ],
    orbitMetrics: [
      { label: '日心距离', value: '约 142 AU' },
      { label: '黄道倾角', value: '−48.4°' },
      { label: '轨道离心率', value: '> 1' }
    ],
    diagram: { kind: 'probe', start: '地球', end: '星际空间' },
    orbitNote: '旅行者 2 号利用罕见的行星几何排列完成“大巡游”，轨道随后向黄道面南方飞出。',
    structure: {
      intro: '与旅行者 1 号几乎相同的设计，携带电视摄像机、磁强计、等离子体波与宇宙线仪器，以及一张金唱片。',
      layers: [
        { label: '科学平台', pct: 36, color: '#8ad7f6' },
        { label: '推进与姿控', pct: 28, color: '#709eb2' },
        { label: 'RTG 电源', pct: 22, color: '#d7b36c' },
        { label: '金唱片', pct: 14, color: '#c8a96b' }
      ],
      features: [
        { label: '行星大巡游', text: '1979 木星、1981 土星、1986 天王星、1989 海王星，完成唯一一次四巨行星飞掠。' },
        { label: '冰巨星发现', text: '发现天王星与海王星的新卫星、环系，以及海卫一冰火山。' },
        { label: '星际空间', text: '2018 年穿越日球层顶，成为第二个进入星际空间的人造物体。' }
      ]
    },
    exploration: [
      { year: '1977', title: '发射', text: '早于旅行者 1 号发射，利用行星排列开始大巡游。' },
      { year: '1986', title: '飞掠天王星', text: '唯一近距离探访天王星的探测器，发现新卫星与环系。' },
      { year: '1989', title: '飞掠海王星', text: '拍摄大暗斑，完成人类对八大行星的首次近距离探访。' },
      { year: '2018', title: '进入星际空间', text: '穿越日球层顶，继续向深空飞行。' }
    ]
  },

  pioneer10: {
    id: 'pioneer10', name: '先驱者 10 号', suffix: '穿越小行星带的首个探测器', en: 'PIONEER 10', category: 'human',
    categoryLabel: '星际探测器 · 深空', badge: 'DEEP SPACE', index: 'HUMAN—05',
    color: '#8ad7f6', detailColor: '#95def8',
    orbGradient: 'radial-gradient(circle at 33% 29%, #f0fcff 0%, #9fdef6 38%, #4a8ca7 68%, #152a34 100%)',
    size: 1.0, visualSize: 36, focusZoom: 1.2, visualType: 'probe',
    deepPos: { angle: -2.28, radius: 1.27 },
    desc: '1972 年发射的先驱者 10 号，是首个穿越主小行星带并飞掠木星的探测器。它携带刻有地球位置的金色铝板，向宇宙宣告人类的存在。',
    tags: ['首个穿越主带', '木星飞掠', '先驱者铭牌'],
    base: [
      { label: '发射质量', value: '258.8 kg', note: '含 RTG 电源' },
      { label: '当前距离', value: '约 137 AU', note: '2026 年估算' },
      { label: '飞行速度', value: '约 12 km/s', note: '相对太阳' },
      { label: '发射日期', value: '1972.03.02', note: '宇宙神—半人马' }
    ],
    orbitMetrics: [
      { label: '日心距离', value: '约 137 AU' },
      { label: '黄道倾角', value: '约 3°' },
      { label: '轨道离心率', value: '> 1' }
    ],
    diagram: { kind: 'probe', start: '地球', end: '金牛座方向' },
    orbitNote: '先驱者 10 号正朝金牛座方向飞行。最后一次遥测信号在 2003 年收到，现已失联。',
    structure: {
      intro: '一台以自旋稳定的探测器，配备粒子、磁场、尘埃与成像仪器，外部安装放射性同位素热电池。',
      layers: [
        { label: '科学仪器', pct: 40, color: '#8ad7f6' },
        { label: '平台结构', pct: 30, color: '#709eb2' },
        { label: 'RTG 电源', pct: 20, color: '#d7b36c' },
        { label: '铭牌', pct: 10, color: '#c8a96b' }
      ],
      features: [
        { label: '小行星带', text: '1972–1973 年成功穿越主带，证明人类探测器可以安全通过。' },
        { label: '木星', text: '1973 年首次近距离飞掠木星，拍摄极区与卫星并测量辐射带。' },
        { label: '失联', text: '2003 年因电源衰减与距离过远失去联系，最终将飞向金牛座。' }
      ]
    },
    exploration: [
      { year: '1972', title: '发射', text: '成为首个穿越主小行星带的人造探测器。' },
      { year: '1973', title: '飞掠木星', text: '首次近距离拍摄木星，测量其辐射带与磁场。' },
      { year: '1983', title: '越过海王星轨道', text: '成为首个越过海王星轨道的人造物体。' },
      { year: '2003', title: '最后信号', text: '最后一次遥测后失联，继续向深空飞行。' }
    ]
  },

  pioneer11: {
    id: 'pioneer11', name: '先驱者 11 号', suffix: '首个飞掠土星的探测器', en: 'PIONEER 11', category: 'human',
    categoryLabel: '星际探测器 · 深空', badge: 'DEEP SPACE', index: 'HUMAN—06',
    color: '#8ad7f6', detailColor: '#95def8',
    orbGradient: 'radial-gradient(circle at 33% 29%, #f0fcff 0%, #9fdef6 38%, #4a8ca7 68%, #152a34 100%)',
    size: 1.0, visualSize: 36, focusZoom: 1.2, visualType: 'probe',
    deepPos: { angle: -3.18, radius: 1.12 },
    desc: '先驱者 11 号于 1973 年发射，在飞掠木星后借助引力转向土星，成为首个探访土星的探测器，并发现了土星 F 环与新卫星。',
    tags: ['首个土星飞掠', 'F 环发现', '先驱者系列'],
    base: [
      { label: '发射质量', value: '258.8 kg', note: '与先驱者 10 号同型' },
      { label: '当前距离', value: '约 115 AU', note: '2026 年估算' },
      { label: '飞行速度', value: '约 11.1 km/s', note: '相对太阳' },
      { label: '发射日期', value: '1973.04.05', note: '宇宙神—半人马' }
    ],
    orbitMetrics: [
      { label: '日心距离', value: '约 115 AU' },
      { label: '黄道倾角', value: '约 14°' },
      { label: '轨道离心率', value: '> 1' }
    ],
    diagram: { kind: 'probe', start: '地球', end: '盾牌座方向' },
    orbitNote: '先驱者 11 号正朝盾牌座方向飞行，最后一次信号在 1995 年收到。',
    structure: {
      intro: '与先驱者 10 号相同的自旋稳定平台，携带成像、磁强计、粒子与尘埃探测仪器。',
      layers: [
        { label: '科学仪器', pct: 40, color: '#8ad7f6' },
        { label: '平台结构', pct: 30, color: '#709eb2' },
        { label: 'RTG 电源', pct: 20, color: '#d7b36c' },
        { label: '铭牌', pct: 10, color: '#c8a96b' }
      ],
      features: [
        { label: '木星', text: '1974 年飞掠木星，拍摄极区并测量磁层。' },
        { label: '土星', text: '1979 年首次飞掠土星，发现 F 环及若干新卫星。' },
        { label: '深空', text: '借助土星引力转向黄道面外，1990 年代后逐渐失联。' }
      ]
    },
    exploration: [
      { year: '1973', title: '发射', text: '作为先驱者 10 号的姊妹探测器升空。' },
      { year: '1974', title: '木星飞掠', text: '首次近距离拍摄木星极区。' },
      { year: '1979', title: '土星飞掠', text: '成为首个造访土星的探测器，发现 F 环。' },
      { year: '1995', title: '最后信号', text: '任务终止，探测器继续向深空飞行。' }
    ]
  },

  cassini: {
    id: 'cassini', name: '卡西尼号', suffix: '深入土星系统十三年的轨道器', en: 'CASSINI', category: 'human',
    categoryLabel: '行星探测 · 土星', badge: 'SATURN ORBITER', index: 'HUMAN—07',
    color: '#d8c49a', detailColor: '#e2d0a6',
    orbGradient: 'radial-gradient(circle at 33% 29%, #fff4d9 0%, #ddc99f 38%, #a68b61 68%, #3d2f1c 100%)',
    size: 1.0, visualSize: 38, focusZoom: 4.0, visualType: 'probe',
    host: 'saturn', humanOrbit: { distance: 25, periodDays: 23, phase: 5.7 },
    desc: '卡西尼—惠更斯任务是人类迄今最宏大的外太阳系探测计划。它在土星轨道工作 13 年，带回土卫二羽流、泰坦甲烷湖与环系年龄的关键证据。',
    tags: ['土星 13 年', '惠更斯登陆', '壮丽终章'],
    base: [
      { label: '发射质量', value: '5,712 kg', note: '含惠更斯着陆器' },
      { label: '任务周期', value: '1997–2017', note: '土星轨道 13 年' },
      { label: '飞掠次数', value: '294 圈', note: '围绕土星' },
      { label: '发射日期', value: '1997.10.15', note: '泰坦 IVB / 半人马' }
    ],
    orbitMetrics: [
      { label: '土星轨道', value: '多圈变轨' },
      { label: '轨道倾角', value: '最高 62°' },
      { label: '任务终点', value: '土星大气' }
    ],
    diagram: { kind: 'host', hostId: 'saturn' },
    orbitNote: '卡西尼号通过泰坦引力助推不断改变轨道倾角，最终以“壮丽终章”穿越土星与环之间。',
    structure: {
      intro: '一个 6.8 米高的复杂轨道器，携带 12 台科学仪器，并释放惠更斯着陆器前往泰坦。',
      layers: [
        { label: '科学仪器', pct: 36, color: '#d8c49a' },
        { label: '推进系统', pct: 30, color: '#9d8a69' },
        { label: 'RTG 电源', pct: 24, color: '#c9a65f' },
        { label: '惠更斯', pct: 10, color: '#e9dfc8' }
      ],
      features: [
        { label: '土卫二', text: '发现南极冰羽，采集到含盐与有机物的羽流样本。' },
        { label: '泰坦', text: '雷达穿透橙色雾霾，绘制甲烷湖海与河网地图；惠更斯号成功着陆。' },
        { label: '环系', text: '精确测定环的质量、年龄与动力学，发现“环雨”现象。' }
      ]
    },
    exploration: [
      { year: '1997', title: '发射', text: '由泰坦 IVB 发射，开始为期七年的行星际航行。' },
      { year: '2004', title: '抵达土星', text: '进入土星轨道，成为首个环绕土星的探测器。' },
      { year: '2005', title: '惠更斯登陆泰坦', text: '首次在外太阳系天体表面软着陆并传回图像。' },
      { year: '2017', title: '壮丽终章', text: '主动坠入土星大气，结束 20 年任务。' }
    ]
  },

  juno: {
    id: 'juno', name: '朱诺号', suffix: '透视木星内部的极轨探测器', en: 'JUNO', category: 'human',
    categoryLabel: '行星探测 · 木星', badge: 'JUPITER ORBITER', index: 'HUMAN—08',
    color: '#d8b18d', detailColor: '#e0bf9b',
    orbGradient: 'radial-gradient(circle at 33% 29%, #fff0d6 0%, #dcbc98 38%, #a4795a 68%, #3a2619 100%)',
    size: 1.0, visualSize: 38, focusZoom: 4.0, visualType: 'probe',
    host: 'jupiter', humanOrbit: { distance: 26, periodDays: 53, phase: 1.4 },
    desc: '朱诺号沿极轨穿越木星辐射带，用微波与重力测量透视云层之下，研究木星内部结构、极区风暴与磁层。',
    tags: ['木星极轨', '内部结构', '极地风暴'],
    base: [
      { label: '发射质量', value: '3,625 kg', note: '含钛屏蔽电子设备' },
      { label: '任务周期', value: '2011 至今', note: '2016 年入轨' },
      { label: '轨道周期', value: '约 53 天', note: '极地椭圆轨道' },
      { label: '发射日期', value: '2011.08.05', note: '宇宙神 V 551' }
    ],
    orbitMetrics: [
      { label: '近木点', value: '约 4,200 km', note: '云顶高度' },
      { label: '轨道倾角', value: '约 90°' },
      { label: '离心率', value: '0.95' }
    ],
    diagram: { kind: 'host', hostId: 'jupiter' },
    orbitNote: '极轨设计使朱诺避开最强辐射带，同时从上方俯瞰木星极区，获得前所未有的极光与风暴影像。',
    structure: {
      intro: '一台以太阳能供电的探测器，三块巨大翼板在木星微弱阳光下提供电力，核心设备置于钛金属辐射屏蔽箱中。',
      layers: [
        { label: '科学仪器', pct: 38, color: '#d8b18d' },
        { label: '辐射屏蔽', pct: 26, color: '#8f7962' },
        { label: '太阳能翼', pct: 24, color: '#d8bd72' },
        { label: '推进系统', pct: 12, color: '#7c6a58' }
      ],
      features: [
        { label: '内部', text: '重力场与微波辐射数据表明木星可能存在稀释的岩冰核心，而非清晰边界。' },
        { label: '极区', text: '发现排列成多边形的巨大气旋群，以及远比预期复杂的极光加速机制。' },
        { label: '卫星', text: '多次飞掠木卫三，并拍摄木卫二冰壳与木卫一火山活动。' }
      ]
    },
    exploration: [
      { year: '2011', title: '发射', text: '从卡纳维拉尔角升空，开始五年行星际航行。' },
      { year: '2016', title: '进入木星极轨', text: '成为首个以极轨环绕木星的探测器。' },
      { year: '2021', title: '木卫三飞掠', text: '近距离拍摄木卫三，并开始扩展任务阶段。' },
      { year: '2025', title: '持续扩展任务', text: '继续研究木星内部、极光与卫星系统，直至寿命终结。' }
    ]
  },

  newHorizons: {
    id: 'newHorizons', name: '新视野号', suffix: '飞掠冥王星与柯伊伯带的使者', en: 'NEW HORIZONS', category: 'human',
    categoryLabel: '行星探测 · 柯伊伯带', badge: 'KUIPER BELT', index: 'HUMAN—09',
    color: '#9fc9e8', detailColor: '#abd3ef',
    orbGradient: 'radial-gradient(circle at 33% 29%, #edf9ff 0%, #a9cfe5 38%, #5e849e 68%, #1b2c38 100%)',
    size: 0.9, visualSize: 36, focusZoom: 1.3, visualType: 'probe',
    deepPos: { angle: -0.28, radius: 1.19 },
    desc: '新视野号以创纪录的速度直飞冥王星，2015 年首次揭示这颗矮行星的冰山、氮冰平原与稀薄大气，随后继续探访柯伊伯带天体。',
    tags: ['冥王星飞掠', '柯伊伯带', '最快发射速度'],
    base: [
      { label: '发射质量', value: '478 kg', note: '含 RTG 电源' },
      { label: '发射速度', value: '16.26 km/s', note: '最快离地速度之一' },
      { label: '当前距离', value: '约 65 AU', note: '2026 年估算' },
      { label: '发射日期', value: '2006.01.19', note: '宇宙神 V 551' }
    ],
    orbitMetrics: [
      { label: '日心距离', value: '约 65 AU' },
      { label: '黄道倾角', value: '约 2°' },
      { label: '轨道离心率', value: '> 1' }
    ],
    diagram: { kind: 'probe', start: '地球', end: '柯伊伯带' },
    orbitNote: '新视野号已越过冥王星与柯伊伯带，继续向星际空间飞行。它携带的钚电源预计可工作至 2030 年代。',
    structure: {
      intro: '一个紧凑的核动力探测器，配有可见光、红外与紫外成像仪，以及尘埃与等离子体仪器。',
      layers: [
        { label: '科学仪器', pct: 40, color: '#9fc9e8' },
        { label: '平台结构', pct: 28, color: '#7699b1' },
        { label: 'RTG 电源', pct: 20, color: '#d8b66e' },
        { label: '天线', pct: 12, color: '#cbd7de' }
      ],
      features: [
        { label: '冥王星', text: '发现斯普特尼克平原、水冰山与氮冰流动冰川，重塑了对矮行星的认识。' },
        { label: '柯伊伯带', text: '2019 年飞掠 Arrokoth，拍摄到人类迄今最遥远的天体近照。' },
        { label: '通信', text: '以约 9 小时单程光行时传回数据，数据率仅约 1 kbps。' }
      ]
    },
    exploration: [
      { year: '2006', title: '发射', text: '以创纪录的 16.26 km/s 离地速度飞向冥王星。' },
      { year: '2015', title: '飞掠冥王星', text: '首次近距离揭示冥王星与冥卫一的地质细节。' },
      { year: '2019', title: '飞掠 Arrokoth', text: '探访柯伊伯带天体，拍摄到最遥远的天体近照。' },
      { year: '2020s', title: '柯伊伯带延伸任务', text: '继续搜寻新的飞掠目标，同时监测深空环境。' }
    ]
  },

  curiosity: {
    id: 'curiosity', name: '好奇号火星车', suffix: '寻找火星古代宜居环境', en: 'CURIOSITY', category: 'human',
    categoryLabel: '火星车 · 盖尔撞击坑', badge: 'MARS ROVER', index: 'HUMAN—10',
    color: '#d08b68', detailColor: '#dd9873',
    orbGradient: 'radial-gradient(circle at 33% 29%, #ffe4cd 0%, #d19573 38%, #966044 68%, #362218 100%)',
    size: 0.9, visualSize: 34, focusZoom: 4.6, visualType: 'probe',
    host: 'mars', humanOrbit: { distance: 12, periodDays: 20, phase: 0.6 },
    desc: '2012 年登陆盖尔撞击坑的好奇号，是迄今最大、最复杂的火星车。它确认火星古代曾存在淡水湖泊，并发现有机分子与季节变化的甲烷。',
    tags: ['核动力', '古代湖泊', '有机分子'],
    base: [
      { label: '发射质量', value: '899 kg', note: '汽车大小' },
      { label: '着陆日期', value: '2012.08.06', note: '天空起重机' },
      { label: '行驶距离', value: '30+ km', note: '截至 2025 年' },
      { label: '任务状态', value: '运行中', note: '已超设计寿命' }
    ],
    orbitMetrics: [
      { label: '着陆地点', value: '盖尔撞击坑' },
      { label: '火星轨道倾角', value: '1.85°' },
      { label: '火星离心率', value: '0.093' }
    ],
    diagram: { kind: 'host', hostId: 'mars' },
    orbitNote: '好奇号随火星一起绕太阳公转，火星一年约 687 个地球日。它依靠放射性同位素电源持续工作。',
    structure: {
      intro: '一台六轮核动力漫游车，配备激光光谱仪、钻探设备、化学实验室与桅杆相机。',
      layers: [
        { label: '科学载荷', pct: 38, color: '#d08b68' },
        { label: '车身结构', pct: 30, color: '#9e6e52' },
        { label: '动力系统', pct: 20, color: '#d4af6c' },
        { label: '移动系统', pct: 12, color: '#6f5a49' }
      ],
      features: [
        { label: '发现', text: '在盖尔撞击坑的沉积岩中发现古代湖泊环境、有机分子与硝酸盐。' },
        { label: '大气', text: '测量火星大气甲烷的季节变化，并追踪尘暴与气压波动。' },
        { label: '技术', text: '天空起重机着陆技术为后续毅力号任务奠定基础。' }
      ]
    },
    exploration: [
      { year: '2011', title: '发射', text: '从卡纳维拉尔角升空，展开八个月的火星航行。' },
      { year: '2012', title: '天空起重机着陆', text: '成功降落在盖尔撞击坑，开始地质与环境调查。' },
      { year: '2014', title: '抵达夏普山', text: '开始攀爬沉积岩层，阅读火星古代环境记录。' },
      { year: '2020s', title: '持续探索', text: '继续分析硫酸盐与黏土矿物，评估古代宜居性。' }
    ]
  },

  perseverance: {
    id: 'perseverance', name: '毅力号火星车', suffix: '采集火星样本的未来信使', en: 'PERSEVERANCE', category: 'human',
    categoryLabel: '火星车 · 耶泽罗撞击坑', badge: 'SAMPLE CACHE', index: 'HUMAN—11',
    color: '#d79a71', detailColor: '#e3a67d',
    orbGradient: 'radial-gradient(circle at 33% 29%, #ffe8d2 0%, #d79a71 38%, #9a6547 68%, #382419 100%)',
    size: 0.9, visualSize: 34, focusZoom: 4.6, visualType: 'probe',
    host: 'mars', humanOrbit: { distance: 18, periodDays: 30, phase: 3.4 },
    desc: '毅力号于 2021 年降落在耶泽罗撞击坑，寻找古代微生物痕迹并采集岩芯样本。它携带的机智号直升机完成了另一颗行星上的首次动力飞行。',
    tags: ['样本返回', '机智号首飞', '古河口三角洲'],
    base: [
      { label: '发射质量', value: '1,025 kg', note: '含样本采集系统' },
      { label: '着陆日期', value: '2021.02.18', note: '天空起重机' },
      { label: '样本管', value: '已采集多管', note: '等待取回' },
      { label: '任务状态', value: '运行中', note: '耶泽罗撞击坑' }
    ],
    orbitMetrics: [
      { label: '着陆地点', value: '耶泽罗撞击坑' },
      { label: '火星轨道倾角', value: '1.85°' },
      { label: '火星离心率', value: '0.093' }
    ],
    diagram: { kind: 'host', hostId: 'mars' },
    orbitNote: '毅力号在火星表面工作，随火星绕日公转；其采集的样本计划由后续火星样本返回任务取回。',
    structure: {
      intro: '基于好奇号设计，增加了样本钻取、封存与地表缓存系统，以及用于制氧的 MOXIE 实验。',
      layers: [
        { label: '科学载荷', pct: 36, color: '#d79a71' },
        { label: '样本系统', pct: 28, color: '#b07859' },
        { label: '动力系统', pct: 22, color: '#d6b171' },
        { label: '移动系统', pct: 14, color: '#725c49' }
      ],
      features: [
        { label: '样本', text: '在古河流三角洲钻取岩芯，密封保存于钛管中，等待未来样本返回任务。' },
        { label: '机智号', text: '随行的 1.8 kg 直升机完成 70 余次飞行，验证了地外动力飞行。' },
        { label: '制氧', text: 'MOXIE 实验成功从火星二氧化碳大气中制备氧气，为载人任务提供技术验证。' }
      ]
    },
    exploration: [
      { year: '2020', title: '发射', text: '在疫情挑战下发射，开始前往火星的旅程。' },
      { year: '2021', title: '着陆耶泽罗', text: '成功降落于古河口三角洲，开始寻找古代生命迹象。' },
      { year: '2021', title: '机智号首飞', text: '完成另一颗行星上的首次受控动力飞行。' },
      { year: '2020s', title: '样本缓存', text: '持续采集岩芯样本，为火星样本返回计划做准备。' }
    ]
  }
};

const CATALOG_GROUPS = [
  { id: 'group-star', index: 'I', title: '中心恒星', subtitle: 'THE SUN', objectIds: ['sun'] },
  { id: 'group-terrestrial', index: 'II', title: '类地行星', subtitle: 'TERRESTRIAL', objectIds: ['mercury', 'venus', 'earth', 'mars'] },
  { id: 'group-gas', index: 'III', title: '气态巨行星', subtitle: 'GAS GIANTS', objectIds: ['jupiter', 'saturn'] },
  { id: 'group-ice', index: 'IV', title: '冰巨行星', subtitle: 'ICE GIANTS', objectIds: ['uranus', 'neptune'] },
  { id: 'group-moons', index: 'V', title: '卫星系统', subtitle: 'MOONS', objectIds: ['moon', 'io', 'europa', 'ganymede', 'callisto', 'titan', 'enceladus', 'ariel', 'titania', 'triton'] },
  { id: 'group-rings', index: 'VI', title: '行星环系统', subtitle: 'RING SYSTEMS', objectIds: ['ring-saturn', 'ring-uranus', 'ring-jupiter', 'ring-neptune'] },
  { id: 'group-small', index: 'VII', title: '小天体与陨石', subtitle: 'SMALL BODIES', objectIds: ['ceres', 'vesta', 'pallas', 'halley', 'baringer', 'hoba'] },
  { id: 'group-human', index: 'VIII', title: '人类造物', subtitle: 'HUMAN OBJECTS', objectIds: ['iss', 'hubble', 'voyager1', 'voyager2', 'pioneer10', 'pioneer11', 'cassini', 'juno', 'newHorizons', 'curiosity', 'perseverance'] }
];

const DEEP_SPACE_MISSIONS = ['voyager1', 'voyager2', 'pioneer10', 'newHorizons'];

const PLANET_ORDER = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

window.CELESTIAL_DATA = CELESTIAL_DATA;
window.CATALOG_GROUPS = CATALOG_GROUPS;
window.DEEP_SPACE_MISSIONS = DEEP_SPACE_MISSIONS;
window.PLANET_ORDER = PLANET_ORDER;
