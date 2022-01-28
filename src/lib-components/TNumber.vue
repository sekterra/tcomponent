<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <el-input v-model="vValue"
    type="text"
    :name="name"
    :size="size"
    :readonly="!editable"
    :placeholder="placeholder"
    :minlength="min"
    :maxlength="max"
    :show-word-limit="showLimit"
    :autofocus="autofocus"
    :clearable="clearable"
    @change="handleChange"
  />
</template>

<script>
import byteLength from 'utf8-byte-length';
import truncateUtf8Bytes from 'truncate-utf8-bytes';
import numeral from 'numeral';

export default {
  /* attributes: name, components, props, data */
  name: 't-number',
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
      type: [Number, String],
      default: null,
    },
    /* /[common] properties */

    /* [component] properties */
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    // 입력 가능한 문자수 표시 여부
    showLimit: {
      type: Boolean,
      default: true,
    },
    prefixIcon: {
      type: [String, Array],
    },
    suffixIcon: {
      type: [String, Array],
    },
    // 화면 로딩시 자동 focus 설정 여부
    autofocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '',
    },
    //입력값 초가화 여부
    clearable: {
      type: Boolean,
      default: true,
    },
    // 1000단위 구분자(,) 표시 여부
    // ex) 천단위 표시:0,0, 소수점 두 자리 표시:.[00], 천단위+소수점 한 자리 표시: 0,0.[0]
    numberFormat: {
      type: String,
      default: null
    },
    // 바이트로 제한 할 것인지 input box의 maxLength로 제한 할 것인지에 대한 구분
    limitAsByte: {
      type: Boolean,
      default: false,
    },
    /* [component] properties */
  },
  data() {
    return {
    };
  },
  computed: {
    vValue: {
      get() {
        return this.value
      },
      set(_value) {
        this.$emit('input', _value)
      }
    },
  },
  watch: {
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
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  /* methods */
  methods: {
    init() {
    },
    getValue(_value) {
      if (!_value) return _value;
      let value = _value.toString().replace(/[^-\.0-9]/g, '');
      if(this.numberFormat) value = numeral(value).format(this.numberFormat);

      // 1.0과 같이 소수점 이하 값이 0일 경우 소수점 없앰
      let numberArr = value.split('.');
      if (numberArr.length > 1) {
        const pointNumber = '0.' + numberArr[1]
        if (numeral(pointNumber).value() <= 0) value = numberArr[0]
      }

      return value;
    },
    handleChange() {
      this.vValue = this.getValue(this.vValue);
      this.$emit('change', this.vValue);
    },
    /**
     * iconClick시 부모에게 emit한다.
     */
    iconClicked(_item) {
      if (!_item.callbackName) {
        return window.alert('[개발자용] callback 함수명이 없습니다.');
      }
      this.$emit(_item.callbackName, _item);
    },
  },
};
</script>

<style scoped>
</style>

