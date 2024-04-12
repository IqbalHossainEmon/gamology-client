import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import SelectionField from '../../../../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import AddTagsUnderCategory from '../Components/AddTagsUnderCategory/AddTagsUnderCategory';
import SelectionFieldWithErrorMessage from '../Components/SelectionFieldWithErrorMessage/SelectionFieldWithErrorMessage';
import styles from './AddTags.module.css';

const AddTags = ({ tags }) => {
    const [tagOrCategory, setTagOrCategory] = useState(null);
    const [errorChange, setErrorChange] = useState(0);

    const addBtnRef = useRef(null);
    const addInfoRef = useRef({});
    const errorRef = useRef({});

    const handleValidation = () => {
        let isValid = true;
        if (tagOrCategory) {
            if (!addInfoRef.current.tag.name) {
                errorRef.current.tag = 'Please Enter New Tag Name';
                isValid = false;
            } else {
                errorRef.current.tag = '';
            }
            if (!addInfoRef.current.tag.category) {
                errorRef.current.category = 'Please Select Category';
                isValid = false;
            } else {
                errorRef.current.category = '';
            }
        } else {
            if (!addInfoRef.current.category.name) {
                errorRef.current.category = 'Please Enter New Category Name';
                isValid = false;
            } else {
                errorRef.current.category = '';
            }
            if (!addInfoRef.current.category.tags.length) {
                errorRef.current.tags[0] = 'Please Enter At Least One Tag';
                isValid = false;
            } else if (addInfoRef.current.category.tags.length) {
                errorRef.current.tags = [''];
                addInfoRef.current.category.tags.forEach((tag, index) => {
                    if (!tag) {
                        errorRef.current.tags[index] = 'Please Enter Tag Name';
                        isValid = false;
                    }
                });
            } else {
                errorRef.current.tags = [];
            }
        }
        return isValid;
    };

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
                                addInfoRef.current.tag = {
                                    name: addInfoRef.current?.category?.name ? addInfoRef.current.category.name : '',
                                    category: '',
                                };
                                if (addInfoRef.current.category) delete addInfoRef.current.category;
                                errorRef.current = { tag: '', category: '' };
                                break;
                            case 'Category':
                                setTagOrCategory(false);
                                addInfoRef.current.category = {
                                    name: addInfoRef.current?.tag?.name ? addInfoRef.current.tag.name : '',
                                    tags: [''],
                                };
                                if (addInfoRef.current.tag) delete addInfoRef.current.tag;
                                errorRef.current = { category: '', tags: [''] };
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
                            errorMessage={errorRef.current[tagOrCategory ? 'tag' : 'category']}
                            errorChange={errorChange}
                            setState={(val, name) => {
                                addInfoRef.current[name].name = val;
                            }}
                            htmlFor={tagOrCategory ? 'tag-name' : 'category-name'}
                        />
                        {tagOrCategory ? (
                            <SelectionFieldWithErrorMessage
                                htmlFor="category"
                                placeholder="Select Category"
                                list={tags.map(tag => tag.category)}
                                name="category"
                                setState={val => {
                                    addInfoRef.current.tag.category = val;
                                }}
                                errorMessage={errorRef.current.category}
                                errorChange={errorChange}
                            />
                        ) : (
                            <AddTagsUnderCategory
                                errorChange={errorChange}
                                errorMessage={errorRef.current.tags}
                                infoRef={addInfoRef.current.category.tags}
                            />
                        )}
                    </div>
                    <div className={styles.submitBtn}>
                        <button
                            ref={addBtnRef}
                            type="button"
                            onClick={() => {
                                setErrorChange(prev => prev + 1);
                                if (handleValidation()) {
                                    console.log(addInfoRef.current);
                                }
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
