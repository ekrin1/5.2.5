import { Search } from '../../components/search/Search'
import { FiltersSidebar } from '../../components/filterSidebar/filterSidebar';
import { JobCard } from '../../components/jobCard/jobCard';
import { PaginationBar } from '../../components/pagination/PaginationBar';

import { Container, Group, Loader } from "@mantine/core";
import styles from "./VacanciesPage.module.css";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchVacanciesThunk, setPage } from "../../store/vacanciesSlice";

export const VacanciesPage = () => {

    const dispatch = useAppDispatch();
    const { items, loading, page, totalPages} = useAppSelector(
    (state) => state.vacancies
  );

    useEffect(() => {
      dispatch(fetchVacanciesThunk());
    }, [page, dispatch]);

  return (

        <Container className={styles.container} mt="md">
          
            <Search />

              <Group className={styles.main}>

                <FiltersSidebar />

                <div className={styles.vacancies}>
                  {loading ? (
                    <Loader />
                  ) : (
                  <>
                    {items.map((vacancy) => (
                      <JobCard key={vacancy.id} vacancy={vacancy} />
                    ))}
                      <PaginationBar
                        page={page}
                        total={totalPages}
                        onChange={(p) => dispatch(setPage(p))}
                      />
                  </>
                  )}
                </div>

              </Group>

        </Container>
  )
}
