<template>
  <div id="container" class="container"></div>
</template>

<script>
import flow_chart_data from "../../js/flow_chart_data.js";
import road_data_gaode from "../../js/road_data_gaode";
import { mapGetters } from "vuex";
export default {
  name: "cc",

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
      var map = Loca.create("container", {
        features: ["bg", "road"],
        center: [120.60293653167592, 31.319037351818768],
        viewMode: "3D",
        pitch: 50,
        zoom: 15,
        // mapStyle: "amap://styles/grey" //地图样式 //grey  //darkblue
        mapStyle: !this.isBlue
          ? "amap://styles/grey"
          : "amap://styles/darkblue", //地图样式 //grey  //darkblue
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

        console.log(flow_chart_data);
        heatmapData = flow_chart_data[0];

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
          max: 100,
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
      function initRoad() {
        var layer = Loca.visualLayer({
          container: map,
          type: "line",
          shape: "line"
        });

        // lines = [{"linePath":[["113.52312898184174","22.27357281941615"],["113.5231815784764","22.273561228444535"],["113.52336184754083","22.2733413244094"],["113.52401052709213","22.272515742618356"],["113.52455955924461","22.271600747303673"],["113.52467845581032","22.27133642234186"]]}];
        let lines = road_data_gaode;

        layer.setData(lines, {
          lnglat: "linePath"
        });
        layer.setOptions({
          style: {
            opacity: 0.7,
            lineWidth: 10,
            stroke: "#b7eff7"
          }
        });

        layer.render();
      }

      initLocaHeatMap();

      initRoad();
      initLocaHeatMap();
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
  transform: translate(-50%, -50%) ;
  width: 12rem;
  height: 8rem;
  z-index: 10;
  background: transparent !important;
  opacity: 0.9;
  box-shadow:  0 0 15px  RGBA(112, 152, 165, 1);
}

.amap-controlbar {
  display: none !important;
}
</style>