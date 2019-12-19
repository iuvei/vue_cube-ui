<template>
<div>
    <div class="top">
        <div class="goback"  @click="goHOME()">
            <i class="get_back"></i>
        </div>
        <div class="title" :class="Now_RoomData.room_form == 'self_room_list' ? 'title' : 'title_2'">
            {{Now_RoomData.room_name}}：{{Now_RoomData.min_money}}-{{Now_RoomData.max_money}}元，
            {{Now_RoomData.notice}}
        </div>
        <!-- <div class="set_info" @click="open_set_room=true"  v-if="Now_RoomData.room_form == 'self_room_list'"><i><icon-svg icon-class="shenglvehao"/></i></div> -->
        <div class="set_info" @click="open_set_room=true"  v-if="Now_RoomData.room_form == 'self_room_list'"><i><icon-svg icon-class="shezhi"/></i></div>
    </div>


    <!-- 聊天区域 -->
<!-- <div class="Chat_area"> -->
<div :class="open_emoji == true? 'emoji_Chat_area' : 'Chat_area' ">
        <!-- 右上角 -->
        <div class="right_top">
            <div class="right_top_item" @click="go_cz()">
                <img src="../assets/img/ChatRoom/ic_web_rechange.png">
                <div>充值</div>
            </div>
            <!-- <div class="right_top_item">
                <img src="../assets/img/ChatRoom/ic_how_play.png">
                <div>玩法</div>
            </div>
            <div class="right_top_item">
                <img src="../assets/img/ChatRoom/ic_jiameng.png">
                <div>加盟</div>
            </div> -->
        </div>

    <div class="scroll-list-wrap">                        
    <cube-scroll  ref="scroll"  :options="pull_down"   :scroll-events="['scroll']" @scroll="scroll">
    <div>
        <div class="arrive_top_l" v-if="Now_RedData.length > 20"> - 到顶了 - </div>
        <div class="user_item" v-for="(item,i) in Now_RedData" :key="i">
        <div class="msg_time" v-if="item.timeSwitch">{{item.time}}</div>
        <!-- 头像那边 -->
        <div class="user_left" v-if="item.from_user.uid != my_uid">
            <img src="../assets/img/ChatRoom/ic_user_avatar.png" v-if="item.from_user.avatar == 'null'|| !item.from_user.avatar || item.from_user.avatar=='' ">
            <img :src="item.from_user.avatar" v-else>
        </div>

        <!-- 头像这边 -->
        <div class="my_user_left" v-if="item.from_user.uid == my_uid">
            <img src="../assets/img/ChatRoom/ic_user_avatar.png" v-if="item.from_user.avatar == 'null'|| !item.from_user.avatar || item.from_user.avatar=='' ">
            <img :src="item.from_user.avatar" v-else>
        </div>


            <!-- 消息那边 -->
            <div class="user_right" v-if="item.from_user.uid != my_uid">
                <!-- 昵称 -->
                <div class="user_name">{{item.from_user.nickname}}</div>

                <!-- 文字 == 2 -->
                <div v-if="item.content_type == 2">
                    <div class="triangle02"></div>
                    <div class="user_info">
                        {{item.content}}
                    </div>
                </div>

                <!-- 红包 == 1 -->
                <div v-if="Now_RoomData.room_type == 1 || Now_RoomData.room_type == 4 || Now_RoomData.room_type == 5">
                    <div v-if="item.content_type == 1 && (item.content.status == 0 || !item.content.status)" @click="open_RedPacket_window(item)">
                        <div class="user_red_info" v-if="Now_RoomData.room_type == 1">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.thunder}}</div>
                            <div class="red_info_min">查看红包</div>
                            <div class="red_info_fot">扫雷红包</div>
                        </div>
                        <div class="user_red_info" v-if="Now_RoomData.room_type == 4">
                            <div class="red_info_top">{{item.content.thunder}}</div>
                            <div class="red_info_min">查看红包</div>
                            <div class="red_info_fot" v-if="typeof item.content.thunder == 'number'">单雷</div>
                            <div class="red_info_fot" v-else>连环雷</div>
                        </div>
                        <div class="user_red_info" v-if="Now_RoomData.room_type == 5">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">查看红包</div>
                            <div class="red_info_fot">接龙红包</div>
                        </div>
                    </div>
                    <!-- 已领取的红包 -->
                    <div v-if="item.content_type == 1 && (item.content.status == 2 || item.content.status == 1)" @click="open_RedPacket_window(item)">
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 1">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.thunder}}</div>
                            <div class="red_info_min">已领取</div>
                            <div class="red_info_fot">扫雷红包</div>
                        </div>
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 4">
                            <div class="red_info_top">{{item.content.thunder}}</div>
                            <div class="red_info_min">禁抢红包，禁止抢包</div>
                            <div class="red_info_fot" v-if="typeof item.content.thunder == 'number'">单雷</div>
                            <div class="red_info_fot" v-else>连环雷</div>
                        </div>
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 5">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已领取</div>
                            <div class="red_info_fot">接龙红包</div>
                        </div>
                    </div><!-- 已抢完的红包 -->
                    <div v-if="item.content_type == 1 && item.content.status == 3" @click="open_RedPacket_window(item)">
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 1">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.thunder}}</div>
                            <div class="red_info_min">已抢完</div>
                            <div class="red_info_fot">扫雷红包</div>
                        </div>
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 4">
                            <div class="red_info_top">{{item.content.thunder}}</div>
                            <div class="red_info_min">已抢完</div>
                            <div class="red_info_fot" v-if="typeof item.content.thunder == 'number'">单雷</div>
                            <div class="red_info_fot" v-else>连环雷</div>
                        </div>
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 5">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已抢完</div>
                            <div class="red_info_fot">接龙红包</div>
                        </div>
                    </div>
                    <!-- 已经过期的红包 -->
                    <div v-if="item.content_type == 1 && item.content.status == 4" @click="open_RedPacket_window(item)">
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 1">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.thunder}}</div>
                            <div class="red_info_min">已过期</div>
                            <div class="red_info_fot">扫雷红包</div>
                        </div>
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 4">
                            <div class="red_info_top">{{item.content.thunder}}</div>
                            <div class="red_info_min">已过期</div>
                            <div class="red_info_fot" v-if="typeof item.content.thunder == 'number'">单雷</div>
                            <div class="red_info_fot" v-else>连环雷</div>
                        </div>
                        <div class="user_red_info_ed" v-if="Now_RoomData.room_type == 5">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已过期</div>
                            <div class="red_info_fot">接龙红包</div>
                        </div>
                    </div>
                </div>
                <!-- 牛牛 -->
                <div v-if="Now_RoomData.room_type == 2 || Now_RoomData.room_type == 3">
                    <div v-if="item.content_type == 1 && (item.content.status == 0 || !item.content.status)" @click="open_RedPacket_window(item)">
                        <div class="user_red_niuniu">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">查看红包</div>
                            <div class="red_info_fot">牛牛红包</div>
                        </div>
                    </div>
                    <!-- 已领取的红包 -->
                    <div v-if="item.content_type == 1 && (item.content.status == 2 || item.content.status == 1 )" @click="open_RedPacket_window(item)">
                        <div class="user_red_niuniu_ed">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已领取</div>
                            <div class="red_info_fot">牛牛红包</div>
                        </div>
                    </div>
                    <!-- 已抢完的红包 -->
                    <div v-if="item.content_type == 1 &&  item.content.status == 3" @click="open_RedPacket_window(item)">
                        <div class="user_red_niuniu_ed">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已抢完</div>
                            <div class="red_info_fot">牛牛红包</div>
                        </div>
                    </div>
                    <!-- 已抢完的红包 -->
                    <div v-if="item.content_type == 1 &&  item.content.status == 4 " @click="open_RedPacket_window(item)">
                        <div class="user_red_niuniu_ed">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已过期</div>
                            <div class="red_info_fot">牛牛红包</div>
                        </div>
                    </div>
                </div>





            </div>
            <!-- 右方end -->



            <!-- 消息这边 -->
            <div class="my_user_right" v-if="item.from_user.uid == my_uid">
                <!-- 昵称 -->
                <!-- <div class="my_user_name">{{item.from_user.nickname}}</div> -->
                <!-- 文字 item.content_type == 2 -->
                <div v-if="item.content_type == 2">
                    <div class="my_triangle02"></div>
                    <div class="my_user_info">
                        {{item.content}}
                    </div>
                </div>

                <!-- 红包 item.content_type == 1 -->
                <!-- 扫雷room_type是1  禁枪大部分样式和扫雷一样 room_type 是4 -->
                <div v-if="Now_RoomData.room_type == 1 || Now_RoomData.room_type == 4 || Now_RoomData.room_type == 5 ">
                    <div v-if="item.content_type == 1 && (item.content.status == 0  || !item.content.status) && !item.switch" @click="open_RedPacket_window(item)">
                        <div class="my_user_red_info" v-if="Now_RoomData.room_type == 1">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.thunder}}</div>
                            <div class="red_info_min">查看红包</div>
                            <div class="red_info_fot">扫雷红包</div>
                        </div>
                        <div class="my_user_red_info" v-if="Now_RoomData.room_type == 4">
                            <div class="red_info_top">{{item.content.thunder}}</div>
                            <div class="red_info_min">查看红包</div>
                            <div class="red_info_fot" v-if="typeof item.content.thunder == 'number'">单雷</div>
                            <div class="red_info_fot" v-else>连环雷</div>
                        </div>
                        <div class="my_user_red_info" v-if="Now_RoomData.room_type == 5">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">查看红包</div>
                            <div class="red_info_fot">接龙红包</div>
                        </div>
                    </div>
                    <!-- 已领取的红包 -->
                    <div v-if="item.content_type == 1 && (item.content.status == 2 || item.content.status == 1)" @click="open_RedPacket_window(item)">
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 1">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.thunder}}</div>
                            <div class="red_info_min">已领取</div>
                            <div class="red_info_fot">扫雷红包</div>
                        </div>
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 4">
                            <div class="red_info_top">{{item.content.thunder}}</div>
                            <div class="red_info_min">禁抢红包，禁止抢包</div>
                            <div class="red_info_fot" v-if="typeof item.content.thunder == 'number'">单雷</div>
                            <div class="red_info_fot" v-else>连环雷</div>
                        </div>
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 5">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已领取</div>
                            <div class="red_info_fot">接龙红包</div>
                        </div>
                    </div>
                    <!-- 已抢完的红包 -->
                    <div v-if="item.content_type == 1 && item.content.status == 3 " @click="open_RedPacket_window(item)">
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 1">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.thunder}}</div>
                            <div class="red_info_min">已抢完</div>
                            <div class="red_info_fot">扫雷红包</div>
                        </div>
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 4">
                            <div class="red_info_top">{{item.content.thunder}}</div>
                            <div class="red_info_min">已抢完</div>
                            <div class="red_info_fot" v-if="typeof item.content.thunder == 'number'">单雷</div>
                            <div class="red_info_fot" v-else>连环雷</div>
                        </div>
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 5">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已抢完</div>
                            <div class="red_info_fot">接龙红包</div>
                        </div>
                    </div>
                    <!-- 已领取的红包 -->
                    <div v-if="item.content_type == 1 && item.content.status == 4" @click="open_RedPacket_window(item)">
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 1">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.thunder}}</div>
                            <div class="red_info_min">已过期</div>
                            <div class="red_info_fot">扫雷红包</div>
                        </div>
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 4">
                            <div class="red_info_top">{{item.content.thunder}}</div>
                            <div class="red_info_min">已过期</div>
                            <div class="red_info_fot" v-if="typeof item.content.thunder == 'number'">单雷</div>
                            <div class="red_info_fot" v-else>连环雷</div>
                        </div>
                        <div class="my_user_red_info_ed" v-if="Now_RoomData.room_type == 5">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已过期</div>
                            <div class="red_info_fot">接龙红包</div>
                        </div>
                    </div>
                </div>
                <!-- 牛牛红包 -->
                <div v-if="Now_RoomData.room_type == 2 || Now_RoomData.room_type == 3">
                    <div v-if="item.content_type == 1 && (item.content.status == 0 || !item.content.status) && !item.switch" @click="open_RedPacket_window(item)">
                        <div class="my_user_red_niuniu">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">查看红包</div>
                            <div class="red_info_fot">牛牛红包</div>
                        </div>
                    </div>
                    <!-- 已领取的红包 -->
                    <div v-if="item.content_type == 1 && (item.content.status == 2 || item.content.status == 1)" @click="open_RedPacket_window(item)">
                        <div class="my_user_red_niuniu_ed">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已领取</div>
                            <div class="red_info_fot">牛牛红包</div>
                        </div>
                    </div>
                    <!-- 已抢完的红包 -->
                    <div v-if="item.content_type == 1 &&  item.content.status == 3" @click="open_RedPacket_window(item)">
                        <div class="my_user_red_niuniu_ed">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已抢完</div>
                            <div class="red_info_fot">牛牛红包</div>
                        </div>
                    </div>
                    <!-- 已过期的红包 -->
                    <div v-if="item.content_type == 1 && item.content.status == 4 " @click="open_RedPacket_window(item)">
                        <div class="my_user_red_niuniu_ed">
                            <div class="red_info_top">{{parseFloat(item.content.money).toFixed(2)}} - {{item.content.num}}</div>
                            <div class="red_info_min">已过期</div>
                            <div class="red_info_fot">牛牛红包</div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- 己方end -->




        </div>


    </div>
    </cube-scroll>
    </div>

