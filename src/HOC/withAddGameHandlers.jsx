import { useState } from 'react';

const withAddGameHandlers = Component =>
  function InnerComponent({ setMainState }) {
    const [value, setValue] = useState({});

    const handleBlur = () => {
      setMainState(value);
    };

    const handleSetValue = (v, name) => {
      setValue(prev => ({ ...prev, [name]: v }));
    };

    return <Component handleSetValue={handleSetValue} handleBlur={handleBlur} />;
  };

export default withAddGameHandlers;
