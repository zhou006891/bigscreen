<template>
   <div class="content-left">
      <div class="content-left-main">
         <div class="left-echars">
             <RadarNetwork />
             <VehicleStructureStatistics /> 
             <DeviceState />
         </div>
      </div>
   </div>
</template>

<script>
import RadarNetwork from './RadarNetwork/RadarNetwork'
import VehicleStructureStatistics from './VehicleStructureStatistics/VehicleStructureStatistics'
import DeviceState from './DeviceState/DeviceState'
export default {
 components:{
    RadarNetwork,
    VehicleStructureStatistics,
    DeviceState
 }
}
</script>

<style lang="scss" scoped>
 .content-left {
        flex: 0.3596412556053812;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box !important;
      }

      .content-left-main{
      
        width: 100%;
        height: 100%;
        padding-left: 0.475rem;
        padding-bottom: 0.625rem;
        box-sizing: border-box;
        display: flex;
      }
      .left-echars{
           flex: 1;
           display: flex;
           flex-direction: column;
          
      }
</style>