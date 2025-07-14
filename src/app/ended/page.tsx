'use client';

import { useAirdropData } from '@/hooks/useAirdropData';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import EndedAirdropTable from '@/components/EndedAirdropTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoData from '@/components/NoData';

export default function EndedPage() {
  const {
    data,
    loading,
    error,
    searchTerm,
    updateSearchTerm,
    updateFilters
  } = useAirdropData('ended');

  return (
    <>
      <Header activePage="ended" />
      
      <div className="flex items-center space-x-4">
        <SearchBar 
          value={searchTerm} 
          onChange={updateSearchTerm} 
        />
        <FilterDropdown 
          type="ended" 
          onFilterChange={updateFilters} 
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <NoData />
      ) : (
        <EndedAirdropTable data={data} />
      )}
    </>
  );
} 