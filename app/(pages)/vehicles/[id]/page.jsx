import VehiclePageClient from './VehiclePageClient';
import { vehicles } from '@/app/constants';

// ✅ Fix: Await params before using it
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const vehicle = vehicles[resolvedParams.id];

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | Nivya Automobiles',
      description: 'The requested vehicle could not be found.',
    };
  }

  return {
    title: `${vehicle.metaTitle} | Nivya Automobiles`,
    description: ` ${vehicle.metaDescription}`,
    keywords: `${vehicle.metaKeywords}`,
    openGraph: {
      title: `${vehicle.name} | Nivya Automobiles`,
      description: `Check out the features, variants, and pricing of ${vehicle.name}.`,
      url: `https://www.nivyaautomobiles.com/vehicles/${resolvedParams.id}`,
      images: [
        {
          url:
            vehicle.imageUrl ||
            'https://www.nivyaautomobiles.com/images/default-car.png',
          width: 1200,
          height: 630,
          alt: vehicle.name,
        },
      ],
      type: 'website',
    },
  };
}

// ✅ The page itself (client-rendered section)
export default async function VehiclePage({ params }) {
  const resolvedParams = await params;
  return <VehiclePageClient vehicleId={resolvedParams.id} />;
}
