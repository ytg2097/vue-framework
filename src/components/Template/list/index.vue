<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="app-container">
    <div class="title-lv1" >{{ title }}</div>
    <search-by
      :filter-items="filterItems"
      :filter-items-more="filterItemsMore"
      @update:filterItemsMore="handlerFilterItemsMoreUpdate"
      @search="handlerSearch"
    />
    <x-table
      :title="title"
      :list-loading="listLoading"
      :paging="paging"
      :total="total"
      :data="data"
      :table-columns="showColumns"
      :limit.sync="pageSize"
      @get-list="handlerGetList"
      @select="handlerSelect"
      @select-all="handlerSelectAll"
    >
      <template v-slot:table-header>
        <slot name="table-header" />
      </template>
      <template v-for="column in customColumns" v-slot:[column.slot]="{row}">
        <slot :name="column.slot" :row="row" />
      </template>
    </x-table>
  </div>
</template>

<script>
import SearchBy from '../components/SearchBy'
import XTable from '../components/Table'

export default {
  name: 'XList',
  components: { SearchBy, XTable },
  props: {
    /**
     * SearchBy属性
     */
    filterItems: {
      type: Array,
      default: () => []
    },
    filterItemsMore: {
      type: Array,
      default: () => []
    },
    /**
     * Table属性
     */
    title: {
      required: true,
      type: String
    },
    listLoading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    paging: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    tableColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pageSize: 20
    }
  },
  computed: {
    customColumns() {
      return this.tableColumns.filter(clo => clo.slot)
    },
    showColumns() {
      return this.tableColumns.filter(clo => !clo.hide)
    }
  },
  methods: {
    handlerSearch() {
      this.handlerGetList(1, this.pageSize)
    },
    handlerGetList(page) {
      this.$emit('get-list', page, this.pageSize)
    },
    handlerSelect(selection, row) {
      this.$emit('select', selection, row)
    },
    handlerSelectAll(selection) {
      this.$emit('select-all', selection)
    },
    handlerFilterItemsMoreUpdate(moreItems) {
      moreItems.forEach(more => {
        const target = this.tableColumns.find(column => column.prop === more.field)
        if (target) {
          this.$set(target, 'hide', !more.checked)
        }
      })
      this.$emit('update:filter-items-more', moreItems)
    }

  }
}
</script>
