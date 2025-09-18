export interface Airdrop {
  id: string;
  name: string;
  description: string;
  task: string;
  level: string;
  status: 'active' | 'ended';
  link: string;
  link_claim?: string;
  funding?: string;
  vesting?: 'yes' | 'no';
  ended_at?: string;
}

export interface AirdropResponse {
  data: Airdrop[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface FilterOptions {
  levels?: string[];
  tasks?: string[];
  vesting?: string[];
} 