<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { $axios } = proxy

$axios.get('/api/popular?ps=20&pn=1')
.then(res=>{
  console.log(res)
})
</script>

<template>
  <main>
    123123
  </main>
</template>
