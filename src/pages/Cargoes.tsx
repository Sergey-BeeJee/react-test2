import { useSearchParams } from 'react-router-dom';
import CargoTable from '../components/CargoTable';

const Cargoes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';

  const handleSearch = (newSearch: string) => {
    setSearchParams({ page: '1', search: newSearch });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  return (
    <div className="tw-max-w-full tw-mx-auto tw-py-6">
      <h1 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6">Грузы</h1>
      <CargoTable
        page={page}
        search={search}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Cargoes;