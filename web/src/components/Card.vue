<template>
    <div class="card mt-2 bg-white px-2">
        <div class="card-header d-flex py-3">
            <span class="iconfont" :class="`icon-${icon}`"></span>
            <div class="fs-xl mx-1 flex-1">{{title}}</div>
            <span class="iconfont icon-gengduo"></span>
        </div>
        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        icon:{
            type:String
        },
        img:{
            type:String
        }
    }
}
</script>

<style lang="scss">
    @import '../assets/scss/_variables.scss';
    .card {
        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        .card-header {
            border-bottom: 1px solid $border-color;
        }
    }
</style>