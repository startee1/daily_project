<script setup lang="ts">

</script>

<template>
  <main>
    <section>
      <header><h1>ANIMATION</h1></header>
      <RouterLink class="link" :to="{name:'tree'}">Tree</RouterLink>
    </section>
    <section>
      <header><h1>Data visualization</h1></header>
      <RouterLink class="link" :to="{name:'dvtable'}">DvTable1</RouterLink>
    </section>
  </main>
</template>

<style scoped lang="less">
main {
  padding: 10px 30px;
}
.link {
  display: inline-block;
  padding: 5px 10px;
  margin: 20px 10px;
  border-radius: 5px;
  background-color: #fff;
  transition: transform 0.2s ease-in-out;
}
.link:hover {
  transform: scale(1.2);
}
</style>