import type { HistoricalRegion } from "../../types/history";

type Position = [number, number];

const polygon = (points: Position[]): HistoricalRegion["geometry"] => ({
  type: "Polygon",
  coordinates: [[...points, points[0]]]
});

export const regions1500To1550: HistoricalRegion[] = [
  {
    id: "ming-1500-1550",
    periodId: "1500-1550",
    name: "明朝",
    type: "empire",
    color: "#f3a6a6",
    labelPosition: { lat: 34, lng: 108 },
    countryNames: ["China"],
    geometry: polygon([
      [98, 21],
      [100, 41],
      [112, 43],
      [121, 39],
      [124, 31],
      [120, 23],
      [110, 20]
    ]),
    summary: "明朝处于中后期，中央财政、边防与海上贸易压力逐渐显现。",
    events: [
      {
        year: 1506,
        title: "正德帝即位",
        category: "政治",
        description: "明武宗朱厚照即位，宫廷政治与边防事务成为这一时期的重要议题。"
      },
      {
        year: 1517,
        title: "葡萄牙使团抵达广州",
        category: "贸易",
        description: "葡萄牙人进入中国沿海贸易视野，中外海上接触开始增加。"
      },
      {
        year: 1550,
        title: "俺答汗围攻北京",
        category: "战争",
        description: "蒙古俺答汗进逼北京，暴露明朝北方边防压力。"
      }
    ],
    people: [
      { name: "正德帝", role: "明朝皇帝" },
      { name: "嘉靖帝", role: "明朝皇帝" },
      { name: "俺答汗", role: "蒙古土默特部首领" }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ming_Empire_cca_1580_%28en%29.svg/640px-Ming_Empire_cca_1580_%28en%29.svg.png",
        caption: "明朝疆域示意",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Ming dynasty", url: "https://en.wikipedia.org/wiki/Ming_dynasty" }
    ]
  },
  {
    id: "ottoman-1500-1550",
    periodId: "1500-1550",
    name: "奥斯曼帝国",
    type: "empire",
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
    geometry: polygon([
      [19, 32],
      [21, 45],
      [29, 47],
      [37, 43],
      [44, 37],
      [42, 31],
      [34, 29],
      [27, 34]
    ]),
    summary: "奥斯曼帝国快速扩张，成为连接东地中海、巴尔干和中东的强权。",
    events: [
      {
        year: 1517,
        title: "征服马穆鲁克苏丹国",
        category: "战争",
        description: "奥斯曼控制埃及和叙利亚，扩大在伊斯兰世界的影响。"
      },
      {
        year: 1520,
        title: "苏莱曼一世即位",
        category: "政治",
        description: "苏莱曼一世时期，奥斯曼在军事、法律和建筑上达到高峰。"
      },
      {
        year: 1529,
        title: "第一次围攻维也纳",
        category: "战争",
        description: "奥斯曼向中欧推进，维也纳成为欧洲政治关注焦点。"
      }
    ],
    people: [
      { name: "塞利姆一世", role: "奥斯曼苏丹" },
      { name: "苏莱曼一世", role: "奥斯曼苏丹" }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Suleiman_I_after_1530.jpg/500px-Suleiman_I_after_1530.jpg",
        caption: "苏莱曼一世画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Ottoman Empire", url: "https://en.wikipedia.org/wiki/Ottoman_Empire" }
    ]
  },
  {
    id: "spain-1500-1550",
    periodId: "1500-1550",
    name: "西班牙王国",
    type: "kingdom",
    color: "#f5dd7a",
    labelPosition: { lat: 40, lng: -4 },
    countryNames: ["Spain"],
    geometry: polygon([
      [-9.5, 36.2],
      [-8.5, 43.4],
      [-1.4, 43.8],
      [3.1, 41.7],
      [1.2, 37.2],
      [-4.5, 36.0]
    ]),
    summary: "西班牙完成国家整合后，迅速成为大航海和美洲殖民的核心力量。",
    events: [
      {
        year: 1519,
        title: "麦哲伦船队启航",
        category: "贸易",
        description: "西班牙支持的远航推动环球航行和海上帝国扩张。"
      },
      {
        year: 1521,
        title: "特诺奇蒂特兰陷落",
        category: "殖民",
        description: "科尔特斯征服阿兹特克帝国，西班牙在美洲的统治扩张。"
      },
      {
        year: 1532,
        title: "皮萨罗进入印加帝国",
        category: "殖民",
        description: "西班牙势力开始深入南美安第斯地区。"
      }
    ],
    people: [
      { name: "查理五世", role: "西班牙国王、神圣罗马皇帝" },
      { name: "埃尔南·科尔特斯", role: "征服者" },
      { name: "弗朗西斯科·皮萨罗", role: "征服者" }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hernan_Cortes.jpg/500px-Hernan_Cortes.jpg",
        caption: "埃尔南·科尔特斯画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Spanish Empire", url: "https://en.wikipedia.org/wiki/Spanish_Empire" }
    ]
  },
  {
    id: "aztec-1500-1550",
    periodId: "1500-1550",
    name: "阿兹特克帝国",
    type: "empire",
    color: "#93d5a4",
    labelPosition: { lat: 19, lng: -99 },
    countryNames: ["Mexico"],
    geometry: polygon([
      [-104, 15],
      [-103, 21],
      [-99, 22.5],
      [-96, 20],
      [-95, 17],
      [-99, 14.5]
    ]),
    summary: "阿兹特克帝国在十六世纪初仍是中美洲强权，但很快遭遇西班牙入侵。",
    events: [
      {
        year: 1502,
        title: "蒙特苏马二世即位",
        category: "政治",
        description: "阿兹特克帝国在其统治下维持区域霸权。"
      },
      {
        year: 1519,
        title: "科尔特斯抵达墨西哥湾沿岸",
        category: "殖民",
        description: "西班牙征服者进入中美洲，改变当地政治格局。"
      },
      {
        year: 1521,
        title: "特诺奇蒂特兰陷落",
        category: "战争",
        description: "阿兹特克首都陷落，帝国统治结束。"
      }
    ],
    people: [
      { name: "蒙特苏马二世", role: "阿兹特克统治者" },
      { name: "夸乌特莫克", role: "阿兹特克末代统治者" }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mendoza_Moctezuma_II.jpg/520px-Mendoza_Moctezuma_II.jpg",
        caption: "蒙特苏马二世手抄本图像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Aztec Empire", url: "https://en.wikipedia.org/wiki/Aztec_Empire" }
    ]
  },
  {
    id: "mughal-1500-1550",
    periodId: "1500-1550",
    name: "莫卧儿帝国",
    type: "empire",
    color: "#c8a8f2",
    labelPosition: { lat: 27, lng: 78 },
    countryNames: ["India", "Pakistan", "Bangladesh"],
    geometry: polygon([
      [72, 22],
      [73.5, 32],
      [77.5, 34],
      [84.5, 31],
      [86, 25],
      [82, 21],
      [76, 20]
    ]),
    summary: "莫卧儿帝国在十六世纪前期建立，逐渐成为南亚北部的重要政权。",
    events: [
      {
        year: 1526,
        title: "第一次帕尼帕特战役",
        category: "战争",
        description: "巴布尔击败德里苏丹国，莫卧儿帝国建立。"
      },
      {
        year: 1530,
        title: "胡马雍继位",
        category: "政治",
        description: "莫卧儿早期统治出现波折，政权仍在巩固中。"
      }
    ],
    people: [
      { name: "巴布尔", role: "莫卧儿帝国开创者" },
      { name: "胡马雍", role: "莫卧儿皇帝" }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Babur_of_India.jpg/520px-Babur_of_India.jpg",
        caption: "巴布尔画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Mughal Empire", url: "https://en.wikipedia.org/wiki/Mughal_Empire" }
    ]
  },
  {
    id: "portugal-1500-1550",
    periodId: "1500-1550",
    name: "葡萄牙王国",
    type: "kingdom",
    color: "#8fd3d1",
    labelPosition: { lat: 39, lng: -8 },
    countryNames: ["Portugal"],
    geometry: polygon([
      [-9.5, 37.0],
      [-8.9, 42.1],
      [-6.4, 41.8],
      [-6.2, 37.1]
    ]),
    summary: "葡萄牙沿非洲、印度洋和东亚扩展海上贸易网络。",
    events: [
      {
        year: 1500,
        title: "卡布拉尔抵达巴西",
        category: "殖民",
        description: "葡萄牙开始在南美获得殖民据点。"
      },
      {
        year: 1510,
        title: "占领果阿",
        category: "贸易",
        description: "果阿成为葡萄牙在印度洋贸易体系中的关键据点。"
      },
      {
        year: 1543,
        title: "葡萄牙人抵达日本",
        category: "贸易",
        description: "欧洲商人与火器技术进入日本战国时代。"
      }
    ],
    people: [
      { name: "曼努埃尔一世", role: "葡萄牙国王" },
      { name: "阿方索·德·阿尔布克尔克", role: "葡萄牙总督" }
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Afonso_de_Albuquerque_%28ca._1453-1515%29.jpg/520px-Afonso_de_Albuquerque_%28ca._1453-1515%29.jpg",
        caption: "阿方索·德·阿尔布克尔克画像",
        source: "Wikimedia Commons"
      }
    ],
    sources: [
      { label: "Portuguese Empire", url: "https://en.wikipedia.org/wiki/Portuguese_Empire" }
    ]
  }
];
