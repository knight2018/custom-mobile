<template>
    <div>
        <XHeader :title="title"><a slot="right" @click="handleNav"><x-icon type="more"></x-icon></a></XHeader>
        <div>
        <popup v-model="off" position="left" width="60%" :popup-style="{background:'#001529'}">
            <div class="nav">
                <p class="nav-title">{{gameName ? gameName : '游戏'}}</p>
                 <cell-box :border-intent="false" class="sub-item" is-link link="/select"  @click.native="handleNavClick" style="background:#001529; color:#fff; border:none; marginTop:20px;">游戏选择</cell-box>
                <div v-for="(item,index) in menuList" :key="index">
                    <a  v-for="(items,index) in item.children" :key="index" class="sub-item" @click="handleNavClick1(items)">{{items.meta.title}}</a>
                </div>
                <!-- <group >
                    <cell :border-intent="false" :title="item.meta.title" is-link :arrow-direction="!item.meta.navOff?'up':'down'" @click.native="handleNavOff(item.meta)" style="background: #001529; color:#fff; border:none"></cell>
                     <template v-if="item.meta.navOff">
                    </template> -->
                <!-- </group> -->
                <router-link to="combination/combinationList">点击测试</router-link>
            </div>
        </popup>
        <router-view></router-view>
        </div>
    </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import Popup from 'vux/src/components/popup'
import Cell from 'vux/src/components/cell'
import Group from 'vux/src/components/group'
import routers from '@/router/router'
import CellBox from 'vux/src/components/cell-box'
import { getMenuByRouter } from '@/libs/util'
import {GetGameName} from '@/libs/util.js'
export default {
    name: 'navTab',
    components:  { XHeader, Popup, Cell, Group, CellBox },
    data (){
        return {
            off: false,
            navOff: false,
            menuList: [],
            gameName: ''
        }
    },
    methods: {
        handleNav (){
            this.off = true;
        },
        handleNavOff (item){
            item.navOff = !item.navOff
        },
        handleNavClick (){
            this.off = false;
        },
        handleNavClick1 (title){
            console.log(title)
            this.off = false;
            this.$router.push(title.path)
        },
    },
    computed : {
        title (){
            return this.$store.getters.getTitle;
        }
    },
    watch :{
        'gameName' (newVal){
            this.menuList = getMenuByRouter(routers);
        },
    },
    mounted (){
        this.gameName = GetGameName();
    }
}
</script>

<style lang="stylus" scoped>
    .nav
         position absolute
         z-index 1
         width 100%
         height 100%
         backgroud-color #fff
    .nav-title
        text-align center
        color #ffffff
        margin-top 15px
    .sub-item 
        color: #888;

</style>

