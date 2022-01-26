<!--
  목적 : DatePicker 컴포넌트
  작성자 : sch
  상세설명 : 날짜 또는 기간을 선택할 수 있는 컴포넌트
  examples:
  -->
<template>
  <div>
    <div class="hidden-xs-only">
      <el-date-picker
        v-model="vValue"
        :size="size"
        :type="pickerType"
        :placeholder="placeholder"
        :start-placeholder="placeholder"
        :end-placeholder="placeholder"
        :format="format"
        :value-format="valueFormat"
        :clearable="true"
        :disabled="!editable"
        :editable="textInputtable"
        :align="align"
        @change="handleChange"
      />
    </div>
    <div class="hidden-sm-and-up">
      <el-date-picker
        v-model="fromDate"
        :size="size"
        :type="type"
        :placeholder="placeholder"
        :start-placeholder="placeholder"
        :end-placeholder="placeholder"
        :format="format"
        :value-format="valueFormat"
        :clearable="true"
        :disabled="!editable"
        :editable="textInputtable"
        :align="align"
        :picker-options="fromPickerOptions"
        @change="handleChangeFromDate"
      />
      <el-date-picker
        v-model="toDate"
        :size="size"
        :type="type"
        :placeholder="placeholder"
        :start-placeholder="placeholder"
        :end-placeholder="placeholder"
        :format="format"
        :value-format="valueFormat"
        :clearable="true"
        :disabled="!editable"
        :editable="textInputtable"
        :align="align"
        :picker-options="toPickerOptions"
        @change="handleChangeToDate"
      />
    </div>
  </div>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-date-picker',
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
      type: [String, Array],
      default: null,
    },
    /* /[common] properties */
    /* [component] properties */
    placeholder: {
      type: String,
      default: ''
    },
    // 기간 선택 여부
    isRange: {
      type: Boolean,
      default: false
    },
    // datepicker 타입
    type: {
      type: String,
      default: "date",
      validator(_value) {
        return _value === "year" || _value === "month" || _value === "date"
      }
    },
    // 텍스트 값 직접 입력 여부
    textInputtable: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: "center"
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: '',
      fromDate: '',
      toDate: '',
    };
  },
  watch: {
  },
  computed: {
    // datepicker 타입
    pickerType () {
      if (!this.isRange || this.type.toLowerCase() === "year") return this.type.toLowerCase();
      return this.type.toLowerCase() + 'range';
    },
    // type에 따른 리턴값 형식
    format() {
      let format = '';
      switch(this.type) {
        case "year":
          format = "yyyy";
          break;
        case "month":
          format = "yyyy-MM";
          break;
        default:
          format = 'yyyy-MM-dd';
      }
      return format;
    },
    // type에 따른 리턴값 형식
    valueFormat() {
      let format = '';
      switch(this.type) {
        case "year":
          format = "yyyy";
          break;
        case "month":
          format = "yyyy-MM";
          break;
        default:
          format = 'yyyy-MM-dd';
      }
      return format;
    },
    // fromDate 옵션
    fromPickerOptions() {
      let options = {};
      if (this.toDate) {
        let toDate = this.$moment(this.toDate);
        options = {
          disabledDate(_date) {
            return _date > toDate;
          }
        };
      }
      return options;
    },
    // toDate 옵션
    toPickerOptions() {
      let options = {};
      if (this.fromDate) {
        let fromDate = this.$moment(this.fromDate);
        options = {
          disabledDate(_date) {
            return _date < fromDate;
          }
        };
      }
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
      this.vValue = this.value;
      this.setDateValue();
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
      this.setDateValue();
      this.$emit("input", this.vValue);
    },
    handleChangeFromDate() {
      if (!this.fromDate) this.toDate = '';
      if (!this.fromDate || !this.toDate) return;
      this.vValue = [];
      this.vValue.push(this.fromDate);
      this.vValue.push(this.toDate);
      this.$emit("input", this.vValue);
    },
    handleChangeToDate() {
      if (!this.fromDate || !this.toDate) return;
      this.vValue = [];
      this.vValue.push(this.fromDate);
      this.vValue.push(this.toDate);
      this.$emit("input", this.vValue);
    },
    /** /events **/
   
    /** 기타 function **/
    setDateValue() {
      if (Array.isArray(this.vValue)) {
        if (this.vValue.length == 1) {
          this.fromDate = this.vValue[0] ? this.vValue[0] : '';
        }
        if (this.vValue.length > 1) {
          let fromDate = this.vValue[0] ? this.vValue[0] : null;
          let toDate = this.vValue[1] ? this.vValue[1] : null;
          let difference = 0;
          if (fromDate && toDate) {
            difference = this.$moment(toDate).diff(this.$moment(fromDate), 'days', true);
            if (difference >= 0) {
              this.fromDate = fromDate;
              this.toDate = toDate;
            } else {
              this.fromDate = toDate;
              this.toDate = fromDate;
            }
          } else {
            this.fromDate = fromDate;
            this.toDate = toDate;
          }

          this.vValue = [];
          this.vValue.push(this.fromDate);
          this.vValue.push(this.toDate);
        }
      } else if (typeof this.vValue === 'string' ) this.fromDate = this.vValue;
    }
    /** /기타 function **/
  }
};
</script>

<style scoped>
</style>