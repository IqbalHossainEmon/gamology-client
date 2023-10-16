import { useEffect, useState } from 'react';
import IndividualGameOrderBy from '../Components/IndividualGameOrderBy/IndividualGameOrderBy';
import IndividualGameReviews from '../Components/IndividualGameReviews/IndividualGameReviews';
import IndividualGameViewMoreButton from '../Components/IndividualGameViewMoreButton/IndividualGameViewMoreButton';
import styles from './IndividualGameShowReview.module.css';

const data = [
  {
    id: 10000,
    user: { name: 'iqbal69', reviews: 6, games: 14 },
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
    date: new Date(),
    feedback: { goodFeedback: 10, totalFeedback: 50 },
  },
  {
    id: 10001,
    user: { name: 'iqbal69', reviews: 3, games: 6 },
    star: 5,
    title: 'Best RPG ever!',
    text: `I have a lot of hours invested on this, on the console, Steam and lastly GoG where i've purchased all the DLCs. It's worth every single penny. But, as an owner of the base game plus all the DLCs it saddens me that we didn't receive a free upgrade to the GOTY Edition.`,
    date: new Date(),
    feedback: { goodFeedback: 10, totalFeedback: 50 },
  },
  {
    id: 10010,
    user: { name: 'iqbal69', reviews: 6, games: 10 },
    star: 4,
    title: 'Best Game Ever Made!',
    text: `I have played a lot of games over the last decade, and I can say without a doubt that Witcher 3 is the best game I have ever played. Everything from the visual design, game world, gameplay mechanics, etc. through to the brilliant story-telling perfectly executed in an open-world setting.
    CD Projekt RED has proven themselves absolute Masters at RPG game building and with this game, they have definitely set a new standard for the genre. A standard that will be very tough to match by any of the big players in the industry.
    I pity anyone who hasn't yet picked up this game and played it, even if RPGs isn't your first choice.
    
    It is well worth the money and I would even pay full price for it again! This game is so good in fact, I want to own 2 copies of it!
    
    Well done, CDPR!!!`,
    date: new Date(),
    feedback: { goodFeedback: 10, totalFeedback: 50 },
  },
  {
    id: 10011,
    user: { name: 'iqbal69', reviews: 2, games: 5 },
    star: 2,
    title: 'An incredible game from incredible devs!',
    text: `Everything about this game feels so incredibly lifelike. This game is what happens when a group of brilliant people come up with a brilliant idea and no corporate fat cats chop that idea down in the name of profit. The characters and locations in this game are so rich in detail that's it's just mind-boggling (the Skellige Isles are so cold, yet the people there feel so warm, and I don't think a game has ever made me feel so in tune with the environment and ambience). I have to be honest, I played my first play through with a pirated copy, especially since there's no multiplayer aspect to the game, however I can't help but utterly respect CD Projekt Red's take on game piracy, DRM, and their undying support of the gaming community in general. Devs shouldn't spurn the community to crack down on pirates, they should make a game worth buying, right? And I've never played a better single-player game in my entire life. Therefore, I will be buying the GOTY edition, right now, legitimately, because it's the least I can do to support an incredible group of game developers who I feel, support me too, and fellow gamers like me. I also have a really solid feeling that i'll be pre-ordering Cyberpunk 2077 too. Thank you CDPR.`,
    date: new Date(),
    feedback: { goodFeedback: 10, totalFeedback: 50 },
  },
];

export default function IndividualGameShowReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(data);
  }, []);

  const handleChange = type => {
    console.log(type);
  };

  return (
    <div className={styles.individualGameShowReview}>
      <IndividualGameOrderBy handleSort={handleChange} />
      <IndividualGameReviews reviews={reviews} />
      <IndividualGameViewMoreButton handleChange={handleChange} />
    </div>
  );
}
