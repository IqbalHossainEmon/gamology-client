import { useState } from 'react';
import styles from './EditGames.module.css';

const EditGames = () => {
    const [AddGameDetails, setAddGameDetails] = useState({});

    return (
        <div className={styles.editGames}>
            <p>Edit Games</p>
        </div>
    );
};
export default EditGames;
