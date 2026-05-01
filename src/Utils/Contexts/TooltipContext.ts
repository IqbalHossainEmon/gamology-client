import { createContext } from 'react';
import type { TooltipInteractionHandlers } from '../HOC/withTooltip';

const SetTooltipContext = createContext<TooltipInteractionHandlers | undefined>(undefined);

export default SetTooltipContext;
