<template>
  <div class="content-middle">
    <div :class="['map-content', isBlue?'blueBuff':'redBuff']" style="width:100%;">
      <!-- <div class="mapContainer"> -->

      <!--    </div> -->
      <span class="toptitle">流量监测显示图</span>
      <!-- <div class="swichTab">
        <div class="renliu" @click="swichStatus()">
          <img
            v-if="isBlue"
            :class="renLiuIsChecked?'cheliuImg':'renliuImg'"
            :src="renLiuIsChecked?require('../../../../assets/static/image/bigscreen/BlueImage/hotMap/cheliu.png'):require('../../../../assets/static/image/bigscreen/BlueImage/hotMap/renliu.png')"
            alt
          />
          <img
            v-else
            :class="renLiuIsChecked?'cheliuImg':'renliuImg'"
            :src="renLiuIsChecked?require('../../../../assets/static/image/bigscreen/RedImage/hotmap/cheliu-xuanzhong.png'):require('../../../../assets/static/image/bigscreen/RedImage/hotmap/renliu-xuanzhong.png')"
            alt
          />

          <span
            :style="isBlue?'color:rgba(61, 195, 255, 1);border-bottom:1px solid rgba(61, 195, 255, 1)':''"
          >{{renLiuIsChecked?'车流量热力显示':'人流量热力显示'}}</span>
        </div>
      </div>-->

      <div :class="['bitmap', isBlue?'bitmapBlue':'bitmapRed']">
        <div class="gdhdheatmap" style="z-index:1;">
          <GdHeatmap :renliuArea="renliuArea"/>
        </div>
        <div class="colorfulBar">
          <span
            class="item"
            v-for="(item, index) in corlorfulList"
            :key="index"
            :style="`background-color:${item.color}`"
          ></span>
        </div>
        <div class="area">
          <div class="areaUp">
            <span
              class="areaUpSpan"
              :style="isBlue? 'border-bottom: 1px solid rgba(61, 195, 255, 1);':'border-bottom: 1px solid rgba(235, 58, 23, 1);'"
            >
              <img
                class="renliuImg"
                src="../../../../assets/static/image/bigscreen/BlueImage/hotMap/renliu.png"
                alt
              />实时在园人数
            </span>
          </div>
          <div class="areaDown" v-if="renliuAreaResult.length>0">{{renliuTotal}}人</div>
          <div class="areaDown" v-else>未知</div>
        </div>
        <div class="rightTop">
          <div class="topDiv">
            <div class="topDivDash"></div>
          </div>

          <div class="swiper1Item">
            <div class="swiper1ItemDash"></div>
          </div>
          <div class="swiper1Item">
            <div class="swiper1ItemDash"></div>
          </div>
          <div class="swiper1Item">
            <div class="swiper1ItemDash"></div>
          </div>
          <div class="swiper1Item">
            <div class="swiper1ItemDash"></div>
          </div>
        </div>

        <swiper class="swiperContainer1" ref="mySwiper" :options="swiperOptions" v-if="isShowSwiper">
          <swiper-slide v-for="(item, index) in renliuAreaResult" :key="index">
            <div class="swiper1Item" v-for="(itemChildren, index) in item" :key="index">
              <div class="swiper1ItemContainer">
                <div class="leftBracket">[</div>
                <div class="swiper1ItemContent">
                  <div class="swiper1ItemUp">{{itemChildren.groupName}}</div>
                  <div class="swiper1ItemDown">{{itemChildren.groupFlow}}</div>
                </div>
                <div class="rightBracket">]</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="area1AndswiperContainer2">
          <div class="area1">
            <div class="area1Content">
              <div class="areaUp1">
                <span
                  class="areaUpSpan1"
                  :style="isBlue? 'border-bottom: 1px solid rgba(61, 195, 255, 1);':'border-bottom: 1px solid rgba(235, 58, 23, 1);'"
                >
                  <img
                    class="cheliuImg"
                    src="../../../../assets/static/image/bigscreen/BlueImage/hotMap/cheliu.png"
                    alt
                  />实时通过车辆
                </span>
              </div>
              <div class="areaDown1" v-if="cheLiuResult.length>0">{{cheliuTotal}}辆</div>
              <div class="areaDown1" v-else>未知</div>
            </div>
          </div>
          <!--  <div class="addLine"></div> -->
          <swiper ref="mySwiper" class="swiperContainer2" :option="swiperOptions2">
            <swiper-slide v-for="(item, index) in cheLiuResult" :key="index">
              <div class="swiper1Item1Container">
                <div class="swiper1Item1" v-for="(itemChildren, index1) in item" :key="index1">
                  <div class="leftBracket">[</div>
                  <div class="swiper1ItemContent">
                    <div class="swiper1ItemUp">{{itemChildren.deviceLocation}}</div>
                    <div class="swiper1ItemDown">{{itemChildren.captureNum}}</div>
                  </div>
                  <div class="rightBracket">]</div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <div class="leftBottom">
          <div class="area1">
            <div class="area1Dot"></div>
          </div>
          <!--  <div class="addLine"></div> -->
          <div class="swiperContainer2">
            <div class="swiper1Item1Container">
              <div class="swiper1Item1">
                <div class="swiper1Item1Dot"></div>
              </div>
              <div class="swiper1Item1">
                <div class="swiper1Item1Dot"></div>
              </div>
              <div class="swiper1Item1">
                <div class="swiper1Item1Dot"></div>
              </div>
            </div>
          </div>
        </div>
        <!--   <div>
          <div class="swiperContainer2">
            <swiper  :options="swiperOptions2">
              <swiper-slide v-for="(item, index) in renliuAreaResult3" :key="index">
                <div class="swiper1Item1Container">
                  <div class="swiper1Item1" v-for="(itemChildren, index) in item">
                    <div class="leftBracket">[</div>
                    <div class="swiper1ItemContent">
                      <div class="swiper1ItemUp">{{itemChildren.name}}</div>
                      <div class="swiper1ItemDown">{{itemChildren.number}}</div>
                    </div>
                    <div class="rightBracket">]</div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>-->

        <!-- <div></div> -->
        <!--    <div :class="['big-circle', isBlue?'blueBuffShadow':'redBuffShadow']"></div>
        <div :class="['small-circle', isBlue?'blueBuffShadow':'redBuffShadow']"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
