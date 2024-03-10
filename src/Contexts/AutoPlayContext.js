import { createContext } from 'react';

export const AutoPlayContext = createContext({ filter: false, sort: false });

export const SetAutoPlayContext = createContext(() => {});
