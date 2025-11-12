'use client';
import dynamic from 'next/dynamic';
import useHeroTabs from '@/app/hooks/useHeroTabs';

const NewCarsForm = dynamic(() => import('./components/forms/NewCarsForm'), {
  ssr: false,
});
const PreOwnedForm = dynamic(() => import('./components/forms/PreOwnedForm'), {
  ssr: false,
});
const ServiceForm = dynamic(() => import('./components/forms/ServiceForm'), {
  ssr: false,
});

const TabButton = ({ tab, activeTab, onClick }) => (
  <button
    onClick={() => onClick(tab.id)}
    className={`py-4 transition-all duration-300 ${
      activeTab === tab.id
        ? 'bg-gray-800 text-white shadow-inner rounded-t-2xl'
        : 'hover:bg-gray-200'
    }`}
  >
    {tab.label}
  </button>
);

export default function ClientHeroTabs() {
  const { activeTab, handleTabChange, tabs } = useHeroTabs();

  return (
    <div className='relative z-20 max-w-6xl px-4 mx-auto -mt-24 md:px-0'>
      <div className='overflow-hidden text-black bg-white shadow-2xl rounded-2xl'>
        <div className='grid grid-cols-3 text-sm font-semibold text-center md:text-base'>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              onClick={handleTabChange}
            />
          ))}
        </div>
        <div className='p-6 md:p-8'>
          {activeTab === 'newCars' && <NewCarsForm />}
          {activeTab === 'preOwned' && <PreOwnedForm />}
          {activeTab === 'service' && <ServiceForm />}
        </div>
      </div>
    </div>
  );
}
