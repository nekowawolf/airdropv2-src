'use client'

import { useState, useEffect } from 'react'
import { Airdrop, AirdropResponse, FilterOptions } from '@/types/airdrop'
import { AirdropService } from '@/services/airdropService'

export function useAirdropData(type: 'free' | 'paid' | 'ended') {
  const [data, setData] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({})

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let response: AirdropResponse
      
      if (Object.keys(filters).length > 0 && 
          (!filters.levels?.length && !filters.tasks?.length && !filters.vesting?.length)) {
        response = await AirdropService.fetchAirdrops(type, searchTerm)
      } else if (Object.keys(filters).length > 0) {
        response = await AirdropService.fetchFilteredAirdrops(type, filters)
      } else {
        response = await AirdropService.fetchAirdrops(type, searchTerm)
      }
      
      setData(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [type, searchTerm, filters])

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term)
  }

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  return {
    data,
    loading,
    error,
    searchTerm,
    filters,
    updateSearchTerm,
    updateFilters,
    reload: loadData
  }
}

export const useAirdropEndedData = () => {
  const [data, setData] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({})

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await AirdropService.fetchAirdrops('ended')
      let validData = Array.isArray(response.data) ? response.data : []

      if (searchTerm) {
        validData = validData.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      if (Object.keys(filters).length > 0) {
        validData = validData.filter((item: Airdrop) => {
          const levelMatch = !filters.levels?.length || 
            (item.level && filters.levels.includes(item.level.trim()))
          
          const taskMatch = !filters.tasks?.length || 
            (item.task && filters.tasks.includes(item.task.trim()))
          
          const vestingMatch = !filters.vesting?.length || 
            (item.vesting && filters.vesting.includes(item.vesting))

          return levelMatch && taskMatch && vestingMatch
        })
      }

      const sortedData = validData.sort((a, b) => {
        const dateA = new Date(a.ended_at || 0).getTime()
        const dateB = new Date(b.ended_at || 0).getTime()
        return dateA - dateB
      })

      setData(sortedData)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch ended airdrops')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchTerm, filters])

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term)
  }

  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  return {
    data,
    loading,
    error,
    searchTerm,
    filters,
    updateSearchTerm,
    updateFilters,
    refetch: fetchData
  }
}