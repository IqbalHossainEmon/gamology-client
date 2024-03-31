import styles from './SingleTag.module.css';

const SingleTag = ({ tags }) => (
    <li className={styles.tagListItem}>
        <p>
            {tags} <span className="crossBtn" />
        </p>
    </li>
);
export default SingleTag;
