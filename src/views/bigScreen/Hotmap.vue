<template>
  <div id="map_container"></div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  mounted() {
    let map = initMap({
      center: [116.387456, 39.925406],
      zoom: 14,
      tilt: 30,
    });

    let view = new mapvgl.View({
      map: map
    });

    fetch("/ordinate.json")
      .then(rs => {
        return rs.json();
      })
      .then(rs => {
        console.log(rs);
        rs = rs.result.data[0].bound;
        let data1 = [];
        for (var i = 0; i < rs.length; i++) {
          var item = rs[i];
          data1.push({
            geometry: {
              type: "Point",
              coordinates: [item[0], item[1]]
            },
            properties: {
              count: item[2]
            }
          });
        }
        let heatmap = new mapvgl.HeatmapLayer({
          size: 60, // 单个点绘制大小
          max: 40, // 最大阈值
          height: 200, // 最大高度，默认为0
          unit: "px", // 单位，m:米，px: 像素
          gradient: {
            // 对应比例渐变色
            0.25: "rgba(30, 44, 91, 1)",
            0.55: "rgba(95, 134, 156, 1)",
            0.85: "rgba(218, 214, 149, 1)",
            0.9: "rgba(241, 179, 97, 1)",
            1: "rgba(229, 40, 37, 1)"
          }
        });
        heatmap.setData(data1);

        view.addLayer(heatmap);
      });
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#map_container {
  position: absolute;
  left: 12%;
  top: 1.8%;
  width: 9rem;
  height: 10.0125rem;
  margin: 0;
  border-radius: 10px;
  box-shadow: RGBA(112, 152, 165, 1) 0px 0px 0.625rem;
  transform: rotateX(50deg) ;
}


#tools {
  position: absolute;
  z-index: 100;
  right: 5px;
  bottom: 5px;
  padding: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}

#tools button {
  width: 100px;
  height: 30px;
}

.BMap_cpyCtrl {
display: none;

}

.anchorBL {
display: none;

}
</style>
