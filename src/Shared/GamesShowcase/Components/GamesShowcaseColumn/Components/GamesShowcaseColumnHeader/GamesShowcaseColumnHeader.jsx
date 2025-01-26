import TextField from '../../../../../TextField/TextField/TextField';
import styles from './GamesShowcaseColumnHeader.module.css';

export default function GamesShowcaseColumnHeader({ headerTitle }) {
	return headerTitle ? (
		<h4 className={styles.gamesShowcaseColumnHeader}>
			{headerTitle}
			<span className={styles.arrow}>
				<svg className='svg css-uwwqev' viewBox='0 0 5 9'>
					<path d='M1 1l3 3.5L1 8' fill='none' fillRule='evenodd' stroke='currentColor' />
				</svg>
			</span>
		</h4>
	) : (
		<TextField field='input' placeholder='Enter the Header Title' />
	);
}
