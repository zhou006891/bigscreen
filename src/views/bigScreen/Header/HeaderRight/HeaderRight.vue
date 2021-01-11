<template>
  <div class="header-right">
    <div class="now-time">
      <span class="data-time">{{timeImfo.date}}</span>
      <span class="week-time">{{timeImfo.week}}</span>
      <span class="time-time">{{timeImfo.time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeImfo: {
        date: null,
        week: null,
        time: null
      }
    };
  },
  created() {
    this.getNowTime();
  },
  methods: {
    //每一秒钟获取最新时间
    getNowTime() {
      setInterval(() => {
        this.getNowSpeciifcTime();
      }, 1000);
    },

    //获取时间
    getNowSpeciifcTime() {
      const myDate = new Date();
      //获取年月日
      let date = this.getYYMMDD(myDate);

      //获取星期
      let week = this.getWeek(myDate);

      //获取当前时间
      let time = this.getHHMM(myDate);
      this.timeImfo = { date, week, time };
    },

    //获取年月日
    getYYMMDD(myDate) {
      let year = this.commenComputed(myDate.getFullYear()); //年
      let month = this.commenComputed(myDate.getMonth() + 1); //月
      let day = this.commenComputed(myDate.getDate()); //日
      return year + "-" + month + "-" + day;
    },

    //获取星期
    getWeek(myDate) {
      const weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      return weeks[myDate.getDay()];
    },

    //获取当前时间
    getHHMM(myDate) {
      let hh = this.commenComputed(myDate.getHours()); //时
      let mm = this.commenComputed(myDate.getMinutes()); //分
      return hh + ":" + mm;
    },

    //公共格式方法 判断小于10的情况
    commenComputed(time) {
      return time < 10 ? "0" + time : time + "";
    }
  }
};
</script>

<style lang="scss" scoped>
.header-right {
  flex: 0.3623318385650224;
  position: relative;
  .now-time {
    position: absolute;
    left: 1.3125rem;
    top: 0.32rem;
    font-size: 0.225rem;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    align-items: center;
    box-sizing: border-box;
   /*  border: 1px solid red; */
    line-height: 1;
    .week-time {
      box-sizing: border-box;
      padding-left: 0.2875rem;
    }
    .time-time {
      box-sizing: border-box;
      padding-left: 0.2875rem;

      font-size: 0.3rem;

      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>