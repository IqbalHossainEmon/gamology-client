import OuterOptions from '../Components/OuterOptions/OuterOptions';
import styles from './Drawer.module.css';

const drawers = [
  { id: '000', name: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
  {
    id: '0001',
    name: 'Games',
    icon: 'games',
    link: '/games',
    subDrawer: [
      { id: '01', name: 'Add Game', icon: 'add', link: '/games/add' },
      { id: '02', name: 'All Games', icon: 'all', link: '/games/all' },
    ],
  },
  { id: '0002', name: 'Users', icon: 'user', link: '/users' },
  { id: '0003', name: 'Game Tags', icon: 'tag', link: '/tags' },
  { id: '0004', name: 'Admins', icon: 'admin', link: '/admins' },
  { id: '0005', name: 'Orders', icon: 'order', link: '/orders' },
];
const Drawer = () => (
  <div className={styles.drawer}>
    <ul className={styles.outerOptionContainer}>
      {drawers.map(drawer => (
        <OuterOptions key={drawer.id} option={drawer} />
      ))}
    </ul>
  </div>
);
export default Drawer;
