<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
          <el-button size="small" @click="model.items.push({})"> <i class="el-icon-p"></i>添加技能</el-button>
            <el-row type="flex" style="flex-wrap: wrap;">
                <el-col :md="24" v-for="(item,index) in model.items" :key="index">
                    <el-form-item label="跳转链接" >
                        <el-input v-model="item.url"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" style="margin-top: 1rem;">
                        <el-upload class="avatar-uploader"
                            :action="uploadUrl"
                            :headers="getAuthHeaders()"
                            :show-file-list="false"
                            :on-success="res => $set(item,'images',res.url)">
                            <img v-if="item.images"
                                :src="item.images"
                                class="avatar">
                            <i v-else
                                class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" size="small" @click="model.items.splice(index,1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
      </el-form-item>
      <el-form-item>
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
          items:[]
      }
    }
  },
  props:{
      id:{}
  },
  methods:{
     async save(){
        //  接收服务器端返回的数据
        let res
        if(this.id){
            res = await this.$http.put(`/rest/ads/${this.id}`,this.model) 
        }else{
            res = await this.$http.post('/rest/ads',this.model) 
        }
        // 跳转到分类列表页面
        this.$router.push('/ads/list')

        // 提示用户保存成功
        this.$message({
            type:'message',
            message:'保存成功'
        })
      },
      async fetch(){
        const res = await this.$http.get(`/rest/ads/${this.id}`)
        this.model = Object.assign({},this.model,res.data)
      }
  },
  created(){
      this.id && this.fetch()
  }
}
</script>
