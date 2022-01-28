<!--
  목적 : Hieracical Select 컴포넌트
  작성자 : sch
  상세설명 : 부서, 회사 등 계층적인 정보를 선택할 때 사용하는 컴포넌트
  examples:
  -->
<template>
  <el-popover
    :disabled="!tooltipContent.length"
    :content="tooltipContent"
    :width="300"
    placement="top"
    trigger="hover"
  >
    <el-cascader
      v-model="vValue"
      :ref="uuid"
      slot="reference"
      :placeholder="placeholder"
      :options="options"
      :size="size"
      :disabled="!editable"
      :filterable="filterable"
      :clearable="clearable"
      :collapse-tags="collaseTag"
      :props="properties"
      @change="handleChange"
    >
      <template slot-scope="{ node, data }">
        <span>{{ data[labelKey] }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>
    </el-cascader>
  </el-popover>
</template>

<script>
export default {
  /** attributes: name, components, props, data **/
  name: 't-select-cascade',
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
    // column 너비
    width: {
      type: Number,
      default: 24,
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
      type: [String, Number, Array, Object],
      default: null,
    },
    /* /[common] properties */

    /* [component] properties */
    // 보여지는 항목들에 대한 옵션 정보
    options: {
      type: Array,
      default: []
    },
    // multi select 가능 여부
    multiple: {
      type: Boolean,
      default: false
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
    childrenKey: {
      type: String,
      default: "children"
    },
    // 필터링 가능 여부
    filterable: {
      type: Boolean,
      default: true
    },
    // 선택값 초기화 사용 여부
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '',
    },
    // 다중 선택시 개수 표현
    collaseTag: {
      type: Boolean,
      default: true
    },
    // 리턴값 형식 (value, object[label, value])
    returnType: {
      type: String,
      default: "value",
      validator: function (_value) {
        return _value.toLowerCase() === "value" || _value.toLowerCase() === "object";
      }
    }
    /* /[component] properties */
  },
  data () {
    return {
      tooltipContent: '',
      uuid: this.$uuid(),
      ref: null,
    };
  },
  watch: {
  },
  computed: {
    vValue: {
      get() {
        if (!this.value) return this.value
        let value = this.value
        if (Array.isArray(value)) {
          value = [];
          if (this.multiple) {
            this.$_.forEach(this.value, _value => {
              if (typeof _value === 'object') value.push(_value[this.valueKey])
              else value.push(_value)
            })
          } else {
            if (typeof value[0] === 'object') value = this.value[0][this.valueKey]
            else value = this.value[0]
          }
        } else {
          if (typeof value === 'object') value = this.value[this.valueKey]
          else value = this.value
        }

        if (this.ref) value = this.getSelectCascadeValue(value)

        return value
      },
      set(_value) {
        this.handleChange(_value);
      }
    },
    // 컴포넌트의 상세 설정
    properties() {
      let props = {
        multiple: this.multiple,
        checkStrictly: true,
        value: this.valueKey,
        label: this.labelKey,
        children: this.childrenKey,
      };
      return props;
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
  mounted () {
    // this.vValue = this.getSelectCascadeValue();
    this.ref = this.$refs[this.uuid]
    this.$nextTick(() => {
      this.setTooltipContent();
    });
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
    handleChange(_value) {
      this.setTooltipContent();
      let values = this.getReturnValues(_value);
      this.$emit('change', values);
    },
    /** /events **/
   
    /** 기타 function **/
    // Tooltip 내용 만들기
    setTooltipContent() {
      if (!this.ref) return;
      let text = '';      
      const nodes = this.ref.getCheckedNodes();
      if (!(nodes.length > 1 && this.multiple)) {
        this.tooltipContent = "";
        return;
      }
      const showAllLevels = true;
      const separator = "/";
      this.$_.forEach(nodes, _node => {
        text += text ? ', ' + _node.getText(showAllLevels, separator) : _node.getText(showAllLevels, separator)
      });
      this.tooltipContent = text;
    },
    // cascade 컴포넌트에 맞는 값 가져오기
    getSelectCascadeValue(_item) {
      if (!this.ref) return;
      
      let node = null
      let returnValue = null
      let self = this;
      if (Array.isArray(_item)) {
        returnValue = [];
        this.$_.forEach(_item, _value => {
          node = self.ref.panel.getNodeByValue(_value);
          returnValue.push(this.$_.map(node.pathNodes, 'data.id'));
        });
      } else {
        node = self.ref.panel.getNodeByValue(_item);
        returnValue = this.$_.map(node.pathNodes, 'data.id')[0]
      }
      return returnValue;
    },
    // return 값을 return type에 맞게 변환
    getReturnValues(_items) {
      let values = [];
      const items = _items ? _items : this.value
      if (this.returnType === "value") {
        if (this.multiple) {
          this.$_.forEach(items, _value => {
            values.push(_value[_value.length - 1]);
          });
        }
        else values = items[items.length - 1];
      } else {
        let self = this;
        if (this.multiple) {
          this.$_.forEach(items, _value => {
            const node = self.ref.panel.getNodeByValue(_value);
            let data = {};
            for(var key in node.data) {
              if (key != self.childrenKey) data[key] = node.data[key];
            }
            values.push(data);
          });
        } else {
          const node = this.ref.panel.getNodeByValue(items[items.length - 1]);
          let data = {};
          for(var key in node.data) {
            if (key != self.childrenKey) data[key] = node.data[key];
          }
          values = data;
        }
      }
      return values;
    },
    /** /기타 function **/
  }
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>