import { useState, useEffect } from 'react';
import { getCargoes } from '../api';
import { Cargo } from '../types/Cargo';
import CargoModal from './CargoModal';

interface CargoTableProps {
  page: number;
  search: string;
  onSearch: (search: string) => void;
  onPageChange: (page: number) => void;
}

const CargoTable: React.FC<CargoTableProps> = ({ page, search, onSearch, onPageChange }) => {
  const [cargoes, setCargoes] = useState<Cargo[]>([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const pageSize = 10;

  useEffect(() => {
    const fetchCargoes = async () => {
      const response = await getCargoes(page, pageSize, search);
      if (response.success) {
        setCargoes(response.data);
        setTotal(response.totalPages);
      }
    };
    fetchCargoes();
  }, [page, search]);

  const handleSave = () => {
    setIsModalOpen(false);
    setSelectedCargo(null);
    const fetchCargoes = async () => {
      const response = await getCargoes(page, pageSize, search);
      if (response.success) {
        setCargoes(response.data);
        setTotal(response.totalPages);
      }
    };
    fetchCargoes();
  };

  const handleEdit = (cargo: Cargo) => {
    setSelectedCargo(cargo);
    setIsModalOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newSearch = formData.get('search') as string;
    onSearch(newSearch);
  };

  return (
    <div>
      <div className="tw-flex tw-justify-between tw-mb-4">
        <form onSubmit={handleSearchSubmit} className="tw-flex tw-space-x-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Поиск грузов..."
            className="tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
          />
          <button
            type="button"
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-text-sm hover:tw-bg-blue-600"
          >
            Поиск
          </button>
        </form>
        <button
          type='button'
          onClick={() => setIsModalOpen(true)}
          className="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-text-sm hover:tw-bg-green-600"
        >
          Создать груз
        </button>
      </div>
      <table className="tw-w-full tw-border-collapse">
        <thead>
          <tr className="tw-bg-gray-600 tw-text-white">
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">ID</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Марка</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Модель</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">VIN</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Стоимость</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Маршрут</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Заказчик</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Действия</th>
          </tr>
        </thead>
        <tbody>
          {cargoes.map((cargo) => (
            <tr key={cargo.id} className="hover:tw-bg-gray-50">
              <td className="tw-border tw-p-2 tw-text-sm">{cargo.id}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{cargo.brand}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{cargo.model}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{cargo.vin}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{cargo.cost}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{cargo.route}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{cargo.customer_fio}</td>
              <td className="tw-border tw-p-2 tw-text-sm">
                <button
                type='button'
                  onClick={() => handleEdit(cargo)}
                  className="tw-text-blue-600 hover:tw-text-blue-700 tw-text-sm"
                >
                  Редактировать
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="tw-flex tw-justify-between tw-mt-4">
        <div className="tw-flex tw-space-x-2">
          {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i + 1).map((p) => (
            <button
              type='button'
              key={p}
              onClick={() => onPageChange(p)}
              className={`tw-px-3 tw-py-1 tw-rounded-md tw-text-sm ${
                p === page ? 'tw-bg-blue-500 tw-text-white' : 'tw-bg-gray-200 hover:tw-bg-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <CargoModal
          cargo={selectedCargo}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCargo(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CargoTable;