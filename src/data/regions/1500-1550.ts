import type { HistoricalRegion } from "../../types/history";

const periodId = "1500-1550";

export const regions1500To1550: HistoricalRegion[] = [
  {
    id: "china-1500-1550",
    periodId,
    name: "中国",
    modernName: "中国",
    type: "modern-area",
    color: "#f3a6a6",
    labelPosition: { lat: 34, lng: 108 },
    countryNames: ["China"],
    themes: ["政治", "战争", "贸易"],
    importance: "A",
    summary:
      "现代中国区域在这一时期大部分处于明朝统治下，北方草原、西北和边疆地带同时存在蒙古诸部、吐鲁番等区域势力活动。",
    historicalStatuses: [
      {
        name: "明朝",
        type: "政权",
        territoryNote:
          "控制中原、江南、华南、西南大部以及主要农业区，是这一时期中国区域的主体政权。"
      },
      {
        name: "蒙古诸部",
        type: "区域势力",
        territoryNote:
          "活跃于长城以北草原地带，并持续对明朝北部边防构成压力。"
      },
      {
        name: "吐鲁番等西域势力",
        type: "区域势力",
        territoryNote:
          "西北部分地区并不等同于明朝内地治理结构，存在多种地方势力和交通网络。"
      }
    ],
    events: [
      {
        year: 1506,
        title: "正德帝即位",
        category: "政治",
        importance: "B",
        description: "明武宗朱厚照即位，宫廷政治与边防事务成为这一时期的重要议题。"
      },
      {
        year: 1517,
        title: "葡萄牙使团抵达广州",
        category: "贸易",
        importance: "A",
        description: "葡萄牙人进入中国沿海贸易视野，中外海上接触开始增加。"
      },
      {
        year: 1550,
        title: "俺答汗围攻北京",
        category: "战争",
        importance: "A",
        description: "蒙古俺答汗进逼北京，暴露明朝北方边防压力。"
      }
    ],
    people: [
      { name: "正德帝", role: "明朝皇帝" },
      { name: "嘉靖帝", role: "明朝皇帝" },
      { name: "俺答汗", role: "蒙古土默特部首领" }
    ],
    connections: [
      {
        title: "白银与海上贸易",
        description:
          "葡萄牙进入东亚海域后，中国沿海贸易逐渐被卷入更广阔的印度洋和太平洋贸易网络。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ming_Empire_cca_1580_%28en%29.svg/640px-Ming_Empire_cca_1580_%28en%29.svg.png",
        caption: "明朝疆域示意",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Ming dynasty", url: "https://en.wikipedia.org/wiki/Ming_dynasty" },
      { label: "Altan Khan", url: "https://en.wikipedia.org/wiki/Altan_Khan" }
    ]
  },
  {
    id: "ottoman-core-1500-1550",
    periodId,
    name: "土耳其及东地中海",
    modernName: "土耳其及东地中海",
    type: "macro-region",
    color: "#f7c267",
    labelPosition: { lat: 39, lng: 32 },
    countryNames: [
      "Turkey",
      "Syria",
      "Iraq",
      "Egypt",
      "Greece",
      "Bulgaria",
      "North Macedonia",
      "Albania",
      "Serbia",
      "Bosnia and Herzegovina"
    ],
    themes: ["政治", "战争", "宗教", "贸易"],
    importance: "S",
    summary:
      "现代土耳其及周边东地中海区域在这一时期以奥斯曼帝国为核心，奥斯曼势力向巴尔干、中东和北非快速扩张。",
    historicalStatuses: [
      {
        name: "奥斯曼帝国",
        type: "政权",
        territoryNote:
          "以安纳托利亚和巴尔干为核心，并在 1517 年后控制埃及、叙利亚等重要区域。"
      },
      {
        name: "马穆鲁克苏丹国",
        type: "政权",
        endYear: 1517,
        territoryNote: "1517 年前控制埃及和叙利亚，随后被奥斯曼征服。"
      }
    ],
    events: [
      {
        year: 1517,
        title: "征服马穆鲁克苏丹国",
        category: "战争",
        importance: "S",
        description: "奥斯曼控制埃及和叙利亚，并取得伊斯兰世界重要圣地的政治影响。"
      },
      {
        year: 1520,
        title: "苏莱曼一世即位",
        category: "政治",
        importance: "A",
        description: "苏莱曼一世时期，奥斯曼在军事、法律和建筑上达到高峰。"
      },
      {
        year: 1529,
        title: "第一次围攻维也纳",
        category: "战争",
        importance: "A",
        description: "奥斯曼向中欧推进，维也纳成为欧洲政治关注焦点。"
      }
    ],
    people: [
      { name: "塞利姆一世", role: "奥斯曼苏丹" },
      { name: "苏莱曼一世", role: "奥斯曼苏丹" }
    ],
    connections: [
      {
        title: "欧亚贸易与地中海格局",
        description:
          "奥斯曼控制东地中海和中东要道，影响欧洲、印度洋与中东之间的贸易和外交。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Suleiman_I_after_1530.jpg/500px-Suleiman_I_after_1530.jpg",
        caption: "苏莱曼一世画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Ottoman Empire", url: "https://en.wikipedia.org/wiki/Ottoman_Empire" },
      { label: "Suleiman the Magnificent", url: "https://en.wikipedia.org/wiki/Suleiman_the_Magnificent" }
    ]
  },
  {
    id: "spain-1500-1550",
    periodId,
    name: "西班牙",
    modernName: "西班牙",
    type: "modern-area",
    color: "#f5dd7a",
    labelPosition: { lat: 40, lng: -4 },
    countryNames: ["Spain"],
    themes: ["政治", "殖民", "贸易", "战争"],
    importance: "S",
    summary:
      "现代西班牙区域在这一时期属于西班牙王权体系，并迅速成为大航海、海外征服和美洲殖民扩张的重要中心。",
    historicalStatuses: [
      {
        name: "西班牙王国",
        type: "政权",
        territoryNote:
          "伊比利亚半岛上的核心王权，和哈布斯堡帝国体系、海外殖民扩张紧密相连。"
      },
      {
        name: "西班牙殖民势力",
        type: "殖民势力",
        territoryNote: "这一时期开始在美洲快速扩张，影响范围超过现代西班牙本土。"
      }
    ],
    events: [
      {
        year: 1519,
        title: "麦哲伦船队启航",
        category: "贸易",
        importance: "S",
        description: "西班牙支持的远航推动环球航行和海上帝国扩张。"
      },
      {
        year: 1521,
        title: "特诺奇蒂特兰陷落",
        category: "殖民",
        importance: "S",
        description: "科尔特斯征服阿兹特克帝国，西班牙在美洲的统治扩张。"
      },
      {
        year: 1532,
        title: "皮萨罗进入印加帝国",
        category: "殖民",
        importance: "A",
        description: "西班牙势力开始深入南美安第斯地区。"
      }
    ],
    people: [
      { name: "查理五世", role: "西班牙国王、神圣罗马皇帝" },
      { name: "埃尔南·科尔特斯", role: "征服者" },
      { name: "弗朗西斯科·皮萨罗", role: "征服者" }
    ],
    connections: [
      {
        title: "美洲与欧洲的连接",
        description:
          "西班牙扩张把美洲贵金属、殖民制度和欧洲王权财政连接起来，深刻影响全球贸易。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hernan_Cortes.jpg/500px-Hernan_Cortes.jpg",
        caption: "埃尔南·科尔特斯画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Spanish Empire", url: "https://en.wikipedia.org/wiki/Spanish_Empire" },
      { label: "Magellan expedition", url: "https://en.wikipedia.org/wiki/Magellan_expedition" }
    ]
  },
  {
    id: "portugal-1500-1550",
    periodId,
    name: "葡萄牙",
    modernName: "葡萄牙",
    type: "modern-area",
    color: "#8fd3d1",
    labelPosition: { lat: 39, lng: -8 },
    countryNames: ["Portugal"],
    themes: ["贸易", "殖民", "科技"],
    importance: "S",
    summary:
      "现代葡萄牙区域在这一时期是葡萄牙王国核心本土，同时也是向非洲、印度洋、巴西和东亚扩张的海上帝国起点。",
    historicalStatuses: [
      {
        name: "葡萄牙王国",
        type: "政权",
        territoryNote: "伊比利亚半岛西部的王国，也是早期欧洲海外扩张的重要发起者。"
      },
      {
        name: "葡萄牙海上贸易与殖民网络",
        type: "殖民势力",
        territoryNote:
          "势力范围沿非洲海岸、印度洋、巴西和东亚据点展开，远超本土边界。"
      }
    ],
    events: [
      {
        year: 1500,
        title: "卡布拉尔抵达巴西",
        category: "殖民",
        importance: "A",
        description: "葡萄牙开始在南美获得殖民据点。"
      },
      {
        year: 1510,
        title: "占领果阿",
        category: "贸易",
        importance: "A",
        description: "果阿成为葡萄牙在印度洋贸易体系中的关键据点。"
      },
      {
        year: 1543,
        title: "葡萄牙人抵达日本",
        category: "贸易",
        importance: "A",
        description: "欧洲商人与火器技术进入日本战国时代。"
      }
    ],
    people: [
      { name: "曼努埃尔一世", role: "葡萄牙国王" },
      { name: "阿方索·德·阿尔布克尔克", role: "葡萄牙总督" }
    ],
    connections: [
      {
        title: "印度洋贸易网络",
        description:
          "葡萄牙据点把欧洲、非洲、印度洋和东亚连接成早期全球海上贸易网络。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Afonso_de_Albuquerque_%28ca._1453-1515%29.jpg/520px-Afonso_de_Albuquerque_%28ca._1453-1515%29.jpg",
        caption: "阿方索·德·阿尔布克尔克画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Portuguese Empire", url: "https://en.wikipedia.org/wiki/Portuguese_Empire" },
      { label: "Portuguese India", url: "https://en.wikipedia.org/wiki/Portuguese_India" }
    ]
  },
  {
    id: "mexico-1500-1550",
    periodId,
    name: "墨西哥",
    modernName: "墨西哥",
    type: "modern-area",
    color: "#93d5a4",
    labelPosition: { lat: 19, lng: -99 },
    countryNames: ["Mexico"],
    themes: ["政治", "战争", "殖民"],
    importance: "S",
    summary:
      "现代墨西哥中部在十六世纪初以阿兹特克帝国为核心，1521 年后逐步被西班牙殖民体系取代。",
    historicalStatuses: [
      {
        name: "阿兹特克帝国",
        type: "政权",
        endYear: 1521,
        territoryNote: "主要控制中美洲高原核心区域，首都为特诺奇蒂特兰。"
      },
      {
        name: "新西班牙早期殖民统治",
        type: "殖民势力",
        startYear: 1521,
        territoryNote: "西班牙征服后逐步建立殖民统治，改变当地政治与社会结构。"
      }
    ],
    events: [
      {
        year: 1502,
        title: "蒙特苏马二世即位",
        category: "政治",
        importance: "B",
        description: "阿兹特克帝国在其统治下维持区域霸权。"
      },
      {
        year: 1519,
        title: "科尔特斯抵达墨西哥湾沿岸",
        category: "殖民",
        importance: "A",
        description: "西班牙征服者进入中美洲，改变当地政治格局。"
      },
      {
        year: 1521,
        title: "特诺奇蒂特兰陷落",
        category: "战争",
        importance: "S",
        description: "阿兹特克首都陷落，帝国统治结束。"
      }
    ],
    people: [
      { name: "蒙特苏马二世", role: "阿兹特克统治者" },
      { name: "夸乌特莫克", role: "阿兹特克末代统治者" }
    ],
    connections: [
      {
        title: "哥伦布交换",
        description:
          "中美洲被卷入跨大西洋交换体系，人口、疾病、作物和殖民制度都发生剧烈变化。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mendoza_Moctezuma_II.jpg/520px-Mendoza_Moctezuma_II.jpg",
        caption: "蒙特苏马二世手抄本图像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Aztec Empire", url: "https://en.wikipedia.org/wiki/Aztec_Empire" },
      { label: "Spanish conquest of the Aztec Empire", url: "https://en.wikipedia.org/wiki/Spanish_conquest_of_the_Aztec_Empire" }
    ]
  },
  {
    id: "andes-1500-1550",
    periodId,
    name: "安第斯地区",
    modernName: "安第斯地区",
    type: "macro-region",
    color: "#d99b70",
    labelPosition: { lat: -10, lng: -75 },
    countryNames: ["Peru", "Bolivia", "Ecuador"],
    themes: ["政治", "战争", "殖民"],
    importance: "S",
    summary:
      "现代秘鲁、玻利维亚和厄瓜多尔一带在十六世纪初属于印加帝国核心区域，随后被西班牙征服并纳入殖民体系。",
    historicalStatuses: [
      {
        name: "印加帝国",
        type: "政权",
        endYear: 1532,
        territoryNote: "安第斯高原和太平洋沿岸的大帝国，拥有道路、行政和贡赋体系。"
      },
      {
        name: "西班牙殖民统治",
        type: "殖民势力",
        startYear: 1532,
        territoryNote: "皮萨罗进入后，西班牙逐步控制安第斯矿产、劳役和政治体系。"
      }
    ],
    events: [
      {
        year: 1527,
        title: "印加内战前后",
        category: "战争",
        importance: "A",
        description: "王位继承冲突削弱印加统治，为西班牙进入创造条件。"
      },
      {
        year: 1532,
        title: "卡哈马卡事件",
        category: "殖民",
        importance: "S",
        description: "皮萨罗俘获阿塔瓦尔帕，印加帝国政治结构遭到致命打击。"
      }
    ],
    people: [
      { name: "阿塔瓦尔帕", role: "印加统治者" },
      { name: "弗朗西斯科·皮萨罗", role: "西班牙征服者" }
    ],
    connections: [
      {
        title: "白银与殖民经济",
        description:
          "安第斯矿产后来成为西班牙财政和全球白银流动的重要来源。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Inca_Empire_South_America.png/520px-Inca_Empire_South_America.png",
        caption: "印加帝国范围示意",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Inca Empire", url: "https://en.wikipedia.org/wiki/Inca_Empire" },
      { label: "Spanish conquest of the Inca Empire", url: "https://en.wikipedia.org/wiki/Spanish_conquest_of_the_Inca_Empire" }
    ]
  },
  {
    id: "indian-subcontinent-1500-1550",
    periodId,
    name: "印度次大陆",
    modernName: "印度次大陆",
    type: "macro-region",
    color: "#c8a8f2",
    labelPosition: { lat: 27, lng: 78 },
    countryNames: ["India", "Pakistan", "Bangladesh"],
    themes: ["政治", "战争", "贸易", "宗教"],
    importance: "S",
    summary:
      "现代印度、巴基斯坦、孟加拉国所在的南亚区域在这一时期多政权并存，北印度在 1526 年后出现莫卧儿帝国，南部仍有其他强大政权。",
    historicalStatuses: [
      {
        name: "德里苏丹国晚期",
        type: "政权",
        endYear: 1526,
        territoryNote: "1526 年前仍是北印度重要政权之一，随后在帕尼帕特战役中被巴布尔击败。"
      },
      {
        name: "莫卧儿帝国",
        type: "政权",
        startYear: 1526,
        territoryNote: "首先在北印度建立统治，之后逐渐扩张为南亚重要帝国。"
      },
      {
        name: "毗奢耶那伽罗王国等南印度政权",
        type: "多政权并存",
        territoryNote: "南印度并不属于早期莫卧儿统治范围，仍有独立而强大的区域政权。"
      }
    ],
    events: [
      {
        year: 1526,
        title: "第一次帕尼帕特战役",
        category: "战争",
        importance: "S",
        description: "巴布尔击败德里苏丹国，莫卧儿帝国建立。"
      },
      {
        year: 1530,
        title: "胡马雍继位",
        category: "政治",
        importance: "B",
        description: "莫卧儿早期统治出现波折，政权仍在巩固中。"
      }
    ],
    people: [
      { name: "巴布尔", role: "莫卧儿帝国开创者" },
      { name: "胡马雍", role: "莫卧儿皇帝" }
    ],
    connections: [
      {
        title: "印度洋贸易",
        description:
          "南亚港口与红海、波斯湾、东南亚和葡萄牙海上据点相连，是早期全球贸易的重要节点。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Babur_of_India.jpg/520px-Babur_of_India.jpg",
        caption: "巴布尔画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Mughal Empire", url: "https://en.wikipedia.org/wiki/Mughal_Empire" },
      { label: "First Battle of Panipat", url: "https://en.wikipedia.org/wiki/First_Battle_of_Panipat" }
    ]
  },
  {
    id: "japan-1500-1550",
    periodId,
    name: "日本",
    modernName: "日本",
    type: "modern-area",
    color: "#f2b6d0",
    labelPosition: { lat: 36, lng: 138 },
    countryNames: ["Japan"],
    themes: ["战争", "贸易", "科技"],
    importance: "A",
    summary:
      "现代日本区域处于战国时代，各地大名割据竞争。1543 年后葡萄牙人带来的火器影响日本战争方式。",
    historicalStatuses: [
      {
        name: "室町幕府名义统治",
        type: "政权",
        territoryNote: "京都幕府仍存在，但中央权威衰弱，地方大名实际割据。"
      },
      {
        name: "战国大名并立",
        type: "多政权并存",
        territoryNote: "各地大名争夺土地、贸易和军事优势，形成长期内战格局。"
      }
    ],
    events: [
      {
        year: 1543,
        title: "葡萄牙人抵达种子岛",
        category: "贸易",
        importance: "A",
        description: "欧洲火器传入日本，对战国时代军事技术产生影响。"
      },
      {
        year: 1534,
        title: "织田信长出生",
        category: "政治",
        importance: "B",
        description: "后来推动日本统一进程的重要人物出生。"
      }
    ],
    people: [
      { name: "足利义晴", role: "室町幕府将军" },
      { name: "织田信长", role: "战国大名，后来的统一推动者" }
    ],
    connections: [
      {
        title: "火器与东亚海路",
        description:
          "葡萄牙商人把日本接入东亚和印度洋贸易网络，也带来火器、传教和新商品。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Oda_Nobunaga_Portrait.png/520px-Oda_Nobunaga_Portrait.png",
        caption: "织田信长画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Sengoku period", url: "https://en.wikipedia.org/wiki/Sengoku_period" },
      { label: "Tanegashima", url: "https://en.wikipedia.org/wiki/Tanegashima_(Japanese_matchlock)" }
    ]
  },
  {
    id: "korea-1500-1550",
    periodId,
    name: "朝鲜半岛",
    modernName: "朝鲜半岛",
    type: "macro-region",
    color: "#b9db8c",
    labelPosition: { lat: 37.8, lng: 127.5 },
    countryNames: ["South Korea", "North Korea"],
    themes: ["政治", "文化"],
    importance: "B",
    summary:
      "现代朝鲜半岛在这一时期处于朝鲜王朝统治下，政治上维持儒家官僚秩序，同时经历宫廷政治和社会制度调整。",
    historicalStatuses: [
      {
        name: "朝鲜王朝",
        type: "政权",
        territoryNote: "控制朝鲜半岛大部，实行以儒家官僚体系为核心的国家治理。"
      }
    ],
    events: [
      {
        year: 1506,
        title: "中宗反正",
        category: "政治",
        importance: "B",
        description: "燕山君被废，中宗即位，朝鲜宫廷政治进入新阶段。"
      },
      {
        year: 1517,
        title: "士林政治影响扩大",
        category: "文化",
        importance: "C",
        description: "儒家士人群体在朝鲜政治文化中的影响逐渐增强。"
      }
    ],
    people: [
      { name: "中宗", role: "朝鲜王朝国王" },
      { name: "赵光祖", role: "朝鲜儒臣与改革人物" }
    ],
    connections: [
      {
        title: "东亚儒家秩序",
        description:
          "朝鲜与明朝保持朝贡和文化联系，儒家政治理念塑造半岛社会秩序。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Flag_of_the_king_of_Joseon.svg/520px-Flag_of_the_king_of_Joseon.svg.png",
        caption: "朝鲜王朝王旗示意",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Joseon", url: "https://en.wikipedia.org/wiki/Joseon" },
      { label: "Jungjong of Joseon", url: "https://en.wikipedia.org/wiki/Jungjong_of_Joseon" }
    ]
  },
  {
    id: "england-1500-1550",
    periodId,
    name: "英格兰",
    modernName: "英格兰",
    type: "modern-area",
    color: "#a8c7f2",
    labelPosition: { lat: 52, lng: -1.5 },
    countryNames: ["United Kingdom"],
    themes: ["政治", "宗教"],
    importance: "A",
    summary:
      "现代英国区域中的英格兰在这一时期处于都铎王朝统治下，亨利八世时期的宗教改革改变了王权、教会和国家关系。",
    historicalStatuses: [
      {
        name: "都铎王朝英格兰",
        type: "政权",
        territoryNote: "以英格兰王权为核心，逐渐强化中央权威。"
      },
      {
        name: "英格兰宗教改革",
        type: "区域势力",
        territoryNote: "王权脱离罗马教廷控制，英格兰教会与国家政治深度绑定。"
      }
    ],
    events: [
      {
        year: 1509,
        title: "亨利八世即位",
        category: "政治",
        importance: "A",
        description: "都铎王权进入亨利八世时期。"
      },
      {
        year: 1534,
        title: "至尊法案",
        category: "宗教",
        importance: "S",
        description: "英格兰国王成为英格兰教会最高首脑，宗教与政治秩序发生重大变化。"
      }
    ],
    people: [
      { name: "亨利八世", role: "英格兰国王" },
      { name: "托马斯·克伦威尔", role: "英格兰政治改革人物" }
    ],
    connections: [
      {
        title: "欧洲宗教改革",
        description:
          "英格兰宗教改革与欧洲大陆宗教改革相互呼应，但其政治动力具有鲜明王权色彩。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg/520px-Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg",
        caption: "亨利八世画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Henry VIII", url: "https://en.wikipedia.org/wiki/Henry_VIII" },
      { label: "Acts of Supremacy", url: "https://en.wikipedia.org/wiki/Acts_of_Supremacy" }
    ]
  },
  {
    id: "france-1500-1550",
    periodId,
    name: "法国",
    modernName: "法国",
    type: "modern-area",
    color: "#98b8e8",
    labelPosition: { lat: 46.5, lng: 2 },
    countryNames: ["France"],
    themes: ["政治", "战争", "文化"],
    importance: "A",
    summary:
      "现代法国区域由瓦卢瓦王朝统治，法国深度参与意大利战争，并在文艺复兴文化和中央王权建设中持续发展。",
    historicalStatuses: [
      {
        name: "瓦卢瓦王朝法国",
        type: "政权",
        territoryNote: "法国王权继续加强，并与哈布斯堡势力围绕意大利和欧洲霸权竞争。"
      }
    ],
    events: [
      {
        year: 1515,
        title: "马里尼亚诺战役",
        category: "战争",
        importance: "A",
        description: "弗朗索瓦一世取得胜利，法国继续介入意大利事务。"
      },
      {
        year: 1539,
        title: "维莱科特雷敕令",
        category: "政治",
        importance: "B",
        description: "法语在法律和行政文件中的地位提升，推动国家行政整合。"
      }
    ],
    people: [
      { name: "弗朗索瓦一世", role: "法国国王" },
      { name: "莱昂纳多·达·芬奇", role: "晚年受法国王室庇护的艺术家" }
    ],
    connections: [
      {
        title: "意大利战争",
        description:
          "法国、哈布斯堡和意大利城邦的战争把文艺复兴、外交和军事竞争联系在一起。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Fran%C3%A7ois_Ier_Louvre.jpg/520px-Fran%C3%A7ois_Ier_Louvre.jpg",
        caption: "弗朗索瓦一世画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Francis I of France", url: "https://en.wikipedia.org/wiki/Francis_I_of_France" },
      { label: "Italian Wars", url: "https://en.wikipedia.org/wiki/Italian_Wars" }
    ]
  },
  {
    id: "central-europe-1500-1550",
    periodId,
    name: "中欧德意志地区",
    modernName: "中欧德意志地区",
    type: "macro-region",
    color: "#dec28c",
    labelPosition: { lat: 50.5, lng: 10 },
    countryNames: ["Germany", "Austria", "Switzerland", "Czechia"],
    themes: ["宗教", "政治", "战争"],
    importance: "S",
    summary:
      "现代德国、奥地利、瑞士和周边中欧区域处于神圣罗马帝国框架内，1517 年后宗教改革深刻改变欧洲政治和宗教格局。",
    historicalStatuses: [
      {
        name: "神圣罗马帝国",
        type: "政权",
        territoryNote:
          "由众多诸侯、城市和教会领地组成，皇帝与地方势力之间存在复杂权力关系。"
      },
      {
        name: "宗教改革地区",
        type: "文明圈",
        territoryNote:
          "路德宗和其他改革思想在德意志、瑞士等地传播，推动教会与政治结构重组。"
      }
    ],
    events: [
      {
        year: 1517,
        title: "路德提出九十五条论纲",
        category: "宗教",
        importance: "S",
        description: "宗教改革由此扩散，挑战天主教会权威。"
      },
      {
        year: 1521,
        title: "沃尔姆斯会议",
        category: "宗教",
        importance: "A",
        description: "路德拒绝撤回观点，宗教冲突和政治分裂加深。"
      },
      {
        year: 1525,
        title: "德意志农民战争",
        category: "战争",
        importance: "A",
        description: "社会、宗教和经济矛盾交织，农民起义被镇压。"
      }
    ],
    people: [
      { name: "马丁·路德", role: "宗教改革核心人物" },
      { name: "查理五世", role: "神圣罗马皇帝" }
    ],
    connections: [
      {
        title: "宗教改革与印刷传播",
        description:
          "印刷术帮助宗教改革文本迅速扩散，改变欧洲知识传播与政治动员方式。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Martin_Luther_by_Cranach-restoration.jpg/520px-Martin_Luther_by_Cranach-restoration.jpg",
        caption: "马丁·路德画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Reformation", url: "https://en.wikipedia.org/wiki/Reformation" },
      { label: "Martin Luther", url: "https://en.wikipedia.org/wiki/Martin_Luther" }
    ]
  },
  {
    id: "russia-1500-1550",
    periodId,
    name: "俄罗斯及东欧北部",
    modernName: "俄罗斯及东欧北部",
    type: "macro-region",
    color: "#d6b0e6",
    labelPosition: { lat: 56, lng: 38 },
    countryNames: ["Russia"],
    themes: ["政治", "战争"],
    importance: "A",
    summary:
      "现代俄罗斯核心区域在这一时期以莫斯科大公国为中心，逐步向沙皇国家过渡，并开始向伏尔加方向扩张。",
    historicalStatuses: [
      {
        name: "莫斯科大公国",
        type: "政权",
        territoryNote: "以莫斯科为中心整合罗斯诸地，是俄罗斯国家形成的重要阶段。"
      },
      {
        name: "俄罗斯沙皇国早期",
        type: "政权",
        startYear: 1547,
        territoryNote: "伊凡四世加冕为沙皇后，国家称号和政治权威发生变化。"
      }
    ],
    events: [
      {
        year: 1533,
        title: "伊凡四世继位",
        category: "政治",
        importance: "B",
        description: "伊凡四世成为莫斯科统治者，后来以沙皇身份加强中央权力。"
      },
      {
        year: 1547,
        title: "伊凡四世加冕为沙皇",
        category: "政治",
        importance: "A",
        description: "沙皇称号强化莫斯科国家的帝国性和正统性想象。"
      }
    ],
    people: [{ name: "伊凡四世", role: "俄罗斯沙皇" }],
    connections: [
      {
        title: "欧亚边疆扩张",
        description:
          "莫斯科国家的扩张把东欧森林地带、草原边疆和欧亚贸易通道连接起来。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Ivan_the_Terrible_%28cropped%29.jpg/520px-Ivan_the_Terrible_%28cropped%29.jpg",
        caption: "伊凡四世画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Ivan the Terrible", url: "https://en.wikipedia.org/wiki/Ivan_the_Terrible" },
      { label: "Grand Duchy of Moscow", url: "https://en.wikipedia.org/wiki/Grand_Duchy_of_Moscow" }
    ]
  },
  {
    id: "iran-1500-1550",
    periodId,
    name: "伊朗",
    modernName: "伊朗",
    type: "modern-area",
    color: "#e2aa89",
    labelPosition: { lat: 32, lng: 53 },
    countryNames: ["Iran"],
    themes: ["政治", "宗教", "战争"],
    importance: "A",
    summary:
      "现代伊朗区域在这一时期由萨法维王朝兴起并整合，什叶派国家认同逐渐形成，成为奥斯曼与中亚势力之间的重要力量。",
    historicalStatuses: [
      {
        name: "萨法维王朝",
        type: "政权",
        startYear: 1501,
        territoryNote: "以伊朗高原为核心建立政权，并推动十二伊玛目什叶派成为国家宗教。"
      }
    ],
    events: [
      {
        year: 1501,
        title: "伊斯玛仪一世建立萨法维王朝",
        category: "政治",
        importance: "A",
        description: "萨法维政权兴起，重塑伊朗政治与宗教身份。"
      },
      {
        year: 1514,
        title: "查尔迪兰战役",
        category: "战争",
        importance: "A",
        description: "奥斯曼击败萨法维，火器与骑兵战术差异显现，边界竞争长期化。"
      }
    ],
    people: [{ name: "伊斯玛仪一世", role: "萨法维王朝建立者" }],
    connections: [
      {
        title: "奥斯曼-萨法维竞争",
        description:
          "伊朗与奥斯曼的宗教和地缘竞争影响中东政治格局，也改变东西方贸易通道。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Shah_Ismail_I_of_Persia.jpg/520px-Shah_Ismail_I_of_Persia.jpg",
        caption: "伊斯玛仪一世画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Safavid Iran", url: "https://en.wikipedia.org/wiki/Safavid_Iran" },
      { label: "Battle of Chaldiran", url: "https://en.wikipedia.org/wiki/Battle_of_Chaldiran" }
    ]
  },
  {
    id: "southeast-asia-mainland-1500-1550",
    periodId,
    name: "东南亚大陆",
    modernName: "东南亚大陆",
    type: "macro-region",
    color: "#92d6a4",
    labelPosition: { lat: 15, lng: 101 },
    countryNames: ["Thailand", "Myanmar", "Cambodia", "Laos", "Vietnam"],
    themes: ["政治", "战争", "贸易"],
    importance: "B",
    summary:
      "现代泰国、缅甸、柬埔寨、老挝、越南所在区域在这一时期多政权并存，内陆王国和沿海贸易共同塑造区域格局。",
    historicalStatuses: [
      {
        name: "阿瑜陀耶王国",
        type: "政权",
        territoryNote: "位于现代泰国中部，是东南亚大陆重要贸易和政治中心。"
      },
      {
        name: "东吁王朝兴起",
        type: "政权",
        territoryNote: "缅甸地区的东吁势力在十六世纪前期崛起。"
      },
      {
        name: "大越与占城余部",
        type: "多政权并存",
        territoryNote: "越南北部和中南部存在不同政治力量，区域整合仍在推进。"
      }
    ],
    events: [
      {
        year: 1511,
        title: "马六甲陷落影响区域贸易",
        category: "贸易",
        importance: "A",
        description: "葡萄牙占领马六甲后，东南亚大陆与岛屿世界的贸易路线受到影响。"
      },
      {
        year: 1531,
        title: "东吁王朝扩张",
        category: "政治",
        importance: "B",
        description: "东吁势力在缅甸地区增强，为后续区域扩张奠定基础。"
      }
    ],
    people: [{ name: "莽瑞体", role: "东吁王朝统治者" }],
    connections: [
      {
        title: "陆上王国与海上贸易",
        description:
          "东南亚大陆同时受到内陆农业王国和马六甲、印度洋贸易网络的影响。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Map_of_Southeast_Asia.svg/520px-Map_of_Southeast_Asia.svg.png",
        caption: "东南亚区域示意",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Ayutthaya Kingdom", url: "https://en.wikipedia.org/wiki/Ayutthaya_Kingdom" },
      { label: "Toungoo dynasty", url: "https://en.wikipedia.org/wiki/Toungoo_dynasty" }
    ]
  },
  {
    id: "maritime-southeast-asia-1500-1550",
    periodId,
    name: "马来群岛与马六甲",
    modernName: "马来群岛与马六甲",
    type: "macro-region",
    color: "#70c6c4",
    labelPosition: { lat: 1.5, lng: 103 },
    countryNames: ["Malaysia", "Indonesia", "Brunei"],
    themes: ["贸易", "殖民", "宗教"],
    importance: "A",
    summary:
      "现代马来西亚、印度尼西亚和文莱所在海域是香料贸易和穆斯林商贸网络的重要区域。1511 年葡萄牙占领马六甲，改变海上贸易格局。",
    historicalStatuses: [
      {
        name: "马六甲苏丹国",
        type: "政权",
        endYear: 1511,
        territoryNote: "控制马六甲海峡贸易节点，是印度洋与东亚贸易之间的重要中转。"
      },
      {
        name: "葡萄牙马六甲",
        type: "殖民势力",
        startYear: 1511,
        territoryNote: "葡萄牙占领马六甲后，试图控制香料和海峡贸易。"
      },
      {
        name: "亚齐、柔佛等区域势力",
        type: "多政权并存",
        territoryNote: "马六甲陷落后，区域贸易与政治中心分散到多个海上政权。"
      }
    ],
    events: [
      {
        year: 1511,
        title: "葡萄牙占领马六甲",
        category: "殖民",
        importance: "S",
        description: "欧洲势力进入东南亚核心贸易节点，改变印度洋到东亚的商路竞争。"
      },
      {
        year: 1520,
        title: "海上穆斯林商贸网络重组",
        category: "贸易",
        importance: "B",
        description: "马六甲陷落后，亚齐、柔佛等地成为新的区域竞争者。"
      }
    ],
    people: [{ name: "阿方索·德·阿尔布克尔克", role: "葡萄牙征服马六甲的总督" }],
    connections: [
      {
        title: "香料贸易",
        description:
          "马六甲连接印度洋、南海和香料群岛，是早期全球贸易体系中的关键节点。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Malacca_1630.jpg/520px-Malacca_1630.jpg",
        caption: "马六甲历史图像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Malacca Sultanate", url: "https://en.wikipedia.org/wiki/Malacca_Sultanate" },
      { label: "Portuguese Malacca", url: "https://en.wikipedia.org/wiki/Portuguese_Malacca" }
    ]
  },
  {
    id: "west-africa-1500-1550",
    periodId,
    name: "西非",
    modernName: "西非",
    type: "macro-region",
    color: "#d7c36b",
    labelPosition: { lat: 15, lng: -3 },
    countryNames: ["Mali", "Niger", "Nigeria", "Ghana", "Senegal"],
    themes: ["政治", "贸易", "宗教"],
    importance: "A",
    summary:
      "现代西非区域在这一时期存在桑海帝国、豪萨城邦和沿海贸易网络，撒哈拉贸易、伊斯兰文化和欧洲海岸接触共同影响区域格局。",
    historicalStatuses: [
      {
        name: "桑海帝国",
        type: "政权",
        territoryNote: "控制尼日尔河流域重要城市和跨撒哈拉贸易路线。"
      },
      {
        name: "豪萨城邦等区域势力",
        type: "多政权并存",
        territoryNote: "现代尼日利亚北部和周边存在多个商业和政治中心。"
      },
      {
        name: "欧洲沿海贸易接触",
        type: "殖民势力",
        territoryNote: "葡萄牙等欧洲势力在西非海岸建立贸易据点，但内陆政治仍由非洲政权主导。"
      }
    ],
    events: [
      {
        year: 1493,
        title: "阿斯基亚·穆罕默德统治桑海",
        category: "政治",
        importance: "A",
        description: "桑海帝国进入强盛阶段，廷巴克图等城市成为学术和贸易中心。"
      },
      {
        year: 1500,
        title: "跨撒哈拉贸易持续活跃",
        category: "贸易",
        importance: "B",
        description: "黄金、盐、奴隶和学术网络连接西非、北非和伊斯兰世界。"
      }
    ],
    people: [{ name: "阿斯基亚·穆罕默德", role: "桑海帝国统治者" }],
    connections: [
      {
        title: "撒哈拉与大西洋",
        description:
          "西非同时连接跨撒哈拉贸易和欧洲海岸贸易，是旧贸易网络和新海路接触的交汇地。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Songhai_Empire.svg/520px-Songhai_Empire.svg.png",
        caption: "桑海帝国示意",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Songhai Empire", url: "https://en.wikipedia.org/wiki/Songhai_Empire" },
      { label: "Askia Muhammad", url: "https://en.wikipedia.org/wiki/Askia_Muhammad" }
    ]
  },
  {
    id: "ethiopia-east-africa-1500-1550",
    periodId,
    name: "埃塞俄比亚与东非",
    modernName: "埃塞俄比亚与东非",
    type: "macro-region",
    color: "#a7d18c",
    labelPosition: { lat: 9, lng: 39 },
    countryNames: ["Ethiopia", "Eritrea", "Somalia"],
    themes: ["战争", "宗教", "贸易"],
    importance: "A",
    summary:
      "现代埃塞俄比亚、厄立特里亚和索马里一带在这一时期经历基督教埃塞俄比亚、阿达尔苏丹国和葡萄牙援助之间的冲突，红海贸易也影响区域格局。",
    historicalStatuses: [
      {
        name: "埃塞俄比亚帝国",
        type: "政权",
        territoryNote: "基督教王国，控制高原核心地区。"
      },
      {
        name: "阿达尔苏丹国",
        type: "政权",
        territoryNote: "位于非洲之角的穆斯林政权，与埃塞俄比亚发生长期冲突。"
      },
      {
        name: "葡萄牙军事援助",
        type: "殖民势力",
        territoryNote: "葡萄牙介入红海和印度洋区域竞争，并在埃塞俄比亚战争中提供援助。"
      }
    ],
    events: [
      {
        year: 1529,
        title: "埃塞俄比亚-阿达尔战争爆发",
        category: "战争",
        importance: "A",
        description: "阿达尔苏丹国进攻埃塞俄比亚，高原政治与宗教格局受到冲击。"
      },
      {
        year: 1541,
        title: "葡萄牙援军抵达埃塞俄比亚",
        category: "战争",
        importance: "B",
        description: "葡萄牙介入非洲之角战争，红海和印度洋竞争进一步交织。"
      }
    ],
    people: [
      { name: "艾哈迈德·格兰", role: "阿达尔军事领袖" },
      { name: "克里斯托旺·达伽马", role: "葡萄牙远征指挥官" }
    ],
    connections: [
      {
        title: "红海与印度洋",
        description:
          "东非战争与奥斯曼、葡萄牙和印度洋贸易竞争相关，说明区域冲突已被卷入跨海体系。"
      }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Portuguese_Empire_16th_century.png/520px-Portuguese_Empire_16th_century.png",
        caption: "葡萄牙海上扩张示意",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Ethiopian-Adal War", url: "https://en.wikipedia.org/wiki/Ethiopian%E2%80%93Adal_War" },
      { label: "Adal Sultanate", url: "https://en.wikipedia.org/wiki/Adal_Sultanate" }
    ]
  }
];
