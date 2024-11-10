import useScreenWidth from '../../Utils/Hooks/useScreenWidth';

export default function LinksList({ styles, links, onclick, active }) {
	const screenWidth = useScreenWidth();
	return links.map(link => (
		<li
			className={`${styles.option}${link.no === active ? ` ${styles.active}` : ''}`}
			key={link.no}
		>
			<a
				{...(onclick && screenWidth <= 768 && { onClick: () => onclick(link.no) })}
				href={link.URL}
				{...(link.no === active && { disabled: true })}
			>
				{link.name}
			</a>
		</li>
	));
}