<!-- 开包 -->
    <transition  name = "fade" >
        <div class="mark" v-if="red_packet_mark && this.pack_info">
            <div class="red_packet" v-if="red_packet_mark && this.pack_info">
                <div class="close_red_packet" @click="close_red_packet()"></div>
                <div class="red_packet_avatar">
                    <img src="../assets/img/ChatRoom/ic_user_avatar.png" v-if="this.pack_info.user.avatar == 'null'|| !this.pack_info.user.avatar || this.pack_info.user.avatar=='' ">
                    <img :src="this.pack_info.user.avatar" v-else>
                </div>
                <div class="red_packet_nickName">{{this.pack_info.user.nickname}}</div>
                <div class="red_packet_remark">发了一个红包,金额随机</div>
                <div class="red_packet_title" v-if="this.pack_info.status == 0 || this.pack_info.status == 1">恭喜发财,大吉大利</div>
                <div class="red_packet_title" v-if="this.pack_info.status == 2">红包已领取</div>
                <div class="red_packet_title" v-if="this.pack_info.status == 3">红包已抢完</div>
                <div class="red_packet_title" v-if="this.pack_info.status == 4">红包已过期</div>
                <div class="open_red_packet" @click="open_red_packet()" v-if="this.pack_info.status == 0 && !this.show_red_animation"></div>
                <div class="open_red_animation" v-show="this.pack_info.status == 0 && this.show_red_animation"></div>
                <!-- <div class="red_packet_particulars" @click="open_red_packet_particulars()"  v-if="this.pack_info.status != 0 && this.pack_info.data.user_list">查看红包详情</div>
                <div class="red_packet_particulars"  v-if="this.pack_info.status != 0 && !this.pack_info.data.user_list">红包无人领取已退还</div> -->

                <div class="red_packet_particulars" @click="open_red_packet_particulars()"  v-if="this.pack_info.status != 0 || (this.pack_info.data && this.pack_info.data.pack_master && this.pack_info.data.pack_master.uid == this.MyUid)">查看红包详情</div>
            </div>
        </div>
    </transition>

