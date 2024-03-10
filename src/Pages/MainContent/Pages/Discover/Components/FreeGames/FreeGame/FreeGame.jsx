import { useEffect, useState } from 'react';
import useScreenWidth from '../../../../../../../Hooks/useScreenWidth';
import styles from './FreeGame.module.css';

export default function FreeGame({ data, today, length }) {
  const [dateState, setDateState] = useState(-1);
  const screenWidth = useScreenWidth();

  const [gameWidth, setGameWidth] = useState({ width: `${100 / length}%` });

  // get the month name depending on given time
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
  }

  // sets cards width depending on screen width
  useEffect(() => {
    if (screenWidth >= 768) {
      setGameWidth({ width: `${100 / length - length + 2}%` });
    } else if (length % 2 === 0) {
      setGameWidth({ width: '46%' });
    } else {
      setGameWidth({ width: '100%' });
    }
  }, [screenWidth, length]);

  // Finding todays date and comparing the upcoming / expire date and setting styles
  useEffect(() => {
    const todayDate = new Date(`${today[2]}-${today[1]}-${today[0]}`);
    const firstDay = new Date(`${data.saleTill[0][2]}-${data.saleTill[0][1]}-${data.saleTill[0][0]}`);
    const lastDay = new Date(`${data.saleTill[1][2]}-${data.saleTill[1][1]}-${data.saleTill[1][0]}`);
    if (todayDate < firstDay) {
      setDateState(0);
    } else if (todayDate >= firstDay && todayDate < lastDay) {
      setDateState(1);
    } else if (todayDate > lastDay) {
      setDateState(-1);
    }
  }, [today, data.saleTill]);

  return (
    dateState !== -1 && (
      <div className={[styles.freeGame, 'hover-shadow'].join(' ')} style={gameWidth}>
        <div className={styles.gameHeader}>
          <img style={{ aspectRatio: `1/1.${length}` }} src={data.carouselThumb} alt="" />
          {dateState !== -1 && (
            <p className={dateState === 1 ? [styles.common, styles.freeNow].join(' ') : [styles.common, styles.coming].join(' ')}>
              {dateState === 1 ? 'FREE GAME' : 'COMMING SOON'}
            </p>
          )}
        </div>
        <div className={styles.gameDetail}>
          <p className={styles.name}>{data.name}</p>
          <div className={styles.date}>
            <p>{`${getMonthName(data.saleTill[0][1]).slice(0, 3)} ${
              data.saleTill[0][0]
            } - ${getMonthName(data.saleTill[1][1]).slice(0, 3)} ${data.saleTill[1][0]}`}</p>
          </div>
        </div>
      </div>
    )
  );
}
