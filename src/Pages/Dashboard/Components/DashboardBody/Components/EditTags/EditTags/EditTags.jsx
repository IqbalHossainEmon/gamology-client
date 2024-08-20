import { useEffect, useState } from 'react';
import AddTags from '../Components/AddTags/AddTags/AddTags';
import ShowCategoryTags from '../Components/ShowTags/ShowCategoryTags/ShowCategoryTags';
import styles from './EditTags.module.css';

function EditTags() {
	const [tags, setTags] = useState([]);

	useEffect(() => {
		setTags(data);
	}, []);

	return (
    <div className={styles.addTags}>
        <h2 className={styles.tagsHeader}>
            Tags
        </h2>

        <ShowCategoryTags
            setTags={setTags}
            tags={tags}
        />

        <AddTags
            setTags={setTags}
            tags={tags}
        />
    </div>
	);
}
export default EditTags;
