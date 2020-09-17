<template>
  <div class="wrap">
    123
  </div>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'vant';
Vue.use(Icon);
export default {
  data () {
    return {
      touchShow: false
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }
</style>
