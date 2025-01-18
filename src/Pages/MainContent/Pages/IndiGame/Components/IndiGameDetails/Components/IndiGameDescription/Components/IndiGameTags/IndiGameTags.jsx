import styles from './IndiGameTags.module.css';

export default function IndiGameTags({ genes, features }) {
	return (
		<div className={styles.individualGameTags}>
			<div className={styles.individualGameTagGroupContainer}>
				<h5 className={styles.keyName}>Genes</h5>
				<ul className={styles.individualGameTagGroup}>
					{genes.map(gene => (
						<li className={styles.individualGameTag} key={gene}>
							{gene}
						</li>
					))}

					{genes.length === 0 && (
						<li className={[styles.individualGameTag, styles.empty]}>-</li>
					)}
				</ul>
			</div>
			<div className={styles.individualGameTagGroupContainer}>
				<h5 className={styles.keyName}>Features</h5>
				<ul className={styles.individualGameTagGroup}>
					{features.map(feature => (
						<li className={styles.individualGameTag} key={feature}>
							{feature}
						</li>
					))}

					{features.length === 0 && (
						<li className={[styles.individualGameTag, styles.empty]}>-</li>
					)}
				</ul>
			</div>
		</div>
	);
}
