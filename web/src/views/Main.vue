<template>
  <div class="main">
    <div class="top-bar bg-dark-1 py-1 px-2 d-flex">
        <img src="../assets/logo.png" alt="" height="30">
        <div class="text-white ml-1 flex-1">
            <div class="fs-md">王者荣耀</div>
            <div class="fs-xs text-grey-1">团队成就更多</div>
        </div>
        <button class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-2 pb-1">
        <div class="nav nav-inverse pb-1 jc-around text-white">
        <div class="nav-item active">
            <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
            <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
            <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
        <div class="nav-item">
            <router-link class="nav-link" tag="div" to="/">IP新游</router-link>
        </div>
    </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .top-bar {
        position: sticky;
        top: 0;
        z-index: 999;
    }
</style>
