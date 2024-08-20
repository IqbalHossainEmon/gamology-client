const isTouchable = () => window.matchMedia('(any-hover: none)').matches,

 useIsTouchAble = () => isTouchable;

export default useIsTouchAble;
