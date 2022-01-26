<!--
  목적 : 테이블 컴포넌트
  작성자 : sch
  상세설명: 전체 데이터를 로딩하여 pagenation으로 구분
           컬럼 draggable 기능 추가(단 fix된 컬럼은 이동 불가)
  제약사항: multi header는 draggable이 1레벨 밖에 지원 안함(하위 header는 안됨)
  examples:
  -->
<template>
  <div>
    <el-row ref="header" type="flex">
      <el-col v-if="label"
        :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <font-awesome-icon icon="clipboard-list" size="lg" /> {{label}}
      </el-col>
      <el-col v-if="showExtendFunction"
        :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
        class="align-right">
        <el-button
          :loading="excel.downloadLoading" 
          type="success"
          size="mini"
          @click="handleDownload"
        >
          <font-awesome-icon icon="file-excel" size="lg" />
        </el-button>
      </el-col>
    </el-row>
    
    <el-table
      :ref="uuid"
      :data="pagedTableData"
      :height="tableOptions.height"
      :stripe="tableOptions.stripe"
      :border="tableOptions.border"
      :span-method="spanMethod"
      :size="size"
      :highlight-current-row="true"
      :row-key="tableOptions.rowKey"
      :reserve-selection="tableOptions.multiple"
      :tree-props="tableTreeOptions"
      :default-expand-all="tableOptions.defaultExpandAll"
      tooltip-effect="light"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDoubleClick"
    >
      <!-- [기본컬럼] 컬럼 checkbox -->
      <el-table-column v-if="tableOptions.multiple"
        type="selection"
        width="45"
        align="center"
      />
      <!-- [기본컬럼] 행 번호 -->
      <el-table-column v-if="!tableOptions.hideRowIndex"
        type="index"
        label="No."
        align="center"
        :sortable="true"
        :fixed="true"
        :index="getRowIndex"
      />
      <!--  -->
      <t-table-column v-for="option in columnOptions"
        :key="option.label"
        :label="option.label"
        :column-option="option.children ? option.children : null"
        :prop="option.valueKey"
        :width="option.width ? option.width : null"
        :header-align="tableOptions.headerAlign"
        :fixed="option.fixed ? option.fixed : null"
        :align="option.align ? option.align : 'left'"
        :resizable="true"
        :sortable="option.children ? false : true"
        :table-options="tableOptions"
        :show-overflow-tooltip="tableOptions.showOverflowTooltip"
      >
      </t-table-column>
    </el-table>
    <el-pagination
      :background="!pagenationOptions.showOnlyPageNumber"
      :layout="pagenationOptions.layout"
      :pager-count="pagenationOptions.pagerCount"
      :page-size="pageSize"
      :hide-on-single-page="pagenationOptions.hideOnSinglePage"
      :total="tableData.length"
      :page-sizes="pagenationOptions.pageSizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { spanRow } from "element-ui-table-span-method";
import Sortable from 'sortablejs'

