export const iframeopen = (state,index) => {
    window.sessionStorage.setItem('iframeopen',index);
    state.iframeopen = index;
}
export const iframeopenURL = (state,index) => {
    window.sessionStorage.setItem('iframeopenURL',index);
    state.iframeopenURL = index;
}
export const Msg_num = (state,msg) => {
    state.Msg_num = msg;
}
export const Group_Msg_total = (state,total) => {
    window.sessionStorage.setItem('Group_Msg_total',total);
    state.Group_Msg_total = total;
}
export const Friend_Now_Message = (state,msg) => {
    window.sessionStorage.setItem('Friend_Now_Message',JSON.stringify(msg));
    state.Friend_Now_Message = msg;
}
export const Red_Room_list = (state,room) => {
    window.sessionStorage.setItem('Red_Room_list',JSON.stringify(room));
    state.Red_Room_list = room;
}
export const Address_list = (state,list) => {
    window.sessionStorage.setItem('Address_list',JSON.stringify(list));
    state.Address_list = list;
}
export const Group_Now_Message = (state,number) => {
    state.Group_Now_Message = number;
    window.sessionStorage.setItem('Group_Now_Message',JSON.stringify(number));
}
export const Group_Message_msgList = (state,msg) => {
    state.Group_Message_msgList = msg;
    window.sessionStorage.setItem('Group_Message_msgList',JSON.stringify(msg));
}
export const Websocket_status = (state,status) => {
    window.sessionStorage.setItem('Websocket_status',status);
    state.Websocket_status = status;
}
export const saveRoomData = (state,RoomData) => {
    window.sessionStorage.setItem('RoomData',JSON.stringify(RoomData));
    state.RoomData = RoomData;
}
export const savePrivateChatData = (state,PrivateChatData) => {
    window.sessionStorage.setItem('PrivateChatData',JSON.stringify(PrivateChatData));
    state.PrivateChatData = PrivateChatData;
}
export const saveMyUid = (state,uid) => {
    window.sessionStorage.setItem('MyUid',uid);
    state.MyUid = uid;
}
export const saveToken = (state,token) => {
    window.sessionStorage.setItem('access_token',token);
    state.token = token;
}
export const saveUserName = (state,name) => {
    window.sessionStorage.setItem('userName',name);
    state.userName = name;
}
export const saveUserMoney = (state,money) => {
    window.sessionStorage.setItem('userMoney',money);
    state.userMoney = money;
}
export const savePromoteCode = (state,PromoteCode) => {
    window.sessionStorage.setItem('PromoteCode',PromoteCode);
    state.PromoteCode = PromoteCode;
}
export const saveNickName = (state,NickName) => {
    window.sessionStorage.setItem('NickName',NickName);
    state.NickName = NickName;
}
export const saveHeadImgurl = (state,HeadImgurl) => {
    window.sessionStorage.setItem('HeadImgurl',HeadImgurl);
    state.HeadImgurl = HeadImgurl;
}
export const saveOther = (state,Other) => {
	window.sessionStorage.setItem('Other',JSON.stringify(Other));
	state.Other = Other;
}
export const ChangeNotice = (state,sw) => {
	state.notice = sw;
}
export const saveBannerImgs = (state,data) => {
    window.sessionStorage.setItem('bannerImgs',JSON.stringify(data));
    state.bannerImgs = data;
};
export const saveWebsiteData = (state,res) => {

	window.sessionStorage.setItem('WebData',JSON.stringify(res));
    state.WebData = res;

	// 用正则表达式获取所有Script 的方法：
	var reg=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
	let tongji = res.SiteInto.match(reg)
	tongji.forEach((item,index) => {
		let hm = document.createElement("script");
		// 获取src的值
		hm.src = item.split('src="')[1].split('"')[0];
		hm.type = 'text/javascript'
		let s = document.getElementsByTagName("script")[index]; 
		s.parentNode.insertBefore(hm, s);
	})
};