<template>
  <div id="app">
    <t-form-template v-if="treeOptions.length"
      v-model="formValue"
      label="검색"
      size="medium"
      :editable="editable"
      type="search"
      :column-count="columnCount"
      :options="getFormOptions()"
    />
    <el-button @click="handleClear">
      초기화
    </el-button>
    <br>
    <t-table
      v-model="tableValue"
      label="배송정보"
      :column-options="columnOptions"
      :table-data="tableData"
      :span-options="tableSpanOptions"
      :force-render-count="tableRenderCount"
      @forceRenderRequest="handleForceRenderRequest"
    />
    <br>
    <div v-if="treeOptions.length">
      <el-button @click="showDialog = !showDialog">
        팝업 표시
      </el-button>
      <t-dialog
        label="검색"
        v-model="dialog.dialogValue"
        :show-dialog.sync="showDialog"
        :size="size"
        :editable="editable"
        :form-options="dialog.dialogFormOptions"
      >
      </t-dialog>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import TCalendar from '../src/lib-components/TCalendar.vue';
import TDialog from '../src/lib-components/TDialog.vue';
import TRadio from '../src/lib-components/TRadio.vue';
import TSelect from '../src/lib-components/TSelect.vue';
import TSwitch from '../src/lib-components/TSwitch.vue';
import TTimePicker from '../src/lib-components/TTimePicker.vue';
import TTransfer from '../src/lib-components/TTransfer.vue';
import _TComponentTemplate from '../src/lib-components/_TComponentTemplate.vue';
import cities from '../src/testData/city';
import cityColumns from '../src/testData/cityColumns';

