<template>
  <div :class="['VehicleStructureStatistics', isBlue ? 'blueBorderBgc' : 'redBorderBgc']">
    <div :class="['bigPic', isBlue? 'blueBgc':'redBgc']"></div>
    <div :class="['topBox', isBlue?'topBoxBlue':'topBoxred']">
      <div class="topBoxContent">
        <span class="title">本省车辆</span>
        <span class="content">888888</span>
      </div>
    </div>
    <div :class="['middleLeftBox',isBlue?'middleLeftBoxBlue':'middleLeftBoxRed']">
      <div class="middleLeftBoxContent">
        <span class="title">本地车</span>
        <span class="content">220</span>
      </div>
    </div>
    <div :class="['middleRightBox', isBlue?'middleRightBoxBlue':'middleRightBoxRed']">
      <div class="middleRightBoxContent">
        <span class="title">外省车</span>
        <span class="content">12145</span>
      </div>
    </div>
    <!--    background-image: url("../../../../../assets/static/image/bigscreen/carContructor/zongshu.png"); -->
    <div :class="['bottomBox', isBlue?'bottomBoxBlue':'bottomBoxRed']">
      <div class="title">总车辆:&nbsp;&nbsp;21, 456</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isBlue"])
  }
};
</script>

<style lang="scss" scoped>
.VehicleStructureStatistics {
  flex: 1;
  margin-top: 0.725rem !important;
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

.bigPic {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0.75rem;
  width: 3.1375rem;
  height: 2.25rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.blueBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/vohiclesConstructor/cheliangjiegou.png");
}

.redBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/carContructor/cheliangjiegou.png");
}

.topBox {
  position: absolute;
  top: 0.33rem;
  left: 1.58rem;
  width: 1.4375rem;
  height: 0.3375rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .topBoxContent {
    height: 0.25rem;
    padding: 0 0.225rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
    .title {
      font-size: 0.1rem;
      font-weight: 400;
      color: #ffffff;
      white-space: nowrap;
    }
    .content {
      font-size: 0.1375rem;
      font-weight: 400;
      color: #ffffff;
    }
  }
}

.middleLeftBox {
  position: absolute;
  left: 0.4rem;
  top: 1.275rem;
  width: 1.3875rem;
  height: 0.4375rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .middleLeftBoxContent {
    height: 0.3375rem;
    padding: 0 0.175rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 0.125rem;
      font-weight: 400;
      color: #ffffff;
    }
    .content {
      font-size: 0.1875rem;
      font-weight: 400;
      color: #ffffff;
    }
  }
}

.middleRightBox {
  position: absolute;
  left: 2.92rem;
  top: 1.675rem;
  width: 1.5rem;
  height: 0.3375rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .middleRightBoxContent {
    height: 0.2625rem;
    padding: 0 0.2375rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 0.125rem;
      font-weight: 400;
      color: #ffffff;
    }
    .content {
      font-size: 0.175rem;
      font-weight: 400;
      color: #ffffff;
    }
  }
}

.bottomBox {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 2.875rem;
  width: 1.95rem;
  height: 0.3375rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-left: 0.3375rem;
  white-space: nowrap;
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.2rem;
    font-weight: 400;
    color: #ffffff;
    /*  border: 1px solid blue; */
    line-height: 1;
  }
}

.VehicleStructureStatistics::after {
  position: absolute;
  content: "车辆结构统计";
  font-size: 0.175rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  left: 0.65rem;
  top: 0.025rem;
}

.topBoxBlue {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/vohiclesConstructor/2.png");
}

.topBoxred {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/carContructor/2.png");
}

.middleLeftBoxBlue {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/vohiclesConstructor/1.png");
}

.middleLeftBoxRed {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/carContructor/1.png");
}

.middleRightBoxBlue {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/vohiclesConstructor/3.png");
}

.middleRightBoxRed {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/carContructor/3.png");
}

.bottomBoxBlue {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/vohiclesConstructor/zongshu.png");
}

.bottomBoxRed {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/carContructor/zongshu.png");
}
</style>