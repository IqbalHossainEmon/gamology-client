import { useEffect, useState } from 'react';
import IndividualGameReviews from '../Components/IndividualGameReviews/IndividualGameReviews';
import styles from './IndividualGameShowReview.module.css';

const data = [
  {
    id: 10000,
    user: { name: 'iqbal69', reviews: 3, games: 50 },
    star: 3,
    title: 'IMPRESSIVE GAME!!',
    text: `I'll admit its a truly and impressive game! EVEN AFTER ALL THOSE RELEASE DATE POSTPONES!
  I don't want to give any spoilers but I will say the customization is very detailed and Gives you many options to choose from. I just hope they Add Extra dlc's sometime in the near future to give us Deeper stories on each character and how they became who they are.
  
  +Graphics are impressive
  +Controls are easy
  +So far no bugs everything has been smooth
  +Character customization
  +Interactive dialogues that give you choices
  +Future expansions!
  
  -Too many postpones
  -I still haven't seen Ciri in here Nor Geralt... Maybe I will see it :P
  
  (Hope everyone enjoys this game as much as I have been!)`,
    date: 'Sun Sep 03 2023 21:28:20 GMT+0600 (Bangladesh Standard Time)',
  },
  {
    id: 10001,
    user: { name: 'iqbal69', reviews: 3, games: 50 },
    star: 5,
    title: 'IMPRESSIVE GAME!!',
    text: `I'll admit its a truly and impressive game! EVEN AFTER ALL THOSE RELEASE DATE POSTPONES!
  I don't want to give any spoilers but I will say the customization is very detailed and Gives you many options to choose from. I just hope they Add Extra dlc's sometime in the near future to give us Deeper stories on each character and how they became who they are.
  
  +Graphics are impressive
  +Controls are easy
  +So far no bugs everything has been smooth
  +Character customization
  +Interactive dialogues that give you choices
  +Future expansions!
  
  -Too many postpones
  -I still haven't seen Ciri in here Nor Geralt... Maybe I will see it :P
  
  (Hope everyone enjoys this game as much as I have been!)`,
  },
  {
    id: 10010,
    user: { name: 'iqbal69', reviews: 3, games: 50 },
    star: 4,
    title: 'IMPRESSIVE GAME!!',
    text: `I'll admit its a truly and impressive game! EVEN AFTER ALL THOSE RELEASE DATE POSTPONES!
  I don't want to give any spoilers but I will say the customization is very detailed and Gives you many options to choose from. I just hope they Add Extra dlc's sometime in the near future to give us Deeper stories on each character and how they became who they are.
  
  +Graphics are impressive
  +Controls are easy
  +So far no bugs everything has been smooth
  +Character customization
  +Interactive dialogues that give you choices
  +Future expansions!
  
  -Too many postpones
  -I still haven't seen Ciri in here Nor Geralt... Maybe I will see it :P
  
  (Hope everyone enjoys this game as much as I have been!)`,
  },
  {
    id: 10011,
    user: { name: 'iqbal69', reviews: 3, games: 50 },
    star: 2,
    title: 'IMPRESSIVE GAME!!',
    text: `I'll admit its a truly and impressive game! EVEN AFTER ALL THOSE RELEASE DATE POSTPONES!
  I don't want to give any spoilers but I will say the customization is very detailed and Gives you many options to choose from. I just hope they Add Extra dlc's sometime in the near future to give us Deeper stories on each character and how they became who they are.
  
  +Graphics are impressive
  +Controls are easy
  +So far no bugs everything has been smooth
  +Character customization
  +Interactive dialogues that give you choices
  +Future expansions!
  
  -Too many postpones
  -I still haven't seen Ciri in here Nor Geralt... Maybe I will see it :P
  
  (Hope everyone enjoys this game as much as I have been!)`,
  },
];

export default function IndividualGameShowReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(data);
  }, []);

  return (
    <div className={styles.individualGameShowReview}>
      <IndividualGameReviews reviews={reviews} />
    </div>
  );
}
