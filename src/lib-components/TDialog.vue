<!--
  목적 : Dialog 컴포넌트
  작성자 : sch
  상세설명 : 
  examples:
  -->
<template>
  <el-dialog :title="label" 
    :visible.sync="visible"
    :width="widthPercent"
    :show-close="showCloseButton"
    @close="handleClosed"
  >
    <t-form-template 
      v-model="vFormValue"
      :label="formOptions.label"
      :size="size"
      :editable="editable"
      :type="type"
      :column-count="vFormColumnCount"
      :options="formOptions.options"
      @change="handleFormChange"
    />
    <span slot="footer" class="dialog-footer">
      <slot name="button" />
      <el-button @click="handleClickClose">Cancel</el-button>
      <el-button type="primary" @click="handleClickConfirm">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import TFormTemplate from './TFormTemplate.vue';
export default {
  components: { TFormTemplate },
  /** attributes: name, components, props, data **/
  name: 't-dialog',  // 반드시 입력하세요(안 하면 warning 발생). 네이밍 룰은 현재 vue component의 파일명의 단어를 "-"로 구분(예:exam-data)하여 입력하시면 됩니다. 입력후 이 주석은 지워주세요.
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
    value: {
      type: [Number, String, Object, Array],
      default: null,
    },
    /* /[common] properties */

    /* [component] properties */
    // 표시 컴포넌트의 종류(form: form형식, search: 검색 형식)
    type: {
      type: String,
      default: 'form'
    },
    // popup 너비
    width: {
      type: Number,
      default: 80,
      validator: function(_value) {
        return _value >= 50 && _value <= 100
      }
    },
    // dialog 표시여부
    showDialog: {
      type: Boolean,
      require: true,
      default: false
    },
    // 닫기 버튼 표시여부
    showCloseButton: {
      type: Boolean,
      default: true
    },
    // form 표시 옵션
    formOptions: {
      type: Object,
      default: function() {
        return {
          label: '',
          options: []
        };
      }
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: this.value,
      // form 값
      visible: this.showDialog,
      vFormValue: null,
      vFormColumnCount: 0,
    };
  },
  watch: {
    showDialog() {
      this.visible = this.showDialog
      if (!this.visible) {
        let formColumnCount = this.vFormColumnCount;
        let formValue = {... this.vFormValue}

        // this.$util.initVueData(this)
        console.log('before:' + JSON.stringify(this.vFormValue));
        this.vFormValue = {}

        for(var key in formValue) {
          formValue[key] = null
        }
        this.vFormValue = formValue
        console.log('after:' + JSON.stringify(this.vFormValue));
        this.vFormColumnCount = formColumnCount
      }
    }
  },
  computed: {
    widthPercent() {
      return this.width + '%';
    },
  },
  /** Vue lifecycle: created, mounted, destroyed, etc **/
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.init();
  },
  mounted() {
    this.vFormColumnCount = this.reactiveColumnCount();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    this.$util.initVueData(this)
    window.removeEventListener('resize', this.handleResize);
  },
  /** methods **/
  methods: {
    /** 초기화 관련 함수 **/
    init () {
      this.vValue = this.value;
    },
    /** /초기화 관련 함수 **/
    
    /** Call API service
    * Naming Rule: api + [Get, Post, Put] 등의 RESTFul verb를 접두사로 사용하고 그 뒤에 관련 모델명을 Camel case로 추가하세요.
    * Naming Rule: get의 경우 복수의 데이터조회(리스트 데이터 등)시에는 복수를 나타내는 접미사 "s"를 붙여주세요.
    * ex) getExamData () {}
    * ex) getExamDatas () {}
    */   
    /** /Call API service **/

    /** 기타 function **/
    reactiveColumnCount() {
      let count = 0
      const popupWidth = window.innerWidth * (this.width / 100)
      switch(this.$util.getWidthType(popupWidth)) {
        case 'xs' :
          count = 1;
          break;
        case 'sm' :
          count = 2;
          break;
        case 'md' :
          count = 2;
          break;
        case 'lg' :
          count = 3;
          break;
        case 'xl' :
          count = 4;
          break;
        default:
          count = 1;
      }
      return count;
    },
    /** /기타 function **/
    
    /** events **/
    handleResize() {
      this.vFormColumnCount = this.reactiveColumnCount();
    },
    // 확인 버튼 클릭
    handleClickConfirm() {
      this.$emit('input', this.vValue)
      this.handleClosed()
    },
    // 닫기 버튼 클릭
    handleClickClose() {
      this.handleClosed()
    },
    // 닫은 후 처리
    handleClosed() {
      this.$emit('update:showDialog', false)
    },
    handleFormChange(_value) {
      this.vFormValue = _value;
    }
    /** /events **/
  }
};
</script>