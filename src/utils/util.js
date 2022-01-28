/**
 * TODO: 주어진 너비의 크기 타입 결졍
 * @_width : 너비 파라미터(기본 window.innerWidth)
 * @return : 화면 너비 타입
 * */ 
export function getWidthType(_width) {
  let width = _width ? window.innerWidth : _width;
  let type = 'xl';
  // xs
  if (width < 768) type = 'xs';
  // sm
  else if (width >= 768 && width < 992) type = 'sm';
  // md
  else if (width >= 992 && width < 1200) type = 'md';
  // lg
  else if (width >= 1200 && width < 1920) type = 'lg';
  // xl
  else if (width >= 1920) type = 'xl';
  return type;
}

/**
 * TODO: vue component의 $data 초기화
 * @param {*} _component : component의 this값
 * @returns null: this값을 입력하지 않을 경우 또는 vue.$data 초기화된 값
 */
export function initVueData(_component) {
  if (!_component) return null;
  return Object.assign(_component.$data, _component.$options.data(_component))
}