import TTableColumn from './TTableColumn.vue';
export default {
  components: { TTableColumn },
  /** attributes: name, components, props, data **/
  name: 't-table',
  props: {
    /* [common] properties */
    // element name
    name: {
      type: String,
    },
    // 컴포넌트 label
    label: {
      type: String,
      default: '',
    },
    // 컴포넌트 크기 (medium / small / mini)
    size: {
      type: String,
      default: 'medium',
    },
    // 쓰기 권한 여부
    editable: {
      type: Boolean,
      default: true,
    },
    // 필수 입력 여부
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, String, Array, Object],
      default: null,
    },
    /* /[common] properties */

    /* [component] properties */
    // 테이블 전반에 대한 옵션 정보
    tableOptions: {
      type: Object,
      default: function () {
        return {
          headerAlign: 'center',      // 헤더 정렬
          height: null,               // 테이블 높이(값이 설정되면 header 정보가 fix, null이면 height 설정 안 함)
          hideRowIndex: false,        // 행 번호 숨기기 여부(기본 표시)
          stripe: true,               // 홀수 행과 짝수 행을 배경색으로 구분
          border: true,               // 세로선 표시
          showOverflowTooltip: true,  // 컬럼 내용이 overflow 될 경우 말줄임표 표시 하고, tooltip으로 상세내용 표시
          childrenKey: 'children',    // grouping header 일 경우 자식 컬럼 명칭
          multiple: true,             // 컬럼 멀티 선택 여부
          rowKey: 'id',
          defaultExpandAll: false     // tree 데이터 일 경우 하위 데이터를 기본 표시 여부
        }
      },
    },
    // tree형 테이블의 데이터 옵션
    tableTreeOptions: {
      type: Object,
      default: function () {
        return {
          children: 'children'        // 자식 데이터 노드의 이름
        }
      }
    },
    // 컬럼 옵션 정보
    columnOptions: {
      type: Array,
      default: function () {
        return [];
      }
    },
    // 테이블 데이터
    tableData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    spanOptions: {
      type: Array,
      default: function () {
        return [];
        // TODO: spanOption example
        // return [
        //   {
        //     index: 2,      // row span 하려는 컬럼의 index 번호
        //     field: "city", // 해당 컬럼의 속성명
        //   },
        //   {
        //     index: 3, 
        //     field: "state",
        //   },
        // ]
      }
    },
    // 페이징 컴포넌트 옵션
    pagenationOptions: {
      type: Object,
      default: function() {
        return {
          layout: "sizes, prev, pager, next, ->, total",  // 컴포넌트 레이아웃 설정
          pagerCount: 11,               // 페이지가 표시되는 개수
          hideOnSinglePage: true,       // 단일 페이지 일 경우 페이징 컴포넌트 숨김 여부
          showOnlyPageNumber: false,     // 백그라운드를 표시 하지 않고 페이지 번호만 표시
          pageSizes: [10, 20, 30, 40, 50, 100],
        };
      }
    },
    // 화면 rendering회수(실제로는 이 컴포넌트를 강제로 다시 그리기 위한 속성)
    forceRenderCount: {
      type: Number,
      default: 0
    },
    // drage로 column 순서 변경 가능 여부
    dragable: {
      type: Boolean,
      default: true
    },
    // 엑셀 다운로드와 같은 확장 기능 표시 여부
    showExtendFunction: {
      type: Boolean,
      default: true
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: '',
      uuid: this.$uuid(),
      currentPage: 1,       // 현재 페이지 번호
      pageSize: 10,         // 테이블 내 표시되는 row 개수
      excel: {
        downloadLoading: false, // excel download 진행 여부
        filename: '',
        autoWidth: true,
        bookType: 'xlsx'
      },
      sortable: null
    };
  },
  watch: {
    // columnOptions(_new, _old) {
    //   console.log("columnOption changed:" + JSON.stringify(_old))
    //   console.log("to:" + JSON.stringify(_new))
    // }
  },
  computed: {
    pagedTableData() {
      return this.tableData.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage);
    }
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
    // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
    this.init();
  },
  mounted () {
    this.dragColumn();
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.vValue = this.value;
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service */
    /** /Call API service **/
    
    /** events **/
    // checkbox 선택 시 선택된 row 정보를 emit 함
    handleSelectionChange(_selectedItems) {
      this.$emit('input', _selectedItems);
    },
    handleRowClick(_row, _column, _event) {
      if (this.tableOptions.multiple) this.$refs[this.uuid].toggleRowSelection(_row);
      else this.$refs[this.uuid].setCurrentRow(_row);
    },
    handleRowDoubleClick(_row, _column, _event) {
      if (!this.tableOptions.multiple) return;
      this.$emit('input', _row);
    },
    // pagenation
    handleCurrentChange(_pageNo) {
      this.currentPage = _pageNo;
    },
    // pagenation page size 변경
    handleSizeChange(_pageSize) {
      this.pageSize = _pageSize;
    },
    handleDownload() {
      this.excel.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.$_.map(this.columnOptions, 'label')
        const filterVal = this.$_.map(this.columnOptions, 'valueKey')
        console.log(JSON.stringify(this.columnOptions))
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.excel.filename,
          autoWidth: this.excel.autoWidth,
          bookType: this.excel.bookType
        })
        this.excel.downloadLoading = false
      })
    },
    /** /events **/
   
    /** 기타 function **/
    // 행 번호를 가져오는 함수
    getRowIndex(_index) {
      return _index + 1 + (this.pageSize * (this.currentPage - 1));
    },
    // span 정보를 가져오는 함수
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (!(this.pagedTableData.length && this.spanOptions.length)) return;
      return spanRow(
        { row, column, rowIndex, columnIndex },
        this.pagedTableData,
        this.spanOptions
      );
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }
      }))
    },
    dragColumn() {
      if (!this.dragable) return;
      const $columns = this.$refs[this.uuid].$el.querySelectorAll('thead tr')[0]
      let self = this
      let gap = 0
      gap += this.tableOptions.multiple ? 1 : 0;
      gap += !this.tableOptions.hideRowIndex ? 1 : 0;
      this.sortable = Sortable.create($columns, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(_dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          _dataTransfer.setData('Text', '')
        },
        onEnd: _event => {
          let columnOptions = self.$_.cloneDeep(self.columnOptions);
          const targetColumn = columnOptions.splice(_event.oldIndex - gap, 1)[0]
          if (targetColumn) columnOptions.splice(_event.newIndex - gap, 0, targetColumn)
          
          let tableData = self.$_.cloneDeep(self.tableData);
          const tableChangeInfo = {
            columnOptions: columnOptions,
            tableData: tableData
          }
          self.$emit('forceRenderRequest', tableChangeInfo);
        }
      })
    },
    /** /기타 function **/
  }
};
</script>

<style scoped>
.el-pagination {
  text-align: center;
  margin-top: 10px;
}

.align-right {
  text-align: right;
}
</style>