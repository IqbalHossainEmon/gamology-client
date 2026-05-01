import { createContext } from 'react';
import type { HandleHideToast, HandleSetToast} from '../HOC/withToast';


export const SetToastContext = createContext<HandleSetToast | undefined>(undefined);
export const HideToastContext = createContext<HandleHideToast | undefined>(undefined);
