import { useState } from 'react';
import { FilterOptions } from '@/types/airdrop';

export function useFilterState(initial?: FilterOptions) {
  const [selectedLevels, setSelectedLevels] = useState<string[]>(initial?.levels || []);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(initial?.tasks || []);
  const [selectedVesting, setSelectedVesting] = useState<string[]>(initial?.vesting || []);

  const isFilterActive =
    selectedLevels.length > 0 || selectedTasks.length > 0 || selectedVesting.length > 0;

  const resetFilters = () => {
    setSelectedLevels([]);
    setSelectedTasks([]);
    setSelectedVesting([]);
  };

  const setFilters = (filters: FilterOptions) => {
    setSelectedLevels(filters.levels || []);
    setSelectedTasks(filters.tasks || []);
    setSelectedVesting(filters.vesting || []);
  };

  const getFilterOptions = (): FilterOptions => {
    const filters: FilterOptions = {};
    if (selectedLevels.length > 0) filters.levels = selectedLevels;
    if (selectedTasks.length > 0) filters.tasks = selectedTasks;
    if (selectedVesting.length > 0) filters.vesting = selectedVesting;
    return filters;
  };

  return {
    selectedLevels,
    setSelectedLevels,
    selectedTasks,
    setSelectedTasks,
    selectedVesting,
    setSelectedVesting,
    isFilterActive,
    resetFilters,
    setFilters,
    getFilterOptions,
  };
} 