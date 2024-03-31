import TagsContainer from '../Components/TagsContainer/TagsContainer';
import styles from './AddTags.module.css';

const tags = [
    {
        id: 2,
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
        id: 3,
        category: 'Os',
        optionList: [
            { id: 0, tags: 'Windows' },
            { id: 1, tags: 'macOS' },
            { id: 2, tags: 'Linux' },
        ],
    },
    {
        id: 4,
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

const AddTags = () => (
    <div className={styles.addTags}>
        <h2 className={styles.tagsHeader}>Tags</h2>
        <TagsContainer tags={tags} />
    </div>
);
export default AddTags;
