import { useState, useEffect } from 'react';
import { Cargo } from '../types/Cargo';
import { ClientSelect } from '../types/Client';
import { createCargo, updateCargo, getClientsForSelect } from '../api';

interface CargoModalProps {
  cargo: Cargo | null;
  onClose: () => void;
  onSave: () => void;
}

const CargoModal: React.FC<CargoModalProps> = ({ cargo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    brand: cargo?.brand || '',
    model: cargo?.model || '',
    vin: cargo?.vin || '',
    cost: cargo?.cost || '',
    route: cargo?.route || '',
    customer_id: cargo?.customer_id?.toString() || '',
  });
  const [clients, setClients] = useState<ClientSelect[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const clientsData = await getClientsForSelect();
      if (clientsData.success) {
        setClients(clientsData.data);
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      brand: formData.brand,
      model: formData.model,
      vin: formData.vin,
      cost: formData.cost,
      route: formData.route,
      customer_id: Number(formData.customer_id),
    };

    const response = cargo
      ? await updateCargo(cargo.id, data)
      : await createCargo(data);
    if (response.success) {
      onSave();
    } else {
      alert('Ошибка');
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center">
      <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-w-full tw-max-w-md">
        <h2 className="tw-text-xl tw-font-semibold tw-mb-4">
          {cargo ? `Редактировать груз #${cargo.id}` : 'Создать груз'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Марка</label>
            <input
              type="text"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Модель</label>
            <input
              type="text"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">VIN</label>
            <input
              type="text"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Стоимость</label>
            <input
              type="number"
              step="0.01"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Маршрут</label>
            <input
              type="text"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
              value={formData.route}
              onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Заказчик</label>
            <select
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
              value={formData.customer_id}
              onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
              required
            >
              <option value="">Выберите заказчика</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.fio}
                </option>
              ))}
            </select>
          </div>
          <div className="tw-flex tw-justify-between">
            <button
              type="submit"
              className="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-text-sm hover:tw-bg-green-600"
            >
              Сохранить
            </button>
            <button
              type="button"
              className="tw-bg-gray-300 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-md tw-text-sm hover:tw-bg-gray-400"
              onClick={onClose}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CargoModal;