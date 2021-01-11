<template>
  <div :class="['illegalStoppingPoints', isBlue ? 'blueBorderBgc' : 'redBorderBgc']">
    <div class="countTotal">{{currentFlowStatus? '流量点位数量统计':'违停点位数量统计'}}</div>
    <div class="flowPoint" @click="handleStatus">{{currentFlowStatus? '违停点位':'流量点位'}}</div>

    <vue-seamless-scroll
      :class-option="classOption1"
      :data="illegalArray"
      class="seamless-warp1"
      v-if="!currentFlowStatus"
    >
      <div class="illega-content">
        <div class="item" v-for="(item, index) in illegalArray" :key="index">
          <span class="title" :style="isBlue?'color:#FFFFFF':''">{{item.deviceLocation}}</span>
          <span class="contenter">
            <span :class="['bar', isBlue? 'blueBuff' : 'redBuff']" :style="item.width"></span>
            <span class="number" :style="isBlue?'color:#FFFFFF':''">{{item.illegalNum}}</span>
          </span>
        </div>
      </div>
    </vue-seamless-scroll>

    <vue-seamless-scroll
      :class-option="classOption1"
      :data="flowPoint"
      class="seamless-warp1"
      v-else
    >
      <div class="illega-content">
        <div class="item" v-for="(item, index) in flowPoint" :key="index">
          <span class="title" :style="isBlue?'color:#FFFFFF':''">{{item.groupName}}</span>
          <span class="contenter">
            <span :class="['bar', isBlue? 'blueBuff' : 'redBuff']" :style="item.width"></span>
            <span class="number" :style="isBlue?'color:#FFFFFF':''">{{item.groupFlow}}</span>
          </span>
        </div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
