<template>
<div class="bg">
     <TopHeader :goHome='4'/>


<div class="HelpCenter">
    <template>
        <cube-tab-bar v-model="selectedLabel" show-slider @click="clickHandler()">
            <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index ">
            </cube-tab>
        </cube-tab-bar>
            <cube-tab-panels v-model="selectedLabel">
                <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="index">
                <ul>
                    <li class="tab-panel-li" v-for="(hero, index) in item.heroes" :key="index" @click="open(index)">
                        <i>{{index + 1}}</i>{{hero.title}}
                        <transition name = "fade">
                            <div v-show="index == open_ordinal" class="item_detail">
                                {{hero.content}}</div>
                        </transition>
                    </li>
                </ul>
                </cube-tab-panel>
            </cube-tab-panels>
    </template>
</div>


</div>
</template>

<script>
import TopHeader from '@/components/common/TopHeader'


const rulb =[{
                label: '常见问题',
                heroes: [
                    {'title':'如何邀请好友下载注册',
                     'content':'您好，请点击右下角（我的）后再点击（分享赚钱），任选一个推广海报分享给好友，在海报的右下角即有二维码可以扫描注册下载；【温馨提示】记得还要复制您的邀请码给好友，好友才能完成注册哦。'
                    }, 
                    {'title':'手机号码已注册', 
                     'content':'您好，若您在注册账号时出现此提示，表示此组手机号码已有注册使用过，本系统设置，一个手机号码只可以注册一个账号，还请您更换其他手机号码注册，谢谢。温馨提示：平台不支持单一玩家开启多账号游戏，请您凭单一账号进行娱乐哦。'
                    },
                    {'title':'账号更换绑定手机号码', 
                     'content':'您好，由于系统设置，手机号码一经注册后便无法修改，建议您直接以新的手机号码重新注册游戏账号即可哦。'
                    },
                    {'title':'资料、资金、游戏安全类',
                     'content':'亲，我们的程序是安全无风险的，程序里也申明我们绝不会盗取用户的隐私，也不会泄露用户的个人信息，请用户放心使用，每位玩家信息的保密性对我们来说是至关重要的，我们采用最先进的加密技术来确保数据的安全性，并保证永不将玩家的资料泄露给任何第三方（包括政府，银行等机构），同时提醒您保管好个人的会员账号信息及密码，切勿泄露给其他人，确保您的账户资金安全。'
                    },
                    {'title':'无法抢红包',
                     'content':'您好，抢包需满足发包金额的1.6倍余额哦，请点击（账单记录）都可以查看到您的余额，本平台提供多种充值方式，欢迎小额充值游戏哦。'
                    },
                    {'title':'开放群组',
                     'content':'您好，目前只开放扫雷群及牛牛群的代理，开放群主权限尚在更新中，还请您多多关注，随时参与最新活动哦。'
                    }],
            }, {
                label: '存款问题',
                heroes: [
                    {'title':'如何充值',
                     'content':'请点选界面下方【我的】在点击【充值中心】后，即可选择您喜爱的方式进行充值，依据页面指示操作，金额会实时添加到您的游戏账号中。'
                    }, 
                    {'title':'充值最低金额多少', 
                     'content':'红包单笔最低充值金额100元、最高充值金额5000元，目前为您提供多种充值方式，欢迎您完成充值后随时进入体验游戏哦'
                    },
                    {'title':'充值收手续费吗？', 
                     'content':'红包充值是不收手续费的，但是为了加快到账速度，系统会自动调整浮动金额，请您放心，付款金额和到游戏账户的金额是一样的哦。'
                    },
                    {'title':'没有我想要的充值渠道',
                     'content':'红包支付通道不定期会维护，建议您以APP充值页面的支付方式为主哦。'
                    },
                    {'title':'无法充值',
                     'content':'可能是同时充值人数过多，请您稍晚尝试几次，并耐心等待支付页面跳转。建议充值金额可尝试108、209等个位数不为0的整数，以加快充值效率，（温馨提醒：请不要保存二维码进行二次充值以免掉单导致充值未到哦。'
                    },
                    {'title':'充值没到账',
                     'content':'在线支付通常是及时到账，但容易受网络波动影响导致延迟到账，若10分钟后仍未到账，请您与在线客服人员联系，并提供您的游戏账号及充值成功截图，以便客服人员快速为您处理，谢谢。'
                    }],
            }, {
                label: '提款问题',
                heroes: [
                    {'title':'如何提现',
                     'content':'请点击界面右下角【我的】再点选【提现中心】即可申请提现'
                    }, 
                    {'title':'提款规则', 
                     'content':'1、当日发包及抢包流水需达到一百。2、单笔最低提现金额100元，最高提现金额不限额。3、每日最多提现五次'
                    },
                    {'title':'提现手续费', 
                     'content':'红包提现是不收手续费的哦'
                    },
                    {'title':'提现多久可以到账', 
                     'content':'一般提现审核通过后3-5分钟即可出款，具体到账时间依银行作业时间为主。'
                    },
                    {'title':'提现失败',
                     'content':'请点击【我的】再点选【提现中心】即可查看到提现失败的原因。'
                    },
                    {'title':'提现显示成功但是没有收到钱',
                     'content':'提现成功表示红包已出款给您，银行卡提现金额将会在出款后24小时内到账，若您在24小时后尚未查收到此款项，请您联系在线客服，并提供您的游戏账号及提现记录截图，以便客服人员快速为您查询。'
                    },
                    {'title':'银行卡怎么绑定',
                     'content':'您好，我们不需要绑定提现信息，您第一次提现时填写的信息系统会自动记忆，于下次提现时您只要点选历史提现记录再输入提现金额就可以了哦。'
                    }],
            }, {
                label: '游戏问题',
                heroes: [
                    {'title':'怎么进群',
                     'content':'点击界面下方【游戏组】即可查看到各个群组，选择后符合资格即可进群，初级24小时扫雷群及牛牛群人人可进。福利群当日需发包流水达到1000或抢包流水达到500.'
                    }, 
                    {'title':'抢红包显示余额不足', 
                     'content':'扫雷群内，未防止用户恶意跑包，故抢包者余额需满足发包金额的1.6倍。牛牛群内，抢包者余额需满足抢包金额的1倍或3倍。'
                    },
                    {'title':'怎么关闭游戏声音', 
                     'content':'点击界面下方【我的】在点选【设置】即可开启及关闭游戏音效。'
                    },
                    {'title':'游戏卡顿', 
                     'content':'红包为你提供的是网络线上游戏，对您的网络连接速度有一定要求，建议您可以刷新下您的网络或软件试试，同时将不必要的网络工具关闭，如下载软件、QQ、网络影音等，以免影响到您正常的游戏，若情况未改善，请您再次联系客服并提供相关截图，以便客服为您排查问题。'
                    },
                    {'title':'怎么查看发包及抢包流水',
                     'content':'点击界面下方【奖励】即可查看到您当日发包及抢包的流水哦！'
                    }],
            }, {
                label: '规则问题',
                heroes: [
                    {'title':'扫雷玩法',
                     'content':'红包金额5~30元固定7包，发包者指定雷数0-9，抢包者抢到指定雷数，则需赔付给发包者1.6倍发包金额，红包金额30~300元固定7包，可发可抢，发包者指定0-9，抢抱者抢到指定雷数，则需赔付给发包者1.6倍发包金额。'
                    }, 
                    {'title':'牛牛群规', 
                     'content':'发包者为庄家，抢包者为闲家，红包后三位数相加计算到个位数为牛数，庄家闲家比牛数大小，牛数大者胜。5-500牛牛群不翻倍1：1比例。传统10-300群翻倍牛牛群、牛牛翻3倍、牛7、8、9翻2倍，牛1-6翻1倍。传统玩法更刺激。'
                    },
                    {'title':'牛牛抽水', 
                     'content':'您好，在牛牛群里，我们免费提供一个平台供大家娱乐，且只针对（赢家）抽取维护平台的手续费，群主会抽取（赢家）所获金额的5%作为手续费哦。'
                    },
                    {'title':'水果机', 
                     'content':'点击页面正下角的【发现】选择水果机，里面有多种物品，一元为一分，选择押其中的一种或多种物品，如果最后灯光落在您押注的其中一个物品上面，就表示您中奖了，就可以通过相对应的物品赔率获得相应奖励，没有则视为未中奖。'
                    }],
            }];
