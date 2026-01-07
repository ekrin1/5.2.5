import { SkillsFilter } from '../SkillsFilter/SkillsFilter';
import { CitiesFilter } from '../CitiesFilter/CitiesFilter';  

import styles from './FiltersSidebar.module.css';

export const FiltersSidebar = () => (
  <aside className={styles.sidebar}> 
    <section className={styles.block}>
      <SkillsFilter />
    </section>

    <section className={styles.block}>
      <CitiesFilter />
    </section>
  </aside>
);
