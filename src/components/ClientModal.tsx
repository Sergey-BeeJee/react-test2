import { useState } from 'react';
import { Client } from '../types/Client';
import { createClient, updateClient } from '../api';
import InputMask from 'react-input-mask';

interface ClientModalProps {
  client: Client | null;
  onClose: () => void;
  onSave: () => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fio: client?.fio || '',
    passport_number: client?.passport_number || '',
    passport_date: client?.passport_date ? formatDateForInput(client.passport_date) : '',
    phone: client?.phone || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedPassport = formData.passport_number.replace(/\D/g, '');
    if (!validatePhone(formData.phone)) {
      alert('Введите номер телефона');
      return;
    }
    if (!validatePassport(cleanedPassport)) {
      alert('Введите корректный номер паспорта (10 цифр, например, 1234 567890)');
      return;
    }
    if (!formData.passport_date) {
      alert('Введите корректную дату');
      return;
    }

    const data = {
      fio: formData.fio,
      passport_number: cleanedPassport,
      passport_date: formData.passport_date,
      phone: formData.phone,
    };
    const response = client
      ? await updateClient(client.id, data)
      : await createClient(data);
    if (response.success) {
      onSave();
    } else {
      alert('Ошибка');
    }
  };

  const validatePhone = (phone: string) => phone.trim().length > 0;
  const validatePassport = (passport: string) => passport.length === 10;

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center">
      <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-w-full tw-max-w-md">
        <h2 className="tw-text-xl tw-font-semibold tw-mb-4">
          {client ? `Редактировать клиента #${client.id}` : 'Создать клиента'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">ФИО</label>
            <input
              type="text"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
              value={formData.fio}
              onChange={(e) => setFormData({ ...formData, fio: e.target.value })}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Серия и номер паспорта</label>
            <InputMask
              mask="9999 999999"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-font-mono"
              value={formData.passport_number}
              onChange={(e) => setFormData({ ...formData, passport_number: e.target.value })}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Дата выдачи паспорта</label>
            <input
              type="date"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm"
              value={formData.passport_date}
              onChange={(e) => setFormData({ ...formData, passport_date: e.target.value })}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Телефон</label>
            <InputMask
              mask="+7 (999) 999-99-99"
              className="tw-w-full tw-border tw-rounded-md tw-px-3 tw-py-2 tw-text-sm tw-font-mono"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
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

const formatDateForInput = (dateString: string) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('.');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export default ClientModal;