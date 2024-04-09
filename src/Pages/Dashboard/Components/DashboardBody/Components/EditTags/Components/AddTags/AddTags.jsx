import { useState } from 'react';
import SelectionField from '../../../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../../../Shared/TextField/TextField';
import styles from './AddTags.module.css';

const AddTags = ({ tags }) => {
    const [tagOrCategory, setTagOrCategory] = useState(true);

    return (
        <div className={styles.addTags}>
            <h3 className={styles.addHeader}>Add {tagOrCategory ? 'Tag' : 'Category'}</h3>
            <TextField field="input" placeholder={`Enter New ${tagOrCategory ? 'Tag' : 'Category'} Name`} setState={() => {}} />
            <div className={styles.selectionFieldContainer}>
                <div className={styles.selectionField}>
                    <SelectionField
                        name="Add What"
                        placeholder="Add What?"
                        list={['Tags', 'Category']}
                        defaultValue="Tags"
                        setState={val => {
                            switch (val) {
                                case 'Tags':
                                    setTagOrCategory(true);
                                    break;
                                default:
                                    setTagOrCategory(false);
                                    break;
                            }
                        }}
                    />
                </div>
                {tagOrCategory && (
                    <div className={styles.selectionField}>
                        <SelectionField name="Which Category" placeholder="Which Category?" list={tags.map(tag => tag.category)} />
                    </div>
                )}
            </div>
        </div>
    );
};
export default AddTags;
