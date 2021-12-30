<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">管理员登录</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入账户">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        show-password
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input
                        type="text" 
                        auto-complete="false" 
                        v-model="param.code" 
                        placeholder="点击图片更换验证码"
                        style="float: left; width: 65%;"
                    >
                        <el-button slot="prepend" icon="el-icon-picture-outline"></el-button>
                    </el-input>
                    <div class="captcha_code">
                        <img src="" ref="codeimg" @click="updateCaptcha"/>
                    </div>
                </el-form-item>
                <el-form-item>
                        <el-checkbox  v-model="checked" class="loginRemeber">记住我</el-checkbox>
                        <el-link :underline="false">手机登录</el-link>
                        <el-link :underline="false">忘记密码</el-link>
                </el-form-item>
                <div class="login-btn">
                    <el-button round plain type="primary" @click="submitForm()">登 录</el-button>
                    <el-button round plain type="primary" @click="return_home">取 消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            captchaUrl:'/captcha?time='+new Date(),
            param: {
                username: '',
                password: '',
                code: '',
                key:'',
            },
            checked:true,
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                code: [{required:true,message:"请输入验证码",trigger:'blur'}],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getCaptchaKey() {
            let captchaKey = Math.random()
            .toString(36)
            .substring(2);
            return captchaKey;
      },
        updateCaptcha(){
            let captcha_key = this.getCaptchaKey();
            this.param.key = captcha_key;
            this.$refs.codeimg.setAttribute(
                "src",
                process.env.VUE_APP_API_URL +
                "auth/get_captcha?captcha_key=" +
                captcha_key
            )
        },
        return_home(){
            this.$router.push('/')
        }
    },
    mounted(){
        this.updateCaptcha()
    }
};
</script>

<style scoped>
.el-link{
    margin-left:25px;
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(249, 251, 251);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 75%;
    top: 40%;
    width: 380px;
    margin: -190px 0 0 -175px;
    border-radius: 30px;
    /* background-image: linear-gradient( #2d5364,#e2e5e5 ); */
    background-image: linear-gradient( #6a93a7,#cbcfcf );
    /*  to bottom right,#80D3F8  #696969*/
    box-shadow: 0 0 25px #d4d3d3;
    opacity:0.8;                                             
    overflow: hidden;
}
.ms-content {
    padding: 30px 50px;
}
.login-btn {
    text-align: center;
    display: flex;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.loginRemeber{
    margin-right: 50px;
}
</style>