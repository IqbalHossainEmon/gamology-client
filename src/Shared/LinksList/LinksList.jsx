import useScreenWidth from '../../Hooks/useScreenWidth';

export default function LinksList({ styles, links, onclick, active }) {
	const { screenWidth } = useScreenWidth();
	return links.map(link => (
		<li
			className={styles.navOption}
			key={link.no}
			{...(link.no === active && { id: styles.active })}
		>
			<a
				{...(onclick && screenWidth <= 768 && { onClick: () => onclick(link.no) })}
				href={link.URL}
			>
				{link.name}
			</a>
		</li>
	));
}
