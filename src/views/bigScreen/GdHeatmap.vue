<template>
  <div id="container" class="container"></div>
</template>

<script>
import flow_chart_data from "../../js/flow_chart_data.js";
import road_data_gaode from "../../js/road_data_gaode";
import { mapGetters } from "vuex";
export default {
  name: "cc",
  data() {
    return {
      flowData: [],
      flowDatas: []
    };
  },
  props: {
    renliuArea: Array
  },
  mounted() {
    this.initLoad();
  },
  computed: {
    ...mapGetters(["isBlue"])
  },
  watch: {
    isBlue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.initLoad();
      }
    }
  },
  methods: {
    initLoad() {
      let that = this;

      //1.获取到带坐标的区域
      that.filterPoints(this.renliuArea);
      //2.将坐标转换为高德坐标
      this.flowDatas = this.flowData.map(item => {
        return this.bd_decrypt(
          item.position.lng,
          item.position.lat,
          item.groupFlow
        );
      });

      var map = Loca.create("container", {
        features: ["bg", "road"],
        center: [120.613919088938, 31.32287023834369],
        viewMode: "3D",
        pitch: 30,
        rotation: 10,
        zoom: 16.6,
        // mapStyle: "amap://styles/grey" //地图样式 //grey  //darkblue
        mapStyle: !this.isBlue ? "amap://styles/grey" : "amap://styles/blue" //地图样式 //grey  //darkblue
        /*     dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
        keyboardEnable: false, //地图是否可通过键盘控制，默认为true
        doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true */
        //  zoomEnable: false //地图是否可缩放，默认值为true
      });
      /**
       * 初始化3D热力图
       */
      function initLocaHeatMap() {
        map.on("mapload", function() {
          map.getMap().plugin(["AMap.ControlBar"], function() {
            var controlBar = new AMap.ControlBar();
            map.getMap().addControl(controlBar);
          });
        });

        var layer = Loca.visualLayer({
          container: map,
          type: "heatmap",
          shape: "normal"
        });

        heatmapData = that.flowDatas;

        var list = [];
        var i = -1,
          length = heatmapData.length;
        while (++i < length) {
          var item = heatmapData[i];
          list.push({
            coordinate: [item.lng, item.lat],
            count: item.count
          });
        }

        layer.setData(list, {
          lnglat: "coordinate",
          value: "count",
          max: 200,
          min: 0
        });

        layer.setOptions({
          style: {
            radius: 25,
            opacity: [0, 0.7]
          },
          gradient: {
            0.25: "rgba(30, 44, 91, 1)",
            0.55: "rgba(95, 134, 156, 1)",
            0.85: "rgba(218, 214, 149, 1)",
            0.9: "rgba(241, 179, 97, 1)",
            1: "rgba(229, 40, 37, 1)"
            /*   0.5: "blue",
          0.65: "rgb(117,211,248)",
          0.7: "rgb(0, 255, 0)",
          0.9: "#ffea00",
          1.0: "red" */
          }
        });
        layer.render();
      }

      /**
       * 初始化道路网数据
       */
      initLocaHeatMap();
    },

    //过滤没有坐标的区域
    filterPoints(array) {
      this.flowData = array.filter(item => item.hasOwnProperty("position"));
    },

    //百度转高德坐标
    bd_decrypt(bd_lng, bd_lat, count) {
      var X_PI = (Math.PI * 3000.0) / 180.0;
      var x = bd_lng - 0.0065;
      var y = bd_lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
      var gg_lng = z * Math.cos(theta);
      var gg_lat = z * Math.sin(theta);

      return { lng: gg_lng, lat: gg_lat, count };
    }
  }
};
</script>

<style lang="scss">
.amap-logo {
  right: 0 !important;
  left: auto !important;
  display: none !important;
}

.amap-copyright {
  right: 70px !important;
  left: auto !important;
  opacity: 0 !important;
}

#container {
  position: absolute;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 10.875rem;
  z-index: 10;
  background: transparent !important;
  opacity: 0.9;
  box-shadow: 0 0 15px RGBA(112, 152, 165, 1);
}

.amap-controlbar {
  display: none !important;
}
</style>