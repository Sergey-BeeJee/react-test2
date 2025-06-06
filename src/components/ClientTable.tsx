import { useState, useEffect } from 'react';
import { getClients } from '../api';
import { Client } from '../types/Client';
import ClientModal from './ClientModal';

interface ClientTableProps {
  page: number;
  search: string;
  onSearch: (search: string) => void;
  onPageChange: (page: number) => void;
}

const ClientTable: React.FC<ClientTableProps> = ({ page, search, onSearch, onPageChange }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const pageSize = 10;

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getClients(page, pageSize, search);
      if (response.success) {
        setClients(response.data);
        setTotal(response.totalPages);
      }
    };
    fetchClients();
  }, [page, search]);

  const handleSave = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
    const fetchClients = async () => {
      const response = await getClients(page, pageSize, search);
      if (response.success) {
        setClients(response.data);
        setTotal(response.totalPages);
      }
    };
    fetchClients();
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
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
            placeholder="Поиск клиентов..."
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
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-text-sm hover:tw-bg-green-600"
        >
          Создать клиента
        </button>
      </div>
      <table className="tw-w-full tw-border-collapse">
        <thead>
          <tr className="tw-bg-gray-600 tw-text-white"> {/* Изменяем на более тёмный фон и белый текст */}
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">ID</th> {/* Добавляем tw-font-bold */}
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">ФИО</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Паспорт</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Дата выдачи</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Телефон</th>
            <th className="tw-border tw-p-2 tw-text-sm tw-font-bold">Действия</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="hover:tw-bg-gray-50">
              <td className="tw-border tw-p-2 tw-text-sm">{client.id}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{client.fio}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{client.passport_number}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{client.passport_date}</td>
              <td className="tw-border tw-p-2 tw-text-sm">{client.phone}</td>
              <td className="tw-border tw-p-2 tw-text-sm">
                <button
                  type="button"
                  onClick={() => handleEdit(client)}
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
              type="button"
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
        <ClientModal
          client={selectedClient}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClient(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ClientTable;