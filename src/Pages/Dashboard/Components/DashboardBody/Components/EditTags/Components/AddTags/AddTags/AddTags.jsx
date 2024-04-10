import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import SelectionField from '../../../../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import AddTagsUnderCategory from '../Components/AddTagsUnderCategory/AddTagsUnderCategory';
import styles from './AddTags.module.css';

const AddTags = ({ tags }) => {
    const [tagOrCategory, setTagOrCategory] = useState(null);

    const addBtnREf = useRef(null);
    const addInfoRef = useRef(null);

    return (
        <div className={styles.addTags}>
            <h3 className={styles.addHeader}>Add {tagOrCategory ? 'Tag' : 'Category'}</h3>
            <div className={styles.selectionFieldContainer}>
                <div className={styles.selectionField}>
                    <SelectionField
                        name="Add What"
                        none
                        htmlFor="add-what"
                        placeholder="Add What?"
                        list={['Tags', 'Category']}
                        setState={val => {
                            switch (val) {
                                case 'Tags':
                                    setTagOrCategory(true);
                                    break;
                                case 'Category':
                                    setTagOrCategory(false);
                                    break;
                                default:
                                    setTagOrCategory(null);
                                    break;
                            }
                        }}
                    />
                </div>
                {tagOrCategory !== null && (
                    <>
                        <TextField
                            field="input"
                            placeholder={`Enter New ${tagOrCategory ? 'Tag' : 'Category'} Name`}
                            setState={() => {}}
                            htmlFor={tagOrCategory ? 'tag-name' : 'category-name'}
                        />
                        {tagOrCategory ? (
                            <div className={styles.selectionField}>
                                <SelectionField
                                    name="Which Category"
                                    htmlFor="which-category"
                                    placeholder="Which Category?"
                                    list={tags.map(tag => tag.category)}
                                />
                            </div>
                        ) : (
                            <AddTagsUnderCategory />
                        )}
                    </>
                )}
            </div>
            <div className={styles.submitBtn}>
                <button ref={addBtnREf} type="button" onClick={() => {}}>
                    Submit
                    <ButtonWaterEffect btnRef={addBtnREf} />
                </button>
            </div>
        </div>
    );
};
export default AddTags;
