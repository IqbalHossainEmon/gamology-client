import styles from './SortList.module.css';

const links = [
  {
    no: 0,
    name: 'New Release',
    URL: '#new'
  },
  {
    no: 1,
    name: 'Comming Soon',
    URL: '#comming'
  },
  {
    no: 2,
    name: 'Rating',
    URL: '#rating'
  },
  {
    no: 3,
    name: 'Discount',
    URL: '#discount'
  },
  {
    no: 4,
    name: 'A → Z',
    URL: '#atoz'
  },
  {
    no: 5,
    name: 'Price (High → Low)',
    URL: '#pricehtl'
  },
  {
    no: 6,
    name: 'Price (Low → High)',
    URL: '#pricelth'
  }
];

export default function SortList({ state, setShow, handleChange }) {
  return (
    <ol className={styles.listContainer}>
      {links.map((link) => (
        <li key={link.no}>
          <button
            {...(link.name === state.sortBy
              ? { id: styles.active }
              : {
                  onClick: () => {
                    setShow('sort');
                    handleChange({ type: 'sort', value: link.name, URL: link.URL });
                  }
                })}
            className={styles.sortButtons}
            type="button"
          >
            {link.name}
          </button>
        </li>
      ))}
    </ol>
  );
}