</div>


    <!-- 底部区域 -->
     <div class="footer_area">
        <div class="footer_input">
            <div @click="input_focus()">
                <cube-input class="cube_input" v-model="input_msg" @keyup.enter.native="send_msg" :class="have_msg==true ? 'cube_input' : 'cube_input_false'"  ref="input"></cube-input>
            </div>
            <div class="Emoji_input" @click="change_emoji()"><icon-svg icon-class="smiling"/></div>
            <transition name = "fade1">
                <!-- <div class="Add_input" v-if="!have_msg"><icon-svg icon-class="jiahao"/></div> -->
                <div class="Add_input" v-if="!have_msg"   @click="open_redEnvelope_btn()"><icon-svg icon-class="iconfontredpacket"/></div>
            </transition>
            <transition name = "fade2">
                <div class="send_input" v-if="have_msg" @click="send_msg()">发送</div>
            </transition>
         </div>
        <transition name = "made">
        <div class="emoji_box" v-if="open_emoji">
            <cube-scroll>
                <div>
                    <div class="emoji_item" v-for="(e,i) in emojiList" :key="i" @click="select_emoji(e)">{{e}}</div>
                </div>
            </cube-scroll>
        </div>
        </transition>

    </div>  

<!-- 发红包的组件 -->
<transition name = "into">
<div v-if="open_redEnvelope" class="red_world">
    <div class="red_world_top">
        <div class="red_world_goback" @click="open_redEnvelope = false" >
            <i class="get_back"></i>
        </div>
        <div class="red_world_title">
            {{Now_RoomData.room_type | type_name}}
        </div>
    </div>
    <div class="pad"></div><!-- 垫 -->
    <RedEnvelope @Emit_Red="take_Emit_RedData"></RedEnvelope>
</div>
</transition>




<!-- 红包详情的组件 -->
<transition name = "into">
<div v-if="open_partivulars" class="red_world">
    <div class="red_world_top">
        <div class="red_world_goback" @click="open_partivulars = false" >
            <i class="get_back"></i>
        </div>
        <div class="red_world_title">
            红包详情
        </div>
    </div>
    <div class="pad"></div><!-- 垫 -->
    <RedParticulars :pack_info='pack_info'></RedParticulars>
</div>
</transition>


<!-- 修改自建房房 -->
<transition name = "into">
<div v-if="open_set_room" class="set_style">
    <div class="set_top">牛牛不翻倍 房间修改</div>
    <div class="set_input">
        <div>最小发包金额：</div>
        <cube-input v-model="set_min_money"></cube-input>
    </div>
    <div class="set_input">
        <div>最大发包金额：</div>
        <cube-input v-model="set_max_money"></cube-input>
    </div>
    <div class="set_button">
        <div class="set_sumbit" @click="set_room_Data()">修 改</div>
        <div class="set_close" @click="open_set_room = false">取 消</div>
    </div>
    
</div>
</transition>

</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import RedEnvelope from './RoomInfo/RedEnvelope'  //发红包的组件
import RedParticulars from './RoomInfo/RedParticulars' //查看红包详情的组件

const emojiList = [
    '😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘',
    '🥰','😗','😙','😚','🙂','🤗','🤩','🤔','😐','😑','😶','🙄','😏',
    '😣','😥','😮','🤐','😯','😪','😫','🤓','😴','😌','😛','😜','😝',
    '🤤','😒','😓','😔','😕','🙃','🤑','😲','🙁','😖','😞','😟','😤',
    '😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳',
    '🤪','😵','🥴','😠','😡','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇',
    '🥳','🥺','🤠','🤥','🤫','🌠','🌀','🌈','🌂','☔','⚡','⛄','🔥',
    '💧','🌞','🌜','🌊','⭐','🌌','🪐','🌍','🍔','🍟','🍓','🍒','🍑',
    '🍐','🍊','🍉','🍇','🥝','🎂','🍎','🍅'
]

