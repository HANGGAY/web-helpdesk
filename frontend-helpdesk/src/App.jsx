import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardUser from './pages/DashboardUser';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardTechnician from './pages/DashboardTechnician';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={['User']}>
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin', 'Lead']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician"
          element={
            <ProtectedRoute allowedRoles={['Technician']}>
              <DashboardTechnician />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
