import styles from './ChangeEventButtons.module.css';

const Buttons = [0, 1, 2];

export default function ChangeEventButtons({ setCardPosition, cardPosition }) {
    return (
        <div className={styles.ChangeEventButtons}>
            <div>
                {Buttons.map(Button => (
                    <button
                        key={Button}
                        {...(cardPosition === Button && { id: styles.active })}
                        type="button"
                        onClick={() => setCardPosition(Button)}
                        className={[styles.button1, styles.button].join(' ')}
                    />
                ))}
            </div>
        </div>
    );
}
