<template>
<div class="container">
  <div class="header"><slot name="header"/></div>
  <div class="main"><slot/></div>
  <div class="footer"><slot name="footer"/> </div>
</div>
</template>

<script>
export default {
  name: "tableStyle"
}
</script>

<style scoped lang="less">
.container{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;
  .main{
    height: 70vh;
    overflow: auto;
    width: 100%;
  }
  .header{
    align-self: flex-start;
  }
}
</style>