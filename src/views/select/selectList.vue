<template>
    <div class="flex">
        <div class="game-box" v-for="item in list" :key="item.gameId" @click="handleJump(item)">
            <p class="game-name">{{item.gameName}}</p>
            <p class="game-name">游戏id：{{item.gameId}}</p>
        </div>
    </div>
</template>

<script>
import {Select,SelectAdd} from "@/api/data.js"
import {setGameName,setGameId} from '@/libs/util.js'
export default {
    name: 'selectList',
    data (){
        return {
             list: [],
             val1:"",
             val2: 0,
             val3: ''
        }
    },
    methods: {
         handleJump(item){
            setGameName(item.gameName)
            setGameId(item.gameId)
            localStorage.gamePhone = item.principalPhone;
            this.$router.push({
                path: '/home'
            })
        },
        handleAdd (){
            if(this.val1){
                if(this.val2){
                    let gameName = this.val1,
                    gameId = this.val2,
                    principalPhone = this.val3;
                    let off = true;
                     let regex = /^1[34578]\d{9}$/,
                         retx;
                    if(principalPhone===""){
                        off = true
                    }else if(principalPhone.indexOf(',')<0){
                        retx = regex.test(principalPhone);
                        if(!retx){
                            off = false;
                            this.$Notice.warning({
                                title: '号码有误，多个号码隔开逗号必须为小写'
                            })
                        }
                    }else{
                        let arr = principalPhone.split(',');
                        arr.forEach((ele,index) => {
                            if(!regex.test(ele)){
                                off = false;
                                this.$Notice.warning({
                                title: `第${index+1}个手机号输入有误`
                            })
                            }
                        });
                    }
                    if(off){
                        SelectAdd({gameId,gameName,principalPhone}).then((res) => {
                            this.$Notice.open({
                                title: res.data.message
                            })
                            Select().then((res) => {
                                this.list = res.data.data
                            }).catch((err) => {
                                
                            });
                        }).catch((err) => {
                            
                        });
                    }
                    
                }else{
                    this.$Notice.warning({
                        title: '游戏ID不能为空'
                    })
                }
            }else{
                this.$Notice.warning({
                        title: '游戏名称不能为空'
                    })
            }
            
        }
    },
     created (){
        setGameId('');
        if(localStorage.menuPermission){
            if(localStorage.menuPermission==="01"){
                Select().then((res) => {
                   this.list = res.data.data
                }).catch((err) => {
                    
                });
            }else{
                let menuPermission = JSON.parse(localStorage.menuPermission);
                let arr = Object.keys(menuPermission)
                Select().then((res) => {
                    res.data.data.forEach((item,index)=>{
                        arr.forEach(items=>{
                            if(items==item.gameId){
                                this.list.push(item)
                            }
                        })
                    })
                }).catch((err) => {
                });
            }
        }
    }
  }

</script>

<style scoped>
    .wrap{
        width: 100%;
        height: auto;
        background-color: #fff;
    }
    .flex{
        display: flex;
        flex-wrap:wrap;
        width: 100%;
        height: auto;
    }
    .game-box{
        -moz-user-select:none;/*火狐*/
        -webkit-user-select:none;/*webkit浏览器*/
        -ms-user-select:none;/*IE10*/
        -khtml-user-select:none;/*早期浏览器*/
        user-select:none;
        cursor: pointer;
        margin-top: 100px;
        margin-left: 100px;
        width: 200px;
        height: 220px;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        background-color:  #eee;
        color: black;
    }
    .game-box:hover{
        border: 1px solid #09ecec;
    }
    .game-box-input{
        display: inline-block;
         margin-top: 100px;
        margin-left: 100px;
        padding: 10px;
        width: 280px;
        height: 220px;
        background-color:  #eee;
        color: black;
        vertical-align:top;
        text-align: center;
    }
    .game-box-input p,button{
        margin-top: 10px;
    }
    .title{
        font-size: 20px;
    }
    .tx-wd{
        display: inline-block;
        width: 70px;
    }
</style>
