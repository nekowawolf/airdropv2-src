'use client';

import { useAirdropData } from '@/hooks/useAirdropData';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import PaidAirdropTable from '@/components/PaidAirdropTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoData from '@/components/NoData';

export default function PaidPage() {
  const {
    data,
    loading,
    error,
    searchTerm,
    updateSearchTerm,
    updateFilters
  } = useAirdropData('paid');

  return (
    <>
      <Header activePage="paid" />
      
      <div className="flex items-center space-x-4">
        <SearchBar 
          value={searchTerm} 
          onChange={updateSearchTerm} 
        />
        <FilterDropdown 
          type="paid" 
          onFilterChange={updateFilters} 
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <NoData />
      ) : (
        <PaidAirdropTable data={data} />
      )}
    </>
  );
} 
 