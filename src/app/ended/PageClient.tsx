'use client';

import { useAirdropEndedData } from '@/hooks/useAirdropData';
import { useFilterState } from '@/hooks/useFilterState';
import { FilterOptions } from '@/types/airdrop';
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
    updateFilters,
  } = useAirdropEndedData();

  const {
    isFilterActive,
    resetFilters,
    setFilters,
    getFilterOptions,
  } = useFilterState();

  const handleApply = (filters: FilterOptions) => {
    updateFilters(filters);
  };

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
          filters={getFilterOptions()}
          setFilters={setFilters}
          resetFilters={() => {
            resetFilters();
            updateFilters({});
          }}
          isFilterActive={isFilterActive}
          onApply={handleApply}
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