/* import {
  getCaptureCount,
  getBigScreenFlow
} from "@/api/publicSafety/hkCapture"; */

import "swiper/dist/css/swiper.css";
/* import Hotmap from "../../Hotmap"; */
import GdHeatmap from "../../GdHeatmap";
export default {
  components: {
    /*   Hotmap */
    GdHeatmap,
    swiper,
    swiperSlide
  },
  data() {
    return {
      renLiuIsChecked: true,
      corlorfulList: [
        { color: "rgba(229, 40, 37, 1)" },
        { color: "rgba(241, 179, 97, 1)" },
        { color: "rgba(218, 214, 149, 1)" },
        { color: "rgba(95, 134, 156, 1)" },
        { color: "rgba(30, 44, 91, 1)" }
      ],
      swiperOptions: {
        autoplay: 2000,
        direction: "vertical",
        speed: 1000,
        autoHeight: true,
        loop: true,
        autoplayDisableOnInteraction: false,
        grabCursor: true,
        height: this.fontSize(3.75),
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      },
      swiperOptions2: {
        /*  direction: "vertical", */
        autoplay: 2000,
        speed: 1000,
        autoHeight: true,
        loop: true,
        grabCursor: true,
        autoplayDisableOnInteraction: false
      },
      renliuArea: [
       /*  { groupFlow: "241", position: { lng: "120.621210", lat: "31.330042" } },
        { groupFlow: "560", position: { lng: "120.620410", lat: "31.327837" } },
        { groupFlow: "860", position: { lng: "120.618897", lat: "31.327607" } },
        { groupFlow: "870", position: { lng: "120.6177132963202", lat: "31.33185852243668" } },
        { groupFlow: "10000"} */
      ],

      renliuAreaResult: [],
      cheLiuResult: [],
      cheliuTotal:10302,
      renliuTotal: 5150, 
      positionArray: [],
      timer:null,
      flag:false,
      isShowSwiper:false,
      humanFlowList:[ 
        {groupName: "丝绸博物馆", groupFlow: "312", position: {lng: "120.624039", lat: "31.329335"}},   
        {groupName: "桃花坞产业园", groupFlow: "525", position: {lng: "120.621333", lat: "31.326993"}},   
        {groupName: "唐寅祠人员统计", groupFlow: "392", position: {lng: "120.617910", lat: "31.328592"}},
        {groupName: "廖家巷人员统计", groupFlow: "315", position: {lng: "120.6177132963202", lat: "31.33185852243688"}},
        {groupName: "唐寅故居", groupFlow: "305", position: { lng: "120.620410", lat: "31.327837" }}, 
        {groupName: "费仲琛故居", groupFlow: "300", position: { lng: "120.620238", lat: "31.32624" }}, // 费仲琛故居  120.620238,31.32624   
        {groupName: "朴园", groupFlow: "326", position: { lng: "120.621645", lat: "31.33061" }}, // 120.621645,31.33061    
        {groupName: "苏州市名人馆", groupFlow: "256", position: { lng: "120.622876", lat: "31.32943"}},         //苏州市名人馆 120.622876   31.32943 
          {groupName: "苏州美术馆", groupFlow: "199", position: { lng: "120.622771", lat: "31.330393"}}, // 苏州美术馆 120.622771,31.330393
         {groupName: "桃花坞大街", groupFlow: "286", position: { lng: "120.624317", lat: "31.326984"}},  // 桃花坞大街    120.624317,31.326784
         {groupName: "中国文化馆协会", groupFlow: "316", position: { lng: "120.623799", lat: "31.329573"}} ,// 中国文化馆协会  120.623799,31.329573
        {groupName: "南山公馆", groupFlow: "208", position: { lng: "120.618418", lat: "31.328737"}} ,    // 120.618418,31.328737
        {groupName: "前新街", groupFlow: "506", position: { lng: "120.619035", lat: "31.326829"}} , // 120.619035,31.326829
        {groupName: "校场桥路", groupFlow: "302", position: { lng: "120.62123", lat: "31.330146"}} , // 校场桥路 120.62123,31.330146
        {groupName: "苏州昆剧院", groupFlow: "602", position: { lng: "120.621222", lat: "31.331233"}} ,  // 苏州昆剧院 120.621222,31.331233
        ],

      cheliuDatas:[
                    {deviceLocation: "廖家巷北入口", captureNum: 1008, lng: "120.6177132963202", lat: "31.33185852243688"},
                    {deviceLocation: "龙兴桥弄", captureNum: 493, lng: "120.616032", lat: "31.328899"},
                    {deviceLocation: "中街路", captureNum: 3342, lng: "120.6192504606386", lat: "31.32581857132796"},
                    {deviceLocation: "桃花坞大街", captureNum: 2671, lng: "120.625576", lat: "31.327058"},
                    {deviceLocation: "龙兴里", captureNum: 1474, lng: "120.616072", lat: "31.328323"},
                    {deviceLocation: "龙兴桥", captureNum: 516, lng: "120.616132", lat: "31.327814"},
                    {deviceLocation: "校场桥路", captureNum: 798, lng: "120.62366", lat: "31.326784"}]
    };
  },
  computed: {
    ...mapGetters(["isBlue"]),
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  created() {
     this.getHotDatas()
     this.getCarCount()
  },
  methods: {
    //获取车流量数据
    getCarCount() {
        let temp = this.cheliuDatas;
        this.cheLiuResult = [];
        this.cheliuTotal = 0;
        temp.map(item => {
          this.cheliuTotal = this.cheliuTotal + item.captureNum;
        });
        for (var i = 0; i < temp.length; i += 3) {
          this.cheLiuResult.push(temp.slice(i, i + 3));
        }
    },
    //获取人流量数据
    getHotDatas() {
        this.renliuArea = this.humanFlowList
        const temp = this.humanFlowList
        this.renliuAreaResult = []
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].groupName.indexOf('人员统计') != -1) {
            temp[i].groupName = temp[i].groupName.substring(
              0,
              temp[i].groupName.length - 4
            )
          }
        }
        for (let i = 0; i < temp.length; i += 4) {
          this.renliuAreaResult.push(temp.slice(i, i + 4))
        }
        this.isShowSwiper = true
    },
    swichStatus() {
      this.renLiuIsChecked = !this.renLiuIsChecked;
    },
    fontSize(res) {
      let clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    }
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
};
</script>

