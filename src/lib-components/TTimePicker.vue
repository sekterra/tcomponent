<!--
  목적 : Timepicker 컴포넌트
  작성자 : sch
  examples:
  -->
<template>
  <div>
    <el-time-select
      :placeholder="placeholder"
      v-model="fromTime"
      :size="size"
      :picker-options="pickerOption"
      @change="handleChange"
    />
    <el-time-select v-if="isRange"
      :placeholder="placeholder"
      v-model="toTime"
      :size="size"
      :picker-options="endPickerOption"
      @change="handleChange"
    /> 
  </div>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-time-picker',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
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
    isRange: {
      type: Boolean,
      default: false
    },
    from: {
      type: String,
      default: '00:00'
    },
    to: {
      type: String,
      default: '23:59'
    },
    step: {
      type: Number,
      default: 10,
      validator: function (_value) {
        return _value > 0 && _value < 60;
      }
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: '',
      fromTime: '',
      toTime: '',
    };
  },
  watch: {
  },
  computed: {
    pickerOption() {
      let step = this.step;
      step = this.$moment('00'+step, 'hmm').format('HH:mm');

      return {
        start: this.from,
        step: step,
        end: this.to
      }
    },
    endPickerOption() {
      let step = this.step;
      step = this.$moment('00'+step, 'hmm').format('HH:mm');

      return {
        start: this.from,
        step: step,
        end: this.to,
        minTime: this.fromTime
      }
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
      this.setTimeValue();
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
      let value = this.vValue;
      if (this.isRange) {
        if (this.fromTime && this.toTime) {
          value = [];
          value.push(this.fromTime);
          value.push(this.toTime);
        } else value = null;
      } else {
        value = this.fromTime ? this.fromTime : null;
      }

      this.vValue = value;
      return this.$emit('input', this.vValue);
    },
    /** /events **/
   
    /** 기타 function **/
    setTimeValue() {
      if (Array.isArray(this.vValue)) {
        if (this.vValue.length == 1) this.fromTime = this.vValue[0] ? this.vValue[0] : null
        if (this.vValue.length > 1) {
          let fromTime = this.vValue[0] ? this.vValue[0] : null;
          let toTime = this.vValue[1] ? this.vValue[1] : null;
          let difference = 0;
          if (fromTime && toTime) {
            difference = this.$moment(toTime, 'hh:mm').diff(this.$moment(fromTime, 'hh:mm'), 'minutes');
            if (difference >= 0) {
              this.fromTime = fromTime;
              this.toTime = toTime;
            } else {
              this.fromTime = toTime;
              this.toTime = fromTime;
            }
          } else {
            this.fromTime = fromTime;
            this.toTime = toTime;
          }
        }
      } else if (typeof this.vValue === 'string' ) this.fromTime = this.vValue;
    },
    /** /기타 function **/
  }
};
</script>