import { useEffect, useState } from 'react';
import AddTags from '../Components/AddTags/AddTags/AddTags';
import ShowCategoryTags from '../Components/ShowTags/ShowCategoryTags/ShowCategoryTags';
import styles from './EditTags.module.css';

const data = [
    {
        id: 0,
        category: 'Genre',
        optionList: [
            { id: 0, tags: 'Action' },
            { id: 1, tags: 'Adventure' },
            { id: 2, tags: 'Racing' },
            { id: 3, tags: 'Shooter' },
            { id: 4, tags: 'Role-playing' },
            { id: 5, tags: 'Sports' },
            { id: 6, tags: 'Strategy' },
            { id: 7, tags: 'Simulation' },
        ],
    },
    {
        id: 1,
        category: 'Os',
        optionList: [
            { id: 0, tags: 'Windows' },
            { id: 1, tags: 'macOS' },
            { id: 2, tags: 'Linux' },
        ],
    },
    {
        id: 2,
        category: 'Features',
        optionList: [
            { id: 0, tags: 'Single-player' },
            { id: 1, tags: 'Multi-player' },
            { id: 2, tags: 'Co-op' },
            { id: 3, tags: 'Achievements' },
            { id: 4, tags: 'Leader Boards' },
            {
                id: 5,
                tags: 'Controller support',
            },
            { id: 6, tags: 'Cloud saves' },
            { id: 7, tags: 'Overlay' },
        ],
    },
];

const EditTags = ({ setModal }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setTags(data);
    }, []);

    return (
        <div className={styles.addTags}>
            <h2 className={styles.tagsHeader}>Tags</h2>
            <ShowCategoryTags setTags={setTags} tags={tags} setModal={setModal} />
            <AddTags tags={tags} setTags={setTags} />
        </div>
    );
};
export default EditTags;
