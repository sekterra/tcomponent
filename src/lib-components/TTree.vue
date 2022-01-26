<!--
  목적 : Tree 컴포넌트
  작성자 : sch
  examples:
  -->
<template>
  <div>
    <el-input
      v-if="filterable"
      :placeholder="placeholder"
      :size="size"
      v-model="keyword"
      :clearable="true"
      class="keyword"
    />
    <el-tree
      :ref="uuid"
      :data="options"
      :show-checkbox="getShowCheckbox"
      :default-expand-all="expandAll"
      :node-key="valueKey"
      :highlight-current="highlightCurrent"
      :props="properties"
      :draggable="getDraggable"
      :filter-node-method="filterMethod"
      :check-on-click-node="true"
      @check="handleCheck"
    />
  </div>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-tree',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
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
    // column 너비
    width: {
      type: Number,
      default: 24,
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
      type: Array,
      default: function() {
        return [];
      },
    },
    /* /[common] properties */

    /* [component] properties */
    // option 값에 대한 key
    valueKey: {
      type: String,
      default: "value"
    },
    // option 표시 문자에 대한 key
    labelKey: {
      type: String,
      default: "label"
    },
    childrenKey: {
      type: String,
      default: "children"
    },
    // 기본 노드 설정
    defaultProps: {
      type: Object,
      default: null
    },
    // 필터링 사용 여부
    filterable: {
      type: Boolean,
      default: true
    },
    // 드래그로 변경 가능 여부
    draggable: {
      type: Boolean,
      default: false
    },
    // 부모에서 받아오는 options 값
    options: {
      type: Array,
      default: [],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    // 최초 로딩시 하위 노드 확장 여부
    expandAll: {
      type: Boolean,
      default: false
    },
    // 다중 선택 표시 여부
    showCheckbox: {
      type: Boolean,
      default: true
    },
    // 선택 노드 표시 여부
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    // 리턴값 형식 (value, object[label, value])
    returnType: {
      type: String,
      default: "value",
      validator: function (_value) {
        return _value.toLowerCase() === "value" || _value.toLowerCase() === "object";
      }
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: [],
      keyword: '',
      uuid: this.$uuid()
    };
  },
  watch: {
    keyword(_keyword) {
      this.$refs[this.uuid].filter(_keyword);
    },
    vValue() {
      this.setCheckedKeys();
    }
  },
  computed: {
    getShowCheckbox () {
      return this.editable && this.showCheckbox;
    },
    getDraggable() {
      return this.editable && this.draggable;
    },
    properties() {
      if (this.defaultProps) return this.defaultProps;
      let props = {
        label: this.labelKey,
        children: this.childrenKey,
      };
      return props;
    },
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.init();
  },
  mounted () {
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
    
    /** Call API service
    * Naming Rule: get, post, put 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */   
    /** /Call API service **/
    
    /** events **/
    handleCheck() {
      if (this.returnType === 'value') this.vValue = this.getCheckedKeys();
      else this.vValue = this.getCheckedNodes();
      this.$emit('input', this.vValue);
    },
    /** /events **/
   
    /** 기타 function **/
    filterMethod(_query, _item) {
      if (!_query) return true;
      return _item[this.properties.label].toLowerCase().indexOf(_query.toLowerCase()) > -1;
    },
    // 선택된 노드 형식으로 가져오기
    getCheckedNodes() {
      return this.$refs[this.uuid].getCheckedNodes();
    },
    // 선택된 노드의 값 가져오기
    getCheckedKeys() {
      return this.$refs[this.uuid].getCheckedKeys();
    },
    // key로 체크하기
    setCheckedKeys() {
      this.$refs[this.uuid].setCheckedKeys(this.vValue);
    },
    // 선택값 초기화
    resetChecked() {
      console.log("resetChecked")
      this.$refs[this.uuid].setCheckedKeys([]);
    },
    /** /기타 function **/
  }
};
</script>

<style scoped>
.keyword  {
  width: 80%;
}
</style>