import https from '../utils/http'

const http = new https()

const api:any =  {
  // 用户登录
  Detect (params?: any) {
    return http.request('user', 'Detect', params)
  },
  // 用户在线检测
  online (params?: any) {
    return http.request('user', 'online', params)
  },
  // 用户登录
  OtherUserInfo (params?: any) {
    return http.request('user', 'otherUserInfo', params)
  },
  // 用户登录
  login (params: any) {
    return http.request('user', 'Login', params)
  },
  // 用户退出
  signOut (params: any) {
    return http.request('user', 'signOut', params)
  },
  // 查询
  select(params: any) {
    return http.request('common', 'select', params)
  },  
  // 签到
  Sign (params: any) {
    return http.request('user', 'sign', params)
  },
  
  // 用户信息
  UserInfo (params: any) {
    return http.request('user', 'userInfo', params)
  },

  // 点击关注
  Concern (params: any) {
    return http.request('user', 'concern', params)
  },

  // 关注列表
  ConcernList (params: any) {
    return http.request('talk', 'concernList', params)
  },
  
// 查看关注备注
concernRemark(params: any) {
  return http.request('talk', 'concernRemark', params)
},  

// 更新关注备注
updateConcernRemark(params: any) {
  return http.request('talk', 'updateConcernRemark', params)
},  
  
  // 话题
  talk (params: any) {
    return http.request('talk', 'talkInit', params)
  },
  // 删除话题
  deleteTalk (params: any) {
    return http.request('talk', 'deleteTalk', params)
  },
  
  // 话题收藏
  TalkCollect (params: any) {
    return http.request('talk', 'TalkCollect', params)
  },
  // 话题评论
  TalkComment (params: any) {
    return http.request('talk', 'TalkComment', params)
  },  
  // 话题点赞
  TalkPraise (params: any) {
    return http.request('talk', 'TalkPraise', params)
  },
 // 话题转载
 TalkForwarding (params: any) {
    return http.request('user', 'TalkForwarding', params)
  },

  // 话题下载
  TalkDownload (params: any) {
    return http.request('talk', 'TalkDownload', params)
  },

  // 创建话题
  insertActivity (params: any) {
    return http.request('talk', 'insertActivity', params)
  },

  // 修改话题
  updateActivity (params: any) {
    return http.request('talk', 'updateActivity', params)
  },

 // 话题查询
 ActivityList (params: any) {
  return http.request('talk', 'activityList', params)
},

// 话题收藏
ActivityCollectList (params: any) {
  return http.request('talk', 'activityCollectList', params)
},

// 话题内容
Activity (params: any) {
  return http.request('talk', 'activity', params)
},

// 话题图片
talkAlbum (params: any) {
  return http.request('talk', 'talkAlbum', params)
},

// 更新状态
updateStatus(params: any) {
  return http.request('common', 'updateStatus', params)
},
  

 // 评论
 ArtList (params: any) {
    return http.request('user', 'commentList', params)
  },
 // 发表评论
Comment (params: any) {
  return http.request('user', 'comment', params)
},  
// 评论回复
commentReply (params: any) {
  return http.request('user', 'commentReply', params)
}, 
// 评论回复列表
commentReplyList (params: any) {
  return http.request('user', 'commentReplyList', params)
}, 
// 评论点赞
commentPpraise (params: any) {
  return http.request('user', 'commentPpraise', params)
}, 
// 发表弹幕
Barrage (params: any) {
  return http.request('user', 'barrage', params)
},  
// 弹幕列表
barrageList (params: any) {
  return http.request('user', 'barrageList', params)
},  
// 推荐用户
RecommendUser (params: any) {
  return http.request('user', 'recommendUser', params)
},  
// 推荐音频 
RecommendMusic  (params: any) {
  return http.request('user', 'RecommendMusic', params)
},  
// 热搜
hotSearch (params: any) {
  return http.request('talk', 'hotSearch', params)
},  
// 热门话题
HotTalk (params: any) {
  return http.request('talk', 'hotTalk', params)
},  
// 最新访客
LastestVisitor (params: any) {
  return http.request('user', 'lastestVisitor', params)
},  

visitorList   (params: any) {
  return http.request('user', 'visitorList', params)
},  

// 微博公共通知
announcement (params: any) {
  return http.request('user', 'announcement', params)
},  
  
  // 收藏
  Collect (params: any) {
    return http.request('user', 'collect', params)
  },  
  // 点赞
  Praise (params: any) {
    return http.request('user', 'praise', params)
  },  
  // 点赞
  Forwarding (params: any) {
    return http.request('user', 'forwarding', params)
  }, 
  // 主题
  Theme (params: any) {
    return http.request('user', 'theme', params)
  },  
  // 主题
  Effects (params: any) {
    return http.request('user', 'effects', params)
  },  
  // 挂件装饰
  Pendant (params: any) {
    return http.request('user', 'pendant', params)
  }, 
  // 头像挂件
  avatarPendant (params: any) {
    return http.request('user', 'avatarPendant', params)
  }, 
  // 鼠标特效
  mouseEffects (params: any) {
    return http.request('user', 'mouseEffects', params)
  }, 
  // 鼠标样式
  Cursor (params: any) {
    return http.request('user', 'cursor', params)
  },    
  
   // 选择主题
   ChooseTheme (params: any) {
    return http.request('common', 'chooseTheme', params)
  },  

    // 应用中心
    Appstore (params: any) {
    return http.request('channel', 'appstores', params)
  }, 

  // 品牌社区
  BrandCommunity (params: any) {
    return http.request('user', 'brandCommunity', params)
  },   

  // 访问品牌社区
  VisitCommunity (params: any) {
    return http.request('user', 'visitCommunity', params)
  },  
  
  // 心情列表
  moodList (params: any) {
    return http.request('user', 'moodList', params)
  },  
  
  // 积分管理
  Integration (params: any) {
    return http.request('user', 'integration', params)
  },  
  // 金币管理
  Goldcoin (params: any) {
    return http.request('user', 'goldcoin', params)
  },  
  // 能量管理
  energyList (params: any) {
    return http.request('user', 'energyList', params)
  },  
  // 签到列表
  SignList (params: any) {
    return http.request('user', 'signList', params)
  },   

  // 站长留言
  messageBoard (params: any) {
    return http.request('common', 'messageBoard', params)
  } , 
  // // 最新留言
  // MessageBoard (params: any) {
  //   return http.request('user', 'recentMessage', params)
  // },      

  // 留言板
  userMessageBoard (params: any) {
    return http.request('user', 'userMessageBoard', params)
  },  
  
  // 留言板
  writeMessageBoard (params: any) {
    return http.request('user', 'writeMessageBoard', params)
  },   

  // 回复留言
  replyMessageBoard (params: any) {
    return http.request('user', 'replyMessageBoard', params)
  },     
  
  // 最新日志
  RecentJournal (params: any) {
    return http.request('user', 'recentJournal', params)
  },   
  
  // 最新相册
  RecentPhotos (params: any) {
    return http.request('user', 'recentPhotos', params)
  },   

  // 创建相册
  photoAlbum (params: any) {
    return http.request('user', 'photoAlbum', params)
  },  

   // 照片
   photoList (params: any) {
    return http.request('user', 'photoList', params)
  },   

   // 上传照片
   UploadUserPhoto (params: any) {
    return http.request('user', 'uploadUserPhoto', params)
  },    
  
  // 创建相册
  CreatePhotoAlbum (params: any) {
    return http.request('user', 'uoloadAlbum', params)
  },    

  // 更改相册
  UpdateAlbum (params: any) {
    return http.request('user', 'updateAlbum', params)
  },     

  // 话题发布
  InsertTalk (params: any) {
    return http.request('talk', 'insertTalks', params)
  },  

  // 更改发布
  updateTalk (params: any) {
    return http.request('talk', 'updateTalk', params)
  },    

  // 推荐话题
  RecommendActivity (params: any) {
    return http.request('talk', 'recommendActivity', params)
  },   

  // 我关注用户列表
  MyconcernList (params: any) {
    return http.request('talk', 'myconcernList', params)
  },

  // 列表查询
  ArticleList (params: any) {
    return http.request('channel', 'articleList', params)
  },  

  // 文档预览
  ArticleView (params: any) {
    return http.request('channel', 'articleView', params)
  },     
  
  // 列表查询
  ArticleDetails (params: any) {
    return http.request('channel', 'articleDetails', params)
  },    

  // 保存到草稿箱
  articleTempSave (params: any) {
    return http.request('channel', 'articleTempSave', params)
  },    

  // 草稿箱查询
  articleTempList (params: any) {
    return http.request('channel', 'articleTempList', params)
  },    
  
  // 发布
  InsertArticle (params: any) {
    return http.request('channel', 'insertArticle', params)
  },

  // 更新
  UpdateArticle (params: any) {
    return http.request('channel', 'updateArticle', params)
  },   

  // 系统分类
  SystemCate (params: any) {
    return http.request('common', 'systemCate', params)
  },     


  // 专辑查询
  AlbumList (params: any) {
    return http.request('user', 'albumList', params)
  },

  // 专辑查询
  Delete (params: any) {
    return http.request('channel', 'deleteArticle', params)
  },
  

  // 文章详情查询接口
  articleDetail (params: any) {
    return http.request('channel', 'articleDetail', params)
  },
  // 分类列表查询接口
  cateList(params: any) {
    return http.request('common', 'systemCate', params)
  },
  // 简单分类
  simpleCategory (params: any) {
    return http.request('common', 'simpleCategory', params)
  },
  // 选择分类
  systemCate (params: any) {
    return http.request('common', 'systemCate', params)
  },
  // 用户分类
  userCategory (params: any) {
    return http.request('common', 'userCategory', params)
  },
  // 上传图片
  uploadImage (params: any) {
    return http.request('common', 'uploadImage', params)
  },
  // 设置问题
  setCover (params: any) {
    return http.request('channel', 'setCover', params)
  },  
  // 归档
  Srchive (params: any) {
    return http.request('user', 'srchive', params)
  } ,
  // 详情内容
  Insert (params: any) {
    return http.request('common', 'insert', params)
  } ,  
  // 删除
  delete(params: any) {
    return http.request('common', 'delete', params)
  },
  // 详情内容
  Update (params: any) {
    return http.request('common', 'update', params)
  } , 
  // 复制记录
  copy (params: any) {
    return http.request('common', 'copy', params)
  } , 
  // 详情内容
  detail (params: any) {
    return http.request('common', 'detail', params)
  } ,  

  // 获取转载内容
  GetForwarding (params: any) {
    return http.request('user', 'getForwarding', params)
  } ,    
  // 用户基本信息
  UserBaiscInfo (params: any) {
    return http.request('user', 'userBaiscInfo', params)
  } ,   
  // 个人资料
  userInformation (params: any) {
    return http.request('user', 'userInformation', params)
  } ,  
  // 更改用户信息
  editUserInfo (params: any) {
    return http.request('user', 'editUserInfo', params)
  } ,     
  // 保密设置
  secrecySetting (params: any) {
    return http.request('user', 'secrecySetting', params)
  } ,   
  // 用户兴趣爱好
  UserHobby (params: any) {
    return http.request('user', 'userHobby', params)
  } ,   
  // 更改用户兴趣爱好
  EdituserHobby (params: any) {
    return http.request('user', 'edituserHobby', params)
  } ,    
  // 博客信息
  BlogInfo (params: any) {
    return http.request('user', 'blogInfo', params)
  } ,   
  // 更改博客信息
  EditBlogInfo (params: any) {
    return http.request('user', 'editBlogInfo', params)
  } ,  
  // 更改博客信息
  UploadPhotos (params: any) {
    return http.request('user', 'uploadPhotos', params)
  } ,  
  // 修改密码
  EditUserPassword (params: any) {
    return http.request('user', 'editUserPassword', params)
  } ,  
  // 头像背景
  GetHistoryPhotos (params: any) {
    return http.request('user', 'getHistoryPhotos', params)
  } ,   
  // 用户访问
  Visited (params: any) {
    return http.request('user', 'visited', params)
  } ,   
  // 用户访问
  LoginLog (params: any) {
    return http.request('user', 'loginlog', params)
  } ,    
   
  // 投票
  Vote (params: any) {
    return http.request('talk', 'vote', params)
  } ,   
  // 收藏表情
  insertExpression (params: any) {
    return http.request('user', 'insertExpression', params)
  } , 
  // 用户表情收藏
  userExpression (params: any) {
    return http.request('user', 'userExpression', params)
  } , 
  // 获取心情
  GetMoodList (params: any) {
    return http.request('common', 'mood', params)
  } ,     
  // 保存
  SaveMood (params: any) {
    return http.request('user', 'saveMood', params)
  } , 

  // 创建组
  CreateGroup (params: any) {
    return http.request('talk', 'createGroup', params)
  } ,  

  // 创建组
  EditGrouping (params: any) {
    return http.request('user', 'editGrouping', params)
  } ,    
  
  // 查询组
  grouping (params: any) {
    return http.request('talk', 'grouping', params)
  } , 
  
  // 分组
  UpdateGrouping (params: any) {
    return http.request('talk', 'updateGrouping', params)
  } ,   
  
  // 日志查询
  Journal (params: any) {
    return http.request('user', 'journal', params)
  } , 
  
  // 用户自定义组新增
  insertCustomGroup (params: any) {
    return http.request('user', 'insertCustomGroup', params)
  } ,   

  // 用户自定义组
  customGroup (params: any) {
    return http.request('user', 'customGroup', params)
  } ,   

  // 用户自定义组更改
  updateCustomGroup (params: any) {
    return http.request('user', 'updateCustomGroup', params)
  } ,  
  
  // 用户自定义组用户
  userGroup (params: any) {
    return http.request('user', 'userGroup', params)
  } ,  
  
  // 发送消息
  chat (params: any) {
    return http.request('user', 'chat', params)
  } ,  
  
  // 联系用户列表
  contactuserList (params: any) {
    return http.request('user', 'contactuserList', params)
  } , 

  // 聊天内容
  chatList (params: any) {
    return http.request('user', 'chatList', params)
  } , 
  
  // 用户自定义组用户
  userGroupList (params: any) {
    return http.request('user', 'userGroupList', params)
  } ,   

  // 书签分类
  bookmarkCate (params: any) {
    return http.request('user', 'bookmarkCate', params)
  } ,   

  // 用户书签
  bookmark (params: any) {
    return http.request('user', 'bookmark', params)
  } ,    

 // 用户书签
 getCollect (params: any) {
    return http.request('user', 'getCollect', params)
  } , 

 // 用户书签
 getComment (params: any) {
    return http.request('user', 'getComment', params)
  } , 

 // 用户书签
 getPraise (params: any) {
    return http.request('user', 'getPraise', params)
  } , 

  // 下载前验证
  downloadVerification (params: any) {
    return http.request('talk', 'downloadVerification', params)
  } , 

   // 下载
   download (params: any) {
    return http.request('talk', 'download', params)
  } , 

  // 内容收藏
  content_collect (params: any) {
    return http.request('talk', 'content_collect', params)
  } , 

  // 内容收藏列表
  TalkContentCollect (params: any) {
    return http.request('talk', 'TalkContentCollect', params)
  } , 

  // 删除内容收藏
  deleteContent (params: any) {
    return http.request('talk', 'deleteContent', params)
  } , 
  
  // 用户书签
  getDownload (params: any) {
    return http.request('user', 'getDownload', params)
  } ,    
  // 个人中心下载
  downloadList (params: any) {
    return http.request('user', 'downloadList', params)
  } ,  
  // 博客
  blogList (params: any) {
    return http.request('user', 'blogList', params)
  } ,
  // 经典语录
  commonSenseQuotes (params: any) {
    return http.request('user', 'commonSenseQuotes', params)
  } ,
  // 频道模块
  module (params: any) {
    return http.request('channel', 'module', params)
  } , 
 // 搜索
 search (params: any) {
  return http.request('talk', 'search', params)
  } , 

 // 机器人
 robot (params: any) {
  return http.request('robot', 'robotsss', params)
  } , 
  
 // 意图库管理
 speechLib (params: any) {
  return http.request('robot', 'speechLib', params)
  } , 
  
 // 话术管理
 speech (params: any) {
  return http.request('robot', 'speech', params)
  } ,   
  
// 开始会话
begin (params: any) {
  return http.request('robot', 'begin', params)
  } , 
   
// 开始中
talking (params: any) {
  return http.request('robot', 'talking', params)
  } , 
  
// 会话结束
close (params: any) {
  return http.request('robot', 'close', params)
  } ,  
  
// 话题查询
soundList (params: any) {
  return http.request('talk', 'soundList', params)
},  
choosePhotos (params: any) {
  return http.request('user', 'choosePhotos', params)
},  
  
// 更新保存
updateSave(params: any) {
  return http.request('common', 'updateSave', params)
},
spaceImage(params: any) {
  return http.request('user', 'spaceImage', params)
},
journalView(params: any) {
  return http.request('user', 'journalView', params)
},
// 更新状态
changeData(params: any) {
  return http.request('common', 'changeData', params)
},

// 保存挂件饰品
savePendant(params: any) {
  return http.request('user', 'savePendant', params)
},
// 意见反馈列表
feedbackList (params: any) {
  return http.request('common', 'feedbackList', params)
},
// 意见反馈
feedback (params: any) {
  return http.request('common', 'feedback', params)
},
// 日历查询
Calendar (params: any) {
  return http.request('common', 'Calendar',  params)
}, 
// 幻灯片
slideBanner (params: any) {
  return http.request('common', 'slideBanner',  params)
}, 
// 用户设置管理
settingList (params: any) {
  return http.request('user', 'settingList',  params)
}, 
// 用户设置
userSetting (params: any) {
  return http.request('user', 'userSetting',  params)
}, 
// 消息设置管理
messageSettingList (params: any) {
  return http.request('user', 'messageSettingList',  params)
}, 
// 语音播报
voiceBroadcast (params: any) {
  return http.request('user', 'voiceBroadcast', params)
}, 
// 水印设置
watermarkSetting (params: any) {
  return http.request('user', 'watermarkSetting', params)
}, 
// 搜素相关词
relatedWords (params: any) {
  return http.request('talk', 'relatedWords', params)
},  
// 获取历史搜索词
historyWords (params: any) {
  return http.request('talk', 'historyWords', params)
},  
// 删除历史搜索
removehistoryWord (params: any) {
  return http.request('talk', 'removehistoryWord', params)
},  
// 开通博客
openWeibo (params: any) {
  return http.request('user', 'openWeibo', params)
},  

// V认证申请条件
verifiedCondition (params: any) {
  return http.request('talk', 'verifiedCondition', params)
},

// V认证申请
verifiedApply (params: any) {
  return http.request('talk', 'verifiedApply', params)
},

// 投票信息
voteDetail (params: any) {
  return http.request('talk', 'voteDetail', params)
},

// 歌词
Lrc (params: any) {
  return http.request('talk', 'Lrc', params)
},

// 联系方式
contact (params: any) {
  return http.request('common', 'contact', params)
},

// 导航
haosite (params: any) {
  return http.request('common', 'haosite', params)
},
// 问题列表
questionsList (params: any) {
  return http.request('common', 'questionsList', params)
},
// 问答列表
answerList (params: any) {
  return http.request('common', 'answerList', params)
},

// 综合的
comprehensive (params: any) {
  return http.request('talk', 'comprehensive', params)
},
// 活动贡献
contribution(params: any) {
  return http.request('common', 'contribution', params)
},
// 每日签到
signDay(params: any) {
  return http.request('user', 'signDay', params)
},
ranking (params: any) {
  return http.request('talk', 'ranking', params)
},
schedule (params: any) {
  return http.request('talk', 'schedule', params)
},
updateSchedule (params: any) {
  return http.request('talk', 'updateSchedule', params)
},
// 收获能量
getEnergy (params: any) {
  return http.request('talk', 'getEnergy', params)
},
// 微博信息
talkInfo(params: any) {
  return http.request('talk', 'talkInfo', params)
},
// 微博详情
talkDetail(params: any) {
  return http.request('talk', 'talkDetail', params)
},
// 支付微博置顶
payTalkToping(params: any) {
  return http.request('talk', 'payTalkToping', params)
},
// 微博推荐
recommendTalk(params: any) {
  return http.request('talk', 'recommendTalk', params)
},
// 获取相册
getAlbum(params: any) {
  return http.request('talk', 'getAlbum', params)
},
// 摄影
cameraTalk(params: any) {
  return http.request('talk', 'cameraTalk', params)
},
// vlog
vlogTalk(params: any) {
  return http.request('talk', 'vlogTalk', params)
},
// 设置展示状态
setVisible(params: any) {
  return http.request('talk', 'setVisible', params)
},
expression(params: any) {
  return http.request('user', 'expression', params)
},
getGraph(params: any) {
  return http.request('common', 'getGraph', params)
},
updateGraph(params: any) {
  return http.request('common', 'updateGraph', params)
},
getVote(params: any) {
  return http.request('talk', 'getVote', params)
},
setVote(params: any) {
  return http.request('talk', 'setVote', params)
},
UploadActivity(params: any) {
  return http.request('user', 'UploadActivity', params)
},
getVideo(params: any) {
  return http.request('talk', 'getVideo', params)
},
// 收藏
collect_music (params: any) {
  return http.request('user', 'collect_music', params)
},  
// 音乐列表
getMusic (params: any) {
  return http.request('talk', 'getMusic', params)
}, 
// 消息
message (params: any) {
  return http.request('talk', 'message', params)
}, 
// 消息列表
messageList (params: any) {
  return http.request('talk', 'messageList', params)
}, 
// 消息详情
messageDetail (params: any) {
  return http.request('talk', 'messageDetail', params)
}, 
// 历史浏览记录
viewingRecords (params: any) {
  return http.request('talk', 'viewingRecords', params)
}, 
// 观看历史列表
historyRecords (params: any) {
  return http.request('talk', 'historyRecords', params)
}, 
// 我参与的投票项目列表
myVoteList (params: any) {
  return http.request('talk', 'myVoteList', params)
}, 
// 用户专区
userZone (params: any) {
  return http.request('user', 'userZone', params)
}, 

// 权限验证
verificationGrade (params: any) {
  return http.request('talk', 'verificationGrade', params)
},

// 卡包查询
cardHolder(params: any) {
  return http.request('talk', 'cardHolder', params)
},

// 活动
huodong (params: any) {
  return http.request('talk', 'huodong', params)
},

// 立即领取
receive (params: any) {
  return http.request('talk', 'receive', params)
},

// 功能特权
privilege (params: any) {
  return http.request('talk', 'privilege', params)
},

// 功能特权详情
privilegeDetail (params: any) {
  return http.request('talk', 'privilegeDetail', params)
},

// 数据总览
totalStatistics (params: any) {
  return http.request('talk', 'totalStatistics', params)
},

// 用户数据统计
userStatistics (params: any) {
  return http.request('talk', 'userStatistics', params)
},

// 微博数据统计
talkStatistics (params: any) {
  return http.request('talk', 'talkStatistics', params)
},

// 数据统计
dataStatistics (params: any) {
  return http.request('talk', 'dataStatistics', params)
},

// 是否存在黑名单
hasBlack (params: any) {
  return http.request('user', 'hasBlack', params)
},

// 加入黑名单
joinBlack (params: any) {
  return http.request('user', 'joinBlack', params)
},

// 黑名单列表
blacklist (params: any) {
  return http.request('user', 'blacklist', params)
},

// 获取地址
getLocation (params: any) {
  return http.request('common', 'getLocation', params)
},

// 参数能量用户列表
energyUserList (params: any) {
  return http.request('user', 'energyUserList', params)
},

// 播放器设置
playSetting (params: any) {
  return http.request('user', 'playSetting', params)
},

// 播放器信息
playInfo (params: any) {
  return http.request('user', 'playInfo', params)
},

// 足迹
footprint (params: any) {
  return http.request('talk', 'footprint', params)
},

// 轨迹详情
footprintDetail (params: any) {
  return http.request('common', 'footprintDetail', params)
},
// 轨道图列表
trackMapList (params: any) {
  return http.request('talk', 'trackMapList', params)
},
// 轨道图关联
bindTrackMap (params: any) {
  return http.request('talk', 'bindTrackMap', params)
},
// 第三方博客
thirdBlog (params: any) {
  return http.request('talk', 'thirdBlog', params)
},

// 博客信息
thirdBlogDetail (params: any) {
  return http.request('talk', 'thirdBlogDetail', params)
},
}

  


export default api
