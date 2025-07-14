'use client';

import { useState, useRef, useEffect } from 'react';
import { FilterOptions } from '@/types/airdrop';

interface FilterDropdownProps {
  type: 'free' | 'paid' | 'ended';
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterDropdown({ type, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedVesting, setSelectedVesting] = useState<string[]>([]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels(prev => [...prev, level]);
    } else {
      setSelectedLevels(prev => prev.filter(l => l !== level));
    }
  };

  const handleTaskChange = (task: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks(prev => [...prev, task]);
    } else {
      setSelectedTasks(prev => prev.filter(t => t !== task));
    }
  };

  const handleVestingChange = (vesting: string, checked: boolean) => {
    if (checked) {
      setSelectedVesting(prev => [...prev, vesting]);
    } else {
      setSelectedVesting(prev => prev.filter(v => v !== vesting));
    }
  };

  const handleApplyFilters = () => {
    const filters: FilterOptions = {};
    
    if (selectedLevels.length > 0) filters.levels = selectedLevels;
    if (selectedTasks.length > 0) filters.tasks = selectedTasks;
    if (selectedVesting.length > 0) filters.vesting = selectedVesting;
    
    onFilterChange(filters);
    setIsOpen(false);
  };

  const renderFilterContent = () => {
    if (type === 'ended') {
      return (
        <div className="p-2">
          <span className="font-semibold text-center block mb-2 textp">Vesting 🔴</span>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="yes" 
              className="mr-2"
              onChange={(e) => handleVestingChange('yes', e.target.checked)}
            />
            Yes 🤡
          </label>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="no" 
              className="mr-2"
              onChange={(e) => handleVestingChange('no', e.target.checked)}
            />
            No 👑
          </label>
        </div>
      );
    }

    if (type === 'paid') {
      return (
        <>
          <div className="p-2">
            <span className="font-semibold text-center block mb-2 textp">Funding 💰</span>
            <label className="block textp">
              <input 
                type="checkbox" 
                value="easy" 
                className="mr-2"
                onChange={(e) => handleLevelChange('easy', e.target.checked)}
              />
              Low <span className="text-fund text-gray-500">(N/A-5M&gt;)</span>
            </label>
            <label className="block textp">
              <input 
                type="checkbox" 
                value="medium" 
                className="mr-2"
                onChange={(e) => handleLevelChange('medium', e.target.checked)}
              />
              Mid <span className="text-fund text-gray-500">(5M-20M&gt;)</span>
            </label>
            <label className="block textp">
              <input 
                type="checkbox" 
                value="hard" 
                className="mr-2"
                onChange={(e) => handleLevelChange('hard', e.target.checked)}
              />
              High <span className="text-fund text-gray-500">(20M-50M&gt;)</span>
            </label>
          </div>
          <hr className="my-2 border-indigo-500" />
          <div className="p-2">
            <span className="font-semibold text-center block -mt-2 mb-2 textp">Task 📝</span>
            <label className="block textp">
              <input 
                type="checkbox" 
                value="retro" 
                className="mr-2"
                onChange={(e) => handleTaskChange('retro', e.target.checked)}
              />
              Retro 🔥
            </label>
            <label className="block textp">
              <input 
                type="checkbox" 
                value="stake" 
                className="mr-2"
                onChange={(e) => handleTaskChange('stake', e.target.checked)}
              />
              Stake ⏳
            </label>
            <label className="block textp">
              <input 
                type="checkbox" 
                value="hold" 
                className="mr-2"
                onChange={(e) => handleTaskChange('hold', e.target.checked)}
              />
              Hold 🔒
            </label>
            <label className="block textp">
              <input 
                type="checkbox" 
                value="node" 
                className="mr-2"
                onChange={(e) => handleTaskChange('node', e.target.checked)}
              />
              Node ⚛️
            </label>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="p-2">
          <span className="font-semibold text-center block mb-2 textp">Funding 💰</span>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="easy" 
              className="mr-2"
              onChange={(e) => handleLevelChange('easy', e.target.checked)}
            />
            Low <span className="text-fund text-gray-500">(N/A-5M&gt;)</span>
          </label>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="medium" 
              className="mr-2"
              onChange={(e) => handleLevelChange('medium', e.target.checked)}
            />
            Mid <span className="text-fund text-gray-500">(5M-20M&gt;)</span>
          </label>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="hard" 
              className="mr-2"
              onChange={(e) => handleLevelChange('hard', e.target.checked)}
            />
            High <span className="text-fund text-gray-500">(20M-50M&gt;)</span>
          </label>
        </div>
        <hr className="my-2 border-indigo-500" />
        <div className="p-2">
          <span className="font-semibold text-center block -mt-2 mb-2 textp">Task 📝</span>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="daily" 
              className="mr-2"
              onChange={(e) => handleTaskChange('daily', e.target.checked)}
            />
            Daily 🔄
          </label>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="testnet" 
              className="mr-2"
              onChange={(e) => handleTaskChange('testnet', e.target.checked)}
            />
            Testnet 🖥️
          </label>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="game" 
              className="mr-2"
              onChange={(e) => handleTaskChange('game', e.target.checked)}
            />
            Game 🎮
          </label>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="social" 
              className="mr-2"
              onChange={(e) => handleTaskChange('social', e.target.checked)}
            />
            Social 🌐
          </label>
          <label className="block textp">
            <input 
              type="checkbox" 
              value="depin" 
              className="mr-2"
              onChange={(e) => handleTaskChange('depin', e.target.checked)}
            />
            DePin 📶
          </label>
        </div>
      </>
    );
  };

  return (
    <div className="flex space-x-4 mt-4" ref={dropdownRef}>
      <div className="relative">
        <button 
          id="filterButton" 
          className="border border-color inline-flex items-center justify-center sm:w-40 md:w-44 lg:w-44 xl:w-48 2xl:w-52 rounded-md shadow-sm px-4 py-2 search-bar text-sm font-medium textp transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="mr-4 filter-color" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/>
          </svg>
          Filter
          <svg 
            className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-chevron' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.94l3.71-3.75a.75.75 0 111.06 1.06l-4.25 4.29a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="border border-color absolute right-0 sm:right-2 mt-2 w-36 sm:w-48 nav rounded-md shadow-lg z-10">
            {renderFilterContent()}
            <div className="p-2">
              <button 
                id="okButton" 
                className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition duration-300"
                onClick={handleApplyFilters}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 