<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div>
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
      :show-password="password"
      rules="required"
      @change="handleChange"
    />
  </div>
</template>

<script>
import byteLength from 'utf8-byte-length';
import truncateUtf8Bytes from 'truncate-utf8-bytes';

export default {
  /* attributes: name, components, props, data */
  name: 't-text',
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
      default: '',
    },
    /* /[common] properties */

    /* [component] properties */
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
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
    //화면 로딩시 자동 focus 설정 여부
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
    // 바이트로 제한 할 것인지 input box의 maxLength로 제한 할 것인지에 대한 구분
    limitAsByte: {
      type: Boolean,
      default: false,
    },
    password: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: function () {
        return {
          required: true
        }
      }
    }
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
    handleChange(_event) {
      this.$emit('change', this.value);
    },
  },
};
</script>

<style scoped>
</style>

