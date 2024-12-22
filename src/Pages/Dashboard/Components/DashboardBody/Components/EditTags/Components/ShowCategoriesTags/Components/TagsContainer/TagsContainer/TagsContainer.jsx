import { useRef } from 'react';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import useToast from '../../../../../../../../../../../Utils/Hooks/useToast';
import TagOrCategoryDeleteBody from '../TagOrCategoryDeleteBody/TagOrCategoryDeleteBody';
import styles from './TagsContainer.module.css';

function TagsContainer({ tags, setTags }) {
	const setModal = useModal();

	const eventRefs = useRef(null);

	const { setToast } = useToast();

	const { cloneObject } = useObjectUtilities();

	if (!eventRefs.current) {
		eventRefs.current = {
			// This function is used to delete the tag first request to backend to delete tag than delete tag from frontend
			tagDeleteHandler: data => {
				console.log(data, 'Tag Deleted');
				// Send request to backend to delete tag than delete tag from frontend
				const checkTags = true;
				if (checkTags) {
					// if tag is deleted successfully than show toast message and delete tag from frontend
					setToast({
						title: 'Tag Deleted',
						message: `${data} tag has been deleted.`,
						type: 'success',
					});
					setTags(prevCategories =>
						prevCategories.map(prevCategory => {
							if (prevCategory.tags.includes(data)) {
								const newCategory = cloneObject(prevCategory);
								newCategory.tags = newCategory.tags.filter(tag => tag !== data);
								return newCategory;
							}
							return prevCategory;
						})
					);
				}
			},
			// This function is used to show modal to confirm the tag deletion
			handleTagDelete: text => {
				setModal({
					title: 'Delete Tag',
					body: (
						<>
							Are you sure you want to delete{' '}
							<strong className={styles.categoryText}>{text}</strong> Tag?
						</>
					),
					footer: (
						<TagOrCategoryDeleteBody
							handleHide={() =>
								setModal({
									title: null,
									body: null,
									footer: null,
								})
							}
							handler={() => eventRefs.current.tagDeleteHandler(text)}
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
		<ul className={styles.tags}>
			{tags.map(tag => (
				<li className={styles.tag} key={tag}>
					<p className={styles.tagName}>{tag}</p>
					<button
						className={styles.crossBtn}
						onClick={() => eventRefs.current.handleTagDelete(tag)}
						type='button'
					>
						<strong className={styles.cross} />
					</button>
				</li>
			))}
		</ul>
	);
}
export default TagsContainer;
