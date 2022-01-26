<!--
  목적 : form template 컴포넌트
  작성자 : sch
  상세설명 : type(search, form)에 따라 양식 값을 바꾸어주는 컴포넌트
  examples:
  -->
<template>
  <el-descriptions
    v-if="options.length"
    class="margin-top"
    :title="label"
    :column="columnCount" 
    :size="size"
    :direction="columnLabelDirection"
    :border="showBorder">
    <template slot="extra">
      <el-button type="primary" size="mini" round @click="handleClick">저장</el-button>
    </template>
    <el-descriptions-item v-for="_option in eachItemOptions"
      :key="_option.key"
      :span="_option.span"
    >
      <!-- component label -->
      <template v-if="_option.label"
        slot="label"
      >{{_option.label}}
        <span v-if="_option.required">*</span>
      </template>

      <!-- text component -->
      <t-text v-if="_option.type.toLowerCase() === 'text'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :clearable="_option.clearable"
        :required="_option.required"
        :placeholder="_option.placeholder"
      />
      
      <!-- number component -->
      <t-number v-if="_option.type.toLowerCase() === 'number'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :clearable="_option.clearable"
        :required="_option.required"
        :placeholder="_option.placeholder"
      />

      <!-- select component -->
      <t-select v-if="_option.type.toLowerCase() === 'select'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :required="_option.required"
        :placeholder="_option.placeholder"
        :options="_option.options"
        :value-key="_option.valueKey"
        :label-key="_option.labelKey"
        :returnType="_option.returnType"
        :multiple="_option.multiple"
        :multipleLimit="_option.multipleLimit"
      />

      <!-- radio component -->
      <t-radio v-if="_option.type.toLowerCase() === 'radio'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :required="_option.required"
        :options="_option.options"
        :value-key="_option.valueKey"
        :label-key="_option.labelKey"
        :returnType="_option.returnType"
      />

      <!-- checkbox component -->
      <t-checkbox v-if="_option.type.toLowerCase() === 'checkbox'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :required="_option.required"
        :options="_option.options"
        :value-key="_option.valueKey"
        :label-key="_option.labelKey"
        :returnType="_option.returnType"
      />

      <!-- switch component -->
      <t-switch v-if="_option.type.toLowerCase() === 'switch'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :required="_option.required"
      />

      <!-- time component -->
      <t-time-picker v-if="_option.type.toLowerCase() === 'timepicker'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :required="_option.required"
        :placeholder="_option.placeholder"
        :isRange="_option.isRange"
        :step="_option.step"
      />

      <!-- date component -->
      <t-date-picker v-if="_option.type.toLowerCase() === 'datepicker'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :required="_option.required"
        :placeholder="_option.placeholder"
        :isRange="_option.isRange"
      />

      <!-- rate component -->
      <t-rate v-if="_option.type.toLowerCase() === 'rate'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :max="_option.max"
      />

      <!-- tree component -->
      <t-tree v-if="_option.type.toLowerCase() === 'tree'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :required="_option.required"
        :options="_option.options"
        :value-key="_option.valueKey"
        :label-key="_option.labelKey"
        :expandAll="_option.expandAll"
        :draggable="_option.draggable"
        :defaultProps="_option.defaultProps"
      />
      <div v-if="_option.type.toLowerCase() === 'tree'">
        tree:{{vValue[_option.key]}}
      </div>
      
      <t-select-cascade v-if="_option.type.toLowerCase() === 'selectcascade'"
        v-model="vValue[_option.key]"
        :editable="_option.editable"
        :size="size"
        :required="_option.required"
        :options="_option.options"
        :value-key="_option.valueKey"
        :label-key="_option.labelKey"
        :multiple="_option.multiple"
        :returnType="_option.returnType"
      />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-form-template',
  props: {
    /* [common] properties */
    // element name
    name: {
      type: String,
    },
    // 컴포넌트 label(화면 타이틀)
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
      type: Object,
      default: null,
    },
    /* /[common] properties */

    /* [component] properties */
    // 컴포넌트의 종류(form: form형식, search: 검색 형식)
    type: {
      type: String,
      default: 'form',
      validator: function(_value) {
        return _value === 'form' || _value === 'search'
      }
    },
    // form 제목
    label: {
      type: String,
      default: ''
    },
    // column 제목 위치
    columnLabelDirection: {
      type: String,
      default: 'horizontal',
      validator: function (_value) {
        return _value === 'horizontal' || _value === 'vertical'
      }
    },
    // border 표시 여부
    showBorder: {
      type: Boolean,
      default: true,
    },
    // row 당 컬럼 개수
    columnCount: {
      type: Number,
      default: 4
    },
    // 컬럼별 옵션
    options: {
      type: Array,
      default: []
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: {},
      eachItemOptions: []
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
  },
  mounted () {
    this.init();
  },
  beforeDestory () {
    this.init();
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.eachItemOptions = this.setOptionsWithDefault();
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
    handleClick() {
      this.$emit('input', this.vValue);
    },
    /** /events **/
   
    /** 기타 function **/
    // 부모에서 받은 옵션 값을 컴포넌트에 맞게 설정하는 함수(관련 옵션이 없으면 컴포넌트의 기본값으로 설정)
    setOptionsWithDefault() {
      let options = this.$_.cloneDeep(this.options);
      this.$_.forEach(options, _option => {
        if (!_option.key) throw this.$message.error("key 값이 존재하지 않습니다.");
        if (!_option.type) throw this.$message.error("컴포넌트 type이 존재하지 않습니다.");

        _option.editable = _option.editable ? _option.editable : this.editable;
        _option.required = _option.required ? _option.required : false;
        _option.span = _option.span ? _option.span : 0;
        if (_option.type.toLowerCase() === 'text') {
          _option.clearable = _option.clearable ? _option.clearable : true;
          _option.placeholder = _option.placeholder ? _option.placeholder : "입력하세요";
        } else if (_option.type.toLowerCase() === 'number') {
          _option.clearable = _option.clearable ? _option.clearable : true;
          _option.placeholder = _option.placeholder ? _option.placeholder : "입력하세요";
          _option.numberFormat = _option.numberFormat ? _option.numberFormat : null;
        } else if (_option.type.toLowerCase() === 'select') {
          _option.placeholder = _option.placeholder ? _option.placeholder : "선택하세요";
          _option.options = _option.options ? _option.options : [];
          _option.valueKey = _option.valueKey ? _option.valueKey : "value";
          _option.labelKey = _option.labelKey ? _option.labelKey : "label";
          _option.returnType = _option.returnType ? _option.returnType : "value";
          _option.multiple = _option.multiple ? _option.multiple : false;
          _option.multipleLimit = _option.multipleLimit ? _option.multipleLimit : 0;
        } else if (_option.type.toLowerCase() === 'radio') {
          _option.options = _option.options ? _option.options : [];
          _option.valueKey = _option.valueKey ? _option.valueKey : "value";
          _option.labelKey = _option.labelKey ? _option.labelKey : "label";
          _option.returnType = _option.returnType ? _option.returnType : "value";
        } else if (_option.type.toLowerCase() === 'checkbox') {
          _option.options = _option.options ? _option.options : [];
          _option.valueKey = _option.valueKey ? _option.valueKey : "value";
          _option.labelKey = _option.labelKey ? _option.labelKey : "label";
          _option.returnType = _option.returnType ? _option.returnType : "value";
        } else if (_option.type.toLowerCase() === 'switch') {
        } else if (_option.type.toLowerCase() === 'timepicker') {
          _option.placeholder = _option.placeholder ? _option.placeholder : "선택하세요";
          _option.isRange = _option.isRange ? _option.isRange : false;
          _option.step = _option.step ? _option.step : 10;
        } else if (_option.type.toLowerCase() === 'datepicker') {
          _option.placeholder = _option.placeholder ? _option.placeholder : "선택하세요";
          _option.isRange = _option.isRange ? _option.isRange : false;
        } else if (_option.type.toLowerCase() === 'rate') {
          _option.max = _option.max ? _option.max : 5;
        } else if (_option.type.toLowerCase() === 'tree') {
          _option.options = _option.options ? _option.options : [];
          _option.valueKey = _option.valueKey ? _option.valueKey : "value";
          _option.labelKey = _option.labelKey ? _option.labelKey : "label";
          _option.childrenKey = _option.childrenKey ? _option.childrenKey : "children";
          _option.expandAll = _option.expandAll ? _option.expandAll : false;
          _option.draggable = _option.draggable ? _option.draggable : true;
          _option.defaultProps = _option.defaultProps ? _option.defaultProps : null;
        } else if (_option.type.toLowerCase() === 'selectcascade') {
          _option.placeholder = _option.placeholder ? _option.placeholder : "선택하세요";
          _option.options = _option.options ? _option.options : [];
          _option.valueKey = _option.valueKey ? _option.valueKey : "value";
          _option.labelKey = _option.labelKey ? _option.labelKey : "label";
          _option.childrenKey = _option.childrenKey ? _option.childrenKey : "children";
          _option.returnType = _option.returnType ? _option.returnType : "value";
          _option.multiple = _option.multiple ? _option.multiple : false;
        }
      });
      return options;
    }
    /** /기타 function **/
  }
};
</script>