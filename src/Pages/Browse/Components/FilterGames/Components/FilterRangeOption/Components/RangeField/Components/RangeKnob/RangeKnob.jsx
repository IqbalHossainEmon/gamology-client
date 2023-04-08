import useSliderRange from '../../../useSliderRangeHook/useSliderRange';
import styles from './RangeKnob.module.css';

function RangeKnob({ state, setState, pathWidth, pathElement, name, steps, limit }) {
  const { onStart } = useSliderRange(
    setState,
    pathWidth,
    pathElement?.offsetLeft,
    name,
    steps,
    limit
  );

  return (
    <div className={styles.knobContainer} style={{ translate: `${state}%` }}>
      <div role="button" onMouseDown={onStart} tabIndex={0} className={styles.knop} />
    </div>
  );
}

export default RangeKnob;
