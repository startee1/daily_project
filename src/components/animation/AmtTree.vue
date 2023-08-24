<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const WIDTH = 400;
const HEIGHT = 400;

const el = ref<HTMLCanvasElement>()
const ctx = computed(() => el.value!.getContext('2d')!)

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  theta: number
}

let pendingTasks:Function[] = [] 

function init () {
  ctx.value.strokeStyle = '#000'

  startStep()
  startStep()

}

function startStep(){
  step(startPoint())
}

function startPoint() {
  let x = 0
  let y = 0
  let xtheta = Math.random()
  let ytheta = Math.random()
  let theta = 1
  if(Math.random() < 0.5){
    let offset = Math.random() > 0.5 ? -1 : 1
    x = WIDTH / 2 + offset * Math.random() * 100
    y = ytheta > 0.5 ? 0 : HEIGHT
    theta = ytheta > 0.5 ? 1 : -1
    theta /= 2
  }
  if(Math.random() > 0.5){
    let offset = Math.random() > 0.5 ? -1 : 1;
    x = xtheta > 0.5 ? 0 : WIDTH
    y = HEIGHT / 2 + offset * Math.random() * 100
    theta = xtheta > 0.5 ? 0 : 1
  }
  return {
    start: { x, y },
    length: 20,
    theta: theta * Math.PI ,
  }
}

function step(b: Branch, depth = 0) {
  const end = getEndPoint(b)
  drawBranch(b)
  if (depth < 3 || Math.random() < 0.5){
    pendingTasks.push(() => step({
      start: end,
      length: b.length + (Math.random() *10 - 5),
      theta: b.theta - 0.3 * Math.random()
    }, depth + 1))
  }
  if (depth < 3 || Math.random() > 0.5){
    pendingTasks.push(() => step({
      start: end,
      length: b.length + (Math.random() *10 - 5),
      theta: b.theta + 0.3 * Math.random()
    }, depth + 1))
  }
}

function frame() {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach(fn => fn())
}

let framesCount = 0

function startFrame() {
  requestAnimationFrame(() => {
    framesCount += 1
    if(framesCount % 10 == 0)
      frame()
    startFrame()
  })
}

startFrame()
function lineTo(p1: Point, p2: Point) {
  ctx.value.beginPath()
  ctx.value.moveTo(p1.x, p1.y)
  ctx.value.lineTo(p2.x, p2.y)
  ctx.value.stroke()
}

function getEndPoint(b: Branch):Point {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  }
}

function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b))
}

function re_draw() {
  framesCount = 0
  pendingTasks = []
  ctx.value.clearRect(0, 0, WIDTH, HEIGHT);
  init()
}

onMounted(()=>{
  init()
})
</script>

<template>
  <main>
    <canvas @click="re_draw" id="mycanvas" ref="el" width="400" height="400"></canvas>
  </main>
</template>

<style scoped lang="less">
canvas{
  border: 1px solid #000;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: #fff;
  &:hover{
    cursor: pointer;
  }
}
</style>