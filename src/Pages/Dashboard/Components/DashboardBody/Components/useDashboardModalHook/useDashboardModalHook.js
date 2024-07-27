import { useContext } from 'react';
import {
    DashboardBodyModalContextSetContent,
    DashboardBodyModalContextSetShow,
} from '../../../../../../Contexts/DashboardBodyModalContext';

export const useDashboardBodySetContent = () => useContext(DashboardBodyModalContextSetContent);
export const useDashboardBodySetModal = () => useContext(DashboardBodyModalContextSetShow);
