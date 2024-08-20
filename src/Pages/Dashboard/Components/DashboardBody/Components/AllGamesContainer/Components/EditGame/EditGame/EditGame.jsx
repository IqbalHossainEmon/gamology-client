import { useEffect, useRef, useState } from 'react';
import GameInfoField from '../../../../GameInfoField/GameInfoField/GameInfoField';
import styles from './EditGame.module.css';

function EditGame() {
    const [AddGameDetails, setAddGameDetails] = useState({}),

     mainDefaultData = useRef(data);

    useEffect(() => {
        setTimeout(() => {
            const defaultData = JSON.parse(JSON.stringify(data));

            defaultData.gameSpecifications.spec.forEach((spec, index) => {
                defaultData.gameSpecifications.spec[index].isActive = true;
            });
            setAddGameDetails(defaultData);
        }, 10);
    }, []);

    const handleSubmit = newData => {
        console.log(newData);
        if (JSON.stringify(mainDefaultData.current) !== JSON.stringify(newData)) {
            console.log(newData);
            return '';
        }
        return 'No changes made.';
    };

    return (
        <div className={styles.editGames}>
            <div className={styles.backBtnContainer}>
                <button
                    className={styles.backBtn}
                    onClick={() => console.log('Back')}
                    type="button"
                >
                    <svg
                        id="arrow-circle-down"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Z" />

                        <path d="M17.5,11.5H7.096c.063-.177,.155-.345,.287-.493,.266-.301,.527-.587,.717-.777l2.828-2.879c.194-.197,.191-.514-.006-.708-.198-.193-.515-.191-.707,.006l-2.825,2.876c-.198,.198-.475,.5-.756,.818-.837,.944-.837,2.368,0,3.312,.282,.318,.559,.621,.753,.815l2.828,2.879c.098,.1,.227,.149,.356,.149,.126,0,.253-.048,.351-.143,.197-.194,.2-.51,.006-.708l-2.831-2.882c-.187-.187-.448-.473-.715-.774-.131-.148-.224-.316-.286-.493h10.404c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z" />
                    </svg>
                </button>
            </div>

            <GameInfoField
                defaultData={AddGameDetails}
                handleGameInfo={handleSubmit}
                hasDefault
            />
        </div>
    );
}
export default EditGame;
