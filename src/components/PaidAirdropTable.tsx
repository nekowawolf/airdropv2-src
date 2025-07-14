'use client';

import { useState, useMemo, useEffect } from 'react';
import { Airdrop } from '@/types/airdrop';
import NoData from './NoData';

interface PaidAirdropTableProps {
  data: Airdrop[];
}

const ITEMS_PER_PAGE = 10;

export default function PaidAirdropTable({ data }: PaidAirdropTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const activeData = useMemo(() => {
    return data.filter(item => item.status === 'active').reverse();
  }, [data]);

  const totalPages = Math.ceil(activeData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = activeData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const getTaskClass = (task: string) => {
    switch (task) {
      case 'retro':
        return 'border-red-500 bg-red-500';
      case 'hold':
        return 'border-gray-500 bg-gray-500';
      case 'stake':
        return 'border-indigo-950 bg-indigo-950';
      case 'node':
        return 'border-violet-700 bg-violet-700';
      default:
        return 'border-yellow-400 bg-yellow-400';
    }
  };

  const renderPaginationControls = () => {
    if (totalPages < 1) return null;

    const pages = [];
    
    pages.push(
      <li key="prev">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 pagin paginb border border-e-0 rounded-l-lg pagin-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Previous</span>
          <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
        </button>
      </li>
    );

    pages.push(
      <li key={1}>
        <button
          onClick={() => setCurrentPage(1)}
          className={`flex items-center justify-center px-3 h-8 leading-tight ${
            currentPage === 1 ? "z-10 text-blue-600 border paginb pagin-page pagin-hover-page hover:text-blue-700" : "text-gray-500 pagin paginb border pagin-hover"
          }`}
        >
          1
        </button>
      </li>
    );

    if (currentPage > 3) {
      pages.push(
        <li key="ellipsis1" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500">
          ...
        </li>
      );
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i}>
          <button
            onClick={() => setCurrentPage(i)}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              currentPage === i ? "z-10 text-blue-600 border paginb pagin-page pagin-hover-page hover:text-blue-700" : "text-gray-500 pagin paginb border pagin-hover"
            }`}
          >
            {i}
          </button>
        </li>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <li key="ellipsis2" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500">
          ...
        </li>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <li key={totalPages}>
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              currentPage === totalPages ? "z-10 text-blue-600 border paginb pagin-page pagin-hover-page hover:text-blue-700" : "text-gray-500 pagin paginb border pagin-hover"
            }`}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    pages.push(
      <li key="next">
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 pagin paginb border rounded-r-lg pagin-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Next</span>
          <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
        </button>
      </li>
    );

    return pages;
  };

  if (activeData.length === 0) {
    return <NoData />;
  }

  return (
    <div className="px-2 py-4 nav transition-all duration-300 rounded-lg shadow-md mt-4">
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs textp uppercase table-list transition-all duration-300">
            <tr>
              <th scope="col" className="py-3 px-6 text-center w-1/3">Airdrop</th>
              <th scope="col" className="py-3 px-6 text-center w-1/3">Task</th>
              <th scope="col" className="py-3 px-6 text-center w-1/3">Link</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((airdrop) => (
              <tr key={airdrop.id} className="border-b border-underline">
                <td className="py-4 px-6 text-center">
                  <div className="textp font-medium">{airdrop.name}</div>
                  <div className="text-secondary-text text-sm">{airdrop.description}</div>
                </td>
                <td className="py-4 px-6 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <div className={`flex items-center justify-center border rounded-md h-7 w-16 text-white ${getTaskClass(airdrop.task)}`}>
                      <span className="p-2">{airdrop.task.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <a
                    href={airdrop.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1 px-5 rounded-md text-white bg-gradient-to-r from-blue-500 to-violet-600"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages >= 1 && (
        <nav className="flex justify-center mt-6" aria-label="Page navigation">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            {renderPaginationControls()}
          </ul>
        </nav>
      )}
    </div>
  );
} 