import styles from './SingleTag.module.css';

const SingleTag = ({ tags }) => (
    <li className={styles.tagListItem}>
        <p>
            {tags}
            <button type="button" className="crossBtn">
                <span />
            </button>
        </p>
    </li>
);
export default SingleTag;
