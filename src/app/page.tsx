'use client';

import { useAirdropData } from '@/hooks/useAirdropData';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import AirdropTable from '@/components/AirdropTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoData from '@/components/NoData';

export default function HomePage() {
  const {
    data,
    loading,
    error,
    searchTerm,
    updateSearchTerm,
    updateFilters
  } = useAirdropData('free');

  return (
    <>
      <Header activePage="free" />
      
      <div className="flex items-center space-x-4">
        <SearchBar 
          value={searchTerm} 
          onChange={updateSearchTerm} 
        />
        <FilterDropdown 
          type="free" 
          onFilterChange={updateFilters} 
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <NoData />
      ) : (
        <AirdropTable data={data} />
      )}
    </>
  );
} 