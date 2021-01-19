<template>
  <div class="heroes" v-if="model">
    <div class="top-bar bg-dark-1 py-1 px-2 d-flex ai-center">
        <img src="../assets/logo.png" alt="" height="30">
        <div class="text-white ml-1 flex-1">
            <span class="fs-md">王者荣耀</span>
            <span class="fs-md ml-2">攻略站</span>
        </div>
        <router-link tag="div" to="/" class="text-white">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
        <div class="info p-2 h-100 text-white d-flex d-column jc-end">
            <div class="fs-sm">{{model.title}}</div>
            <h2 class="my-1">{{model.name}}</h2>
            <div class="fs-sm">{{model.categories.map(v=>v.name).join('/')}}</div>
            <div class="d-flex jc-between" v-if="model.scores">
                <div class="scores fs-sm">
                    <span>难度</span>
                    <span class="badge bg-primary">{{model.scores.difficulty}}</span>
                    <span>技能</span>
                    <span class="badge bg-blue">{{model.scores.skills}}</span>
                    <span>攻击</span>
                    <span class="badge bg-dange">{{model.scores.attack}}</span>
                    <span>生存</span>
                    <span class="badge bg-dark-2">{{model.scores.survive}}</span>
                </div>
                <router-link to="/" tag="div" class="fs-xs text-grey">
                    <span>皮肤:</span>
                    <span class="mx-1">{{model.scores.skin}}</span>
                    <span>&gt;</span>
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default{
    data(){
        return {
            model:null
        }
    },
    props:{
        id:{
            type:String,
            required:true
        }
    },
    methods:{
        async fetch(){
          const res = await this.$http.get(`/heroes/${this.id}`)
          this.model = res.data
        }
    },
    created(){
        // 请求英雄详情数据
        this.fetch()
    }
}
</script>
<style lang="scss">
.heroes {
    .top {
        height: 50vw;
        background:#fff no-repeat top center;
        background-size: auto 100%;
        .info {
            background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
            .badge {
                display:inline-block;
                width: 1rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                border-radius: 50%;
                margin: 0 .384615rem;
                font-size: .615385rem;
                border: 1px solid #555;
            }
        }
    }
}
</style>
