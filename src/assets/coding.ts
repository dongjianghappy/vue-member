

const codings: any = {
  article: {
    name: "article",
    art: "U0010000",
    info: "U0010001",
    cate: "U0010002",
    comment: "U0010003",
    praise: "U0010004",
    collect: "U0010005",
  },
  tech: {
    name: "tech",
    art: "U0020000",
    info: "U0020001",
    cate: "U0020002",
    comment: "U0020003",
    praise: "U0020004",
    collect: "U0020005",
  },
  picture: {
    name: "picture",
    art: "U0030000",
    info: "U0030001",
    cate: "U0030002",
    comment: "U0030003",
    praise: "U0030004",
    collect: "U0030005",
    group: "U0620019",
  },
  music: {
    name: "music",
    art: "U0040000",
    info: "U0040001",
    cate: "U0040002",
    comment: "U0040003",
    praise: "U0040004",
    collect: "U0040005",
    album: "U0620032",
    lrc: "U0620033",
    score: "U0620034",
    singer: "U0620035",    
  },
  video: {
    name: "video",
    art: "U0050000",
    info: "U0050001",
    cate: "U0050002",
    comment: "U0050003",
    praise: "U0050004",
    collect: "U0050005",
  },
  source: {
    name: "source",
    art: "U0060000",
    info: "U0060001",
    cate: "U0060002",
    comment: "U0060003",
    praise: "U0060004",
    collect: "U0060005",
  },
  design: {
    name: "design",
    art: "U0070000",
    info: "U0070001",
    cate: "U0070002",
    comment: "U0070003",
    praise: "U0070004",
    collect: "U0070005",
  },
  funny: {
    name: "funny",
    art: "U0080000",
    info: "U0080001",
    cate: "U0080002",
    comment: "U0080003",
    praise: "U0080004",
    collect: "U0080005",
  },
  notes: {
    name: "notes",
    art: "U0090000",
    info: "U0090001",
    cate: "U0090002",
    comment: "U0090003",
    praise: "U0090004",
    collect: "U0090005",
  },
  digital: {
    name: "digital",
    art: "U0100000",
    info: "U0100001",
    cate: "U0100002",
    comment: "U0100003",
    praise: "U0100004",
    collect: "U0100005",
  },
  talk: {
    name: "talk",
    art: "U0110000",
    info: "U0110001",
    cate: "U0110002",
    comment: "U0110003",
    praise: "U0110004",
    collect: "U0110005",
    album: {
      list: 'U0620000',
      comment: 'U0620001',
      praise: 'U0620005',
      visit: 'U0620006'
    },
    photos: {
      list: 'U0620002',
      comment: 'U0620003',

    },
    favorites: {
      cate: 'U0620010',
      art: 'U0620011'
    },
    journal: {
      art: 'U0620012',
      cate: 'U0620015',
      collect: 'U0620013',
      comment: 'U0620014',
      praise: 'U0620016'
    },
    message_board: {
      message: 'U0620017',
      reply: 'U0620018'
    },
    search: {
      list: 'U0620020',
      setting: 'U0620021',
      statistics: 'U0620022',
      word: 'U0620023',

    },
    statistics: {
      list: 'U0620024',
      ip: 'U0620025',
      ip_lib: 'U0620026'
    },
    activity: "U0620027",
    config: 'U0620009',
    visit: "U0620029",
    video_group: "U0620028",
    article_group: "U0620007",
    blog_group: "U0620008",
    picture_group: "U0620019",
  },
  questions: {
    name: "questions",
    art: "U0120000",
    info: "U0120001",
    cate: "U0120002",
    comment: "U0120003",
    praise: "U0120004",
    collect: "U0120005",
    answer: 'U0660000',
    answer_praise: 'U0660001'
  },
  game: {
    name: "game",
    art: "U0130000",
    info: "U0130001",
    cate: "U0130002",
    comment: "U0130003",
    praise: "U0130004",
    collect: "U0130005",
  },
  document: {
    name: "document",
    art: "U0140000",
    info: "U0140001",
    cate: "U0140002",
    comment: "U0140003",
    praise: "U0140004",
    collect: "U0140005",
  },
  software: {
    name: "software",
    art: "U0150000",
    info: "U0150001",
    cate: "U0150002",
    comment: "U0150003",
    praise: "U0150004",
    collect: "U0150005",
  },  
  goods: {
    name: "goods",
    art: "U0160000",
    info: "U0160001",
    cate: "U0160002",
    comment: "U0160003",
    praise: "U0160004",
    collect: "U0160005",
  },    
  experience: {
    name: "experience",
    art: "U0170000",
    info: "U0170001",
    cate: "U0170002",
    comment: "U0170003",
    praise: "U0170004",
    collect: "U0170005",
  },
  learn: {
    name: "learn",
    art: "U0180000",
    info: "U0180001",
    cate: "U0180002",
    comment: "U0180003",
    praise: "U0180004",
    collect: "U0180005",
  },
  haosite: {
    name: "haosite",
    art: "U0190000",
    info: "U0190001",
    cate: "U0190002",
    comment: "U0190003",
    praise: "U0190004",
    collect: "U0190005",
  },
  works: {
    name: "works",
    art: "U0200000",
    info: "U0200001",
    cate: "U0200002",
    comment: "U0200003",
    praise: "U0200004",
    collect: "U0200005",
  },
  media: {
    name: "media",
    art: "U0210000",
    info: "U0210001",
    cate: "U0210002",
    comment: "U0210003",
    praise: "U0210004",
    collect: "U0210005",
  },
  blog: {
    name: "blog",
    art: "U0220000",
    info: "U0220001",
    cate: "U0220002",
    comment: "U0220003",
    praise: "U0220004",
    collect: "U0220005",
  },  
  office: {
    name: "office",
    art: "U0230000",
    info: "U0230001",
    cate: "U0230002",
    comment: "U0230003",
    praise: "U0230004",
    collect: "U0230005",
  },
  topic: {
    name: "topic",
    art: "U0240000",
    info: "U0240001",
    cate: "U0240002",
    comment: "U0240003",
    praise: "U0240004",
    collect: "U0240005",
  },  
  info: {
    name: "info",
    art: "U0250000",
    info: "U0250001",
    cate: "U0250002",
    comment: "U0250003",
    praise: "U0250004",
    collect: "U0250005",
  },
  course: {
    name: "course",
    art: "U0260000",
    info: "U0260001",
    cate: "U0260002",
    comment: "U0260003",
    praise: "U0260004",
    collect: "U0260005",
  },  
  website: {
    name: "website",
    art: "U0270000",
    info: "U0270001",
    cate: "U0270002",
    comment: "U0270003",
    praise: "U0270004",
    collect: "U0270005",
  },  

  advertisement: "U0500000",
  advertisement_position: "U0500001",
  appstore: 'U0500002',
  config: 'U0520004',
  channel: 'U0520000',
  channel_config: 'U0520001',
  code: {
    art: 'U0520002',
    cate: 'U0520003'
  },
  navigation: 'U0520005',
  single: 'U0520006',
  site: {
    list: 'U0520007',
    channel: 'U0520008',
    page: 'U0520009'
  },
  content_source: 'U0520010',
  custom: 'U0520011',
  download: 'U0530000',
  favorites: {
    cate: 'U0550000',
    art: 'U0550001'
  },
  vote: {
    cate: 'U0580000',
    art: 'U0580001',
    details: 'U0580002'
  },
  links: 'U0610001',
  mood: {
    list: 'U0620030',
    cate: 'U0620031'
  },
  collection: {
    cate: 'U0630000',
    art: 'U0630001',
    artTem: 'U0630002'
  },
  partner: 'U0650000',
  robot: {
    list: 'U0670000',
    chat: 'U0670001',
    intention: 'U0670002',
    speech: 'U0670003'
  },
  authority: 'U0670004',
  search: {
    list: 'U0680000',
    setting: 'U0680001',
    statistics: 'U0680002',
    word: 'U0680003'
  },
  service: {
    list: 'U0680004',
    announcement: 'U0680005',
    cate: 'U0680006',
    contact: 'U0680007',
    feedback: 'U0680008',
    knowledge: {
      cate: 'U0680010',
      art: 'U0680009'
    },
    message_board: {
      list: 'U0680011',
      reply: 'U0680012'
    },
    message: 'U0680013',
    reader: 'U0680014',
    job: 'U0590000',
    resume: 'U0590001'
  },
  setting: 'U0680015',
  setting_type: 'U0680016',
  slideshow: {
    cate: 'U0680017',
    art: 'U0680018'
  },
  spread: 'U0680019',
  statistics: {
    list: 'U0680020',
    domain: 'U0680021',
    ip: 'U0680022',
    ip_lib: 'U0680023',
    keyword: 'U0680024',
    search: 'U0680025'
  },
  label: 'U0610000',
  tag: 'U0690000',
  theme: 'U0690001',
  effects: 'U0690002',
  user: {
    list: 'U0700000',
    banuser: 'U0700001',
    blog: 'U0700002',
    blog_extend: 'U0700026',
    concern: 'U0700003',
    config: "U0620009",
    grade: 'U0700004',
    grade_info: 'U0700005',
    group: 'U0700006',
    hobby: 'U0700007',
    info: 'U0700008',
    integration: 'U0700009',
    level: 'U0700010',
    log: 'U0700011',
    login_time: 'U0700012',
    manager_grade: 'U0700013',
    manager_log: 'U0700014',
    message: 'U0700015',
    mood: 'U0700016',
    private_letter: 'U0700017',
    role: 'U0700018',
    security: 'U0700019',
    sign: 'U0700020',
    cycle: 'U0700021',
    theme: 'U0700022',
    effects: 'U0700023',
    pendant: 'U0700024',
    cursor: 'U0700025'

  }
};

export default codings;
