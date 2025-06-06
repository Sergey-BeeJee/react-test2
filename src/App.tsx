import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Cargoes from './pages/Cargoes';
import Clients from './pages/Clients';

function App() {
  return (
    <HashRouter>
      <div className="tw-bg-gray-100 tw-min-h-screen">
        <nav className="tw-bg-white tw-shadow-sm tw-p-4">
          <div className="tw-max-w-6xl tw-mx-auto tw-flex tw-space-x-4">
            <NavLink
              to="/cargoes"
              className={({ isActive }) =>
                `tw-px-4 tw-py-2 tw-rounded-md tw-text-sm tw-font-medium ${
                  isActive ? 'tw-bg-blue-500 tw-text-white' : 'tw-bg-gray-200 tw-text-gray-700 hover:tw-bg-gray-300'
                }`
              }
            >
              Грузы
            </NavLink>
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                `tw-px-4 tw-py-2 tw-rounded-md tw-text-sm tw-font-medium ${
                  isActive ? 'tw-bg-blue-500 tw-text-white' : 'tw-bg-gray-200 tw-text-gray-700 hover:tw-bg-gray-300'
                }`
              }
            >
              Клиенты
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Cargoes />} />
          <Route path="/cargoes" element={<Cargoes />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;