const isTouchable = () => window.matchMedia('(any-hover: none)').matches;
const useIsTouchAble = () => isTouchable;

export default useIsTouchAble;
