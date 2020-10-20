<template>
  <div>
    <span>请点击下方按钮进入大屏</span>
    <button @click="bigScreen">大屏</button>
  </div>
</template>

<script>
export default {
  methods: {
    bigScreen() {
      this.$router.push("/home");
    },
}
}
</script>

<style lang="scss" scoped>
span {
  position: absolute;
  top: 40%;
  left: 50%;
  font-size: 0.225rem;
  color: lightcoral;
  letter-spacing: 0.0625rem;
  transform: translateX(-50%);
}
button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  width: 2.5rem;
  height: 1.25rem;
  background-color: rebeccapurple;
  color: rgba(166, 228, 242, 1);
}
</style>