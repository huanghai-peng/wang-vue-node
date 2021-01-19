<template>
  <my-card :title="title"
           :icon="icon">
    <div class="nav jc-between">
      <div class="nav-item"
           :class="{active:currentIndex=== index}"
           v-for="(item,index) in categories"
           :key="index"
           @click="$refs.list.swiper.slideTo(index)">
        <div class="nav-link">{{item.name}}</div>
      </div>
    </div>
    <div class="mt-2">
      <swiper ref="list"
              @slide-change="()=> currentIndex = $refs.list.swiper.realIndex" :options="{autoHeight:true}">
        <swiper-slide v-for="(category,index) in categories"
                      :key="index">
          <slot name="items"
                :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </my-card>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
    },
    categories: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
<style lang="scss">
</style>