'use client'

import { Airdrop, AirdropResponse, FilterOptions } from '@/types/airdrop'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const API_ENDPOINTS = {
  free: `${API_BASE_URL}/airdrop/freeairdrop`,
  paid: `${API_BASE_URL}/airdrop/paidairdrop`,
  ended: `${API_BASE_URL}/airdrop/allairdrop`,
}

export class AirdropService {
  static async fetchAirdrops(type: 'free' | 'paid' | 'ended', searchTerm?: string): Promise<AirdropResponse> {
    const url = searchTerm 
      ? `${API_ENDPOINTS[type]}/search/${encodeURIComponent(searchTerm)}`
      : API_ENDPOINTS[type]

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} airdrops`)
    }

    return response.json()
  }

  static async fetchFilteredAirdrops(
    type: 'free' | 'paid' | 'ended', 
    filters: FilterOptions
    ): Promise<AirdropResponse> {
    const response = await fetch(API_ENDPOINTS[type])

    if (!response.ok) {
        throw new Error(`Failed to fetch ${type} airdrops`)
    }

    const data = await response.json()

    const filteredData = data.data.filter((item: Airdrop) => {
        const levelMatch = !filters.levels?.length || 
          (item.level && filters.levels.includes(item.level.trim()))
        
        const taskMatch = !filters.tasks?.length || 
          (item.task && filters.tasks.includes(item.task.trim()))
        
        const vestingMatch = !filters.vesting?.length || 
          (item.vesting && filters.vesting.includes(item.vesting))

        return levelMatch && taskMatch && vestingMatch && 
            item.status === (type === 'ended' ? 'ended' : 'active')
    })

    return { data: filteredData }
    }
}