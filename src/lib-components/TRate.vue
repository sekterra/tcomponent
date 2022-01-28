<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
  examples:
  -->
<template>
  <el-rate
    v-model="vValue"
    :max="max"
    :colors="colors"
    :texts="texts"
    :disabled="!editable"
    :show-text="showText"
    @change="handleChange"
  />
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-rate',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
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
      type: Number,
      default: null,
    },
    /* /[common] properties */

    /* [component] properties */
    // 별표 개수
    max: {
      type: Number,
      default: 5
    },
    colors: {
      type: Array,
      default: function () {
        return ['#99A9BF', '#F7BA2A', '#FF9900'];
      } 
    },
    texts: {
      type: Array,
      default: null
    },
    /* /[component] properties */
  },
  data () {
    return {
    };
  },
  watch: {
  },
  computed: {
    vValue: {
      get() {
        return this.value
      },
      set(_value) {
      }
    },
    showText() {
      if (!this.texts) return false;
      return this.texts.length === this.max;
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
    handleChange(_value) {
      return this.$emit('change', _value);
    },
    /** /events **/
   
    /** 기타 function **/
    /** /기타 function **/
  }
};
</script>