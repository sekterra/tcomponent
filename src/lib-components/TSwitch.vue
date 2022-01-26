<!--
  목적 : (반드시 기입하세요) 컴포넌트
  작성자 : (이니셜로 반드시 입력하세요)
  examples:
  -->
<template>
  <el-switch
    v-model="vValue"
    :active-color="activeColor"
    :inactive-color="inActiveColor"
    :active-text="activeText"
    :inactive-text="inactiveText"
    :disabled="!editable"
    @change="handleChange"
  >
  </el-switch>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-swtich',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
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
      type: Boolean,
      default: null,
    },
    /* /[common] properties */

    /* [component] properties */
    // 선택시 색상
    activeColor: {
      type: String,
      default: ''
    },
    // 미선택시 색상
    inActiveColor: {
      type: String,
      default: ''
    },
    // 선택시 안내 문자
    activeText: {
      type: String,
      default: ''
    },
    // 미선택시 안내 문자
    inactiveText: {
      type: String,
      default: ''
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: ''
    };
  },
  watch: {
  },
  computed: {
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
    
    /** events */
    handleChange() {
      this.$emit("input", this.vValue);
    },
    /** /events */

    /** 기타 function **/
    /** /기타 function **/
  }
};
</script>