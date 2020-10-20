<template>
  <div class="content-right">
    <div class="content-right-main">
      <div class="right-echars">
        <ParkingLotStatistics />
        <illegalStoppingPoints />
        <TrafficStatistics />
      </div>
    </div>
  </div>
</template>

<script>
import ParkingLotStatistics from "./ParkingLotStatistics/ParkingLotStatistics";
import illegalStoppingPoints from "./illegalStoppingPoints/illegalStoppingPoints";
import TrafficStatistics from "./TrafficStatistics/TrafficStatistics";
export default {
  components: {
    ParkingLotStatistics,
    illegalStoppingPoints,
    TrafficStatistics
  }
};
</script>

<style lang="scss" scoped>
.content-right {
  flex: 0.3623318385650224;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-right-main {
  
  width: 100%;
  height: 100%;
  padding-left: 0.3625rem;
  padding-bottom: 0.625rem;
  box-sizing: border-box;
  display: flex;
}
.right-echars {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>