import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import SearchField from '../../SearchField/SearchField';
import SecondNavLeftLinks from '../Components/SecondNavLeftLinks/SecondNavLeftLinks';
import SecondNavRightLinks from '../Components/SecondNavRightLinks/SecondNavRightLinks';
import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
	const screenWidth = useScreenWidth();

	return (
		<section className={styles.SecondNavContainer}>
			<div className={styles.SecondNavbar}>
				<SearchField />
				<SecondNavLeftLinks screenWidth={screenWidth} />
				<SecondNavRightLinks screenWidth={screenWidth} />
			</div>
		</section>
	);
}
