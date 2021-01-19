<template>
  <div class="article" v-if="model">
    <div class="d-flex my-2 px-1 border-bottom pb-2">
        <div class="iconfont icon-fanhui text-info-1" @click="$router.back()"></div>
        <strong class="flex-1 text-info-1 text-ellipsis mr-2">{{model.title}}</strong>
        <div class="text-grey fs-xs">{{model.createdAt | date}}</div>
    </div>
    <div v-html="model.body" class="body px-3 fs-xl"></div>
    <div class="px-3 py-2">
        <div class="d-flex">
            <span class="iconfont icon-lianjie"></span>
            <strong class="text-info-1 ml-1 fs-lg">相关资讯</strong>
        </div>
        <div class="mt-3">
            <router-link class="d-flex pb-1" tag="div" :to="`/articles/${item._id}`" v-for="item in model.releted" :key="item._id">
                <div class="flex-1 text-ellipsis pr-2">{{item.title}}</div>
                <div class="text-grey">{{item.createdAt | date}}</div>
            </router-link>
        </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
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
    watch:{
        id:'fetch'
        /* id(){
            this.fetch()
        } */
    },
    methods:{
       async fetch(){
        const res = await this.$http.get(`/articles/${this.id}`)
        this.model = res.data
        }
    },
    created(){
        // 请求文章数据
        this.fetch()
    },
    filters:{
        date(val){
            return dayjs(val).format('YYYY-MM-DD')
        }
    }
}
</script>
<style lang="scss">
.article {
    .icon-fanhui {
        font-size: 1.692308rem;
    }
    .body {
        iframe {
            width: 100%;
            height: auto;
        }
        img {
            width: 100%;
            height: auto;
        }

        .ql-align-center {
            text-align: center;
        }
        
        li {
            line-height: 26px;
        }
    }
    .icon-lianjie {
        font-size: 1.538462rem;
    }
}
</style>
