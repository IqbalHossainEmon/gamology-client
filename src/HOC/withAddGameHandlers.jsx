import { useState } from 'react';

const withAddGameHandlers = Component =>
    function InnerComponent({ setMainState }) {
        const [value, setValue] = useState({}),

         handleBlur = () => {
            setMainState(value);
        },

         handleSetValue = (v, name) => {
            setValue(prev => ({ ...prev, [name]: v }));
        };

        return (<Component
            handleBlur={handleBlur}
            handleSetValue={handleSetValue}
        />);
    };

export default withAddGameHandlers;
