<template>
  <RouterLink class="link" :to="{name: 'index'}">Return Index</RouterLink>
  <RouterView />
</template>

<style scoped>
.link {
  position: fixed;
  bottom: -5px;
  left: 0;
  right: 0;
  width: 120px;
  text-align: center;
  border-radius: 5px 5px 0 0;
  padding: 10px;
  background-color: #fff;
  margin: auto;
  transition: bottom ease-in-out 0.2s;
}
.link:hover {
  bottom: 10px;
}
</style>