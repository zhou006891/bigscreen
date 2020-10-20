<template>
   <div class="content">

         <!-- 主体内容左边 -->
         <MainContentLeft />


         <!--  主体中间内容 -->
         <MainContentMidde />

         <!-- 主体内容右边 -->
        <MainContentRight />
      </div>
</template>

<script>
import MainContentLeft from './MainContentLeft/MainContentLeft';
import MainContentMidde from './MainContentMiddle/MainContentMiddle';
import MainContentRight from './MainContentRight/MainContentRight';

export default {
 components:{
     MainContentLeft,
     MainContentMidde,
     MainContentRight
 }
}
</script>

<style lang="scss" scoped>

   .content {
      flex: 1;
      display: flex;
      box-sizing: border-box;
     
    }
  

</style>