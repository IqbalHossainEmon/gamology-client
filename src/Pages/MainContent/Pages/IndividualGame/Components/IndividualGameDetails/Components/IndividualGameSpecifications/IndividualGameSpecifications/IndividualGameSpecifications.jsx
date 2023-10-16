import { useEffect, useState } from 'react';
import LineBreak from '../../../../../../../../../Shared/LineBreak/LineBreak';
import IndividualGameMultipleSpecification from '../Components/IndividualGameMultipleSpecification/IndividualGameMultipleSpecification';
import IndividualGameSpecificationOther from '../Components/IndividualGameSpecificationOther/IndividualGameSpecificationOther';
import styles from './IndividualGameSpecifications.module.css';

const data = {
  spec: [
    {
      id: 0,
      for: 'Windows',
      systemReq: [
        [
          { id: 10000, key: 'OS', value: 'Windows® 7' },
          { id: 10001, key: 'OS', value: 'Windows® 10' },
        ],
        [
          {
            id: 10010,
            key: 'Processor',
            value: 'Intel Core i3-9100 / AMD Ryzen 3 2300X',
          },
          {
            id: 10011,
            key: 'Processor',
            value:
              'AMD / Intel CPU running at 3.6 GHz or higher: AMD Ryzen 5 3600X or Intel i5-8600K or newer',
          },
        ],
        [
          { id: 10100, key: 'Ram', value: '8GB' },
          { id: 10101, key: 'Ram', value: '16GB' },
        ],
        [
          { id: 10110, key: 'Storage', value: '60GB' },
          { id: 10111, key: 'Storage', value: '60GB' },
        ],
        [
          {
            id: 11000,
            key: 'Graphics',
            value: 'NVIDIA® GeForce® GTX 1050 Ti / AMD Radeon™ RX 560 (4GB VRAM)',
          },
          {
            id: 11001,
            key: 'Graphics',
            value: 'NVIDIA® GeForce RTX™ 2060 6GB or AMD RX Vega 56 8GB or newer.',
          },
        ],
      ],
    },
    {
      id: 1,
      for: 'Mac Os',
      systemReq: [
        [
          { id: 10000, key: 'OS', value: 'Mac® High Sierra v 10.13' },
          { id: 10001, key: 'OS', value: 'Mac® High Sierra v 10.13' },
        ],
        [
          { id: 10010, key: 'Processor', value: 'Intel Core 2 Duo processor' },
          { id: 10011, key: 'Processor', value: 'Intel i5 processor' },
        ],
        [
          { id: 10100, key: 'Ram', value: '4GB' },
          { id: 10101, key: 'Ram', value: '4GB' },
        ],
        [
          { id: 10110, key: 'Storage', value: '95GB' },
          { id: 10111, key: 'Storage', value: '95GB' },
        ],
        [
          {
            id: 11000,
            key: 'Graphics',
            value: 'AMD Radeon Pro 560 graphics (4GB of VRAM)',
          },
          {
            id: 11001,
            key: 'Graphics',
            value: 'AMD Radeon Pro 560 graphics (4GB of VRAM)',
          },
        ],
        [
          {
            id: 11001,
            key: 'Others',
            value: 'Broadband Internet connection, OpenGL: 4.1',
          },
          {
            id: 11010,
            key: 'Others',
            value: 'Broadband Internet connection, OpenGL: 4.1',
          },
        ],
      ],
    },
  ],
  others: {
    key: 'Language Supported',
    value: [
      `AUDIO: English, Russian, Polish, French, German, Spanish - Spain, Spanish - Latin America, Portuguese - Brazil, Japanese, Chinese - Simplified`,
      `TEXT: English, French, Italian, German, Spanish - Spain, Korean, Polish, Portuguese - Brazil, Russian, Spanish - Latin America, Arabic, Chinese - Simplified, Chinese - Traditional, Japanese, Portuguese, Turkish, Czech}`,
    ],
  },
  copyWrite:
    '© 2022 MARVEL © 2022 Sony Interactive Entertainment LLC Created and developed by Insomniac Games, Inc. PC version by Nixxes Software BV',
  policy: 'https://www.playstation.com/country-selector/index.html',
};

export default function IndividualGameSpecifications() {
  const [spec, setSpec] = useState({});

  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    setSpec(data);
  }, []);

  return (
    <section className={styles.individualGameSpecifications}>
      <h2 className={styles.specificationText}>Specifications</h2>
      <div className={styles.specificationContainer}>
        <div className={styles.mainHeadersContainer}>
          {spec.spec?.map((s, i) => (
            <div className={styles.mainHeader} key={s.id}>
              <button
                type="button"
                onClick={() => setToggle(i)}
                className={`${styles.mainHeaderBtn} ${toggle === i && styles.active}`}
              >
                {s.for}
              </button>
            </div>
          ))}
        </div>
        <div>
          <IndividualGameMultipleSpecification spec={spec.spec} active={toggle} />
          {spec.others && <IndividualGameSpecificationOther others={spec.others} />}
        </div>
        <LineBreak />
        <div>
          <p className={styles.copyWrite}>{spec.copyWrite}</p>
        </div>
        {spec.policy && (
          <div className={styles.policyContainer}>
            <a className={styles.policy} href={spec.policy}>
              Privacy Policy
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
