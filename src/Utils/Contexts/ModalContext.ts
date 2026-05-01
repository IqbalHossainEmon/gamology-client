import { createContext } from 'react';
import type { HideModalContextType, SetModalContextType } from '../HOC/withModal';


export const SetModalContext = createContext<SetModalContextType | undefined>(undefined);
export const HideModalContext = createContext<HideModalContextType | undefined>(undefined);
