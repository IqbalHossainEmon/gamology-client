import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import SelectionField from '../../../../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import AddTagsUnderCategory from '../Components/AddTagsUnderCategory/AddTagsUnderCategory';
import styles from './AddTags.module.css';

const AddTags = ({ tags }) => {
    const [tagOrCategory, setTagOrCategory] = useState(null);

    const addBtnRef = useRef(null);
    const addInfoRef = useRef({});

    return (
        <div className={styles.addTags}>
            <h3 className={styles.addHeader}>Add {tagOrCategory ? 'Tag' : 'Category'}</h3>
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
                                addInfoRef.current.tag = { name: '', category: '' };
                                break;
                            case 'Category':
                                setTagOrCategory(false);
                                addInfoRef.current.category = { name: '', tags: [] };
                                break;
                            default:
                                setTagOrCategory(null);
                                addInfoRef.current = {};
                                break;
                        }
                    }}
                />
            </div>

            {tagOrCategory !== null && (
                <>
                    <div>
                        <TextField
                            field="input"
                            placeholder={`Enter New ${tagOrCategory ? 'Tag' : 'Category'} Name`}
                            name={tagOrCategory ? 'tag' : 'category'}
                            setState={(val, name) => {
                                addInfoRef.current[name].name = val;
                            }}
                            htmlFor={tagOrCategory ? 'tag-name' : 'category-name'}
                        />
                        {tagOrCategory ? (
                            <div className={styles.selectionField}>
                                <SelectionField
                                    htmlFor="which-category"
                                    placeholder="Which Category?"
                                    list={tags.map(tag => tag.category)}
                                    name="category"
                                    setState={(val, name) => {
                                        addInfoRef.current.tag[name] = val;
                                    }}
                                />
                            </div>
                        ) : (
                            <AddTagsUnderCategory infoRef={addInfoRef.current.category} />
                        )}
                    </div>
                    <div className={styles.submitBtn}>
                        <button
                            ref={addBtnRef}
                            type="button"
                            onClick={() => {
                                console.log(addInfoRef.current);
                            }}
                        >
                            Submit
                            <ButtonWaterEffect btnRef={addBtnRef} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
export default AddTags;
