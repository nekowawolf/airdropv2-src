'use client';

import { useState, useEffect } from 'react';
import { Airdrop, AirdropResponse, FilterOptions } from '@/types/airdrop';
import { fetchAirdrops, fetchFilteredAirdrops } from '@/lib/api';

export function useAirdropData(type: 'free' | 'paid' | 'ended') {
  const [data, setData] = useState<Airdrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response: AirdropResponse;
      
      if (Object.keys(filters).length > 0 && 
          (!filters.levels?.length && !filters.tasks?.length && !filters.vesting?.length)) {
        response = await fetchAirdrops(type, searchTerm);
      } else if (Object.keys(filters).length > 0) {
        response = await fetchFilteredAirdrops(type, filters);
      } else {
        response = await fetchAirdrops(type, searchTerm);
      }
      
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [type, searchTerm, filters]);

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return {
    data,
    loading,
    error,
    searchTerm,
    filters,
    updateSearchTerm,
    updateFilters,
    reload: loadData
  };
} 