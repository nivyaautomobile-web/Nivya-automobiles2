import { cars } from '../constants';
import CarGridClient from './CarGridClient';

export default function CarListing() {
  return (
    <section className='relative py-20 overflow-hidden bg-gray-200'>
      {/* Decorative background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute rounded-full w-72 h-72 bg-blue-500/10 blur-3xl top-10 left-20' />
        <div className='absolute rounded-full w-72 h-72 bg-indigo-500/10 blur-3xl bottom-10 right-20' />
      </div>
      <div className='px-6 mx-auto text-center text-black max-w-7xl'>
        <h2 className='mb-3 text-3xl tracking-tight md:text-4xl'>
          Explore Our Latest Cars
        </h2>
        <p className='max-w-2xl mx-auto mb-12 text-sm text-gray-400 md:text-base'>
          Discover premium models crafted for performance, reliability, and
          timeless design.
        </p>

        {/* ✅ Client grid only where needed */}
        <CarGridClient cars={cars} />
      </div>
    </section>
  );
}
