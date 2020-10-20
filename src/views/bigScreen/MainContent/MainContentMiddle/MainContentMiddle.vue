<template>
  <div class="content-middle">
    <div :class="['map-content', isBlue?'blueBuff':'redBuff']">
      <!-- <div class="mapContainer"> -->
      <GdHeatmap />
   <!--    </div> -->
      <span class="toptitle">{{renLiuIsChecked?'人流量热力显示':'车流量热力显示'}}</span>
      <div class="swichTab">
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
      </div>

      <div :class="['bitmap', isBlue?'bitmapBlue':'bitmapRed']">
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
              :style="isBlue? 'border-bottom: 1px solid rgba(61, 195, 255, 1);':'border-bottom: 1px solid rgba(235, 58, 23, 1);'"
            >{{renLiuIsChecked?'实时在园人数':'实时车流量数量'}}</span>
          </div>
          <div class="areaDown">{{renLiuIsChecked?'12567人':'67366辆'}}</div>
        </div>
        <div :class="['big-circle', isBlue?'blueBuffShadow':'redBuffShadow']"></div>
        <div :class="['small-circle', isBlue?'blueBuffShadow':'redBuffShadow']"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
/* import Hotmap from "../../Hotmap"; */
import GdHeatmap from "../../GdHeatmap";
export default {
  components: {
    /*   Hotmap */
    GdHeatmap
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
      ]
    };
  },
  computed: {
    ...mapGetters(["isBlue"])
  },
  methods: {
    swichStatus() {
      this.renLiuIsChecked = !this.renLiuIsChecked;
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  position: absolute;
  left: 50%;
  z-index: 10;
  width: 100px;
  height: 10px;
  background-color: darkcyan;
}
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
      width: 13.425rem;
      height: 10.8875rem;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    
    .bitmapBlue{
       background-image:url('../../../../assets/static/image/bigscreen/BlueImage/position.png')
    }

    .bitmapRed{
      background-image:url('../../../../assets/static/image/bigscreen/RedImage/bitmap.png')
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
    .area {
      position: absolute;
      /*   z-index: 10; */
      top: 0.1875rem;
      right: 0.35rem;
      width: 2.875rem;
      height: 1.175rem;
      background: rgba(11, 24, 29, 0.5);
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
        span {
          box-sizing: border-box;
          padding: 0.0875rem 0.15rem 0.1125rem 0.15rem;
        }
      }
      .areaDown {
        flex: 1.35;
        font-size: 0.475rem;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
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
}
.renliuImg {
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
  bottom: 0.1875rem;
  right: 0.4rem;
  width: 4.25rem;
  height: 0.2rem;
  cursor: pointer;
  /*   z-index: 15; */
  .item {
    display: inline-block;
    width: 0.85rem;
    height: 100%;
    position: relative;
  }
}
.item:first-child::before {
  position: absolute;
  content: "严重";
  top: -0.375rem;
  left: 0;
  transform: translateX(-50%);
  font-size: 0.225rem;
  font-weight: 400;
  color: #ffffff;
}
.item:nth-child(3)::before {
  position: absolute;
  content: "中";
  top: -0.375rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.225rem;
  font-weight: 400;
  color: #ffffff;
}

.item:last-child::before {
  position: absolute;
  content: "少";
  top: -0.375rem;
  right: 0;
  transform: translateX(50%);
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