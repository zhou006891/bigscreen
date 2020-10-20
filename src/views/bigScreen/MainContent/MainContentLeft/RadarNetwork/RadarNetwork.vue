<template>
  <div :class="['radarNetwork', isBlue ? 'blueBorderBgc' : 'redBorderBgc']">
    <!--  echars 雷达图 -->
    <div class="radar" id="radar"></div>

    <!--  企业总数 -->
    <div :class="['enterpeisesTotal', isBlue ? 'blueBgc' : 'redBgc']">
      <span class="title-text">企业总数</span>
    </div>

    <!-- 数量 -->
    <div
      class="total-numbers"
      :style="isBlue?'background-color:rgba(10, 100, 124, 0.35)':'background-color: rgba(11, 24, 29, 0.6)'"
    >
      <span class="total-text" :style="isBlue?'color:white':' color: #a6e4f2;'">5162个</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("resize", this.resize);
    this.initLoad();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    ...mapGetters(["isBlue"]),
    color() {
      let color;
      let redColor = [
        "rgba(247, 80, 54, 0.1)",
        "rgba(247, 80, 54, 0.2)",
        "rgba(247, 80, 54, 0.4)",
        "rgba(247, 80, 54, 0.6)",
        "rgba(247, 80, 54, 0.8)",
        "rgba(247, 80, 54, 1)"
      ];
      let blueColor = [
        "rgba(61, 195, 255, 0.1)",
        "rgba(61, 195, 255, 0.2)",
        "rgba(61, 195, 255, 0.4)",
        "rgba(61, 195, 255, 0.6)",
        "rgba(61, 195, 255, 0.8)",
        "rgba(61, 195, 255, 1)"
      ];
      color = this.isBlue ? blueColor.reverse() : redColor.reverse();
      return color;
    }
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
      this.$echarts.init(document.getElementById("radar")).resize();
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
      let liquid = this.$echarts.init(document.getElementById("radar"));
      liquid.setOption({
        radar: {
          top: "50%",
          name: {
            textStyle: {
              color: "white",
              fontSize: this.fontSize(0.125)
            }
          },
          splitNumber: 5,
          nameGap: 6,
          shape: "circle",
          center: ["50%", "50%"],
          radius: "80%",
          scale: true,
          indicator: [
            {
              name: "批发",
              max: 100
            },
            {
              name: "娱乐",
              max: 100
            },
            {
              name: "体育",
              max: 100
            },
            {
              name: "文化",
              max: 100
            },
            {
              name: "餐饮",
              max: 100
            },
            {
              name: "住宿",
              max: 100
            },
            {
              name: "零售",
              max: 100
            }
          ],
          splitArea: {
            areaStyle: {
              color: this.color
            }
          },
          splitLine: {
            lineStyle: {
              color: "transparent"
            }
          },
          axisLine: {
            show: false
          }
        },
        polar: {},
        angleAxis: {
          clockwise: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        radiusAxis: {
          axisTick: {
            show: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              shadowBlur: 6,
              type: "dotted",
              color: "white"
            }
          },
          min: 0,
          max: 10,
          interval: 2,
          axisLabel: {
            textStyle: {
              color: "white"
            },
            lineStyle: {
              type: "dashed"
            },
            fontSize: 5
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: "radar",
            symbol: "circle",
            symbolSize: 4,
            color:this.isBlue? "rgba(61, 195, 255, 1)" :'rgba(234, 58, 23, 1)',
            areaStyle: {
              normal: {
                color: this.isBlue
                  ? "rgba(128, 228, 255, 0.3)"
                  : "rgba(255, 92, 60, 0.3)"
              }
            },
            lineStyle: {
              width: 2,
              color: this.isBlue
                ? "RGBA(54, 173, 229, 0.5)"
                : "rgba(234, 58, 23, 0.5)"
            },
            data: [
              {
                value: [50, 50, 60, 60, 90, 80, 80]
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.radarNetwork {
  flex: 1;
  margin-top: 0px !important;
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

.radarNetwork::after {
  position: absolute;
  content: "企业类型分布";
  font-size: 0.175rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  left: 0.65rem;
  top: 0.025rem;
}
.blueBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/rader/zongshu.png");
}
.redBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/zongshu.png");
}

.enterpeisesTotal {
  position: absolute;
  width: 1.1rem;
  height: 0.325rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  left: 0.225rem;
  bottom: 0.075rem;
  font-size: 0.175rem;
  font-weight: 400;
  color: #ffffff;
  display: flex;
  justify-content: center;

  .title-text {
    position: absolute;
    top: 0.06rem;
  }
}

.total-numbers {
  position: absolute;
  width: 2.418375rem;
  height: 0.5rem;

  bottom: -0.025rem;
  left: 1.6rem;
  padding-right: 0.1375rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .total-text {
    font-size: 0.35rem;
    font-weight: 400;
  }
}

.radar {
  position: absolute;
  top: 0.3125rem;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 80%;
}
</style>