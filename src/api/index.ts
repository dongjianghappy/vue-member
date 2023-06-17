import https from '../utils/http'

const http = new https()

const api:any =  {
  // 用户登录
  Detect (params?: any) {
    return http.request('user', 'Detect', params)
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

 // 话题查询
 ActivityList (params: any) {
  return http.request('talk', 'activityList', params)
},

// 话题内容
Activity (params: any) {
  return http.request('talk', 'activity', params)
},

// 话题图片
talkAlbum (params: any) {
  return http.request('talk', 'talkAlbum', params)
},


  

 // 评论
 ArtList (params: any) {
    return http.request('user', 'commentList', params)
  },
 // 发表评论
 Comment (params: any) {
    return http.request('user', 'comment', params)
  },  


// 推荐用户
RecommendUser (params: any) {
  return http.request('user', 'recommendUser', params)
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
  // 鼠标特效
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
  
  // 应用中心
  Integration (params: any) {
    return http.request('user', 'integration', params)
  },  

  // 签到列表
  SignList (params: any) {
    return http.request('user', 'signList', params)
  },   

  // 最新留言
  MessageBoard (params: any) {
    return http.request('user', 'recentMessage', params)
  },      

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

  // 推荐话题
  RecommendActivity (params: any) {
    return http.request('talk', 'recommendActivity', params)
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

  // 创建专辑
  CreateAlbum (params: any) {
    return http.request('user', 'createAlbum', params)
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
  // 更改用户信息
  editUserInfo (params: any) {
    return http.request('user', 'editUserInfo', params)
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
  Grouping (params: any) {
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
  
  // 日志分类
  JournalCate (params: any) {
    return http.request('user', 'journalCate', params)
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

  // 用户书签
  getDownload (params: any) {
    return http.request('user', 'getDownload', params)
  } ,    
  // 个人中心下载
  downloadList (params: any) {
    return http.request('user', 'downloadList', params)
  } ,    
  // 个人中心笔记
  notesList (params: any) {
    return http.request('user', 'notesList', params)
  } , 
  
  // 好站
  websiteList (params: any) {
    return http.request('user', 'websiteList', params)
  } , 
  // 博客
  blogList (params: any) {
    return http.request('user', 'blogList', params)
  } , 
 // 搜索
 search (params: any) {
  return http.request('user', 'search', params)
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

bookmarkCate(params: any) {
  return http.request('user', 'bookmarkCate', params)
},
// 意见反馈
feedback (params: any) {
  return http.request('common', 'feedback', params)
}
}



export default api
