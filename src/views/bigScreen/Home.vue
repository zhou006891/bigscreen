<template>
  <div :class="['home', isBlue? 'blueBigPng' : 'redBigPng']" ref="home">
    <div class="main-container">
      <!--  头部区域 -->

      <Header />

      <!-- 内容区域 -->
      <MainContent />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./Header/Header.vue";
import MainContent from "./MainContent/MainContent";

export default {
  components: {
    Header,
    MainContent
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isBlue"])
  },
  mounted() {
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  }
};
</script>


<style lang="scss"  scoped>

* {
  margin: 0;
  padding: 0;
}
.main-container {
  margin-left: 0 !important;
}
html:-moz-full-screen {
  .home {
    width: 100vw;
    height: 100vh;
  }
}

html:-webkit-full-screen {
  .home {
    width: 100vw;
    height: 100vh;
  }
}

html:fullscreen {
  .home {
    width: 100vw;
    height: 100vh;
  }
}
.main-container::-webkit-scrollbar {
  display: none !important; /* Chrome Safari */
}
.blueBigPng {
   background-image: url("../../assets/static/image/bigscreen/BlueImage/dabeijing.png");
 
}
.redBigPng {
  background-image: url("../../assets/static/image/bigscreen/RedImage/recent.png");
}
.home {
  width: 24rem;
  height: 13.5rem;

  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  /* overflow: hidden; */
  box-sizing: border-box;
  // min-width: 1366px !important;
  .main-container {
    flex: 1;

    display: flex;
    flex-direction: column;
  }
}
</style>