export default Vue.extend({
  components: { TSelect, TRadio, TSwitch, TTimePicker, TTransfer, _TComponentTemplate ,
    TCalendar,
    TDialog},
  name: 'ServeDev',
  props: {
  },
  data() {
    return {
      size: 'medium',
      editable: true,
      textValue: '',
      textNumber: '',
      options: [],
      radioOptions: [],
      checkOptions: [],
      transferOptions: [],
      selectValue: null,
      radioValue: null,
      checkValue: [],
      switchValue: null,
      timeValue: '',
      dateValue: '',
      rateValue: 0,
      transferValue: null,
      treeValue: [],
      treeOptions: [],
      columnCount: 4,
      formOptions: [],
      formValue: {
        text: null,
        number: null,
        select: null,
        radio: null,
        selectcascade: [],
        tree: [],
        checkbox: [],
        switchValue: null,
        // rate: 0
      },
      selectCascadeOptions: [],
      columnOptions: cityColumns,
      tableOptions: {
        headerAlign: 'left',  // 헤더 정렬
        height: null,           // 테이블 높이(값이 설정되면 header 정보가 fix, null이면 height 설정 안 함)
        hideRowIndex: true,    // 행 번호 숨기기 여부(기본 표시)
        stripe: true,           // 홀수 행과 짝수 행을 배경색으로 구분
        border: true,           // 세로선 표시
      },
      tableData: cities,
      tableValue: {id: 1},
      tableSpanOptions: [],
      tableRenderCount: 0,
      showDialog: false,
      dialog: {
        dialogValue: {},
        dialogFormOptions: {},
      }
    };
  },
  computed: {
    treeDefaultProps() {
      return {
        children: 'children', // 자식 노드 명
        label: 'name',       // 노드 표시 이름
      };
    },
    treeDefaultProps2() {
      return {
        children: 'children', // 자식 노드 명
        label: 'name',       // 노드 표시 이름
      };
    },
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
    this.init();
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  destroyed() {
  },
  /* methods */
  methods: {
    init() {
      this.handleResize();
      this.getData();
      this.formValue = {
        text: "테스트",
        number: 123,
        select: [1],
        selectcascade: 1,
        radio: 1,
        tree: [1],
        checkbox: [1],
        switch: null,
        timepicker: ["00:30", "00:20"],
        datepicker: ['2020-01-27', '2020-01-29'],
        // rate: 0
      };
      this.dialog.dialogFormOptions = {
          label: 'test',
          options: this.getFormOptions(),
      };
    },
    handleResize() {
      this.columnCount = this.getRelativeColumnCount();
    },
    // ※ 테이블 컬럼 이동에 따른 table 컴포넌트 강제 refresh
    handleForceRenderRequest(_tableChangeInfo) {
      this.columnOptions = [];
      this.tableData = [];
      this.$nextTick(() => {
        this.columnOptions = _tableChangeInfo.columnOptions;
        this.tableData = _tableChangeInfo.tableData;
      })
    },
    handleClear() {
      this.formValue = null;
      this.formValue = Object.assign({}, this.$data.formValue, {
        text: '',
        number: null,
        select: null,
        selectcascade: [],
        tree: []
      })
    },
    //TODO: 화면 크기별 컬럼 개수를 가져옴
    getRelativeColumnCount() {
      let count = 0;
      // xs
      if (window.innerWidth < 768) count = 1;
      // sm
      else if (window.innerWidth >= 768 && window.innerWidth < 992) count = 2;
      // md
      else if (window.innerWidth >= 992 && window.innerWidth < 1200) count = 2;
      // lg
      else if (window.innerWidth >= 1200 && window.innerWidth < 1920) count = 4;
      // xl
      else if (window.innerWidth >= 1920) count = 4;
      return count;
    },
    getFormOptions() {
      let options = [];
      options.push({
        key: 'text',
        type: 'text',
        label: '글자',
      });
      options.push({
        key: 'number',
        type: 'number',
        numberFormat: '0,0.0',
        label: '숫자',
      });
      options.push({
        key: 'select',
        type: 'select',
        label: 'select',
        options: this.options,
        valueKey: "id",
        labelKey: "name",
        returnType: 'value',
        multiple: false,
      });
      options.push({
        key: 'selectcascade',
        type: 'selectcascade',
        label: '종속적 선택',
        options: this.selectCascadeOptions,
        valueKey: "id",
        labelKey: "name",
        returnType: "value",
        multiple: true,
      });
      options.push({
        key: 'radio',
        type: 'radio',
        label: 'radio',
        options: this.options,
        valueKey: "id",
        labelKey: "name",
        returnType: "object"
      });
      options.push({
        key: 'checkbox',
        type: 'checkbox',
        label: 'checkbox',
        options: this.options,
        valueKey: "id",
        labelKey: "name",
        returnType: "object"
      });
      options.push({
        key: 'timepicker',
        type: 'timepicker',
        label: 'timepicker',
        isRange: true,
      });
      options.push({
        key: 'datepicker',
        type: 'datepicker',
        label: 'datepicker',
        isRange: true,
      });
      options.push({
        key: 'switch',
        type: 'switch',
        label: 'switch',
      });
      options.push({
        key: 'rate',
        type: 'rate',
        label: 'rate',
      });
      options.push({
        key: 'tree',
        type: 'tree',
        label: 'tree',
        options: this.treeOptions,
        valueKey: "id",
        labelKey: "name",
        defaultProps: this.treeDefaultProps
      });
      return options;
    },
    getData() {
      this.selectValue = null;
      this.radioValue = 2;
      this.checkValue = [3];
      this.timeValue = ['23:15', '23:10'];
      this.dateValue = ['2022-01-28'];
      this.treeValue = [11, 12];

      this.textValue = 'test';
      this.textNumber = 1000;     
      this.options = [
        {
          id: 1,
          name: "서울",
          order: 1
        },
        {
          id: 2,
          name: "부산",
          order: 2
        },
        {
          id: 3,
          name: "대구",
          order: 3
        },
      ];
      this.radioOptions = [
        {
          id: 1,
          name: "서울",
          order: 1
        },
        {
          id: 2,
          name: "부산",
          order: 2
        },
        {
          id: 3,
          name: "대구",
          order: 3
        },
      ];
      this.checkOptions = [
        {
          id: 1,
          name: "서울",
          order: 1
        },
        {
          id: 2,
          name: "부산",
          order: 2
        },
        {
          id: 3,
          name: "대구",
          order: 3
        },
      ];
      this.transferOptions = [
        {
          id: 1,
          name: "서울",
          order: 1
        },
        {
          id: 2,
          name: "부산",
          order: 2
        },
        {
          id: 3,
          name: "대구",
          order: 3
        },
        {
          id: 4,
          name: "인천",
          order: 1
        },
        {
          id: 5,
          name: "고양",
          order: 2
        },
        {
          id: 6,
          name: "광주",
          order: 3
        },
        {
          id: 7,
          name: "경기도",
          order: 1
        },
        {
          id: 8,
          name: "충청도",
          order: 2
        },
        {
          id: 9,
          name: "경상도",
          order: 3
        },
      ]
      
      this.treeOptions = [
        {
          id: 1,
          name: "서울",
          order: 1,
          children: [
            {
              id: 11,
              name: "강서구",
              order: 1,
              children: [
                {
                  id: 111,
                  name: "화곡동",
                  order: 1,
                }
              ]
            },
            {
              id: 12,
              name: "강남구",
              order: 1,
            }
          ]
        },
        {
          id: 2,
          name: "부산",
          order: 2,
          children: [
            {
              id: 21,
              name: "중구",
              order: 1,
            },
            {
              id: 22,
              name: "연제구",
              order: 1,
            }
          ]
        },
        {
          id: 3,
          name: "대구",
          order: 3,
          children: [
            {
              id: 31,
              name: "서구",
              order: 1,
            },
            {
              id: 32,
              name: "중구",
              order: 1,
            }
          ]
        },
      ];
      this.selectCascadeOptions = this.$_.cloneDeep(this.treeOptions);
    }
  }
});
</script>

<style>
.blue-line {
  border: 1px dotted blue;
}
.col-line {
  border: 1px dotted black;
}
</style>