<template>
  <div id="app">
    <t-form-template v-if="treeOptions.length"
      v-model="formValue"
      label="검색"
      size="medium"
      :editable="true"
      type="search"
      :column-count="columnCount"
      :options="getFormOptions()"
    />
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
    tableRenderCount: {{tableRenderCount}}
    formValue: {{formValue}}
  </div>
</template>

<script>
import Vue from 'vue';
import TRadio from '../src/lib-components/TRadio.vue';
import TSelect from '../src/lib-components/TSelect.vue';
import TSwitch from '../src/lib-components/TSwitch.vue';
import TTimePicker from '../src/lib-components/TTimePicker.vue';
import TTransfer from '../src/lib-components/TTransfer.vue';
import _TComponentTemplate from '../src/lib-components/_TComponentTemplate.vue';
import cities from '../src/testData/city';
import cityColumns from '../src/testData/cityColumns';

export default Vue.extend({
  components: { TSelect, TRadio, TSwitch, TTimePicker, TTransfer, _TComponentTemplate },
  name: 'ServeDev',
  props: {
  },
  data() {
    return {
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
      formValue: {},
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
      this.getFormOptions();
      this.formValue = {text: "테스트",
        number: 123,
        select: 1,
        selectcascade: [1,111,2,21],
      };
      // this.tableSpanOptions = [
      //   {
      //     index: 2,      // row span 하려는 컬럼의 index 번호
      //     field: "city", // 해당 컬럼의 속성명
      //   },
      //   {
      //     index: 3, 
      //     field: "state",
      //   },
      // ]
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
        label: '숫자',
      });
      options.push({
        key: 'select',
        type: 'select',
        label: 'select',
        options: this.options,
        valueKey: "id",
        labelKey: "name",
      });
      options.push({
        key: 'selectcascade',
        type: 'selectcascade',
        label: '종속적 선택',
        options: this.selectCascadeOptions,
        valueKey: "id",
        labelKey: "name",
        returnType: "object",
        multiple: true,
      });
      options.push({
        key: 'selectcascade2',
        type: 'selectcascade',
        label: '종속적 선택2',
        options: this.selectCascadeOptions,
        valueKey: "id",
        labelKey: "name",
        multiple: true,
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
      this.selectValue = [1, 2];
      this.radioValue = 2;
      this.checkValue = [3];
      this.timeValue = ['23:15', '23:10'];
      this.dateValue = ['2022-01-28'];
      this.treeValue = [11, 12];
      setTimeout(() => {
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
      }, 1000);

      setTimeout(() => {
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
      }, 2000);
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