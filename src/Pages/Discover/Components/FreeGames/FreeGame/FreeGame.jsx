import { useEffect, useState } from 'react';
import styles from './FreeGame.module.css';

export default function FreeGame({ data, today, length, screenWidth }) {
  const [dateState, setDateState] = useState(-1);
  const [gameStyle, setGameStyle] = useState({ width: `calc((75vw - 4rem)/${length})` });
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
  }
  useEffect(() => {
    if (screenWidth >= 2134) {
      setGameStyle({ width: `calc((1600px - 4rem - (${length - 1} * 0.5rem))/${length})` });
    } else if (screenWidth < 2134 && screenWidth > 1023) {
      setGameStyle({ width: `calc((75vw - 4rem - (${length - 1} * 0.5rem))/${length})` });
    } else if (screenWidth <= 1023 && screenWidth > 767) {
      setGameStyle({ width: `calc((97vw - 2rem - (${length - 1} * 0.5rem))/${length})` });
    } else if (length % 2 === 0) {
      setGameStyle({ width: `calc((97vw - 2rem - (${length - 1} * 0.5rem))/2)` });
    } else {
      setGameStyle({ width: `calc((97vw - 2rem - (${length - 1} * 0.5rem))/1)` });
    }
  }, [screenWidth, length]);

  useEffect(() => {
    const todayDate = new Date(`${today[2]}-${today[1]}-${today[0]}`);
    const firstDay = new Date(
      `${data.saleTill[0][2]}-${data.saleTill[0][1]}-${data.saleTill[0][0]}`
    );
    const lastDay = new Date(
      `${data.saleTill[1][2]}-${data.saleTill[1][1]}-${data.saleTill[1][0]}`
    );
    if (todayDate < firstDay) {
      setDateState(0);
    } else if (todayDate >= firstDay && todayDate < lastDay) {
      setDateState(1);
    } else if (todayDate > lastDay) {
      setDateState(-1);
    }
  }, [today, data.saleTill]);

  return (
    <div className={styles.freeGame} style={gameStyle}>
      <div className={styles.gameHeader}>
        <img style={{ aspectRatio: `1/1.${length}` }} src={data.carouselThumb} alt="" />
        {dateState !== -1 && (
          <p
            className={
              dateState === 1
                ? [styles.common, styles.freeNow].join(' ')
                : [styles.common, styles.comming].join(' ')
            }
          >
            {dateState === 1 ? 'FREE GAME' : 'COMMING SOON'}
          </p>
        )}
      </div>
      <div className={styles.gameDetail}>
        <p>{data.name}</p>
        <div className={styles.date}>
          <p>{`${getMonthName(data.saleTill[0][1]).slice(0, 3)} ${
            data.saleTill[0][0]
          } - ${getMonthName(data.saleTill[1][1]).slice(0, 3)} ${data.saleTill[1][0]}`}</p>
        </div>
      </div>
    </div>
  );
}
