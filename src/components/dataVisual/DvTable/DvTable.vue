<script setup lang="ts">
import { data as importdata } from './data'
import ttt from '../../../utils/timestampTotime'
import { ref, onMounted, computed } from 'vue';

interface Ititle {
  [k: string]: ItitleInfo
}

interface ItitleInfo {
  bg: number
  top1: number
  top10: number
}

let titleInfo:Ititle = {}
let mydata = [...importdata.data]
let data = ref([])
let interval;
let time = ref('')
let myshow = ref('chart')

function addDataInfo(){
  for(let i in mydata){
    for(let j  in mydata[i].myvalue){
      if(!titleInfo[mydata[i].myvalue[j].show_name]){
        titleInfo[mydata[i].myvalue[j].show_name] = {
          bg: Math.ceil(Math.random()*10),
          top1: 0,
          top10: 0,
        }
      }
      if(j as any == 0){
        titleInfo[mydata[i].myvalue[j].show_name].top1++
      }
      if(j as any < 10){
        titleInfo[mydata[i].myvalue[j].show_name].top10++
      }
      mydata[i].myvalue[j].bg = titleInfo[mydata[i].myvalue[j].show_name].bg
    }
  }
}
addDataInfo()

function myclearInterval() {
  clearInterval(interval)
}

let rank10_top1 = ref([])
let rank10_top10 =ref([])
function getRank10() {
  for(let i in titleInfo){
    if(titleInfo[i].top1){
      rank10_top1.value.push( {
        name: i,
        times: titleInfo[i].top1
      })
    }
    if(titleInfo[i].top10){
      rank10_top10.value.push( {
        name: i,
        times: titleInfo[i].top10
      })
    }
  }
  rank10_top1.value.sort((a,b)=> b.times - a.times)
  rank10_top10.value.sort((a,b)=> b.times - a.times)
  rank10_top1.value = rank10_top1.value.slice(0,10)
  rank10_top10.value = rank10_top10.value.slice(0,10)
}

onMounted(()=>{
  let count = 0;
  getRank10()
  setTimeout(() => {
    interval = setInterval(() => {
      if(!mydata[count].mydate){
        clearInterval(interval)
      }
      time.value = ttt(mydata[count].mydate)
      data.value = mydata[count].myvalue
      if(count > 10){
        clearInterval(interval)
      }      
      count++;
    }, 200)
  }, 5000)
})
</script>

<template>
  <main>
    <div v-if="myshow == 'chart'">
      <div v-for="(d,i) in data" :key="d.show_name" class="row" :class="`bg${d.bg}  rank${i}`">
        {{ i }} | {{ d.show_name }}
      </div>
      <div style="position: absolute;bottom: 100px;right: 100px;font-size: 28px;">
        {{ time }}
      </div>
    </div>
    <div v-if="myshow == 'rank'" style="display: flex;" class="rank">
      <div style="display: none;">
        <div class="title">榜首时间排行</div>
        <ul >
          <li v-for="(r1, index) in rank10_top1" :key="r1" >
            {{ index + 1 }}: {{ r1.name }}（{{ r1.times }} 分钟）
          </li>
        </ul>
      </div>
      <div>
        <div class="title">前十时间排行</div>
        <ul>
          <li v-for="(r10, index) in rank10_top10" :key="r10">
            {{ index + 1 }}: {{ r10.name }}（{{ r10.times }} 分钟）
          </li>
        </ul>
      </div>
    </div>
  </main>
  <div style="position: fixed;height: 60px;left: 0;right: 0;margin: auto;width: 1200px;background-color: #111;color: #eee;text-align: center;">
    <div style="font-size: 32px;">B站今日热搜</div>
    <div>（数据仅供参考）</div>
  </div>
  <div @click="myclearInterval">pause</div>
  <div @click="myshow == 'chart' ? myshow = 'rank' : myshow = 'chart'">change</div>
</template>

<style scoped lang="less">
main {
  // border: 1px solid #000;
  position: fixed;
  left: 0;
  right: 0;
  top: 100px;
  bottom: 0;
  width: 1200px;
  height: 550px;
  margin: auto;
  background-color: #111;
  padding: 20px 30px;
  &:hover{
    cursor: pointer;
  }
  overflow: hidden;
}
.row {
  height: 38px;
  padding: 3px;
  margin: 3px 0;
  color: #eee;
  position: absolute;
  top: 600px;
  transition: all 0.2s ease-in-out;
  animation: showme 0.2s linear;
}
@keyframes showme {
  0%{
    left: 50px;
    opacity: 0.7;
  }
  33%{
    left: 42px;
    opacity: 0.8;
  }
  66%{
    left: 30px;
    opacity: 0.9;
  }
  100%{
    left: 23px;
    opacity: 1;
  }
}
.bg1 {background-color: #c04851;}
.bg2 {background-color: #8076a3;}
.bg3 {background-color: #2e317c;}
.bg4 {background-color: #475164;}
.bg5 {background-color: #3170a7;}
.bg6 {background-color: #74787a;}
.bg7 {background-color: #126bae;}
.bg8 {background-color: #12a182;}
.bg9 {background-color: #d9a40e;}
.bg10 {background-color: #4d4030;}
.rank1{top: 20px;width: 900px;}
.rank2{top: 50px;width: 800px;}
.rank3{top: 80px;width: 740px;}
.rank4{top: 110px;width: 710px;}
.rank5{top: 140px;width: 680px;}
.rank6{top: 170px;width: 650px;}
.rank7{top: 200px;width: 620px;}
.rank8{top: 230px;width: 590px;}
.rank9{top: 260px;width: 560px;}
.rank10{top: 290px;width: 530px;}
.rank11{top: 320px;width: 500px;}
.rank12{top: 350px;width: 470px;}
.rank13{top: 380px;width: 440px;}
.rank14{top: 410px;width: 430px;}
.rank15{top: 440px;width: 310px;}
.rank {
  color: #eee;
  background: #000;
  padding: 10px;
  display: flex;
  .title {
    font-size: 14px;
  }
  ul {
    display: flex;flex-wrap: wrap;width: 700px;
  }
  li {
    width: 50%;
    margin: 10px 0;
  }
}
</style>