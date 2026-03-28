'use client';

import { useState, useRef, useEffect } from 'react';
import { Country } from '@/types/tax';

interface SearchableSelectProps {
  countries: Country[];
  value: Country | null;
  onChange: (country: Country) => void;
}

export default function SearchableSelect({ countries, value, onChange }: SearchableSelectProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Country of Tax Residency
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--clemta-blue)] focus:border-transparent text-gray-900 bg-white"
        placeholder="Search for your country..."
        value={isOpen ? search : value?.name ?? ''}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
          setSearch('');
        }}
      />
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-gray-500">No countries found</li>
          ) : (
            filtered.map((country) => (
              <li
                key={country.code}
                className={`px-4 py-3 cursor-pointer hover:bg-blue-50 flex justify-between items-center ${
                  value?.code === country.code ? 'bg-blue-50 font-medium' : ''
                }`}
                onClick={() => {
                  onChange(country);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                <span className="text-gray-900">{country.name}</span>
                {country.hasTreaty ? (
                  <span className="text-xs px-2 py-0.5 bg-[var(--clemta-green-light)] text-green-700 rounded-full">
                    Treaty
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                    No Treaty
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
