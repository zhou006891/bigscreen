<template>
  <div  :class="['TrafficStatistics', isBlue ? 'blueBorderBgc' : 'redBorderBgc']">
    <div class="triangel" id="triangel"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "TrafficStatistics",
  mounted() {
    window.addEventListener("resize", this.resize);
    this.initLoad();
  },
   beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
   computed:{
    ...mapGetters(['isBlue'])
  },
  watch:{
    isBlue(newValue, oldValue){
         if(newValue!==oldValue){
             this.resize()
         }
    }
  },
  methods: {
     resize() {
      this.$echarts.init(document.getElementById("triangel")).resize();
      this.initLoad();
    },
    fontSize(res) {
      let clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    initLoad() {
      let liquid = this.$echarts.init(document.getElementById("triangel"));
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: 12
          },
          padding:8,
          axisPointer: {
            show:false,
            type: "none",
            label: {
             show:false,
            }
          },
          formatter: function(params) {
            return (
              "<span style='color: #A6E4F2;font-size:12px;margin-right:5px'>" +
              params[0].seriesName +
              " : " +
              "</span>" +
              "<span style='font-size:12px'>" +
              params[0].value +
              "次" +
              "</span>" +
              "<br/>" +
              "<div style='margin-top:5px'>"+
              "<span style='color: #A6E4F2;font-size:12px;margin-right:5px;margin-top:5px'>" +
              params[1].seriesName +
              " : " +
              "</span>" +
              "<span style='font-size:12px'>" +
              params[1].value +
              "次" +
              "</span>"+"</div>"
            );
          }
        },

        legend: {
          data: ["车流", "人流"],
          icon: "rect",
          textStyle: {
            color: this.isBlue? "rgba(166, 228, 242, 1)"  :"#FFFFFF",
            fontSize: this.fontSize( 0.15)
            
          },
          top: "3",
          right: "0",
          itemGap: this.fontSize(0.2875),
          itemWidth:this.fontSize(0.125),
          itemHeight:this.fontSize(0.0625)
        },
        grid: {
          left: "3.8%",
          top: "26%",
          right: "0%",
          bottom: "8%"
        },
        xAxis: {
          data: ["08-01", "08-02", "08-03", "08-04", "08-05", "08-06", "08-07"],
          axisTick: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(160,160,160,0.3)"
            }
          },
          axisLabel: {
            textStyle: {
              color: this.isBlue? "#FFFFFF" : "rgba(166, 228, 242, 1)",
              fontSize: this.fontSize(0.125) 
            }
          }
        },
        yAxis: {
          // name:'单位:次',
          //  nameGap:20,
          nameTextStyle: {
            color: "#ffffff",
            fontSize: this.fontSize(0.15) 
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "RGBA(234, 58, 23, 1)"
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: this.isBlue? "rgba(61, 195, 255, 1)":"RGBA(234, 58, 23, 1)"
            }
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "transparent"
            }
          }
        },
        series: [
          {
            name: "车流",
             type: "line",
            itemStyle: {
              normal: {
                color:this.isBlue? "rgba(78, 209, 202, 1)":"rgba(209, 122, 60, 1)"
              }
            },
            data: [200, 220, 280, 490, 190, 290, 100],
            z: 15
          },

          {
            name: "人流",
            
             type: "pictorialBar",
            barGap: "-100%",
            barCategoryGap: "55%",
            symbol: "path://M150 50 L130 130 L170 130 Z",
            // xAxisIndex: 1,
           
             data: [130, 160, 12, 59, 12, 100, 200],
            itemStyle: {
              normal: {
                borderWidth: 5,
                color: this.isBlue?"rgba(61, 195, 255, 1)" : "rgba(234, 58, 23, 1)"
              }
            },
            z: 8
          }
        ]
      };
      liquid.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.TrafficStatistics {
  flex: 1;
  margin-top: 0.625rem !important;
  background-size: 0.625rem 3.4rem;
  background-repeat: no-repeat;
  position: relative;
}
.blueBorderBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/rader/biankuang.png");
}

.redBorderBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/biankuang1.png");
}
.triangel {
  position: absolute;
  left: 0.275rem;
  top: -0.0625rem;
  width: 90%;
  height: 100%;
  //background-color: rebeccapurple;
}

.TrafficStatistics::after {
  position: absolute;
  content: "景区流量统计";
  font-size: 0.175rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  left: 0.65rem;
  top: 0.025rem;
}
</style>