import { useState } from 'react';
import { AutoPlayContext, SetAutoPlayContext } from '../Contexts/AutoPlayContext';

const withAutoPlayProvider = Component =>
    function InnerComponent(props) {
        const [show, setShow] = useState(false);

        return (
            <AutoPlayContext.Provider value={show}>
                <SetAutoPlayContext.Provider value={setShow}>
                    <Component {...props} />
                </SetAutoPlayContext.Provider>
            </AutoPlayContext.Provider>
        );
    };

export default withAutoPlayProvider;