export default {
  name: 'HelpCenter',
  components: { TopHeader },
  data () {
    return {
        open_ordinal: -1,//序号
        selectedLabel: '常见问题',
        tabs: rulb,
    }
  },
  methods:{
      open(index){
          if(this.open_ordinal == index) {
              this.open_ordinal = -1
          }else{
              this.open_ordinal = index ;
          }
      },
      clickHandler(){
          this.open_ordinal = -1 ;
      },
     
  }
 
}
</script>

<style scoped>
.bg{
    width: 100vw;
    height: 100vh;
    background-color: rgb(248, 248, 248);
}
</style>
<style>
.HelpCenter .cube-tab{
    font-size: .4rem;
    margin: .1rem 0;
}
.HelpCenter .tab-panel-li{
    width: 9.6rem;
    min-height: 1rem;
    line-height: 1rem;
    font-size: .5rem;
    font-weight: bold;
    margin: .1rem auto;
    border-bottom: 1px solid rgb(204, 204, 204);
}
.HelpCenter .tab-panel-li i{
    display: block !important;
    float: left  !important;
    width: .5rem  !important;
    height: .5rem  !important;
    line-height: .5rem;
    text-align: center;
    font-size: .3rem;
    margin: .25rem .1rem ;
    background-color: rgb(230, 103, 103)  !important;
    color: #fff  !important;
    border-radius: 100%  !important;
}
.item_detail{
    width:9.2rem;
    margin-top:.1rem;
    line-height: .6rem;
    font-size: .4rem;
    padding:.2rem;
    /* height: 1rem; */
}



.fade-enter-active{
    transition: all .5s ease;
}
.fade-leave-active {
    transition: all .2s ease;
}
 .fade-enter{
   transform: scale(0, 0);
   opacity:0;
}
.fade-leave-to {
   transform: scale(1, 0);
   opacity:0;
}

</style>