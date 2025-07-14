import { AirdropResponse } from '@/types/airdrop';

const API_URLS = {
  free: process.env.NEXT_PUBLIC_API_FREE!,
  paid: process.env.NEXT_PUBLIC_API_PAID!,
  ended: process.env.NEXT_PUBLIC_API_ENDED!,
};

export async function fetchAirdrops(type: 'free' | 'paid' | 'ended', searchTerm?: string): Promise<AirdropResponse> {
  const baseURL = API_URLS[type];
  const url = searchTerm 
    ? `${baseURL}/search/${encodeURIComponent(searchTerm)}`
    : baseURL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} airdrops`);
  }

  return response.json();
}

export async function fetchFilteredAirdrops(
  type: 'free' | 'paid' | 'ended', 
  filters: { levels?: string[], tasks?: string[], vesting?: string[] }
): Promise<AirdropResponse> {
  const response = await fetch(API_URLS[type]);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} airdrops`);
  }

  const data = await response.json();

  const filteredData = data.data.filter((item: any) => {
    const levelMatch = !filters.levels?.length || filters.levels.includes(item.level?.trim());
    const taskMatch = !filters.tasks?.length || filters.tasks.includes(item.task?.trim());
    const vestingMatch = !filters.vesting?.length || filters.vesting.includes(item.vesting);

    return levelMatch && taskMatch && vestingMatch && item.status === (type === 'ended' ? 'ended' : 'active');
  });

  return { data: filteredData };
}