<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-tabs type="border-card" value="basics">
        <el-tab-pane label="基础信息" name="basics">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="getAuthHeaders()"
                       :show-file-list="false"
                       :on-success="res=>$set(model,'avatar',res.url)">
              <img v-if="model.avatar"
                   :src="model.avatar"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="banner">
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="getAuthHeaders()"
                       :show-file-list="false"
                       :on-success="res=>$set(model,'banner',res.url)">
              <img v-if="model.banner"
                   :src="model.banner"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories"
                       multiple>
              <el-option v-for="item in categories"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="9"
                     show-score
                     v-model="model.scores.difficulty"
                     style="margin-top: 0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9"
                     show-score
                     v-model="model.scores.skills"
                     style="margin-top: 0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9"
                     show-score
                     v-model="model.scores.attack"
                     style="margin-top: 0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9"
                     show-score
                     v-model="model.scores.survive"
                     style="margin-top: 0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="皮肤">
            <el-rate :max="9"
                     show-score
                     v-model="model.scores.skin"
                     style="margin-top: 0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1"
                       multiple>
              <el-option v-for="item in items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2"
                       multiple>
              <el-option v-for="item in items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea"
                      v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea"
                      v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战技巧">
            <el-input type="textarea"
                      v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
            <el-button size="small" @click="model.skills.push({})"> <i class="el-icon-p"></i>添加技能</el-button>
            <el-row type="flex" style="flex-wrap: wrap;">
                <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
                    <el-form-item label="名称" >
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>

                    <el-form-item label="冷却值" >
                        <el-input v-model="item.delay"></el-input>
                    </el-form-item>
                    <el-form-item label="消耗" >
                        <el-input v-model="item.expend"></el-input>
                    </el-form-item>

                    <el-form-item label="图标" >
                        <el-upload class="avatar-uploader"
                            :action="uploadUrl"
                            :headers="getAuthHeaders()"
                            :show-file-list="false"
                            :on-success="res => $set(item,'icon',res.url)">
                            <img v-if="item.icon"
                                :src="item.icon"
                                class="avatar">
                            <i v-else
                                class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="描述" >
                        <el-input type="textarea" v-model="item.description"></el-input>
                    </el-form-item>
                    <el-form-item label="小提示" >
                        <el-input type="textarea" v-model="item.tips"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" size="small" @click="model.skills.splice(index,1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-tab-pane>


        <el-tab-pane label="英雄搭档">
            <el-button size="small" @click="model.partners.push({})"> <i class="el-icon-p"></i>添加技能</el-button>
            <el-row type="flex" style="flex-wrap: wrap;">
                <el-col :md="12" v-for="(item,index) in model.partners" :key="index">
                    <el-form-item label="英雄">
                        <el-select filterable  v-model="item.hero">
                            <el-option
                                v-for="item in heroes"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述" >
                        <el-input type="textarea" v-model="item.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" size="small" @click="model.skills.splice(index,1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-tab-pane>

      </el-tabs>
      <el-form-item style="margin-top: 5rem;">
        <el-button type="primary"
                   native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        name: '',
        avatar: '',
        scores: {
          difficulty: 0,
        },
        skills:[],
        partners:[]
      },
      categories: [],
      items: []
    }
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      //  接收服务器端返回的数据
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/heroes', this.model)
      }
      // 跳转到分类列表页面
      this.$router.push('/heroes/list')

      // 提示用户保存成功
      this.$message({
        type: 'message',
        message: '保存成功',
      })
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = Object.assign(this.model, res.data)
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data
    },
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`)
      this.items = res.data
    },
    async fetchHeroes() {
      const res = await this.$http.get(`/rest/heroes`)
      this.heroes = res.data
    },
  },
  created() {
    this.id && this.fetch()
    this.fetchCategories()
    this.fetchItems()
    this.fetchHeroes()
  },
}
</script>

<style>

</style>
