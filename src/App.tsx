import { Route, Routes } from 'react-router-dom';
import { ContentPage } from './pages/ContentPage';

export function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<ContentPage />}
      />
    </Routes>
  );
}
