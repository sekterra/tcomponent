<!--
  목적 : calendar 컴포넌트
  작성자 : sch
  상세설명 : fullcalendar 5.10.1기반 calendar 컴포넌트
  examples:
  -->
<template>
  <full-calendar v-if="calendarOptions.initialView"
    :ref="uuid"
    :options="calendarOptions"
  />
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timegridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import scrollGridPlugin from '@fullcalendar/scrollgrid'
import allLocales from '@fullcalendar/core/locales-all';

export default {
  /** attributes: name, components, props, data **/
  name: 't-calendar',
  components: {
    FullCalendar
  },
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
      type: Array,
      default: function() {
        return [];
      },
      // TODO: value 예시
      // [
      //   { title: 'event 1',
      //     start: '2022-01-21T10:30:00',
      //     end: '2022-01-21T21:30:00',
      //     extendedProps: {
      //       department: 'BioChemistry'
      //     },
      //     allDay: false,
      //     description: 'Lecture',
      //   },
      //   { title: 'event 2', 
      //     date: '2022-01-23',
      //     startEditable: true,
      //     // durationEditable: false,
      //   }
      // ],
    },
    /* /[common] properties */

    /* [component] properties */
    // 컴포넌트 높이
    height: {
      type: String,
      default: 'auto'
    },
    // event에 대한 id의 키
    valueKey: {
      type: String,
      default: "id"
    },
    // event 제목에 대한 key
    labelKey: {
      type: String,
      default: "title"
    },
    // calendar 표시 언어 및 날짜 포멧에 대한 언어설정
    locale: {
      type: String,
      default: "kr"
    },
    // header tool bar 설정
    headerToolbar: {
      type: Object,
      default: function() {
        return {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }
      }
    },
    // 업무시간 표시(그 외 날짜는 배경색 변경)
    businessHours: {
      type: Object,
      default: function() {
        return {
          startTime: '09:00',
          endTime: '18:00',
          daysOfWeek: [ 1, 2, 3, 4, 5 ]
        }
      }
    },
    // calendar 표시 형식(dayGridMonth, timeGridWeek, listWeek, dayGridWeek)
    type: {
      type: String,
      default: 'dayGridMonth',
      validator: function(_value) {
        return _value === 'dayGridMonth' ||  _value === 'timeGridWeek' || _value === 'listWeek' ||  _value === 'dayGridWeek'
      }
    },
    licenseKey: {
      type: String,
      default: 'GPL-My-Project-Is-Open-Source'
    },
    // calendar 상세 설정 필요시 사용, null일 경우 기본 설정(calendarOptions)에 따름
    options: {
      type: Object,
      default: null,
    },
    /* /[component] properties */
  },
  data () {
    return {
      vValue: [],
      uuid: '',
      calendar: null, // calendar api object
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timegridPlugin, listPlugin, scrollGridPlugin ],
        locales: allLocales,
        locale: this.locale,
        height: this.height,  // 컴포넌트 높이
        expandRows: true,     // 컴포넌트 높이가 변경되면 row를 같이 맞춤
        navLinks: true,       // 날짜 클릭시 week, day 모드로 이동
        selectable: true,     // 달력에서 날짜 선택 가능
        nowIndicator: true,   // week, day 모드에서 현재 시간 표시
        dayMaxEvents: true,   // event가 많을 경우 날짜 높이에 맞춰 요약 표시(+로 표시)
        schedulerLicenseKey: this.licenseKey,
        initialView: this.type,  // dayGridMonth, timeGridWeek, listWeek, dayGridWeek
        dateClick: this.handleDateClick,
        editable: this.editable, // calendar event editable
        select: this.handleCreateEventBySelect, // 캘린더에서 드래그로 이벤트 생성
        events: this.vValue,  // calendar에 표시되는 event
        // header tool bar 설정
        headerToolbar: this.headerToolbar,
        // 업무시간을 화면에 표시
        businessHours: this.businessHours,
        eventDrop: this.handleEventDrop,
        eventResize: this.handleEventResize,
      },
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
      this.uuid = this.$uuid();
      this.calendarOptions = this.options ? this.options : this.calendarOptions;
      this.$nextTick(() => {
        this.calendar = this.$refs[this.uuid].getApi();
      })
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
    handleDateClick(arg) {
      console.log('date click! ' + arg.dateStr)
    },
    // Drop 이벤트 변경 정보 처리
    handleEventDrop(_option) {
      console.log('::: handleEventDrop')
      console.log(JSON.stringify(_option.event))
      console.log(JSON.stringify(this.calendarOptions.events))
    },
    // Drag 이벤트 변경 정보 처리
    handleEventResize(_option) {
      console.log('::: handleEventResize')
      console.log(JSON.stringify(_option.event))
      console.log(JSON.stringify(this.calendarOptions.events))
    },
    // 날짜 선택(drag)으로 이벤트 생성
    handleCreateEventBySelect(_event) {
      console.log(":::");
      if (!this.calendar) return
      var title = prompt('이벤트 제목:')
      if (title) {
        const newEvent = this.calendar.addEvent({
          title: title,
          start: _event.start,
          end: _event.end,
          allDay: _event.allDay
        })

        // console.log(JSON.stringify(this.calendarOptions.events))
        console.log(JSON.stringify(this.calendar.getEvents()))
      }
      this.calendar.unselect()
    },
    /** /events **/
   
    /** 기타 function **/
    /** /기타 function **/
  }
};
</script>