const isTouchAble = () =>
  window.matchMedia("(any-pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

export default isTouchAble;
