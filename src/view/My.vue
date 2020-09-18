<template>
  <div class="mywrap">
    <div class="box-title">
      <span>标题</span>
      <div class="fixed-icon" @click="goMap">
        <van-icon name="location-o"  color="#3ee5d0" size="30"/>
      </div>
    </div>
    <div style="overflow-y: scroll; margin: 10px 0 0;">
      <div class="box">
        <div class="box-item" v-for="(item, index) in list" :key="index" @click="doDetail(item)">
          <van-image class="image" width="100" height="100" :src="item.img" />
          <div class="item-content">
            <div>
              <span class="title">{{item.title}}</span>
              <van-icon name="like" color="#27e82e"/>
            </div>
            <span class="content ow3">{{item.content}}</span>
            <div style="display: flex;justify-content: space-between;">
              <span class="date">{{item.date}}</span>
              <van-icon name="weapp-nav" color="#3ee5d0" size="20"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import data from '../utils/data.js'
import { Image as VanImage, Icon } from 'vant';
Vue.use(VanImage);
Vue.use(Icon);
export default {
  data () {
    return {
      list: data
    }
  },
  mounted() {

  },
  methods: {
    // 查看地图
    goMap: function() {
      this.$router.push({
        path: '/Map'
      })
    },
    // 查看详情
    doDetail: function(item) {
      this.$router.push({
        path: '/Details?info=' + JSON.stringify(item)
      })
    }
  }
}
</script>
<style scoped>
  .mywrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: url(../assets/bg1.png);
    background-size: cover;
  }
  .box-title {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    position: relative;
  }
  .box-title span {
    color: #fff;
    font-size: 26px;
    border: 3px solid #3ee5d0;
    width: 60%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    box-shadow: 10px 10px 20px #3ee5d0;
    border-radius: 20px;
  }
  .box {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }
  .box .box-item {
    display: flex;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border: 1px solid #3EE5D0;
    box-shadow: 2px 2px 10px #3EE5D0;
    border-radius: 0 10px 10px 0;
  }
  .box-item .image {
    color: #3EE5D0;
    box-shadow: inset 0 0 0 1px #3EE5D0;
    position: relative;
  }
  .image::before, .image::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .image::before, .image::after {
    content: '';
    margin: -2%;
    box-shadow: inset 0 0 0 2px;
    animation: clipMe 8s linear infinite;
  }
  .image::before {
    animation-delay: -4s;
  }
  @keyframes clipMe {
    0%, 100% {
      clip: rect(0px, 220.0px, 2px, 0px);
    }
    25% {
      clip: rect(0px, 2px, 220.0px, 0px);
    }
    50% {
      clip: rect(218.0px, 220.0px, 220.0px, 0px);
    }
    75% {
      clip: rect(0px, 220.0px, 220.0px, 218.0px);
    }
  }
  .box-item .item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  .item-content span {
    color: #fff;
  }
  .item-content .title {
    font-size: 24px;
  }
  .item-content .date {
    color: #27e82e;
  }
  .ow3 {
    display: flex;
    flex-wrap: wrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  /* 固定图标 */
  .fixed-icon {
    position: absolute;
    top: 15px;
    right: 15px;
  }
</style>
