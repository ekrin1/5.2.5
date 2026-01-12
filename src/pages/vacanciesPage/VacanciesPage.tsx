import { Search } from '../../components/search/Search'
import { FiltersSidebar } from '../../components/FiltersSidebar/FiltersSidebar';
import { JobCard } from '../../components/jobCard/jobCard';
import { PaginationBar } from '../../components/PaginationBar/PaginationBar';

import { Group, Skeleton } from "@mantine/core";
import styles from "./VacanciesPage.module.css";

import { useAppSelector } from '../../store/hooks';
import { useVacanciesUrl } from "../../hooks/useVacanciesUrl";

export const VacanciesPage = () => {

  const { error } = useAppSelector(s => s.vacancies);

    const {
      items,
      loading,
      totalPages,
      page,
      handlePageChange
    } = useVacanciesUrl();

  return (

        <>
          
            <Search />

              <Group className={styles.main}>

                <FiltersSidebar />

                <div className={styles.vacancies}>
                  {error && (
                    <div className={styles.error}>
                      {error}
                    </div>
                  )}

                  {loading ? (
                    Array.from({ length: 10 }).map((_, i) => 
                    <Skeleton key={i} height={140} radius="md" mb="sm"  />)
                  ) : (

                  <>

                    {items.map((vacancy) => (
                      <JobCard key={vacancy.id} vacancy={vacancy} />
                    ))}

                    {totalPages > 1 && (
                      <PaginationBar
                        page={page}
                        total={totalPages}
                        onChange={handlePageChange}
                      />
                    )}

                  </>
                  )}
                </div>

              </Group>

        </>
  )
}
