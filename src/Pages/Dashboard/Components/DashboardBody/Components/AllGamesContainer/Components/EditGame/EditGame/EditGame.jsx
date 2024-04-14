import { useState } from 'react';
import styles from './EditGame.module.css';

const EditGame = () => {
    const [AddGameDetails, setAddGameDetails] = useState({});

    return (
        <div className={styles.editGames}>
            <p>Edit Games</p>
        </div>
    );
};
export default EditGame;
