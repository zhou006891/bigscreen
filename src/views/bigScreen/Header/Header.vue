<template>
  <div class="header">
    
    <!-- 头部左侧区域 -->
        <HeaderLeft />
    
    <!-- 头部中间区域 -->
        <HeaderMiddel />

    <!--  头部右侧区域 -->
       <HeaderRight />
  </div>
</template>

<script>
import HeaderLeft from './HeaderLeft/HeaderLeft'
import HeaderMiddel from './HeaderMiddle/HeaderMiddle'
import HeaderRight from './HeaderRight/HeaderRight'
export default {
 
  components:{
    HeaderLeft,
    HeaderMiddel,
    HeaderRight
  }
};
</script>

<style lang="scss" scoped>
.header {
  flex: 0.093;
  display: flex;
}
</style>