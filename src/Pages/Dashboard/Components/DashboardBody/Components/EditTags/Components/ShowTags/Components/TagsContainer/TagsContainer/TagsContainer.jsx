import { useRef } from 'react';
import useDashboardModalHook from '../../../../../../useDashboardModalHook/useDashboardModalHook';
import TagOrCategoryDeleteBody from '../TagOrCategoryDeleteBody/TagOrCategoryDeleteBody';
import styles from './TagsContainer.module.css';

function TagsContainer({ tag, setTags }) {
	const { setDashboardContent, setDashboardModal } = useDashboardModalHook();

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			categoryDeleteHandler: () => {
				console.log(tag.category, 'Category Deleted');
				const checkTags = true;
				if (checkTags) {
					setTags(prevTags =>
						prevTags.filter(prevTag => prevTag.category !== tag.category)
					);
				}
			},
			handleCategoryDelete: () => {
				setDashboardModal(true);
				setDashboardContent({
					modalTitle: 'Delete Category',
					modalBody: (
						<>
							Are you sure you want to delete{' '}
							<strong className={styles.categoryText}>{tag.category}</strong>{' '}
							category?
						</>
					),
					modalFooter: (
						<TagOrCategoryDeleteBody
							handleHide={() => setDashboardModal(false)}
							handler={eventRefs.current.categoryDeleteHandler}
							text={
								<>
									All tags under{' '}
									<strong className={styles.categoryText}>{tag.category}</strong>{' '}
									category will be deleted. All Games that has tags under the{' '}
									<strong className={styles.categoryText}>{tag.category}</strong>{' '}
									category will be effected.
								</>
							}
						/>
					),
				});
			},
			tagDeleteHandler: data => {
				console.log(data, 'Tag Deleted');

				// Send request to backend to delete tag than delete tag from frontend
				const checkTags = true;
				if (checkTags) {
					setTags(prevTags =>
						prevTags.map(prevTag => {
							if (prevTag.category === tag.category) {
								return {
									...prevTag,
									optionList: prevTag.optionList.filter(
										option => option.filter !== data
									),
								};
							}
							return prevTag;
						})
					);
				}
			},
			handleTagDelete: (text, data) => {
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
							handler={() => eventRefs.current.tagDeleteHandler(data)}
							text={
								<>
									All Games that has{' '}
									<strong className={styles.categoryText}>{text}</strong> tag will
									be effected.
								</>
							}
						/>
					),
				});
			},
		};
	}
	return (
		<div className={styles.tag}>
			<div className={styles.tagHeader}>
				<h3>{tag.category}</h3>
				<button
					className={styles.crossBtn}
					onClick={eventRefs.current.handleCategoryDelete}
					type="button"
				>
					<strong className={styles.cross} />
				</button>
			</div>
			<ul className={styles.tagList}>
				{tag.optionList.map(option => (
					<li className={styles.tagListItem} key={option.id}>
						<p className={styles.tagItem}>{option.text}</p>
						<button
							className={styles.crossBtn}
							onClick={() =>
								eventRefs.current.handleTagDelete(option.text, option.filter)
							}
							type="button"
						>
							<strong className={styles.cross} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
export default TagsContainer;
