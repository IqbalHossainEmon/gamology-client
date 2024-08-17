import useDashboardModalHook from '../../../../../../useDashboardModalHook/useDashboardModalHook';
import TagOrCategoryDeleteBody from '../TagOrCategoryDeleteBody/TagOrCategoryDeleteBody';
import styles from './TagsContainer.module.css';

const TagsContainer = ({ tag, setTags }) => {
	const { setDashboardContent, setDashboardModal } = useDashboardModalHook();

	const categoryDeleteHandler = () => {
		console.log(tag.category, 'Category Deleted');
		const checkTags = true;
		if (checkTags) {
			setTags(prevTags => prevTags.filter(prevTag => prevTag.category !== tag.category));
		}
	};

	const handleCategoryDelete = () => {
		setDashboardModal(true);
		setDashboardContent({
			modalTitle: 'Delete Category',
			modalBody: (
				<>
					Are you sure you want to delete{' '}
					<strong className={styles.categoryText}>{tag.category}</strong> category?
				</>
			),
			modalFooter: (
				<TagOrCategoryDeleteBody
					handleHide={() => setDashboardModal(false)}
					text={
						<>
							All tags under{' '}
							<strong className={styles.categoryText}>{tag.category}</strong> category
							will be deleted. All Games that has tags under the{' '}
							<strong className={styles.categoryText}>{tag.category}</strong> category
							will be effected.
						</>
					}
					handler={categoryDeleteHandler}
				/>
			),
		});
	};

	const tagDeleteHandler = data => {
		console.log(data, 'Tag Deleted');

		// send request to backend to delete tag than delete tag from frontend

		const checkTags = true;
		if (checkTags) {
			setTags(prevTags =>
				prevTags.map(prevTag => {
					if (prevTag.category === tag.category) {
						return {
							...prevTag,
							optionList: prevTag.optionList.filter(option => option.filter !== data),
						};
					}
					return prevTag;
				})
			);
		}
	};

	const handleTagDelete = (text, data) => {
		setDashboardModal(true);
		setDashboardContent({
			modalTitle: 'Delete Tag',
			modalBody: (
				<>
					Are you sure you want to delete{' '}
					<strong className={styles.categoryText}>{text}</strong> Tag?
				</>
			),
			modalFooter: (
				<TagOrCategoryDeleteBody
					handleHide={() => setDashboardModal(false)}
					text={
						<>
							All Games that has{' '}
							<strong className={styles.categoryText}>{text}</strong> tag will be
							effected.
						</>
					}
					handler={() => tagDeleteHandler(data)}
				/>
			),
		});
	};

	return (
		<div className={styles.tag}>
			<div className={styles.tagHeader}>
				<h3>{tag.category}</h3>
				<button type='button' className={styles.crossBtn} onClick={handleCategoryDelete}>
					<strong className={styles.cross} />
				</button>
			</div>
			<ul className={styles.tagList}>
				{tag.optionList.map(option => (
					<li key={option.id} className={styles.tagListItem}>
						<p className={styles.tagItem}>{option.text}</p>
						<button
							type='button'
							className={styles.crossBtn}
							onClick={() => handleTagDelete(option.text, option.filter)}
						>
							<strong className={styles.cross} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
export default TagsContainer;
