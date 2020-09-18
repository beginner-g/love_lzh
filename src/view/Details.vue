<template>
  <div class="wrap">
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white" @change="onChange">
      <van-swipe-item v-for="(item, index) in info.imgList" :key="index">
        <van-image class="image" width="100%" height="300px" :src="item.url" />
      </van-swipe-item>
      <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{info.imgList.length}}
          </div>
        </template>
    </van-swipe>
    <div class="content">

    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Swipe, SwipeItem, Image as VanImage } from 'vant';
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(VanImage);
  export default {
    data () {
      return {
        info: {},
        current: 0
      }
    },
    created() {
      this.info = JSON.parse(this.$route.query.info) || {}
    },
    mounted() {

    },
    methods: {
      onChange(index) {
        this.current = index;
      }
    }
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: url(../assets/bg1.png);
    background-size: cover;
    padding: 10px;
  }
  .my-swipe {
  }
  .content {
    flex: 1;
    border: 4px solid #3ee5d0;
    border-radius: 20px;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
