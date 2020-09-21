<template>
  <div class="page_hello" :style="{ height: screenHeight + 'px' }">
    <div id="container" class='container'>
    </div>
    <!-- <van-icon class="play-icon" size="40" color="#3EE5D0" name="play-circle-o"/> -->
    <audio ref="audio" :src="audioUrl" autoplay="autoplay" controls hidden="true"></audio>
  </div>
</template>

<script>
  import AMap from 'AMap'
  import imgUrl from '../assets/icon.png'
  import imgUrlCar from '../assets/car.png'
  import audio from '../assets/audio.mp3'
  export default {
    data () {
      return {
        screenHeight: document.documentElement.clientHeight,
        audioUrl: '',
        stu: true
      }
    },
    created() {
      this.audioUrl = audio
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.documentElement.clientHeight
          that.screenHeight = window.screenHeight
        })()
      };
      //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
      AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }
        // console.log(PathSimplifier)
        //启动页面
        that.initPage(PathSimplifier);
      });
    },
    watch: {
      screenHeight (val) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // 打印screenWidth变化的值
            // console.log(that.screenHeight)
            that.timer = false
          }, 400)
        }
      }
    },
    methods: {
      // 在地图上动态画出某个路线
      initPage(PathSimplifier) {
        let map = new AMap.Map('container', {
          center: [143.308056,31.172531],
          resizeEnable: true,
          zoom: 4,
        });
        map.setMapStyle('amap://styles/4ba296aa426cbd000d79aac029d1ab94');
        var emptyLineStyle = {
            lineWidth: 0,
            fillStyle: null,
            strokeStyle: null,
            borderStyle: null
        };
        //创建组件实例
        var pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          map: map, //所属的地图实例
          // clickToSelectPath: false,
          getPath: function(pathData, pathIndex) {
            //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
            return pathData.path;
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            //返回鼠标悬停时显示的信息
            if (pointIndex >= 0) {
                //鼠标悬停在某个轨迹节点上
                return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
            }
            //鼠标悬停在节点之间的连线上
            return pathData.name + '，点数量' + pathData.path.length;
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: 6,
            pathLineStyle: emptyLineStyle,
            pathLineSelectedStyle: emptyLineStyle,
            pathLineHoverStyle: emptyLineStyle,
            keyPointStyle: emptyLineStyle,
            startPointStyle: emptyLineStyle,
            endPointStyle: emptyLineStyle,
            keyPointHoverStyle: emptyLineStyle,
            keyPointOnSelectedPathLineStyle: emptyLineStyle,
            //轨迹线的样式
            // pathLineStyle: {
            //     strokeStyle: 'blue',
            //     lineWidth: 4,
            //     dirArrowStyle: true
            // }
          }
        });
        window.pathSimplifierIns = pathSimplifierIns;
        //这里构建两条简单的轨迹，仅作示例
        pathSimplifierIns.setData([{
          name: '测试',
          path: [
            [116.405289, 39.904987],
            [113.964458, 40.54664],
            [111.47836, 41.135964],
            [108.949297, 41.670904],
            [106.380111, 42.149509],
            [103.774185, 42.56996],
            [101.135432, 42.930601],
            [98.46826, 43.229964],
            [95.777529, 43.466798],
            [93.068486, 43.64009],
            [90.34669, 43.749086],
            [87.61792, 43.793308]
          ]
        }]);
        var pathNavigatorStyles = [
          {
            width: 16,
            height: 24,
            content: 'defaultPathNavigator'
          },
          {
            width: 40,
            height: 40,
            //使用图片
            content: PathSimplifier.Render.Canvas.getImageContent(imgUrl, onload, onerror)
          },
          {
            width: 40,
            height: 40,
            //使用图片
            content: PathSimplifier.Render.Canvas.getImageContent(imgUrlCar, onload, onerror)
          }
        ]
        function onload() {
          pathSimplifierIns.renderLater();
        }
        function onerror(e) {
          alert('图片加载失败！');
        }
        function extend(dst) {
          if (!dst) {
              dst = {};
          }
          var slist = Array.prototype.slice.call(arguments, 1);
          for (var i = 0, len = slist.length; i < len; i++) {
            var source = slist[i];
            if (!source) {
              continue;
            }
            for (var prop in source) {
              if (source.hasOwnProperty(prop)) {
                dst[prop] = source[prop];
              }
            }
          }
          return dst;
        }
        //创建一个巡航器
        var navg0 = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
        {
          loop: true, //循环播放
          speed: 200000,
          pathNavigatorStyle: extend({}, pathNavigatorStyles[0])
        });
        navg0.start();
        var idx = 0;
        function changeNavgContent() {
          //获取到pathNavigatorStyle的引用
          var pathNavigatorStyle = navg0.getStyleOptions();
          //覆盖修改
          extend(pathNavigatorStyle, pathNavigatorStyles[(++idx) % pathNavigatorStyles.length]);
          //重新绘制
          pathSimplifierIns.renderLater();
        }
        setInterval(changeNavgContent, 500);

      },
      // 动态修改样式，实现高度自适应
      changeFixed(clientHeight) {
        //动态修改样式
        // console.log(clientHeight);
        this.$refs.slidebar.style.height = clientHeight - 2  +  "px";
      }
    }
  }
</script>

<style scoped>
  .page_hello {
    width: 100%;
    height: 100%;
  }
  .container {
    height: 100%;
  }
  .play-icon {
    position: absolute;
    right: 20px;
    top: 20px;
  }
</style>
