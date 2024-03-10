import { useEffect, useRef, useState } from 'react';
import LinksList from '../../../LinksList/LinksList';
import styles from './SecondNavDesktopLinks.module.css';

const links = [
  {
    no: 0,
    name: 'Discover',
    URL: '#discover',
  },
  { no: 1, name: 'Browse', URL: '#browse' },
  { no: 2, name: 'News', URL: '#news' },
];

export default function SecondNavDesktopLinks({ navMidShow, id, setNavTextState }) {
  const [style, setStyle] = useState({});
  const sliderElementRef = useRef();

  useEffect(() => {
    if (sliderElementRef) {
      setStyle({ bottom: `${sliderElementRef.current?.offsetHeight}px` });
    }
  }, [sliderElementRef]);

  return (
    <ul ref={sliderElementRef} {...(!navMidShow && { style })} className={styles.SecondNavLinks} id={styles[id]}>
      <LinksList active={3} styles={styles} links={links} onclick={setNavTextState} />
    </ul>
  );
}
