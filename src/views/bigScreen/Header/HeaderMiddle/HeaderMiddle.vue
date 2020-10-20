<template>
  <div class="header-middle">
    <div :class="['warning-title', isBlue?'blueBuff':'']">
      <img src="@/assets/static/image/bigscreen/yujing.png" alt />
      <span>预警信息</span>
    </div>
    <div :class="['warning-content', isBlue?'blueBuff':'']">
      <vue-seamless-scroll :class-option="classOption" :data="listData" class="seamless-warp">
        <ul class="item">
          <li v-for="(item, index) in listData" :key="item.title+index">{{item.title}}</li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      listData: [
        {
          title: "预警信息内容预警信息内容预警信息内容"
        },
        {
          title: "预警信息内容预警信息内容预警信息内容"
        },
        {
          title: "预警信息内容预警信息内容预警信息内容"
        },

        {
          title: "预警信息内容预警信息内容预警信息内容"
        },

        {
          title: "预警信息内容预警信息内容预警信息内容"
        }
      ]
    };
  },

  computed: {
    classOption: function() {
      return {
        step: 0.7, //步长 越大滚动速度越快
        limitMoveNum: 3, //启动无缝滚动最小数据量 this.dataList.length
        hoverStop: true, //是否启用鼠标hover控制
        direction: 2, //1 往上 0 往下
        openWatch: true, //开启data实时监听
        singleHeight: 0, //单条数据高度有值hoverStop关闭
        waitTime: 1000 //单步停止等待时间
      };
    },
    ...mapGetters(['isBlue'])
  }
};
</script>

<style lang="scss" scoped>
.header-middle {
  flex: 1;
  position: relative;
  .warning-title {
    position: absolute;
    box-sizing: border-box;
    width: 1.5rem;
    height: 0.375rem;
    background: RGBA(64, 40, 39, 1);
    border-top: 1px solid #eb3a17;
    border-bottom: 1px solid #eb3a17;
    left: 0.068rem;
    top: 0.275rem;
    img {
      width: 0.192875rem;
      height: 0.178625rem;
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0.175rem;
    }
    span {
      position: absolute;
      top: 50%;
      left: 0.48175rem;
      transform: translateY(-50%);
      font-size: 0.175rem;
      font-weight: 400;
      color: #f65036;
      letter-spacing: 0.0125rem;
    }
  }
   .warning-content {
    position: absolute;
    box-sizing: border-box;
    width: 12rem;
    height: 0.375rem;
    background: RGBA(64, 40, 39, 1);
    border-top: 1px solid #eb3a17;
    border-bottom: 1px solid #eb3a17;
    left: 1.902rem;
    top: 0.275rem;
    padding: 0 0.4125rem;
    overflow: hidden;
  }
}

.blueBuff{
    border-top: 1px solid rgba(61, 195, 255, 1) !important;
    border-bottom: 1px solid rgba(61, 195, 255, 1) !important;
    background: rgba(61, 195, 255, 0.15) !important;
}
.seamless-warp {
  overflow: hidden;
}

 ul.item {
  height: 100%;
  list-style: none;
  display: flex;
  white-space: nowrap;
  flex-wrap: nowrap;
  margin-top: 0px;
  li {
    margin-right: 1.275rem;
    font-size: 0.175rem;
    font-weight: 400;
    color: #f65036;
    letter-spacing: 0.0125rem;
    height: 0.35rem;
    display: inline-flex;
    align-items: center;
  }
}
</style>