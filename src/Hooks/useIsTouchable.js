import { useCallback } from 'react';

const useIsTouchAble = () => useCallback(() => window.matchMedia('(any-hover: none)').matches, []);

export default useIsTouchAble;
