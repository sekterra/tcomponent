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
      @change="handleFromChange"
    />
    <el-time-select v-if="isRange"
      :placeholder="placeholder"
      v-model="toTime"
      :size="size"
      :picker-options="endPickerOption"
      @change="handleToChange"
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
      toTime: '',
    };
  },
  watch: {
  },
  computed: {
    fromTime: {
      get() {
        if (!this.value) return this.value
        if (Array.isArray(this.value)) {
          // times = this.getCorrectTimeRange()
          this.toTime = this.value[1];
          return this.value[0];
        }
        return this.value
      },
      set(_value) {
        this.handleFromChange(_value);
      }
    },
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
    handleFromChange(_value) {
      let value = _value;
      if (this.isRange) {
        value = []
        value.push(_value)
        value.push(this.toTime)
      }
      this.$emit('change', value);
    },
    handleToChange(_value) {
      let values = [];
      values.push(this.fromTime)
      values.push(_value)
      this.$emit('change', values)
    },
    /** /events **/
   
    /** 기타 function **/
    getCorrectTimeRange() {
      // if (!this.isRange) this.value;
      // let value  = [];
      // if (Array.isArray(this.value)) {
      //   let fromTime = this.value[0] ? this.value[0] : null;
      //   let toTime = null;
      //   if (this.value.length > 1) toTime = this.value[1]
      //   if (fromTime && toTime) {
      //     if (this.$moment(toTime, 'hh:mm').diff(this.$moment(fromTime, 'hh:mm'), 'minutes') >= 0) {
      //       value.push(fromTime)
      //       value.push(toTime)
      //     } else {
      //       value.push(toTime)
      //       value.push(fromTime)
      //     }
      //   } else {
      //     value.push(fromTime)
      //     value.push(toTime)
      //   }
      // } else return []
      // return value
    },
    /** /기타 function **/
  }
};
</script>