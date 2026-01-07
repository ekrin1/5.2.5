import "@mantine/core/styles.css";

import { Header } from './components/Header/Header' 
import { VacanciesPage } from './pages/VacanciesPage/VacanciesPage'

import { Routes, Route, Navigate } from 'react-router-dom'
import { VacancyPage } from './pages/VacancyPage/VacancyPage';


function App() {
  

  return (
    <>
      <Header />  
      <Routes>
          <Route path="/" element={<Navigate to="/vacancies" replace />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
        </Routes>
    </>
  )
}

export default App
