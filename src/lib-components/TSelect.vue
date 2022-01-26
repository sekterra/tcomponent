<!--
  목적 : select 컴포넌트
  작성자 : sch
  examples:
  -->
<template>
  <el-select
    v-model="vValue"
    :name="name"
    :size="size"
    :multiple="multiple"
    :multiple-limit="multipleLimit"
    :disabled="!editable"
    :value-key="valueKey"
    :label-key="labelKey"
    :filterable="filterable"
    :no-match-text="noMatchText"
    :default-first-option="defaultFirstOption"
    :placeholder="placeholder"
    @change="change"
    >
    <el-option
      v-for="item in options"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]">
    </el-option>
  </el-select>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-select',
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
      type: [Number, String, Array],
      default: null,
    },
    /* /[common] properties */

    /* [component] properties */
    // select option
    options: {
      type: Array,
      default: []
    },
    // multi select 가능 여부
    multiple: {
      type: Boolean,
      default: false
    },
    // multi select 개수 제한(0은 제한 없음)
    multipleLimit: {
      type: Number,
      default: 0
    },
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
    // 필터링 가능 여부
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    // filtering한 값이 없을 경우 표시 문자
    noMatchText: {
      type: String,
      default: ""
    },
    // filtering한 값이 있을 경우 기본 선택 여부
    defaultFirstOption: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '',
    },
    // 리턴값 형식 (value, object[label, value])
    returnType: {
      type: String,
      default: "value",
      validator: function (_value) {
        return _value.toLowerCase() === "value" || _value.toLowerCase() === "object";
      }
    }
    /* [/component] properties */
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
    
    /** events **/
    change(_option) {
      let value = this.vValue;
      if (this.returnType.toLowerCase() === "object") {
        if (this.multiple) {
          value = [];
          this.$_.forEach(this.vValue, _item => {
            if (_item) value.push(this.getSelectedItem(_item));
          });
        }
        else value = this.getSelectedItem(this.vValue);
      }
      this.$emit('input', value);
    },
    /** /events **/

    /** 기타 function **/
    getSelectedItem(_value) {
      if (!_value) return null;

      var self = this;
      var filter = this.$_.filter(this.options, _item => {
        return _item[this.valueKey] === _value;
      });

      if (filter.length > 0) {
        return {
          label: filter[0][this.labelKey],
          value: filter[0][this.valueKey]
        };
      }
      return null;
    },
    /** /기타 function **/
  }
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>