export default {
  name: 'ChatRoom',
  components: { RedEnvelope , RedParticulars},
  data () {
    return {
        Now_RoomData:'',//现在这个房间的数据
        pull_down:{
          click:true,
          listenScroll: true,
          probeType: 3,
          pullDownRefresh:false,
        },
        ws:{} ,// 初始化websocket
        Now_RedData:'', //现在的红包数据
        open_redEnvelope:false,  //打开发红包的组件
        open_partivulars:false,  //打开红包详情的组件

        input_msg:'',
        Now_page:'',//现在的页码数
        ToLoad:false,
        Now_max_Y :'', //目前的最大高度
        Now_Y :'', //用户滑动的高度
        // my_uid: 6 ,//用户id 登录的时候会传过来
        my_uid: '',//用户id 登录的时候会传过来

        pack_info:'', //扫雷红包信息
        red_packet_mark:false, //红包蒙版
        red_packet_window:false, //红包窗口

        rid:'', //此红包红包id

        show_red_animation:false, //红包打开钱币转动动画
        niuniu_settlement:'',

        have_msg:false,//判断有没有消息

        emojiList:emojiList,
        open_emoji:false,

        open_set_room:false,
        set_min_money:'', //修改最小金额
        set_max_money:'', //修改最大金额

        is_relink:false,//重连
        ggws:'',
        relink:'',
        // ping:'',
    }
  },
  created() {
    if(typeof this.RoomData != 'object'){
        this.Now_RoomData = JSON.parse(this.RoomData);
    }else{
        this.Now_RoomData = this.RoomData;
    }
     this.$store.dispatch('Websocket_status','room');
     this.my_uid = this.MyUid
     this.close_Group_Now_Message() //清空这个房间的未读消息
     this.initWebSocket();//初始化
  },
  computed: {
    ...mapState([
      'RoomData',//房间数据
      'token',
      'MyUid',
      'Group_Now_Message',
      'Group_Message_msgList',
      'Websocket_status'
    ]),
  },
  methods:{
    // 初始化WebSocket 在房间进行连接
  initWebSocket(){
    if(this.Websocket_status == 'room'){
    // 创建websocket
    let _that = this

    if(!this.is_relink){
        var login_data = '{"type":"login","action":"room","room_id":"'+ this.RoomData.id +'","token":"'+ this.token +'"}';
        this.global.ws.send(login_data);
    }
    if(this.is_relink){
        this.ws = new WebSocket("ws://13.209.240.252:7272");
        this.global.setWs(this.ws);
        this.global.ws.onopen = evt => {
            if(this.ggws){
                clearInterval(this.ggws)
                this.ggws = ''
            }
            if(this.Websocket_status == 'room'){
                var login_data = '{"type":"login","action":"room","room_id":"'+ this.RoomData.id +'","token":"'+ this.token +'"}';
            }
            this.global.ws.send(login_data);
        };
    }


    this.global.ws.onmessage = evt=> {
       if(this.Websocket_status == 'room'){
      let data = JSON.parse(evt.data)
      console.log(data)
      //如果 类型是登录 就把登录拿到的历史数据 颠倒一下数组 然后放进 变量
      if(data.type == 'login'){
          this.Now_RedData = (data.record.data).reverse()
          this.Now_page = data.record.page;
          if(this.Now_page > 1){
            let datalist = '{"type":"chat",  "action":"room_record","room_id":"'+ this.RoomData.id +'",  "page": "'+ Number(this.Now_page - 1) + '"}'
            this.Now_page = this.Now_page -1
            this.global.ws.send(datalist);
          }else{
            //遍历数据 看看 消息的时间是否相近  是的话就不用显示消息时间 
            if(this.Now_ChatMsgData && this.Now_ChatMsgData.length > 0){
                if(this.Now_ChatMsgData.length > 3){
                    for(let i=0; i<this.Now_ChatMsgData.length - 2;i++){
                        if(Date.parse(this.Now_ChatMsgData[i+1].time) - Date.parse(this.Now_ChatMsgData[i].time) > 600000 ){
                            this.Now_ChatMsgData[i+1].timeSwitch = true
                        }else{
                            this.Now_ChatMsgData[i+1].timeSwitch = false
                        }
                    }
                }
              this.Now_ChatMsgData[0].timeSwitch = true
            }

            // 等得到数据渲染后 等多一毫秒都行 让数据渲染完成后 往下
            setTimeout(()=>{
                this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'500')
            },1000)
          }
      }
      //如果 类型 是消息  且是 ==2  是文字类型 就把他塞进 循环数组里面
        if(data.type == 'message'){
            if(this.Websocket_status == 'room'){
            this.Now_RedData.push(data)
            this.$refs.scroll.refresh()
                //判断用户是不是在往上看历史记录 如果是 就不要自动往下滑动了
                if(this.Now_Y - this.$refs.scroll.scroll.maxScrollY < 400){
                    this.$refs.scroll.refresh()
                    setTimeout(()=>{
                        this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'500')
                    },10)
                }
                //如果是自己发的红包出来了就关闭发红包的窗口并且滑到最下面
                if(data.from_user.uid == this.my_uid && data.content_type == 1){
                    // this.$createToast({time: 2000, txt:'发包成功!', type:'txt'}).show()
                    this.$refs.scroll.refresh()
                    setTimeout(()=>{
                        this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'500')
                    },1)
                    this.open_redEnvelope = false
                }
            }
        }
        //如果 类型 是历史数据  就把他塞进 循环数组里面
        if(data.type == 'record'){
            if(this.Websocket_status == 'room'){
            this.Now_RedData = data.record.data.reverse().concat(this.Now_RedData)
            if(this.Now_page > 1 && data.record.data.length > 0){
                    let datalist = '{"type":"chat",  "action":"room_record","room_id":"'+ this.RoomData.id +'",  "page": "'+ Number(this.Now_page - 1) + '"}'
                    this.Now_page = this.Now_page - 1
                    this.global.ws.send(datalist);
            }else{
                //   遍历数据 看看 消息的时间是否相近  是的话就不用显示消息时间 
                for(let i=0; i<this.Now_RedData.length - 2;i++){
                    if(Date.parse(this.Now_RedData[i+1].time) - Date.parse(this.Now_RedData[i].time) > 600000 ){
                        this.Now_RedData[i+1].timeSwitch = true
                    }else{
                        this.Now_RedData[i+1].timeSwitch = false
                    }
                }
                this.Now_RedData[0].timeSwitch = true
                this.$refs.scroll.refresh() 
                setTimeout(()=>{
                this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'0')
            },100)
            }
            }
        }

            // 类型 是pick 红包  
            if(data.type == 'pack'){
                 if(this.Websocket_status == 'room'){
                //打开红包
                if(data.action&& data.action == 'get'){
                    this.pack_info = data
                    this.red_packet_mark = true;
                    this.red_packet_window = true;
                    this.show_red_animation = false;

                    this.Now_RedData.forEach(element => {
                        if(element.content.rid == this.rid){
                            element.content.status = 2
                        }
                    });
                    this.show_red_animation = false
                    //二次打开 去到红包详情
                    if(data.status == 2 || data.status == 1  || (data.status==3 && data.data.pack) ){
                        this.open_partivulars = true
                        this.red_packet_mark = false;
                        this.red_packet_window = false;
                    }
                    this.Now_RedData.forEach(element => {
                        if(element.content.rid == this.rid){
                            element.content.status = data.status
                        }
                    });
                }
                }
            }
            if(data.action == 'settlement'){
                if(this.Websocket_status == 'room'){
                this.$emit('show_settlement',data)
                }
            }
            //私聊消息
            if(data.action == 'private' && !data.type){
                if(this.Websocket_status == 'room'){
                this.$emit('show_private',data)
                }
            }
            //当红包接龙是最小的时候的自动发包提示
            if(data.action == 'auto_send' && data.type == 'pack'){
                if(this.Websocket_status == 'room'){
                    this.$createToast({time: 3000, txt:data.msg, type:'txt'}).show()
                }
            }


        if(data.type == 'error' ){
            if(data.deadly == true){
                window.localStorage.setItem('auto_logIn','false');
                this.$store.dispatch('Websocket_status','');
                window.sessionStorage.setItem('access_token','');
                if(!window.sessionStorage.getItem('access_token')){
                    this.$router.push('/');
                }
            }
            return this.$createToast({time: 3000, txt:data.msg, type:'txt'}).show()
        }
       }
    };

        // 断了 会重新自己连接
    this.global.ws.onclose = evt=> {
        if(!this.ggws && this.Websocket_status == 'room'){
        this.is_relink = true;
        this.initWebSocket();
        this.ggws  = setInterval(() => {
            this.initWebSocket();
        }, 1000);
        
        }
    }
    this.global.ws.onerror = evt=> {
        if(!this.ggws && this.Websocket_status == 'room'){
            this.is_relink = true;
            this.initWebSocket()
        }
    }
  }},
    scroll(obj) {
        // console.log(obj.y)
        this.Now_Y = obj.y
    },
    //清空这个房间的未读消息
    close_Group_Now_Message(){
        //清空房间个数
        if(this.Group_Now_Message){
            for(var i in this.Group_Now_Message){
                if(i == this.RoomData.id){
                let msgnum = this.Group_Now_Message
                    msgnum[i] = ''
                this.$store.dispatch('Group_Now_Message', '')
                this.$store.dispatch('Group_Now_Message', msgnum)
                }
            }
        }
    },
    //发红包
    take_Emit_RedData(Red_data){
        this.global.ws.send(Red_data);
    },
    //抢包 - 打开抢包窗口
    open_RedPacket_window(item){
        this.rid = item.content.rid
        let data
        if(this.Now_RoomData.room_type != 4){
            data = '{"type":"pack","action":"get","status":"0","room_id":"'+ this.RoomData.id +'","rid":"'+ this.rid +'"}'
        }
        //如果房间类型是禁枪 点击红包就直接显示红包详情 没有抢包的过程
        if(this.Now_RoomData.room_type == 4){
            data = '{"type":"pack","action":"record","room_id":"'+ this.RoomData.id +'","rid":"'+ this.rid +'"}'
        }
        this.global.ws.send(data);
        // item.switch = true;
    },
    //打开红包详情
    open_red_packet_particulars(){
        this.open_partivulars = true
        this.red_packet_mark = false;
        this.red_packet_window = false;
        
    },
    //抢到了 传 1 打开
    open_red_packet(){
        this.show_red_animation = true;
        let data = '{"type":"pack","action":"get","status":"1","room_id":"'+ this.RoomData.id +'","rid":"'+ this.rid +'"}'
        this.global.ws.send(data);
        // this.Now_RedData.forEach(element => {
        //     if(element.content.rid == this.rid){
        //         element.content.status = 2
        //     }
        // });
    },
    //修改房间类型
    set_room_Data(){
        if(this.set_min_money == '') return this.$createToast({time: 1000, txt:'请填写修改最小金额',mask: true, type:'txt'}).show()
        if(this.set_max_money == '') return this.$createToast({time: 1000, txt:'请填写修改最大金额',mask: true, type:'txt'}).show()
        let data = {
            'room_id':this.RoomData.id,
            'min_money':Number(this.set_min_money),
            'max_money':Number(this.set_max_money),
        }
        this.$http.post('/api/chat/index/editRoom',data).then(res=>{
            this.$createToast({time: 1000, txt:res.data.msg,mask: true, type:'txt'}).show()
            this.open_set_room = false
        })
    },
    //关闭红包
    close_red_packet(){
        this.red_packet_window = false;
        setTimeout(()=>{
            this.red_packet_mark = false;
        },200)
    },
    input_focus(){
        if(this.open_emoji){
            this.open_emoji = false
        }
        setTimeout(()=>{
            this.$refs.scroll.refresh() 
            this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'50')
        },50)
    },
    open_redEnvelope_btn(){
        this.open_redEnvelope = true;
        if(this.open_emoji){
            this.open_emoji = false
        }
    },
    change_emoji(){
        this.open_emoji = !this.open_emoji
        setTimeout(()=>{
            this.$refs.scroll.refresh() 
            this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,'50')
        },50)
    },
    //选择emoji
    select_emoji(e){
        this.input_msg = this.input_msg + e
    },
    //发消息
    send_msg(){
        //点击发送的时候 先判断 有没有断链 如果断链的 就告诉网络异常
        if(this.global.ws.readyState != 1){
            this.$createToast({time: 2000, txt:'网络异常，重连中...', type:'txt'}).show()
            if(!this.ggws && !this.is_relink){
                this.is_relink = true
                this.initWebSocket()
            }
            if(!this.open_emoji){
                this.$refs['input'].focus()
            }
            return;
        }

        let data = '{"type":"chat",  "action":"chat_room", "content_type":2,"room_id":"'+ this.RoomData.id +'", "nl2br":"0", "content": "'+ this.input_msg + '"}'
        this.global.ws.send(data);
        this.input_msg = '';
        if(!this.open_emoji){
            this.$refs['input'].focus()
        }
    },
    //回首页
    goHOME(number){
        if(this.ggws){
            clearInterval(this.ggws)
        }
        let num =  this.Now_RoomData.homePage
        this.$router.push({name: 'home', params:{LowNumber: num}})
    },
    go_cz(){
        this.$router.push({name: 'recharge'})
    }
  },
  destroyed() {
        if(this.ggws){
            clearInterval(this.ggws)
        }
        //最后一条
        if(this.Now_RedData.length > 0 ){
        if(this.Group_Message_msgList){
            for(var n in this.Group_Message_msgList){
                if(n == this.RoomData.id){
                    let msglist = this.Group_Message_msgList
                    let msg
                    if(typeof (this.Now_RedData[this.Now_RedData.length - 1].content) == 'object'){
                        msg = this.Now_RedData[this.Now_RedData.length - 1].from_user.nickname +'：[红包]'
                    }else{
                         msg = this.Now_RedData[this.Now_RedData.length - 1].from_user.nickname +'：' +  this.Now_RedData[this.Now_RedData.length - 1].content
                    }
                    
                    msglist[n] = msg
                    this.$store.dispatch('Group_Message_msgList', '')
                    this.$store.dispatch('Group_Message_msgList', msglist)
                }else{
                    let msglist = this.Group_Message_msgList
                    let msg
                    if(typeof (this.Now_RedData[this.Now_RedData.length - 1].content) == 'object'){
                        msg = this.Now_RedData[this.Now_RedData.length - 1].from_user.nickname +'：[红包]'
                    }else{
                         msg = this.Now_RedData[this.Now_RedData.length - 1].from_user.nickname +'：' +  this.Now_RedData[this.Now_RedData.length - 1].content
                    }
                    
                    msglist[this.RoomData.id] = msg
                    this.$store.dispatch('Group_Message_msgList', '')
                    this.$store.dispatch('Group_Message_msgList', msglist)
                }
            }
        }else{
            let msglist = {};
            let msg;
            if(typeof (this.Now_RedData[this.Now_RedData.length - 1].content) == 'object'){
                msg = this.Now_RedData[this.Now_RedData.length - 1].from_user.nickname +'：[红包]'
            }else{
                    msg = this.Now_RedData[this.Now_RedData.length - 1].from_user.nickname +'：' +  this.Now_RedData[this.Now_RedData.length - 1].content
            }
            
            msglist[this.RoomData.id] = msg
            this.$store.dispatch('Group_Message_msgList', '')
            this.$store.dispatch('Group_Message_msgList', msglist)
        }
        }

        // 群组消息条数
        if(this.Group_Now_Message){
            for(var i in this.Group_Now_Message){
                if(i == this.RoomData.id){
                let msgnum = this.Group_Now_Message
                    msgnum[i] = ''
                this.$store.dispatch('Group_Now_Message', '')
                this.$store.dispatch('Group_Now_Message', msgnum)
                }
            }
        }
  },
  watch:{
    'input_msg'(){
        if(this.input_msg.length > 0){
            this.have_msg = true
        }else{
            this.have_msg = false 
        }
    }
   },
  filters:{
     type_name(v){
         if(v==1) return '扫雷红包';
         if(v==2) return '牛牛红包';
         if(v==3) return '牛牛红包';
         if(v==4) return '禁枪红包';
         if(v==5) return '接龙红包';
     }
  }
 
}
</script>

