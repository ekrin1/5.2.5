import { Search } from '../../components/search/Search'
import { FiltersSidebar } from '../../components/FiltersSidebar/FiltersSidebar';
import { JobCard } from '../../components/jobCard/jobCard';
import { PaginationBar } from '../../components/PaginationBar/PaginationBar';

import { Container, Group, Skeleton } from "@mantine/core";
import styles from "./VacanciesPage.module.css";

import { useVacanciesUrl } from "../../hooks/useVacanciesUrl";

export const VacanciesPage = () => {

    const {
      items,
      loading,
      totalPages,
      page,
      handlePageChange
    } = useVacanciesUrl();

  return (

        <Container className={styles.container} mt="md">
          
            <Search />

              <Group className={styles.main}>

                <FiltersSidebar />

                <div className={styles.vacancies}>
                  {loading ? (
                    Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} />)
                  ) : (
                  <>
                    {items.map((vacancy) => (
                      <JobCard key={vacancy.id} vacancy={vacancy} />
                    ))}
                      <PaginationBar
                        page={page}
                        total={totalPages}
                        onChange={handlePageChange}
                      />
                  </>
                  )}
                </div>

              </Group>

        </Container>
  )
}
