import { useEffect, type Dispatch, type RefObject, type SetStateAction } from 'react';

const useResetFunction = (ref: RefObject<((val: string) => void) | null>, currentValueRef: RefObject<string>, setValue: Dispatch<SetStateAction<string>>, errorShowRef: RefObject<boolean>, setError: Dispatch<SetStateAction<string>>) => {
  useEffect(() => {
    if (ref) {
      ref.current = val => {
        if (val !== currentValueRef.current) {
          setValue(val);
        }
        if (errorShowRef.current) {
          setError('');
        }
      };
      return () => {
        ref.current = null;
      };
    }
  }, [ref, currentValueRef, setValue, errorShowRef, setError]);
};

export default useResetFunction;
