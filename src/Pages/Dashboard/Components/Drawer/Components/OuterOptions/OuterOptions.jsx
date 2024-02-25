import styles from './OuterOptions.module.css';

const OuterOptions = ({ option }) => (
  <li className={styles.outerOptions}>
    {option.name}
    {option.subDrawer && (
      <ul>
        {option.subDrawer.map(subOption => (
          <li key={subOption.id}>{subOption.name}</li>
        ))}
      </ul>
    )}
  </li>
);
export default OuterOptions;
