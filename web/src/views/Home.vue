<template>
  <div class="home">
    <swiper ref="mySwiper"
            :options="swiperOptions">
      <swiper-slide>
        <img class="w-100"
             src="../assets/images/swipers/77db56f32eeaab1f28825b9965f575c6.jpeg"
             alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100"
             src="../assets/images/swipers/77db56f32eeaab1f28825b9965f575c6.jpeg"
             alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100"
             src="../assets/images/swipers/77db56f32eeaab1f28825b9965f575c6.jpeg"
             alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-2 pb-1"
           slot="pagination"></div>
    </swiper>
    <!-- end swiper -->
    <div class="nav-icon bg-white mt-2 pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-news"></i>
          <div>爆料站</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-storys"></i>
          <div>故事站</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-malls"></i>
          <div>周边商城</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-cps"></i>
          <div>体验服</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-nzone"></i>
          <div>新人专区</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-memory"></i>
          <div>荣耀 传承</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-wzry"></i>
          <div>王者营地</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-Official"></i>
          <div>公众号</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-versions"></i>
          <div>版本介绍</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-environment"></i>
          <div>对局环境</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-infinite"></i>
          <div>无限王者团</div>
        </div>
        <div class="nav-item text-center mb-3 text-grey-1 fs-sm">
          <i class="sprite sprite-creativity"></i>
          <div>创意互动营</div>
        </div>
      </div>
      <div class="pack-up bg-light text-center py-1 fs-sm">
        <i class="sprite arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end nav-icon -->
    <my-list-card title="新闻资讯"
                  icon="cc-menu-circle"
                  :categories="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${item._id}`" class="my-2 pb-1 d-flex"
             v-for="(item,index) in category.newsList"
             :key="index">
          <span class="text-primary">[{{item.categoryName}}]</span>
          <span class="ml-1">|</span>
          <span class="ml-1 mr-2 flex-1 text-ellipsis">{{item.title}}</span>
          <span class="text-grey-1">{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </my-list-card>
    <!-- end news -->
    <my-list-card title="英雄列表"
                  icon="card-hero"
                  :categories="heroList">
      <template #items="{category}">
        <div class="d-flex flex-wrap pb-1" style="margin: 0 -0.5rem">
            <router-link tag="div" :to="`/heroes/${item._id}`" class="p-1  text-center"
             v-for="(item,index) in category.heroList"
             :key="index" style="width:20%">
                <img :src="item.avatar" alt="" class="w-100">
                <div>{{item.name}}</div>
            </router-link>
        </div>
      </template>
    </my-list-card>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Home',
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home',
          clickable: true,
        },
        autoplay: {
          delay: 1500,
          disableOnInteraction: false, //手动滑动后继续轮播
        },
        loop: true,
        // Some Swiper option/callback...
      },
      newsCats: [],
      heroList: [],
    }
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHerosCats() {
      const res = await this.$http.get('heroes/list')
      this.heroList = res.data
    },
  },
  mounted() {
    //   请求新闻列表数据
    this.fetchNewsCats()
    //   请求英雄列表数据
    this.fetchHerosCats()
  },
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    },
  },
}
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.153846rem;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}
.nav-icon {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid #ccc;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
