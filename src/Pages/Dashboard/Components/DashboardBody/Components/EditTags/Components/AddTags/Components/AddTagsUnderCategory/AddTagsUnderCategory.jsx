import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import styles from './AddTagsUnderCategory.module.css';

const AddTagsUnderCategory = () => {
    const [numberOfTags, setNumberOfTags] = useState(1);

    const addBtnREf = useRef(null);
    const removeBtnREf = useRef(null);

    return (
        <div className={styles.tagsUnderCategory}>
            <div>
                {[...Array(numberOfTags).keys()].map(key => (
                    <div key={key} className={styles.tagField}>
                        <TextField key={key} field="input" htmlFor={`tagName-${key}`} placeholder="Tag Name" setState={() => {}} />
                    </div>
                ))}
            </div>
            <div className={styles.btnContainer}>
                <div className={styles.addTagBtn}>
                    <button
                        ref={addBtnREf}
                        type="button"
                        onClick={() => {
                            setNumberOfTags(prev => prev + 1);
                        }}
                    >
                        Add More +
                        <ButtonWaterEffect btnRef={addBtnREf} />
                    </button>
                </div>
                <div className={`${styles.removeTagBtn}${numberOfTags === 1 ? ` ${styles.disabled}` : ''}`}>
                    <button
                        ref={removeBtnREf}
                        type="button"
                        disabled={numberOfTags === 1}
                        onClick={() => {
                            setNumberOfTags(prev => {
                                if (prev > 1) {
                                    return prev - 1;
                                }
                                return prev;
                            });
                        }}
                    >
                        Remove One -
                        <ButtonWaterEffect btnRef={removeBtnREf} />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AddTagsUnderCategory;
