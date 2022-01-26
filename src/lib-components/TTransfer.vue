<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
  examples:
  -->
<template>
  <el-transfer
    v-model="vValue"
    ref="transfer"
    :filterable="filterable"
    :filter-method="filter"
    :placeholder="placeholder"
    :data="getOptions"
    :titles="titles"
    @change="handleChange"
  >
  </el-transfer>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-transfer',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
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
      type: Array,
      default: [],
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
    // 필터링 사용 여부
    filterable: {
      type: Boolean,
      default: true
    },
    // 부모에서 받아오는 options 값
    options: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: '',
    },
    // 상단 제목
    titles: {
      type: Array,
      default: []
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: [],
      filter: this.filterMethod
    };
  },
  watch: {
  },
  computed: {
    // 부모로부터 받은 option 값을 컴포넌트에 맞게 변환
    getOptions () {
      if (!this.options.length) return [];
      let options = [];
      this.$_.forEach(this.options, _item => {
        options.push({
          label: _item[this.labelKey],
          key: _item[this.valueKey],
          initial: _item[this.labelKey],
        });
      });
      return options;
    },
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
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
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
    handleChange() {
      this.$refs.transfer.clearQuery('left');
      this.$refs.transfer.clearQuery('right');
      this.$emit('input', this.vValue);
    },
    /** /events **/
   
    /** 기타 function **/
    filterMethod(_query, _item) {
      return _item.initial.toLowerCase().indexOf(_query.toLowerCase()) > -1;
    },
    /** /기타 function **/
  }
};
</script>