<style lang="scss" scoped>
.content-middle {
  flex: 1;
  color: #ffffff;
  position: relative;
  .blueBuff {
    background-image: url("../../../../assets/static/image/bigscreen/BlueImage/hotMap/biankuang-ditu.png");
  }
  .redBuff {
    background-image: url("../../../../assets/static/image/bigscreen/RedImage/border-map.png");
  }
  .map-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 13.9375rem;
    height: 11.8875rem;

    background-size: 100% 100%;
    background-repeat: no-repeat;
    transform-style: preserve-3d;
    /*  z-index: 30; */
    /*  .mapContainer{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6rem;
      height:6rem;
   
      z-index: 10;
      overflow: hidden;
      transform: translate(-50%, -50%) rotateZ(20deg) skew(30deg,30deg);;
      transform-style: preserve-3d;
      box-shadow: 0 0 15px RGBA(112, 152, 165, 1);
    } */

    .bitmap {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 97%;
      height: 10.8875rem;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 1;
      box-sizing: border-box;
    }

    .bitmapBlue {
      background-image: url("../../../../assets/static/image/bigscreen/BlueImage/position.png");
    }

    .bitmapRed {
      background-image: url("../../../../assets/static/image/bigscreen/RedImage/bitmap.png");
    }

    .blueBuffShadow {
      background: rgba(10, 26, 41, 0.5);
      box-shadow: 0px 1px 30px 6px rgba(59, 173, 242, 1) inset;
    }
    .redBuffShadow {
      background: rgba(10, 26, 41, 0.5);
      box-shadow: 0px 0.025rem 0.3875rem 0.0875rem rgba(66, 119, 122, 1) inset;
    }
    .big-circle {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 11.95rem;
      height: 9.275rem;
      border-radius: 50% / 50%;
    }
    .small-circle {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 7.9375rem;
      height: 5.2rem;
      background: rgba(10, 26, 41, 0.5);
      box-shadow: 0px 0.025rem 0.5rem 0.2rem rgba(66, 119, 122, 1) inset;
      border-radius: 50% / 50%;
      -moz-animation: mymove 5s infinite;
      -webkit-animation: mymove 5s infinite;
      -o-animation: mymove 5s infinite;
    }
    /* swiper滚动 */

    .rightTop {
      position: absolute;
      right: 2.8rem;
      top: 1.3675rem;
      z-index: 10;
      .topDiv {
        height: 0.3125rem;
        position: relative;
        .topDivDash {
          position: absolute;
          width: 2px;
          height: 100%;
          background-image: url("../../../../assets/static/image/dot.svg");
          background-size: 100% 100%;
        }
        .topDivDash::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: #04e5ff;
          box-shadow: 0px 0px 6px #00fff7;
          opacity: 1;
          border-radius: 50%;
        }
      }
      .swiper1Item {
        /*   border: 1px solid red; */
        height: 0.875rem;
        position: relative;
        &:not(:last-child) {
          .swiper1ItemDash {
            position: absolute;
            box-sizing: border-box;
            width: 2px;
            height: 100%;
            background-image: url("../../../../assets/static/image/dot.svg");
            background-size: 100% auto;
            /*   background-size: 100% 0.2rem; */
            /* \assets\static\image */
          }
          .swiper1ItemDash::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 8px;
            height: 8px;
            background: #04e5ff;
            box-shadow: 0px 0px 6px #00fff7;
            opacity: 1;
            border-radius: 50%;
          }
        }
        &:last-child {
          .swiper1ItemDash {
            position: absolute;
            left: 0;
            top: 0;
            width: 2px;
            height: 50%;
            background-image: url("../../../../assets/static/image/dot.svg");
          }
          .swiper1ItemDash::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 50%);
            width: 8px;
            height: 8px;
            background: #04e5ff;
            box-shadow: 0px 0px 6px #00fff7;
            opacity: 1;
            border-radius: 50%;
          }
        }
      }
    }
    .swiperContainer1 {
      position: absolute;
      right: 0.3rem;
      top: 1.68rem;
      z-index: 10;
      /*    border: 1px solid red; */
      .swiper1Item {
        box-sizing: border-box;
        /*   border: 1px solid rebeccapurple; */
        height: 0.875rem;
        .swiper1ItemContainer {
          height: 100%;
          display: flex;
          align-items: center;
        }
        .swiper1ItemContent {
          width: 100%;
          background: rgba(27, 64, 101, 0.6);
          font-size: 0.225rem;
          font-weight: bold;
          color: #ffffff;
          height: 0.575rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 0.125rem;
          /* box-sizing: border-box; */
        }
        .swiper1ItemUp {
          padding: 0 0.0375rem;
          flex: 1;
          border-bottom: 1px solid rgb(61, 195, 255);
          display: flex;
          align-items: center;
        }
        .swiper1ItemDown {
          letter-spacing: 0.0125rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          /*  align-items: center; */
        }
      }
      .swiperSlide1Css {
        display: flex;
      }
      .leftBracket {
        width: 0.075rem;
        height: 0.3rem;
        font-size: 0.225rem;
        font-weight: bold;
        color: #00e5ff;
        text-shadow: 0rem 0.0375rem 0.075rem #00d3ff;
        opacity: 1;
        margin-right: 0.075rem;
      }
      .rightBracket {
        width: 0.075rem;
        height: 0.3rem;
        font-size: 0.225rem;
        font-weight: bold;
        color: #00e5ff;
        text-shadow: 0rem 0.0375rem 0.075rem #00d3ff;
        opacity: 1;
        margin-left: 0.075rem;
      }
    }
    .area {
      padding: 0 0.4375rem;
      /*  border: 1px solid red; */
      z-index: 10;
      position: absolute;
      right: 0.125rem;
      top: 0.2rem;
      width: 2.875rem;
      height: 1.175rem;
      background: rgba(27, 64, 101, 0.6);
      display: flex;
      flex-direction: column;
      .areaUp {
        flex: 1;
        font-size: 0.225rem;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        justify-content: center;
        /* align-items: center; */
        .areaUpSpan {
          display: flex;
          align-items: center;
        }
        span {
          box-sizing: border-box;
          padding: 0.0875rem 0.15rem 0.1125rem 0.15rem;
        }
      }
      .areaDown {
        white-space: nowrap;
        flex: 1.35;
        font-size: 0.475rem;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .area::before {
      content: "[";
      position: absolute;
      left: 0.125rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0.15rem;
      height: 0.5875rem;
      font-size: 0.45rem;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #00e5ff;
      text-shadow: 0rem 0.0375rem 0.075rem #00d3ff;
      opacity: 1;
    }

    .area::after {
      content: "]";
      position: absolute;
      right: 0.125rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0.15rem;
      height: 0.5875rem;
      font-size: 0.45rem;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #00e5ff;
      text-shadow: 0rem 0.0375rem 0.075rem #00d3ff;
      opacity: 1;
    }

    .area1AndswiperContainer2 {
      position: absolute;
      z-index: 10;
      left: 0.1rem;
      bottom: 0.4rem;
      display: flex;
      .area1 {
        position: relative;
        /*  border: 1px solid red; */
        width: 2.875rem;
        height: 1.175rem;
        .area1Content {
          padding: 0 0.4375rem;
          width: 100%;
          height: 100%;
          background: rgba(27, 64, 101, 0.6);
          display: flex;
          flex-direction: column;
        }
        .areaUp1 {
          flex: 1;
          font-size: 0.225rem;
          font-weight: 400;
          color: #ffffff;
          display: flex;
          justify-content: center;
          /* align-items: center; */
          .areaUpSpan1 {
            display: flex;
            align-items: center;
          }
          span {
            box-sizing: border-box;
            padding: 0.0875rem 0.15rem 0.1125rem 0.15rem;
          }
        }
        .areaDown1 {
          white-space: nowrap;
          flex: 1.35;
          font-size: 0.475rem;
          font-weight: 400;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .area1::before {
        content: "[";
        position: absolute;
        left: 0.125rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.15rem;
        height: 0.5875rem;
        font-size: 0.45rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #00e5ff;
        text-shadow: 0rem 0.0375rem 0.075rem #00d3ff;
        opacity: 1;
      }

      .area1::after {
        content: "]";
        position: absolute;
        right: 0.125rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.15rem;
        height: 0.5875rem;
        font-size: 0.45rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #00e5ff;
        text-shadow: 0rem 0.0375rem 0.075rem #00d3ff;
        opacity: 1;
      }
      .addLine {
        width: 0.125rem;
        /*   border: 1px solid red; */
        box-sizing: border-box;
      }
      .swiperContainer2 {
        /*  border: 1px solid red; */
        width: 7rem;
        height: 1.175rem;
        box-sizing: border-box;
        .swiper1Item1Container {
          height: 100%;
          display: flex;
          align-items: flex-end;
          box-sizing: border-box;
        }
        .swiper1Item1 {
          box-sizing: border-box;
          /*     border: 1px solid red; */
          display: flex;
          align-items: center;
          width: 2.2rem;
          height: 0.55rem;
          justify-content: center;
          .leftBracket {
            width: 0.075rem;
            height: 0.3rem;
            font-size: 0.225rem;
            font-weight: bold;
            color: #00e5ff;
            text-shadow: 0rem 0.0375rem 0.075rem #00d3ff;
            opacity: 1;
            margin-right: 0.075rem;
          }
          .rightBracket {
            width: 0.075rem;
            height: 0.3rem;
            font-size: 0.225rem;
            font-weight: bold;
            color: #00e5ff;
            text-shadow: 0rem 0.0375rem 0.075rem #00d3ff;
            opacity: 1;
            margin-left: 0.075rem;
          }
          .swiper1ItemContent {
            background: rgba(27, 64, 101, 0.6);
            font-size: 0.225rem;
            font-weight: bold;
            color: #ffffff;
            height: 0.55rem;
            width: 1.68rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0 0.125rem;
            box-sizing: border-box;
          }
          .swiper1ItemUp {
            padding: 0 0.0375rem;
            flex: 1;
            border-bottom: 1px solid rgb(61, 195, 255);
            display: flex;
            align-items: center;
            font-size: 0.225rem;
          }
          .swiper1ItemDown {
            letter-spacing: 0.0125rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            /*  align-items: center; */
          }
        }
      }
    }

    .leftBottom {
      position: absolute;
      z-index: 10;
      left: 0.1rem;
      bottom: 0.2rem;
      display: flex;
      .area1 {
        position: relative;
        width: 2.875rem;
        height: 2px;
        .area1Dot {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background-image: url("../../../../assets/static/image/dot1.png");
        }
        .area1Dot::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background: #04e5ff;
          box-shadow: 0px 0px 6px #00fff7;
          opacity: 1;
          border-radius: 50%;
        }
      }
      .addLine {
        width: 0.125rem;
        height: 2px;
        background-color: rebeccapurple;
        box-sizing: border-box;
      }
      .swiperContainer2 {
        /*  border: 1px solid red; */
        width: 7rem;
        box-sizing: border-box;
        .swiper1Item1Container {
          height: 100%;
          display: flex;
          align-items: flex-end;
          box-sizing: border-box;
          .swiper1Item1 {
            box-sizing: border-box;
            width: 2.2rem;
            height: 2px;
            position: relative;
            z-index: 1;
            &:not(:last-child) {
              .swiper1Item1Dot {
                position: relative;
                bottom: 0;
                width: 100%;
                height: 100%;
                background-image: url("../../../../assets/static/image/dot1.png");
                /*  background-size: 20% 100%; */
                background-repeat: repeat;
              }
              .swiper1Item1Dot::before {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 8px;
                height: 8px;
                background: #04e5ff;
                box-shadow: 0px 0px 6px #00fff7;
                border-radius: 50%;
                z-index: 20;
              }
            }
            &:last-child {
              .swiper1Item1Dot {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 50%;
                height: 100%;
                background-image: url("../../../../assets/static/image/dot1.png");
              }
              .swiper1Item1Dot::before {
                content: "";
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(50%, -50%);
                width: 8px;
                height: 8px;
                background: #04e5ff;
                box-shadow: 0px 0px 6px #00fff7;
                opacity: 1;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}

.swichTab {
  position: absolute;
  top: 0.025rem;
  right: 0.8375rem;
  font-size: 12px;
  font-weight: 400;
  box-sizing: border-box;
  .renliu {
    /*  z-index: 20; */
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    span {
      display: inline-block;
      margin-left: 0.075rem;
      height: 0.2625rem;
      color: rgba(166, 228, 242, 1);
      border-bottom: 1px solid rgba(166, 228, 242, 1);
    }
  }
}

.cheliuImg {
  width: 0.225rem;
  height: 0.225rem;
  margin-right: 0.0625rem;
}
.renliuImg {
  margin-right: 0.0625rem;
  width: 0.2rem;
  height: 0.2rem;
}
.toptitle {
  position: absolute;
  font-size: 0.175rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  left: 0.7rem;
  top: 0.025rem;
}

.colorfulBar {
  position: absolute;
  /* bottom: 0.1875rem; */
  bottom: 0.25rem;
  right: 1.1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  z-index: 10;
  .item {
    display: inline-block;
    width: 0.5rem;
    height: 0.2rem;
    position: relative;
    margin: 0.0375rem 0;
  }
}
.item:first-child::before {
  position: absolute;
  content: "200";
  top: 50%;
  right: -0.0625rem;
  transform: translateX(100%) translateY(-50%);
  font-size: 0.225rem;
  font-weight: 400;
  color: #ffffff;
}
.item:nth-child(3)::before {
  position: absolute;
  content: "100";
  top: 50%;
  right: -0.0625rem;
  transform: translateX(100%) translateY(-50%);
  font-size: 0.225rem;
  font-weight: 400;
  color: #ffffff;
}

.item:last-child::before {
  position: absolute;
  content: "0";
  top: 50%;
  right: -0.0625rem;
  transform: translateX(100%) translateY(-50%);
  font-size: 0.225rem;
  font-weight: 400;
  color: #ffffff;
}
@keyframes mymove {
  from {
    width: 7.9375rem;
    height: 5.2rem;
    opacity: 0.5;
  }
  to {
    width: 13.425rem;
    height: 10.8875rem;
    opacity: 0.1;
  }
}

@-moz-keyframes mymove /* Firefox */ {
  from {
    width: 7.9375rem;
    height: 5.2rem;
    opacity: 0.5;
  }
  to {
    width: 13.425rem;
    height: 10.8875rem;
    opacity: 0.1;
  }
}

@-webkit-keyframes mymove /* Safari and Chrome */ {
  from {
    width: 7.9375rem;
    height: 5.2rem;
    opacity: 0.5;
  }
  to {
    width: 13.425rem;
    height: 10.8875rem;
    opacity: 0.1;
  }
}

@-o-keyframes mymove /* Opera */ {
  from {
    width: 7.9375rem;
    height: 5.2rem;
    opacity: 0.5;
  }
  to {
    width: 13.425rem;
    height: 10.8875rem;
    opacity: 0.1;
  }
}
</style>