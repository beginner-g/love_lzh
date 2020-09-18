<template>
  <div class="wrap">
    <van-image class="image" width="100%" height="100%" :src="bgImg" />
    <div class="goBtn" @click="go">
      <van-icon name="smile-o" color="#fff" size="47" class="icon"/>
      <button :class="['goBtn', touchShow ? 'active_btn' : '']">Go</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Icon } from 'vant';
import imgUrl from '../assets/bg1.png'
Vue.use(VanImage);
Vue.use(Icon);
export default {
  data () {
    return {
      touchShow: false,
      bgImg: ''
    }
  },
  created() {
    this.bgImg = imgUrl
  },
  methods: {
    go: function() {
      this.touchShow = true
      setTimeout(() => {
        this.$router.push({
          // path: '/My'
          path: '/Map'
        })
      }, 2000)
    }
  }
}
</script>
<style scoped>
  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: relative;
    /* background: url(../assets/bg1.png); */
  }
  .image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .icon {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background: #f72585;
    border-radius: 50%;
  }
  .goBtn {
    position: relative;
  }
  button {
    border: 0;
    border-radius: 50px;
    color: white;
    background: #5f55af;
    padding: 15px 20px 16px 60px;
    text-transform: uppercase;
    background: linear-gradient(to right, #f72585 50%, #5f55af 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition:all 2s ease;
  }
  .active_btn {
    background-position: left bottom;
  }
</style>
