<template>
  <div :class="['DeviceState', isBlue ? 'blueBorderBgc' : 'redBorderBgc']">
    <div
      class="containerCircle"
      :style="isBlue?'border: 1px solid rgba(61, 195, 255, 1)':'border: 1px solid rgba(234, 58, 23, 1)'"
      id="circle"
      ref="circle"
    ></div>
    <div class="selectTab">
      <template v-if="isBlue">
        <div
          :class="item.checked?'blueChecked':'blueNormal'"
          v-for="(item, index) in typeList"
          :key="item.id"
          @click="switchTab(index)"
          :style="item.checked?`color:#FFFFFF`:`color: #A7E5F3`"
        >{{item.name}}</div>
      </template>
      <template v-else>
        <div
          :class="item.checked?'checked':'normal'"
          v-for="(item, index) in typeList"
          :key="item.id"
          @click="switchTab(index)"
        >{{item.name}}</div>
      </template>
    </div>

    <!--  企业总数 -->
    <div :class="['enterpeisesTotal', isBlue ? 'blueBgc' : 'redBgc']">
      <span class="title-text">总数</span>
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
  name: "DeviceState",
  data() {
    return {
      dataList: [
        {
          name: "正常率",
          value: 20
        },
        {
          name: "故障率",
          value: 40
        }
      ],
      typeList: [
        {
          id: "1",
          name: "卡口",
          checked: false,
          dataList: [
            {
              name: "正常率",
              value: 10
            },
            {
              name: "故障率",
              value: 90
            }
          ]
        },
        {
          id: "2",
          name: "视频",
          checked: false,
          dataList: [
            {
              name: "正常率",
              value: 20
            },
            {
              name: "故障率",
              value: 80
            }
          ]
        },
        {
          id: "3",
          name: "诱导屏",
          checked: true,
          dataList: [
            {
              name: "正常率",
              value: 20
            },
            {
              name: "故障率",
              value: 40
            }
          ]
        }
      ],
      normalPercent: null
    };
  },
  mounted() {
    window.addEventListener("resize", this.resize);
    this.initLoad();
   
  },
  computed: {
    ...mapGetters(["isBlue"]),
    colorList() {
      let colorList;
      let redColorList = ["RGBA(234, 58, 23, 1)", "RGBA(85, 41, 37, 1)"];
      let bluColorList = ["RGBA(61, 195, 255, 1)", "RGBA(21, 75, 112, 1)"];
      this.isBlue ? (colorList = bluColorList) : (colorList = redColorList);
      return colorList;
    }
  },
  watch:{
       isBlue(newValue, oldValue){
         if(newValue!==oldValue){
            this.resize()
         }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    resize() {
      
      this.$echarts.init(document.getElementById("circle")).resize();
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
       
      let liquid = this.$echarts.init(document.getElementById("circle"));
      let res =
        this.dataList[0].value /
        (this.dataList[0].value + this.dataList[1].value);
      this.normalPercent = (res * 100).toFixed(0);
      liquid.setOption({
        color: this.colorList,
        title: [
          {
            text: "正常率",
            textStyle: {
              fontSize: this.fontSize(0.1625),
              fontFamily: "Microsoft Yahei",
              fontWeight: "normal",
              color:this.isBlue? "#FFFFFF" : "rgba(166, 228, 242, 1)"
            },
            top: "28%",
            left: "center"
          },
          {
            text: `${this.normalPercent}%`,
            textStyle: {
              fontSize: this.fontSize(0.3),
              fontFamily: "Microsoft Yahei",
              fontWeight: "normal",
              color:this.isBlue? "#FFFFFF" : "rgba(166, 228, 242, 1)"
            },
            top: "46%",
            left: "center"
          }
        ],

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "设备状态",
            type: "pie",
            radius: ["65%", "85%"],
            avoidLabelOverlap: true,
            itemStyle: {
              normal: {
                borderColor: "RGBA(38, 57, 62, 0.5)",
                borderWidth: 2
              }
            },
            label: {
              normal: {
                show: false
              }
            },

            data: this.dataList
          }
        ]
      });
    },
    switchTab(index) {
      this.typeList.map((item, i) => {
        if (index === i) {
          item.checked = true;
          this.dataList = item.dataList;
        } else {
          item.checked = false;
        }
      });
      console.log(this.typeList);
      this.initLoad();
    }
  }
};
</script>

<style lang="scss" scoped>
.DeviceState {
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

.containerCircle {
  position: absolute;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  top: 1.02rem;
  left: calc(50%);
  transform: translateX(-50%);
}

.circle {
  position: absolute;
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid rgba(234, 58, 23, 1);
  border-radius: 50%;
  top: 1.02rem;
  left: calc(50%);
  transform: translateX(-50%);
}

.selectTab {
  position: absolute;
  display: flex;
  width: 3.575rem;
  top: 0.47rem;
  left: 50%;
  transform: translateX(-50%);
  justify-content: space-between;
  font-size: 0.15rem;
  font-weight: 400;
  line-height: 1;
  .blueNormal {
    cursor: pointer;
    width: 0.9625rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(167, 229, 243, 1);
    background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/diviceStatus/normal.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .normal {
    cursor: pointer;
    width: 0.9625rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(167, 229, 243, 1);
    background-image: url("../../../../../assets/static/image/bigscreen/RedImage/deviceStatus/lan.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /*  margin-right: 0.375rem; */
  }
  .blueChecked {
    cursor: pointer;
    width: 0.9625rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(247, 80, 54, 1);
    background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/diviceStatus/checked.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .checked {
    cursor: pointer;
    width: 0.9625rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(247, 80, 54, 1);
    background-image: url("../../../../../assets/static/image/bigscreen/RedImage/deviceStatus/hong.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}

.DeviceState::after {
  position: absolute;
  content: "设备状态";
  font-size: 0.175rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  left: 0.65rem;
  top: 0.025rem;
}

.enterpeisesTotal {
  position: absolute;
  width: 1.1rem;
  height: 0.325rem;
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/zongshu.png");
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
    top: 0.045rem;
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
    color: #a6e4f2;
  }
}

.blueBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/rader/zongshu.png");
}
.redBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/zongshu.png");
}
</style>