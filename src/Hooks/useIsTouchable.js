const useIsTouchAble = () => () => window.matchMedia('(any-hover: none)').matches;

export default useIsTouchAble;
