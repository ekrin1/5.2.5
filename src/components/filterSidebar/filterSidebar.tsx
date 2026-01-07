import { SkillsFilter } from '../skillsFilter/skillsFilter';
import { CitiesFilter } from '../citiesFilter/citiesFilter';  

import styles from './filterSidebar.module.css';

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
