import { useState } from 'react';
import {
  AutoPlayContext,
  SetAutoPlayContext,
} from '../Contexts/AutoPlayContext';

const withAutoPlayProvider = (Component) => (props) => {
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
