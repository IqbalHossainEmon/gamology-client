import { useRef } from 'react';
import useModal from '../../../../../../../../../Utils/Hooks/useModal';
import useToast from '../../../../../../../../../Utils/Hooks/useToast';
import TagOrCategoryDeleteBody from '../Components/TagsContainer/TagOrCategoryDeleteBody/TagOrCategoryDeleteBody';
import TagsContainer from '../Components/TagsContainer/TagsContainer/TagsContainer';
import styles from './ShowCategoriesTags.module.css';

function ShowCategoriesTags({ categories, setCategories }) {
	const eventRefs = useRef(null);

	const { hideModal, setContent } = useModal();
	const { setToast } = useToast();

	if (!eventRefs.current) {
		eventRefs.current = {
			// This function is used to delete the category first request to backend to delete category than delete category from frontend
			categoryDeleteHandler: category => {
				console.log(category, 'Category Deleted');
				const checkTags = true;
				if (checkTags) {
					// if category is deleted successfully than show toast message and delete category from frontend
					setToast({
						title: 'Category Deleted',
						message: `${category} category has been deleted.`,
						type: 'success',
					});
					setCategories(prev => prev.filter(prevTag => prevTag.category !== category));
				}
			},
			// This function is used to show modal to confirm the category deletion
			handleCategoryDelete: category => {
				setContent({
					title: 'Delete Category',
					body: (
						<p>
							Are you sure you want to delete{' '}
							<strong className={styles.categoryText}>{category}</strong> category?
						</p>
					),
					footer: (
						<TagOrCategoryDeleteBody
							handleHide={hideModal}
							handler={() => eventRefs.current.categoryDeleteHandler(category)}
							text={
								<p>
									All tags under{' '}
									<strong className={styles.categoryText}>{category}</strong>{' '}
									category will be deleted. All Games that has tags under the{' '}
									<strong className={styles.categoryText}>{category}</strong>{' '}
									category will be effected.
								</p>
							}
						/>
					),
				});
			},
		};
	}

	return (
		<div className={styles.showCategory}>
			{categories.map(category => (
				<div key={category.category} className={styles.category}>
					<div className={styles.categoryHeader}>
						<h3>{category.category}</h3>
						<button
							className={styles.crossBtn}
							onClick={() =>
								eventRefs.current.handleCategoryDelete(category.category)
							}
							type='button'
						>
							<strong className={styles.cross} />
						</button>
					</div>
					<TagsContainer setTags={setCategories} tags={category.tags} />
				</div>
			))}
		</div>
	);
}
export default ShowCategoriesTags;