/* import {
  getIllegalCount,
  getBigScreenFlow
} from "@/api/publicSafety/hkCapture"; */
export default {
  data() {
    return {
      showInformatioan: -1,
      currentFlowStatus: false,
      illegalArray: [],
      flowPoint: [],
      timer:null,
      illArray:[
        {deviceLocation: "廖家巷008路灯北向南违停", illegalNum: 143},
        {deviceLocation: "唐寅故居东南门012号路灯北违停", illegalNum: 37},
        {deviceLocation: "唐寅故居南东门对面违停", illegalNum: 85},
        {deviceLocation: "廖家巷017号路灯北向南违停", illegalNum: 241},
        {deviceLocation: "桃花坞大街004号路灯西违停", illegalNum: 2053},
        {deviceLocation: "廖家巷004路灯北东向南违停", illegalNum: 226},
        {deviceLocation: "唐寅故居南西门对面违停", illegalNum: 46},
        {deviceLocation: "校场桥路-文化中心停车场出口违停", illegalNum: 177}
      ],
        humanFlowList:[ 
        {groupName: "朴园人员统计", groupFlow: "110", position: {lng: "120.622047", lat: "31.330769"}},
        {groupName: "唐寅故居文化区人员统计", groupFlow: "213", position: {lng: "120.621603", lat: "31.328849"}},
        {groupName: "唐寅祠人员统计", groupFlow: "392", position: {lng: "120.618610", lat: "31.328592"}},
        {groupName: "廖家巷人员统计", groupFlow: "215", position: {lng: "120.6177132963202", lat: "31.33185852243688"}},
        {groupName: "唐寅", groupFlow: "505", position: { lng: "120.620410", lat: "31.327837" }},
        {groupName: "全局", groupFlow: "191", position: { lng: "120.618897", lat: "31.327607" }},
        {groupName: "前新街", groupFlow: "309", position: { lng: "120.6177132963202", lat: "31.33185852243668" }},
        {groupName: "景区人脸", groupFlow: "200", position: { lng: "120.621210", lat: "31.330042" }},
        {groupFlow: "189", groupName: "桃花坞大街人员统计",position: {lng: "120.6204484638521", lat: "31.32606842689954"}}
        ],
    };
  },
  created() {
    //违停点位数据
    this.illegalStop();
    //流量点位数据
     this.flowPoints();
  },
  computed: {
    ...mapGetters(["isBlue"]),
    classOption1: function() {
      return {
        step: 0.5, //步长 越大滚动速度越快
        limitMoveNum: 2, //启动无缝滚动最小数据量 this.dataList.length
        hoverStop: true, //是否启用鼠标hover控制
        direction: 1, //1 往上 0 往下
        openWatch: true, //开启data实时监听
        singleHeight: 0, //单条数据高度有值hoverStop关闭
        waitTime: 1000 //单步停止等待时间
      };
    }
  },
  watch: {},
  methods: {
    illegalStop() {
       this.illegalArray = this.illArray
       this.initLoad();
     /*  getIllegalCount().then(res => {
        this.illegalArray = res.item;
        this.initLoad();
      }); */
    },
    flowPoints() {
        this.flowPoint = this.humanFlowList;
        this.FlowinitLoad();
  /*     getBigScreenFlow()
        .then(res => {
          this.flowPoint = res.item.humanFlowList;
          this.FlowinitLoad();
        })
        .catch(err => {
          this.flowPoint = [
            { groupName: "唐寅祠人员统计", groupFlow: "300" },
            { groupName: "廖家巷人员统计", groupFlow: "17" },
            { groupName: "朴园人员统计", groupFlow: "170" },
            { groupName: "唐寅", groupFlow: "0" },
            { groupName: "前新街", groupFlow: "0" },
            { groupName: "桃花坞大街人员统计", groupFlow: "210" },
            { groupName: "全局", groupFlow: "0" },
          ];
          this.FlowinitLoad();
        }); */
    },
    initLoad() {
      let temp = [];
      this.illegalArray.map(item => {
        temp.push(item.illegalNum);
      });
      //找到最大值
      let maxNumber = Math.max(...temp);

      //以最大值为分母，获取百分比
      this.illegalArray = this.illegalArray.map(item => {
        let res = item.illegalNum / maxNumber;
        res = (res * 100).toFixed(0);
        let obj = { width: { width: res * 0.75 + "%" } };
        return { ...item, ...obj };
      });
    },
    FlowinitLoad() {
      let temp = [];
      this.flowPoint.map(item => {
        temp.push(+item.groupFlow);
      });
      //找到最大值
      let maxNumber = Math.max(...temp);

      //以最大值为分母，获取百分比
      this.flowPoint = this.flowPoint.map(item => {
        let res = +item.groupFlow / maxNumber;
        res = (res * 100).toFixed(0);
        let obj = { width: { width: res * 0.75 + "%" } };
        return { ...item, ...obj };
      });
    },
    handleStatus() {
      this.currentFlowStatus = !this.currentFlowStatus;
      if (this.currentFlowStatus) {
        this.flowPoints();
      } else {
        this.illegalStop();
      }
     /*  if (this.currentFlowStatus) this.$store.dispatch("bigscreen/changecolor"); */
    },
    initStatus() {
      if (this.currentFlowStatus) {
        this.flowPoints();
      } else {
        this.illegalStop();
      }
    }
  },
  beforeDestroy(){
     clearInterval(this.timer)
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
  .item {
    width: 100%;
    margin-bottom: 0.475rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    z-index: 10;
    > span {
      line-height: 0.25rem;
      font-size: 0.15rem;
      font-weight: 400;
      color: #a6e4f2;
      display: block;
      /*  width: 50px; */
      /* text-overflow: -o-ellipsis-lastline; */
      /*  overflow: hidden; */
      /*  text-overflow: ellipsis;
      display: -webkit-box; */
      /*  -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; */
    }
    .title {
      /*  flex-shrink: 0; */
      width: 80%;
      box-sizing: border-box;
      margin-right: 0.225rem;
      padding-left: 0.12rem;
      /* text-align: center; */
    }
    .contenter {
      margin-top: 0.125rem;
      width: 80%;
      /*  flex: 1 !important; */
      height: 0.225rem;
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

.seamless-warp1 {
  /*  border: 1px solid red; */
  overflow: hidden;
  position: relative;
  left: 0.375rem;
  top: 0.62rem;
  width: 81.5%;
  height: 2.5125rem;
  /*  border: 1px solid red; */
}
</style>