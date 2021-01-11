<template>
  <div :class="['illegalStoppingPoints', isBlue ? 'blueBorderBgc' : 'redBorderBgc']">
    <div class="countTotal">{{currentFlowStatus? '流量点位数量统计':'违停点位数量统计'}}</div>
     <div class="flowPoint" @click="handleStatus">{{currentFlowStatus? '违停点位':'流量点位'}}</div>
    <vue-seamless-scroll :class-option="classOption1" :data="tempArr" class="seamless-warp1">
      <div class="illega-content"> 
        <div class="item" v-for="(item, index) in tempArr" :key="index">
          <span class="title" :style="isBlue?'color:#FFFFFF':''">{{item.title}}</span>
          <span class="contenter">
            <span :class="['bar', isBlue? 'blueBuff' : 'redBuff']" :style="item.width"></span>
            <span class="number" :style="isBlue?'color:#FFFFFF':''">{{item.number}}</span>
          </span>
        </div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {

      currentFlowStatus: false,
      tempArr: [
        {
          title: "点位1",
          number: 999
        },
        {
          title: "点位2",
          number: 1210
        },
        {
          title: "点位3",
          number: 658
        },
        {
          title: "点位4",
          number: 1124
        }, {
          title: "点位5",
          number: 1124
        },
         {
          title: "点位6",
          number: 1124
        }
      ]
    };
  },
  created() {
    this.initLoad();
  },
  computed: {
    ...mapGetters(["isBlue"]),
    classOption1: function() {
      return {
        step: 0.5, //步长 越大滚动速度越快
        limitMoveNum: 5, //启动无缝滚动最小数据量 this.dataList.length
        hoverStop: true, //是否启用鼠标hover控制
        direction: 1, //1 往上 0 往下
        openWatch: true, //开启data实时监听
        singleHeight: 0, //单条数据高度有值hoverStop关闭
        waitTime: 1000 //单步停止等待时间
      };
    }
  },
  watch:{
    isBlue(newValue, oldValue){
       if(newValue !== oldValue){
          this.initLoad()
       }
    }
  },
  methods: {
    initLoad() {
      let temp = [];
      this.tempArr.map(item => {
        temp.push(item.number);
      });
      //找到最大值
      let maxNumber = Math.max(...temp);

      //以最大值为分母，获取百分比
      this.tempArr = this.tempArr.map(item => {
        let res = item.number / maxNumber;
        res = (res * 100).toFixed(0);
        let obj = { width: { width: res * 0.75 + "%" } };
        return { ...item, ...obj };
      });
      console.log(this.tempArr);
    },
    handleStatus() {
      this.currentFlowStatus = !this.currentFlowStatus;
      this.$store.dispatch("bigscreen/changecolor");
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.illegalStoppingPoints {
  flex: 1;
  margin-top: 0.725rem !important;
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/biankuang1.png");
  background-size: 0.625rem 3.4rem;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  // padding: 0.65rem 0.375rem 0 0.375rem;
  box-sizing: border-box !important;
}

.countTotal {
  position: absolute;
  font-size: 0.175rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  left: 0.65rem;
  top: 0.025rem;
}

.blueBorderBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/rader/biankuang.png");
}

.redBorderBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/biankuang1.png");
}
.illega-content {
  width: 100%;
 /*  height: 2.5125rem; */
 /*  margin-bottom: 0.475rem !important; */
  .item {
    width: 100%;
    height: 0.225rem;
    margin-bottom: 0.475rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    > span {
      font-size: 0.15rem;
      font-weight: 400;
      color: #a6e4f2;
      display: inline-block;
    }
    .title {
      flex-shrink: 0;
      margin-right: 0.225rem;
    }
    .contenter {
      flex: 1 !important;
      height: 100%;
      border: 1px solid #57767e;
      display: flex;
      align-items: center;
      background: rgba(87, 118, 126, 0.3);
      padding-left: 0.05rem;
      box-sizing: border-box;
      position: relative;
      .blueBuff {
        background-color: rgba(61, 195, 255, 1);
      }
      .redBuff {
        background-color: rgba(234, 58, 23, 1);
      }
      .bar {
        display: inline-block;
        height: 0.075rem;
        transition: all 0.5s ease;
      }
      .number {
        line-height: 1;
        margin-left: 0.0625rem;
      }
    }
  }
}
.flowPoint {
  display: inline-block;
  position: absolute;
  right: 0.48rem;
 
  padding: 0.025rem 0.1125rem 0.025rem 0.1125rem;
  /* box-sizing: border-box; */
  background-color: rgba(135, 185, 197, 0.2);
  border-top: 1px solid rgba(87, 118, 126, 1);
  border-bottom: 1px solid rgba(87, 118, 126, 1);
  font-size: 0.125rem;
  font-weight: 400;
  color: #a7e5f3;
  cursor: pointer;
}

.contenter::before {
  position: absolute;
  content: "";
  width: 1px;
  height: 0.375rem;
  background-color: rgba(37, 57, 62, 1);
  left: -0.12rem;
}

.seamless-warp1{
  overflow: hidden;
  position: relative;
  left: 0.375rem;
  top: 0.62rem;
  width: 81.5%;
  height: 2.5125rem;
 /*  border: 1px solid red; */
}
</style>