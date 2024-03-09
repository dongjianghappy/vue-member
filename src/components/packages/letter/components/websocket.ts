import VueEvent from '@/utils/event'

export const websocket = (param: any) => {
  let sock: any = false;
	let key: any = "all";
	let socket: any = {};
	
	function websock(param: any){
		
		if(!param){
			return ;	
		}
		
		sock = new WebSocket("ws://127.0.0.1:8080");//连接服务器  
		sock.onopen = function()
		{
		  // Web Socket 已连接上，使用 send() 方法发送数据,readyState == 1表示正在连接服务，新增用户
		  //if(sock.readyState==1){
				let message = {
					type: 'join',
					uid: param.uid,
					// name: param.name,
					photos: param.photos,
					friend_uid: param.friend_uid,
				}
			  sock.send(JSON.stringify(message));
		  //}
		};
		
		sock.onmessage = function (msg: any){ 
			debugger
		  var data = JSON.parse(msg.data)
		  VueEvent.emit("content", data);
		};
		
		sock.onclose = function(){ 
		  // 关闭 websocket
		  sock = false;
		  var lss = '<li style="text-align:center; font-size: 12px; color: #aaa;">退出聊天室</li>';
		  // $("#letter-content ul").append(lss);
		};
	}

  // 发消息
  VueEvent.on("chat", (data: any) => {
    if(!sock){
      return websock(param);
    }
		let message = {
			type: 'msg',
			con: data.content,
			key: key,
			uid: param.uid,
			friend_uid: data.uid,
		}
    sock.send(JSON.stringify(message));
  });

  // 关闭
  VueEvent.on("closeChat", (data: any) => {
    // sock.send('type=out');
		sock && sock.close()
  });

	
	websock(param); // 初始化连接服务器
}