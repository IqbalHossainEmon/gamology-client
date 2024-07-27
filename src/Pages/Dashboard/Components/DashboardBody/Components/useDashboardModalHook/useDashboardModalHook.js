import { useContext } from 'react';
import {
    DashboardBodyModalContextSetContent,
    DashboardBodyModalContextSetShow,
} from '../../../../../../Contexts/DashboardBodyModalContext';

const useDashboardBodySetContent = () => useContext(DashboardBodyModalContextSetContent);
const useDashboardBodySetModal = () => useContext(DashboardBodyModalContextSetShow);

export default () => ({ useDashboardBodySetContent, useDashboardBodySetModal });
