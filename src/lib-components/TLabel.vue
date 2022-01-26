<!--
  목적 : Label을 표시하는  컴포넌트
  작성자 : sch
  Detail :
  *
  examples:
  *
  -->
<template>
  <div>
    <label :for="name">{{label}}</label>
    <span v-if="required">
      *
    </span>
  </div>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-label', // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
  props: {
    // 부모로 부터 받아온 라벨 정보
    label: {
      type: String,
      default: '',
    },
    // 부모 컴포넌트의 name
    name: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      iconNewName: '',
    };
  },
  computed: {
  },
  watch: {
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {},
  beforeDestory() {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init() {
      // TODO : 여기에 초기 설정용 함수를 호출하거나 로직을 입력하세요.
    },
    /** /초기화 관련 함수 **/
  },
};
</script>

<style>
</style>
