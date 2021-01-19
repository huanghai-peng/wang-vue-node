<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id"
                       label="ID"
                       width="220">
      </el-table-column>
      <el-table-column prop="title"
                       label="标题">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text"
                     size="small"
                     @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    // 定义请求分类列表函数
    async fetch() {
      const res = await this.$http.get('/rest/articles')
      this.items = res.data
    },
    remove(row) {
      this.$confirm(`是否确定删除此分类? "${row.title}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await this.$http.delete(`/rest/articles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.fetch()
      })
    },
  },
  created() {
    // 请求分类列表数据
    this.fetch()
  },
}
</script>
