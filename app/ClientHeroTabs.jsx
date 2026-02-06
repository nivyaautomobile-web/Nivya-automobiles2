'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import useHeroTabs from '@/app/hooks/useHeroTabs';
import Link from 'next/link';
const NewCarsForm = dynamic(() => import('./components/forms/NewCarsForm'), { ssr: false });
const PreOwnedForm = dynamic(() => import('./components/forms/PreOwnedForm'), { ssr: false });
const ServiceForm = dynamic(() => import('./components/forms/ServiceForm'), { ssr: false });

const TabButton = ({ tab, activeTab, onClick }) => (
  <button
    onClick={() => onClick(tab.id)}
    className={`py-4 transition-all duration-300 ${activeTab === tab.id
        ? 'bg-[#283791] text-white shadow-inner'
        : 'hover:bg-[#11173b] hover:text-white'
      }`}
  >
    {tab.label}
  </button>
);

export default function ClientHeroTabs() {

  // 👉 Set default tab to #2 (preOwned)
  const [activeTab, setActiveTab] = useState("preOwned");

  const { tabs } = useHeroTabs();

  const handleTabChange = (id) => setActiveTab(id);

  return (
    <div className="relative z-20 max-w-6xl px-4 mx-auto -mt-16 md:px-0">
      <div className="overflow-hidden text-black bg-white shadow-2xl rounded-2xl">

        <div className="grid grid-cols-3 text-sm font-semibold text-center md:text-base">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              onClick={handleTabChange}
            />
          ))}
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "newCars" && <NewCarsForm />}
          {activeTab === "preOwned" && <PreOwnedForm />}
          {activeTab === "service" && <ServiceForm />}
        </div>
        <p className="text-xs leading-relaxed text-gray-500 ml-9">
       <span className='text-black'>*Disclaimer:</span>  By clicking 'Submit', you have agreed to our Terms and Conditions.
        </p>

      </div>
    </div>
  );
}
