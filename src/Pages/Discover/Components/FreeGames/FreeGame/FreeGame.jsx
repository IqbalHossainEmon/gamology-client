import styles from './FreeGame.module.css';

export default function FreeGame({ data, today }) {
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
  }
  let dateState;
  const todayDate = new Date(`${today[2]}-${today[1]}-${today[0]}`);
  const firstDay = new Date(`${data.saleTill[0][2]}-${data.saleTill[0][1]}-${data.saleTill[0][0]}`);
  const lastDay = new Date(`${data.saleTill[1][2]}-${data.saleTill[1][1]}-${data.saleTill[1][0]}`);
  if (todayDate < firstDay) {
    dateState = 0;
  } else if (todayDate >= firstDay && todayDate < lastDay) {
    dateState = 1;
  } else if (todayDate > lastDay) {
    dateState = -1;
  }

  return (
    <div>
      <div className={styles.gameHeader}>
        <img src={data.coverMobile} alt="" />
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
      <p>{data.name}</p>
      <div className={styles.date}>
        <p>{`${getMonthName(data.saleTill[0][1]).slice(0, 3)} ${
          data.saleTill[0][0]
        } - ${getMonthName(data.saleTill[1][1]).slice(0, 3)} ${data.saleTill[1][0]}`}</p>
      </div>
    </div>
  );
}
