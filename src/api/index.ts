import https from '../utils/http'

const http = new https()

const api:any =  {
  // 用户登录
  Detect (params?: any) {
    return http.request('newuser', 'Detect', params)
  },
  // 用户登录
  OtherUserInfo (params?: any) {
    return http.request('newuser', 'otherUserInfo', params)
  },
  // 用户登录
  login (params: any) {
    return http.request('newuser', 'Login', params)
  },
  // 用户退出
  signOut (params: any) {
    return http.request('newuser', 'signOut', params)
  },
  
  // 签到
  Sign (params: any) {
    return http.request('newuser', 'sign', params)
  },
  
  // 用户信息
  UserInfo (params: any) {
    return http.request('newuser', 'userInfo', params)
  },

  // 点击关注
  Concern (params: any) {
    return http.request('newuser', 'concern', params)
  },

    // 关注列表
    ConcernList (params: any) {
      return http.request('newuser', 'concernList', params)
    },
  
  
  
  // 话题
  talk (params: any) {
    return http.request('newuser', 'talkInit', params)
  },
  // 删除话题
  deleteTalk (params: any) {
    return http.request('newuser', 'deleteTalk', params)
  },
  
  // 话题收藏
  TalkCollect (params: any) {
    return http.request('newuser', 'TalkCollect', params)
  },
  // 话题评论
  TalkComment (params: any) {
    return http.request('newuser', 'TalkComment', params)
  },  
  // 话题点赞
  TalkPraise (params: any) {
    return http.request('newuser', 'TalkPraise', params)
  },
 // 话题转载
 TalkForwarding (params: any) {
    return http.request('newuser', 'TalkForwarding', params)
  },

 // 话题查询
 ActivityList (params: any) {
  return http.request('newuser', 'activityList', params)
},

// 话题内容
Activity (params: any) {
  return http.request('newuser', 'activity', params)
},

// 话题图片
talkAlbum (params: any) {
  return http.request('newuser', 'talkAlbum', params)
},


  

 // 评论
 ArtList (params: any) {
    return http.request('newuser', 'commentList', params)
  },
 // 发表评论
 Comment (params: any) {
    return http.request('newuser', 'comment', params)
  },  


// 推荐用户
RecommendUser (params: any) {
  return http.request('newuser', 'recommendUser', params)
},  
// 发表评论
HotTalk (params: any) {
  return http.request('newuser', 'hotTalk', params)
},  
// 最新访客
LastestVisitor (params: any) {
  return http.request('newuser', 'lastestVisitor', params)
},  

  
  
  // 收藏
  Collect (params: any) {
    return http.request('newuser', 'collect', params)
  },  
  // 点赞
  Praise (params: any) {
    return http.request('newuser', 'praise', params)
  },  
  // 点赞
  Forwarding (params: any) {
    return http.request('newuser', 'forwarding', params)
  },  
  // 主题
  Theme (params: any) {
    return http.request('newuser', 'theme', params)
  },  
  // 主题
  Effects (params: any) {
    return http.request('newuser', 'effects', params)
  },  
  
   // 选择主题
   ChooseTheme (params: any) {
    return http.request('common', 'chooseTheme', params)
  },  

    // 应用中心
    Appstore (params: any) {
    return http.request('newuser', 'appstores', params)
  }, 

  // 品牌社区
  BrandCommunity (params: any) {
    return http.request('newuser', 'brandCommunity', params)
  },   

  // 访问品牌社区
  VisitCommunity (params: any) {
    return http.request('newuser', 'visitCommunity', params)
  },  
  
  
  
     // 应用中心
     Integration (params: any) {
    return http.request('newuser', 'integration', params)
  },  

  // 签到列表
  SignList (params: any) {
    return http.request('newuser', 'signList', params)
  },   

  // 最新留言
  MessageBoard (params: any) {
    return http.request('newuser', 'recentMessage', params)
  },      

  // 留言板
  userMessageBoard (params: any) {
    return http.request('newuser', 'userMessageBoard', params)
  },  
  
  // 留言板
  writeMessageBoard (params: any) {
    return http.request('newuser', 'writeMessageBoard', params)
  },   
  
  // 最新日志
  RecentJournal (params: any) {
    return http.request('newuser', 'recentJournal', params)
  },   
  
  // 最新相册
  RecentPhotos (params: any) {
    return http.request('newuser', 'recentPhotos', params)
  },   

  // 创建相册
  photoAlbum (params: any) {
    return http.request('newuser', 'photoAlbum', params)
  },  

   // 照片
   photoList (params: any) {
    return http.request('newuser', 'photoList', params)
  },   

   // 上传照片
   UploadUserPhoto (params: any) {
    return http.request('newuser', 'uploadUserPhoto', params)
  },    
  
  // 创建相册
  CreatePhotoAlbum (params: any) {
    return http.request('newuser', 'uoloadAlbum', params)
  },    

  // 更改相册
  UpdateAlbum (params: any) {
    return http.request('newuser', 'updateAlbum', params)
  },     

  // 话题发布
  InsertTalk (params: any) {
    return http.request('newuser', 'insertTalks', params)
  },  

  // 推荐话题
  RecommendActivity (params: any) {
    return http.request('newuser', 'recommendActivity', params)
  },   

  // 列表查询
  ArticleList (params: any) {
    return http.request('newuser', 'articleList', params)
  },  
  
  // 列表查询
  ArticleDetails (params: any) {
    return http.request('newuser', 'articleDetails', params)
  },    
  
  // 发布
  InsertArticle (params: any) {
    return http.request('newuser', 'insertArticle', params)
  },

  // 更新
  UpdateArticle (params: any) {
    return http.request('newuser', 'updateArticle', params)
  },   

  // 系统分类
  SystemCate (params: any) {
    return http.request('common', 'systemCate', params)
  },     

  // 创建专辑
  CreateAlbum (params: any) {
    return http.request('newuser', 'createAlbum', params)
  },  

  // 专辑查询
  AlbumList (params: any) {
    return http.request('newuser', 'albumList', params)
  },

  // 专辑查询
  Delete (params: any) {
    return http.request('newuser', 'deleteArticle', params)
  },
  

  // 文章列表查询接口
  articleList (params: any) {
    return http.request('vue', 'articleList', params)
  },
  // 文章详情查询接口
  articleDetail (params: any) {
    return http.request('vue', 'articleDetail', params)
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
  // 归档
  Srchive (params: any) {
    return http.request('newuser', 'srchive', params)
  } ,
  // 详情内容
  Insert (params: any) {
    return http.request('common', 'insert', params)
  } ,  
  // 详情内容
  Update (params: any) {
    return http.request('common', 'update', params)
  } ,  
  // 详情内容
  Detail (params: any) {
    return http.request('common', 'detail', params)
  } ,  

  // 获取转载内容
  GetForwarding (params: any) {
    return http.request('newuser', 'getForwarding', params)
  } ,    
  // 用户基本信息
  UserBaiscInfo (params: any) {
    return http.request('newuser', 'userBaiscInfo', params)
  } ,   
  // 更改用户信息
  EditUserInfo (params: any) {
    return http.request('newuser', 'editUserInfo', params)
  } ,     
  // 用户兴趣爱好
  UserHobby (params: any) {
    return http.request('newuser', 'userHobby', params)
  } ,   
  // 更改用户兴趣爱好
  EdituserHobby (params: any) {
    return http.request('newuser', 'edituserHobby', params)
  } ,    
  // 博客信息
  BlogInfo (params: any) {
    return http.request('newuser', 'blogInfo', params)
  } ,   
  // 更改博客信息
  EditBlogInfo (params: any) {
    return http.request('newuser', 'editBlogInfo', params)
  } ,  
  // 更改博客信息
  UploadPhotos (params: any) {
    return http.request('newuser', 'uploadPhotos', params)
  } ,  
  // 修改密码
  EditUserPassword (params: any) {
    return http.request('newuser', 'editUserPassword', params)
  } ,  
  // 修改密码
  GetHistoryPhotos (params: any) {
    return http.request('newuser', 'getHistoryPhotos', params)
  } ,   
  // 用户访问
  Visited (params: any) {
    return http.request('newuser', 'visited', params)
  } ,   
  // 用户访问
  LoginLog (params: any) {
    return http.request('newuser', 'loginlog', params)
  } ,    
   
  // 投票
  Vote (params: any) {
    return http.request('newuser', 'vote', params)
  } ,    
  // 获取心情
  GetMoodList (params: any) {
    return http.request('common', 'mood', params)
  } ,     
  // 保存
  SaveMood (params: any) {
    return http.request('newuser', 'saveMood', params)
  } , 

  // 创建组
  CreateGroup (params: any) {
    return http.request('newuser', 'createGroup', params)
  } ,  

  // 创建组
  EditGrouping (params: any) {
    return http.request('newuser', 'editGrouping', params)
  } ,    
  
  // 查询组
  Grouping (params: any) {
    return http.request('newuser', 'grouping', params)
  } , 
  
  // 分组
  UpdateGrouping (params: any) {
    return http.request('newuser', 'updateGrouping', params)
  } ,   
  
  // 日志查询
  Journal (params: any) {
    return http.request('newuser', 'journal', params)
  } , 
  
  // 日志分类
  JournalCate (params: any) {
    return http.request('newuser', 'journalCate', params)
  } ,   
  
}

export default api
