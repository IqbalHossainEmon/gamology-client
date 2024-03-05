import DrawerOptions from '../Components/DrawerOptions/DrawerOptions';
import styles from './Drawer.module.css';

const drawers = [
  { id: '000', name: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
  {
    id: '0001',
    name: 'Games',
    icon: 'game',
    subDrawer: [
      { id: '01', name: 'All Games', link: '/games/all' },
      { id: '02', name: 'Add Game', link: '/games/add' },
    ],
  },
  { id: '0002', name: 'Users', icon: 'user', link: '/users' },
  { id: '0003', name: 'Game Tags', icon: 'tag', link: '/tags' },
  { id: '0004', name: 'Admins', icon: 'admin', link: '/admins' },
  {
    id: '0005',
    name: 'Events',
    icon: 'event',
    subDrawer: [
      { id: '01', name: 'Slider', link: '/games/all' },
      { id: '02', name: 'Game on sale', link: '/games/add' },
      { id: '03', name: 'Free Games', link: '/games/add' },
    ],
  },
  { id: '0006', name: 'Orders', icon: 'order', link: '/orders' },
];
const Drawer = () => (
  <div className={styles.drawer}>
    <ul className={styles.optionContainer}>
      {drawers.map(drawer => (
        <DrawerOptions key={drawer.id} option={drawer} />
      ))}
    </ul>
  </div>
);
export default Drawer;
