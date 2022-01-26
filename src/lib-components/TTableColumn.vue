<!--
  목적 : table column 컴포넌트
  작성자 : sch
  상세설명 : Grouping header를 지원하기 위해 element-ui의 table-column을 mixin하여 재귀적으로 처리한 컴포넌트
  -->
<template>
  <div>
    <template v-if="columnOption">
      <t-table-column v-for="option in columnOption"
        :key="option.label"
        :label="option.label"
        :prop="option.valueKey"
        :width="option.width ? option.width : null"
        :header-align="tableOptions.headerAlign"
        :fixed="option.fixed ? option.fixed : null"
        :align="option.align ? option.align : 'left'"
        :resizable="true"
        :sortable="option.children ? false : true"
        :show-overflow-tooltip="tableOptions.showOverflowTooltip"
        :table-options="tableOptions"
        :column-option="option.children ? option.children : null"
      >
      </t-table-column>
    </template>
  </div>
</template>

<script>
import { TableColumn } from 'element-ui'
export default {
  name: "t-table-column",
  mixins: [TableColumn],
  props: {
    columnOption: {
      type: [Object, Array],
    },
    tableOptions: {
      type: Object
    }
  },
  data() {
    return {
    }
  },
  beforeMount () {
  },
  methods: {
  }
}
</script>
