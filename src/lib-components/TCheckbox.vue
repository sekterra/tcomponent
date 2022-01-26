<!--
  목적 : checkbox 컴포넌트
  작성자 : sch
  examples:
  -->
<template>
    <!-- 컴포넌트만 사용 -->
    <el-checkbox-group
      v-model="vValue"
      :name="name"
      :size="size"
      :disabled="!editable"
      :min="min"
      :max="max"
      @change="handleChange"
    >
      <el-checkbox v-for="item in options"
        :key="item[valueKey]"
        :label="item[valueKey]">
        {{item[labelKey]}}
      </el-checkbox>
    </el-checkbox-group>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-checkbox',
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
      type: [Number, String, Object, Array],
      default: [],
    },
    /* /[common] properties */

    /* [component] properties */
    // check all 사용 여부
    useCheckAll: {
      type: Boolean,
      default: true
    },
    // select option
    options: {
      type: Array,
      default: []
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
    // 체크 최소 개수
    min: {
      type: Number,
      default: 0
    },
    // 체크 최대 개수
    max: {
      type: Number,
      default: 100
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
      vValue: [],
      isIndeterminate: false,
      checkAll: false,
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
      this.setIndeterminate(this.vValue);
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
      this.setIndeterminate(_value);
      
      let value = this.getSelectedValue();
      this.$emit('input', value);
    },
    handleCheckAllChange(_value) {
      let value = [];
      this.vValue = [];
      if (_value) value = this.getSelectedAllValue();
      this.isIndeterminate = false;
      if (this.returnType.toLowerCase() === "object") {
        this.$_.forEach(value, _item => {
          if (_item) this.vValue.push(_item.value);
        });
      } else this.vValue = value;

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
    getSelectedValue() {
      let value = this.vValue;
      if (this.returnType.toLowerCase() === "object") {
        value = [];
        this.$_.forEach(this.vValue, _item => {
          if (_item) value.push(this.getSelectedItem(_item));
        });
      }
      return value;
    },
    // 체크된 모든 값 가져오기
    getSelectedAllValue() {
      let value = [];
      if (this.returnType.toLowerCase() === "object") {
        this.$_.forEach(this.options, _item => {
          value.push(this.getSelectedItem(_item[this.valueKey]));
        });
      } else {
        this.$_.forEach(this.options, _item => {
          value.push(_item[this.valueKey]);
        });
      }
      return value;
    },
    // check all의 일부 선택 사용 여부
    setIndeterminate(_value) {
      let checkedCount = _value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
    }
    /** /기타 function **/
  }
};
</script>

<style scoped>
</style>