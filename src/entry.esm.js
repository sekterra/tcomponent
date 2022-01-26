
// Import vue components
import Vue from 'vue';
import * as components from '@/lib-components/index';
import ElementUi from 'element-ui';
// TODO: 배포시 주석처리 할 것
import locale from 'element-ui/lib/locale/lang/ko'

/* css imports */
// TODO: 배포시 주석처리 할 것
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

/* import third party libraries  */
// https://www.npmjs.com/package/@fortawesome/vue-fontawesome
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faFileExcel, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import lodash from 'lodash';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

/* fontawesome settings */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
/* /fontawesome settings */

// css 자동 추가(size 등)
config.autoAddCss = true;

// 모든 icon 추가
//library.add(fas)
library.add(faSearch);
library.add(faFileExcel);
library.add(faClipboardList);
/* /fontawesome settings */

// install function executed by Vue.use()
const install = function installTComponents(Vue, options) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });

  // TODO: 배포시 주석 해제 할 것
  // Vue.use(ElementUi, options);
};

/** prototypes */
Vue.prototype.$_ = lodash;
Vue.prototype.$moment = moment;
Vue.prototype.$uuid = uuidv4;
/** /prototypes */

// TODO: 배포시 주석처리 할 것
Vue.use(ElementUi, {
  size: 'mini', // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value),
  locale,
});

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
