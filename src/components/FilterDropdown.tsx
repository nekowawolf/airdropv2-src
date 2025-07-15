'use client';

import { useRef, useEffect, useState } from 'react';
import { FilterOptions } from '@/types/airdrop';

interface FilterDropdownProps {
  type: 'free' | 'paid' | 'ended';
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  resetFilters: () => void;
  isFilterActive: boolean;
  onApply: (filters: FilterOptions) => void;
}

export default function FilterDropdown({
  type,
  filters,
  setFilters,
  resetFilters,
  isFilterActive,
  onApply,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filters);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setTempFilters(filters);
  }, [isOpen, filters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckbox = (key: 'levels' | 'tasks' | 'vesting', value: string, checked: boolean) => {
    setTempFilters((prev) => {
      const arr = prev[key] ? [...prev[key]!] : [];
      if (checked) {
        if (!arr.includes(value)) arr.push(value);
      } else {
        const idx = arr.indexOf(value);
        if (idx !== -1) arr.splice(idx, 1);
      }
      return { ...prev, [key]: arr };
    });
  };

  const isChanged = JSON.stringify(tempFilters) !== JSON.stringify(filters);

  const handleButton = () => {
    if (isFilterActive && !isChanged) {
      resetFilters();
      setIsOpen(false);
    } else {
      setFilters(tempFilters);
      onApply(tempFilters);
      setIsOpen(false);
    }
  };

  const isChecked = (key: 'levels' | 'tasks' | 'vesting', value: string) => {
    return tempFilters[key]?.includes(value) || false;
  };
   // Ended
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
              checked={isChecked('vesting', 'yes')}
              onChange={(e) => handleCheckbox('vesting', 'yes', e.target.checked)}
            />
            Yes 🤡
          </label>
          <label className="block textp">
            <input
              type="checkbox"
              value="no"
              className="mr-2"
              checked={isChecked('vesting', 'no')}
              onChange={(e) => handleCheckbox('vesting', 'no', e.target.checked)}
            />
            No 👑
          </label>
        </div>
      );
    }
    // Paid
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
                checked={isChecked('levels', 'easy')}
                onChange={(e) => handleCheckbox('levels', 'easy', e.target.checked)}
              />
              Low <span className="text-fund text-gray-500">(N/A-5M&gt;)</span>
            </label>
            <label className="block textp">
              <input
                type="checkbox"
                value="medium"
                className="mr-2"
                checked={isChecked('levels', 'medium')}
                onChange={(e) => handleCheckbox('levels', 'medium', e.target.checked)}
              />
              Mid <span className="text-fund text-gray-500">(5M-20M&gt;)</span>
            </label>
            <label className="block textp">
              <input
                type="checkbox"
                value="hard"
                className="mr-2"
                checked={isChecked('levels', 'hard')}
                onChange={(e) => handleCheckbox('levels', 'hard', e.target.checked)}
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
                checked={isChecked('tasks', 'retro')}
                onChange={(e) => handleCheckbox('tasks', 'retro', e.target.checked)}
              />
              Retro 🔥
            </label>
            <label className="block textp">
              <input
                type="checkbox"
                value="stake"
                className="mr-2"
                checked={isChecked('tasks', 'stake')}
                onChange={(e) => handleCheckbox('tasks', 'stake', e.target.checked)}
              />
              Stake ⏳
            </label>
            <label className="block textp">
              <input
                type="checkbox"
                value="hold"
                className="mr-2"
                checked={isChecked('tasks', 'hold')}
                onChange={(e) => handleCheckbox('tasks', 'hold', e.target.checked)}
              />
              Hold 🔒
            </label>
            <label className="block textp">
              <input
                type="checkbox"
                value="node"
                className="mr-2"
                checked={isChecked('tasks', 'node')}
                onChange={(e) => handleCheckbox('tasks', 'node', e.target.checked)}
              />
              Node ⚛️
            </label>
          </div>
        </>
      );
    }
    // Free
    return (
      <>
        <div className="p-2">
          <span className="font-semibold text-center block mb-2 textp">Funding 💰</span>
          <label className="block textp">
            <input
              type="checkbox"
              value="easy"
              className="mr-2"
              checked={isChecked('levels', 'easy')}
              onChange={(e) => handleCheckbox('levels', 'easy', e.target.checked)}
            />
            Low <span className="text-fund text-gray-500">(N/A-5M&gt;)</span>
          </label>
          <label className="block textp">
            <input
              type="checkbox"
              value="medium"
              className="mr-2"
              checked={isChecked('levels', 'medium')}
              onChange={(e) => handleCheckbox('levels', 'medium', e.target.checked)}
            />
            Mid <span className="text-fund text-gray-500">(5M-20M&gt;)</span>
          </label>
          <label className="block textp">
            <input
              type="checkbox"
              value="hard"
              className="mr-2"
              checked={isChecked('levels', 'hard')}
              onChange={(e) => handleCheckbox('levels', 'hard', e.target.checked)}
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
              checked={isChecked('tasks', 'daily')}
              onChange={(e) => handleCheckbox('tasks', 'daily', e.target.checked)}
            />
            Daily 🔄
          </label>
          <label className="block textp">
            <input
              type="checkbox"
              value="testnet"
              className="mr-2"
              checked={isChecked('tasks', 'testnet')}
              onChange={(e) => handleCheckbox('tasks', 'testnet', e.target.checked)}
            />
            Testnet 🖥️
          </label>
          <label className="block textp">
            <input
              type="checkbox"
              value="game"
              className="mr-2"
              checked={isChecked('tasks', 'game')}
              onChange={(e) => handleCheckbox('tasks', 'game', e.target.checked)}
            />
            Game 🎮
          </label>
          <label className="block textp">
            <input
              type="checkbox"
              value="social"
              className="mr-2"
              checked={isChecked('tasks', 'social')}
              onChange={(e) => handleCheckbox('tasks', 'social', e.target.checked)}
            />
            Social 🌐
          </label>
          <label className="block textp">
            <input
              type="checkbox"
              value="depin"
              className="mr-2"
              checked={isChecked('tasks', 'depin')}
              onChange={(e) => handleCheckbox('tasks', 'depin', e.target.checked)}
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
                className={`w-full rounded-md py-2 transition duration-300 ${isFilterActive && !isChanged ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                onClick={handleButton}
              >
                {isFilterActive && !isChanged ? 'Reset' : 'OK'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 