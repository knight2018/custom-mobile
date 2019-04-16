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
                name: 'home'
            })
        },
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
        }else{
            this.$router.push({
                path: '/login'
            })
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
