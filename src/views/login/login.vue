<template>
    <div class="login">
        <div class="welcome"><img src="@/assets/welcome.png" alt="Welcome"></div>
        <div class="login-form">
            <div class="login-inp">
                <label>登陆</label>
                <input type="text" v-model="userName">
            </div>
            <div class="login-inp">
                <label>密码</label>
                <input type="password" v-model="password">
            </div>
            <div class="login-inp">
                <a href="#" @click="handleLogins">立即登陆</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'login',
    data (){
        return {
            userName: '',
            password: ''
        }
    },
    methods: {
        ...mapActions([
        'handleLogin'
        ]),
        handleLogins (){
            let userName = this.userName,
                password = this.password;
            this.handleLogin({ userName, password }).then(res => {
                 this.$router.push({
                    name: 'selectList'
                })
            })
        },
        
    },
}
</script>

<style scoped>
    .login{
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: url('../../assets/login-bg.png') no-repeat center/cover;
        z-index: 1;
    }
    .login-inp{
        margin: 0 30px 15px 30px;
        border: 1px solid #fff;
        border-radius: 25px;
    }
    .login-inp label{
        width: 4em;
        text-align: center;
        display: inline-block;
        color: #fff;
    }
    .login-inp input{
        line-height: 40px;
        color: #fff;
        background-color: transparent;
        border: none;
        outline: none; 
    }
    .login-inp a{
        display: block;
        width: 100%;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        letter-spacing: 5px;
        text-decoration: none;
    }
    .welcome{
        width: 100%;
        margin: 25% 0;
    }
    img{
        width: 100%;
    }
</style>