<style scoped>

.red_world_top{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #fe4d57;
    font-weight: 600;
    font-size: .46rem;
    color: #fff;
    font-family: 'Microsoft YaHei';
    position: fixed;
    z-index: 99999;
    top: 0;
}
.red_world_goback{
    height: 1.2rem;
    width: 1.2rem;
    font-weight: 600;
    font-size: .7rem;
    background: url(../assets/img/ChatRoom/ic_arrow_back_white_24dp.png) no-repeat;
    background-size: 60%;
    background-position: center;
    position: absolute;
    top:0;
    left: 0;
}
/* 垫底 */
.red_world_title{
    width: 100%;
    height: 1.2rem;
    font-size: .45rem;
    font-weight: 600;
    text-align: center
}

.top{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #fe4d57;
    font-weight: 600;
    font-size: .46rem;
    color: #fff;
    font-family: 'Microsoft YaHei';
    position: fixed;
    z-index: 10;
}
.goback{
    height: 1.2rem;
    width: 1.2rem;
    font-weight: 600;
    font-size: .7rem;
    float: left;
    background: url(../assets/img/ChatRoom/ic_arrow_back_white_24dp.png) no-repeat;
    background-size: 60%;
    background-position: center;
}

.title{
    /* width: 6.4rem; */
    width: 7.6rem;
    height: 1.2rem;
    font-size: .45rem;
    font-weight: 600;
    float: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.title_2{
    width: 8.8rem;
    height: 1.2rem;
    font-size: .45rem;
    font-weight: 600;
    float: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.Red_Envelope{
    height: 1.2rem;
    width: 1.2rem;
    font-weight: 600;
    font-size: .7rem;
    float: left;
    background: url(../assets/img/ChatRoom/ic_reward.png) no-repeat;
    background-size: 40%;
    background-position: center;
}
.Group_info{
    height: 1.2rem;
    width: 1.2rem;
    font-weight: 600;
    font-size: .7rem;
    float: left;
    background: url(../assets/img/ChatRoom/ic_group_info.png) no-repeat;
    background-size: 40%;
    background-position: center;
}

.set_info{
    height: 1.2rem;
    text-align: center;
    width: 1.2rem;
    line-height: 1.2rem;
    font-weight: 600;
    font-size: .6rem;
    float: left;
}




.Chat_area{
    width: 100%;
    height: calc(100vh - 2.4rem);
    /* background-color: aliceblue; */
    background-color: #ededed;
    position: absolute;
    bottom: 1.2rem;
    box-sizing: border-box;
    /* padding: .1rem; */
}
.emoji_Chat_area{
    width: 100%;
    height: calc(100vh - 8.4rem);
    /* background-color: aliceblue; */
    background-color: #ededed;
    position: absolute;
    top:1.2rem;
    box-sizing: border-box;
    padding: .1rem;
}

.footer_input{
    display: block;
    overflow: hidden;
    height: 1.2rem;
}
.emoji_box{
    position: relative;
    width: 100%;
    height: 6rem;
    /* background-color: #07c160; */
    background-color: #eeeeee;
    overflow: hidden;
}
.emoji_item{
    width: 1.25rem;
    height: 1.25rem;
    line-height: 1.25rem;
    text-align: center;
    /* background-color: #333; */
    font-size: .56rem;
    float: left;
}

.made-enter-active, .made-leave-active {
    transition: all .1s ease;
}
 .made-enter, .made-leave-to {
   /* transform: translate(50%,0%); */
   height: 0;
   /* opacity:0; */
}
/* 右上角 */
.right_top{
    width:1.4rem;
    height:5.4rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
}
.right_top_item{
    width:1.2rem;
    height:1.6rem;
    padding: .1rem .1rem;
}
.right_top_item img{
    display:block;
    width:1rem;
    height:1rem;
    margin:.1rem;
}
.right_top_item div{
    width:1.2rem;
    height:.4rem;
    line-height: .4rem;
    font-size: .3rem;
    text-align: center;
}



.scroll-list-wrap{
  width: 100%;
  height: 100%;  
  background-color: #ededed;
  /* background-color: aliceblue; */
  overflow: hidden;
}


.footer_area{
    width: 100%;
    /* height: 1.2rem; */
    position: absolute;
    bottom: 0;
    z-index: 100;
    background-color: #f7f7f7;
}
.cube_input{
    width: 7rem;
    height: .8rem;
    margin: .2rem;
    border-radius: 5px;
    overflow: hidden;
    border: none;
    background-color: #fff;
    float: left;
    transition: all .2s;
}
.cube_input_false{
    width: 7.8rem;
    height: .8rem;
    margin: .2rem;
    border-radius: 5px;
    overflow: hidden;
    border: none;
    background-color: #fff;
    float: left;
    transition: all .2s;
}

.Emoji_input{
    width: .8rem;
    height: .8rem;
    line-height: .8rem;
    margin: .2rem 0;
    overflow: hidden;
    float: left;
    font-size: .68rem;
}
.Add_input{
    width: .8rem;
    height: .8rem;
    line-height: .8rem;
    margin: .2rem .1rem;
    overflow: hidden;
    float: left;
    font-size: .68rem;
    font-weight: bold;
    transition: all .1s;
}
.send_input{
    width: 1.6rem;
    height: .8rem;
    line-height: .8rem;
    margin: .2rem .1rem;
    overflow: hidden;
    float: left;
    background-color: #07c160;
    border-radius: 3px;
    font-size: .4rem;
    text-align: center;
    color: #e4fff1;
}











/* 用户发信息 */
/* .user_item{
    width:8.4rem;
    min-height: 2rem;
    margin: .4rem 0;
    background-color: blueviolet;
    overflow: hidden;
} */
.user_item{
    width:9.4rem;
    min-height: 1rem;
    margin: .2rem auto;
    overflow: hidden;
}
.user_left{
    width: 1rem;
    height:1rem;
    /* background-color: yellow; */
    float: left;
}
.my_user_left{
    width: 1rem;
    height:1rem;
    /* background-color: yellow; */
    float: right;
}
.user_left img{
    width: 1rem;
    height:1rem;
    border-radius: 5px;
}
.my_user_left img{
    width: 1rem;
    height:1rem;
    border-radius: 5px;
}
.user_right{
    max-width: 7rem;
    min-height:1.4rem;
    /* background-color: yellow; */
    float: left;
    position: relative;
}
.my_user_right{
    max-width: 7rem;
    min-height:1.4rem;
    float: right;
    position: relative;
}
.user_name{
    height:.46rem;
    font-size: .34rem;
    box-sizing: border-box;
    /* padding: .1rem .4rem; */
    /* margin:0 .1rem; */
    position: relative;
    left: .4rem;
    /* background-color: #fe4d57; */
}
.my_user_name{
    height:.6rem;
    font-size: .4rem;
    box-sizing: border-box;
    padding: .1rem .4rem;
    text-align: right;
}
/* 用户消息样式 */
.user_info{
    /* min-width:2.2rem; */
    /* max-width:6.2rem; */
    margin:0 .2rem .2rem .3rem;
    min-height:.8rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: .1rem .1rem .4rem -.4rem #333;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
.my_user_info{
    margin:0 .3rem .2rem .2rem;
    min-height:.8rem;
    /* background-color: #ffffff; */
    background-color: #95ec69;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: .1rem .1rem .4rem -.4rem #333;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
    text-align: right;
}
.triangle02{
    width: 0;
    height: 0;
    border-top: .3rem solid transparent ;
    border-right: .36rem solid rgb(255, 255, 255);
    border-bottom: .3rem solid transparent ;
    border-left: .52rem solid transparent ;
    position: absolute;
    top:.6rem;
    left: -.35rem;
}
.my_triangle02{
    width: 0;
    height: 0;
    border-top: .3rem solid transparent ;
    border-right: .52rem solid transparent ;
    border-bottom: .3rem solid transparent ;
    border-left: .36rem solid #95ec69;
    position: absolute;
    top:.17rem;
    right: -.35rem;
}
/* 扫雷 红包样式 */
.user_red_info{
    width:6.35rem;
    margin:0 .4rem .2rem .25rem;
    height:2.2rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: .1rem .1rem .4rem -.4rem #333;
    background: url(../assets/img/ChatRoom/ic_receive_red_nor.png) no-repeat;
    background-size: 100% 100%;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
/* 牛牛 红包样式 */
.user_red_niuniu{
    width:6.35rem;
    margin:0 .4rem .2rem .25rem;
    height:2.2rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: .1rem .1rem .4rem -.4rem #333;
    background: url(../assets/img/ChatRoom/ic_receive_cow_nor.png) no-repeat;
    background-size: 100% 100%;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
/* 我的 扫雷 红包样式 */
.my_user_red_info{
    width:6.35rem;
    margin:0 .25rem .2rem .4rem;
    height:2.2rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: -.1rem -.1rem .4rem -.4rem #333;
    background: url(../assets/img/ChatRoom/ic_send_red_nor.png) no-repeat;
    background-size: 100% 100%;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
/* 我的 牛牛 红包样式 */
.my_user_red_niuniu{
    width:6.35rem;
    margin:0 .25rem .2rem .4rem;
    height:2.2rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: -.1rem -.1rem .4rem -.4rem #333;
    background: url(../assets/img/ChatRoom/ic_send_cow_nor.png) no-repeat;
    background-size: 100% 100%;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
/* 扫雷过期 */
.user_red_info_ed{
    width:6.35rem;
    margin:0 .4rem .2rem .25rem;
    height:2.2rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: .1rem .1rem .4rem -.4rem #333;
    background: url(../assets/img/ChatRoom/ic_receive_red_sel.png) no-repeat;
    background-size: 100% 100%;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
/* 牛牛过期 */
.user_red_niuniu_ed{
    width:6.35rem;
    margin:0 .4rem .2rem .25rem;
    height:2.2rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: .1rem .1rem .4rem -.4rem #333;
    background: url(../assets/img/ChatRoom/ic_receive_cow_sel.png) no-repeat;
    background-size: 100% 100%;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
/* 我的 扫雷过期 */
.my_user_red_info_ed{
    width:6.35rem;
    margin:0 .25rem .2rem .4rem;
    height:2.2rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: -.1rem -.1rem .4rem -.4rem #333;
    background: url(../assets/img/ChatRoom/ic_send_red_sel.png) no-repeat;
    background-size: 100% 100%;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
/* 我的 牛牛 过期 */
.my_user_red_niuniu_ed{
    width:6.35rem;
    margin:0 .25rem .2rem .4rem;
    height:2.2rem;
    background-color: #ffffff;
    font-size: .4rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .3rem;
    position: relative;
    box-shadow: -.1rem -.1rem .4rem -.4rem #333;
    background: url(../assets/img/ChatRoom/ic_send_cow_sel.png) no-repeat;
    background-size: 100% 100%;
    overflow:hidden;
    white-space:normal; 
    word-break:break-all;
    text-overflow:ellipsis;
}
.red_info_top{
    width: 4rem;
    height: .4rem;
    /* background-color: aqua; */
    position: relative;
    left:1.4rem;
    margin-top:.2rem;
    color: #fff;
    font-weight: bold;
}
.red_info_min{
    width: 4rem;
    height: .8rem;
    line-height: .8rem;
    /* background-color: aqua; */
    position: relative;
    left:1.4rem;
    color:#fff;
    font-size: .34rem;
}
.red_info_fot{
    width: 4rem;
    height: .5rem;
    line-height: .5rem;
    /* background-color: aqua; */
    position: absolute;
    bottom: 0;
    font-size: .3rem;
    color: rgb(148, 148, 148);
}



/* 到顶了 */
.arrive_top_l{
    width: 2rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .4rem;
    text-align: center;
    margin: .1rem auto;
    /* background-color: #f1f1f1; */
}

/* 开包 */
.mark{
    width: 100%;
    height: 100%;
    /* background: rgba(51, 51, 51, 0.05); */
    background: rgba(51, 51, 51, 0);
    position:fixed;
    top:0;
    bottom: 0;
    left: 0;
    z-index: 799;
}
.red_packet{
    width: 8rem;
    height: 10.7rem;
    position: absolute;
    top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background:  url(../assets/img/ChatRoom/ic_red_packet_bg2.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
}
/* 红包底片预加载 */
.red_packet::after {
    content: "";
    display: block;
    position: absolute;
    background: url(../assets/img/ChatRoom/ic_red_packet_bg2.png) no-repeat -10000px -1000px;
    width: 0;
    height: 0
}
/* 红包上升出来的动画 */
.fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
}
 .fade-enter{
    transform: scale(0,0);
    opacity: 0;
 } 

.fade-leave-to {
   /* transform: translate(0,100%); */
   transform: scale(0,0);
   opacity: 0;
}

/* 红包详情动画 */
.into-enter-active, .into-leave-active {
    transition: all .3s ease;
}
.into-enter{
    transform: scale(0,0);
    opacity: 0;
}
.into-leave-to {
   transform: translate(100%,0%);
   opacity: 0;
}

.close_red_packet{
    width: .4rem;
    height: .4rem; 
    position:absolute;
    top:.5rem;
    left: .5rem;
    background:url(../assets/img/ChatRoom/ic_red_packet_exit.png) no-repeat;
    background-size: 100% 100%;
}
.open_red_packet{
    width: 2rem;
    height: 2rem; 
    position:absolute;
    bottom: 1.3rem;
    left: 3rem;
    background: url(../assets/img/ChatRoom/ic_red_packet_open.png) no-repeat;
    background-size: 100% 100%;
}
.open_red_animation{
    width: 2rem;
    height: 2rem; 
    position:absolute;
    bottom: 1.3rem;
    left: 3rem;
    background: url(../assets/img/ChatRoom/ic_open1.png) no-repeat;
    background-size: 100% 100%;
    animation:mymove .5s infinite;
	-webkit-animation:mymove .5s infinite;
}

@keyframes mymove
{
    0%   { background: url(../assets/img/ChatRoom/ic_open1.png) no-repeat;background-size: 100% 100%;}
    16.7%  { background: url(../assets/img/ChatRoom/ic_open2.png) no-repeat;background-size: 100% 100%;}
    33.4%  { background: url(../assets/img/ChatRoom/ic_open3.png) no-repeat;background-size: 100% 100%;}
    50.1% { background: url(../assets/img/ChatRoom/ic_open4.png) no-repeat;background-size: 100% 100%;}
    66.8% { background: url(../assets/img/ChatRoom/ic_open5.png) no-repeat;background-size: 100% 100%;}
    83.5% { background: url(../assets/img/ChatRoom/ic_open6.png) no-repeat;background-size: 100% 100%;}
}

.red_packet_avatar{
    width: 100%;
    height: 1.4rem;
    margin: 1.6rem 0 .5rem;
    /* background-color: #333; */
}
.red_packet_avatar img{
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    margin: auto;
    background-color: #333;
}
.red_packet_nickName{
    width: 100%;
    font-size: .5rem;
    text-align: center;
    color: #ffd49d;
}
.red_packet_remark{
    width: 100%;
    font-size: .32rem;
    text-align: center;
    color: #ffd49d;
    margin: .2rem auto 1rem;
}
.red_packet_title{
    width: 100%;
    font-size: .5rem;
    text-align: center;
    color: #ffd49d;
}
.red_packet_particulars{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    /* background-color: #f7f7f7; */
    position: absolute;
    text-align: center;
    bottom: 0;
    left: 0;
    font-size: .3rem;
    color: #ffd49d;
}



.fade1-enter-active{
    transition: all .3s ease;
}
.fade1-leave-active {
    transition: all .3s ease;
}
 .fade1-enter{
   transform: scale(0, 0);
}
.fade1-leave-to {
    transform: scale(0, 0);
}

.fade2-enter-active{
    transition: all .5s ease;
}
.fade2-leave-active {
    transition: all 1s ease;
}
 .fade2-enter{
   transform: scale(0, 0);
}
.fade2-leave-to {
   transform: translate(200%,0);
}


/* 发红包的地域 */
.red_world{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 800;
}

.msg_time{
    width: 4rem;
    height: .5rem;
    line-height: .5rem;
    margin:0 auto .3rem;
    text-align: center;
    font-size: .32rem;
    border-radius: 10px;
    background-color: #dadada;
}

.set_style{
    width: 9rem;
    /* height: 7rem; */
    position: absolute;

    overflow: hidden;
    border-radius: 5px;
    z-index:50;
    background-color: #f1f1f1;
    top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-shadow: .2rem .2rem 1rem -.5rem #333;
}
.set_top{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: #fe4d57;
    text-align: center;
    font-size: .5rem;
    font-weight: bold;
    color: rgb(241, 241, 241);
}
.set_input{
    width: 90%;
    height: 1.8rem;
    margin: .2rem auto;
    overflow: hidden;
}
.set_input div{
    margin:.1rem auto;
    font-size: .46rem;
}
.set_button{
    width: 100%;
    height: 2rem;
    overflow: hidden;
}
.set_sumbit{
    width: 3rem;
    height: 1rem;
    line-height: 1rem;
    /* background-color: rgb(70, 131, 245); */
    border-radius: 5px;
    margin: .5rem .75rem;
    text-align: center;
    font-size: .44rem;
    /* color: rgb(180, 180, 180); */
    float: left;
    background:-webkit-gradient(45deg, 100% 0, 0 0, from(#fe4d57), to(#f76328));
    background: -webkit-linear-gradient(45deg, #fe4d57 , #f76328); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(45deg, #fe4d57 , #f76328); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(45deg, #fe4d57 , #f76328); /* Firefox 3.6 - 15 */
    background: linear-gradient(45deg, #fe4d57 , #f76328); /* 标准的语法 */
}
.set_close{
    width: 3rem;
    height: 1rem;
    line-height: 1rem;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    margin: .5rem .75rem;
    text-align: center;
    font-size: .44rem;
    float: left;
}
</style>
<style>
.cube_input input:focus{
    outline:none !important;
}
.cube-input-field:focus{
    outline:none !important;
}
.cube_input-active{
     outline:none !important;
}
</style>