<template>
  <x-list
    title="Title"
    :filter-items="filterItems"
    :table-cloumns="tableCloumns"
    :list-loading="listLoading"
    :data="list"
    paging
    :total="total"
    @get-list="handlerGetList"
  >
    <template v-slot:action="{row}">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="handlerEditRow(row)" />
    </template>
  </x-list>
</template>

<script>
import XList from '@/components/Template/list/index'
import { getAllCompany } from '@/api/company'
// import { fetchList } from '@/api/xx'

export default {
  components: { XList },
  data() {
    const self = this
    return {
      total: 0,
      clients: [],
      list: [],
      listLoading: false,
      filterItems: [
        {
          type: 'autocomplete',
          field: 'client',
          value: '',
          label: 'Client',
          querySearch: function(queryString, cd) {
            var results = queryString ? self.clients.filter(client => client.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0) : self.clients
            cd(results)
          }
        }
      ],
      tableCloumns: [
        {
          label: 'Client',
          prop: 'ownerName'
        }, {
          label: 'Action',
          slot: 'action'
        }
      ]
    }
  },
  computed: {
    listQuery() {
      return this.filterItems.reduce((param, cur) => {
        if (cur.value) {
          param[cur.field] = cur.value
        }
        return param
      }, {})
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      // 获取client
      const response = await getAllCompany()
      this.clients = response.data.map(item => {
        item.value = item.name
        return item
      })
    },
    handlerGetList() {
      /*
      this.listLoading =true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      }).finally(() => this.listLoading =false)
      */
      this.list = [{ ownerName: 'ubt one' }]
      this.total = 1
    },
    handlerEditRow(row) {

    }
  }
}
</script>
