import type { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: () => void;
}

const VehicleCard = ({ vehicle, onViewDetails }: VehicleCardProps) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
      <img
        src={vehicle.imageUrl}
        alt={vehicle.name}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {vehicle.name}
        </h3>
        <p className="text-sm text-gray-700 dark:text-slate-400 mb-1">{vehicle.category}</p>
        
        {/* ✅ Price display updated */}
        <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">
          {vehicle.price}
        </p>

        <p className={`mb-3 font-semibold ${
          vehicle.status === "Available" ? "text-green-600 dark:text-green-400" :
          vehicle.status === "Coming Soon" ? "text-yellow-600 dark:text-yellow-400" :
          vehicle.status === "Sold" ? "text-red-600 dark:text-red-400" :
          "text-gray-600 dark:text-slate-400"
        }`}>
          {vehicle.status}
        </p>

        <button
          onClick={onViewDetails}
          className="mt-auto bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-600 transition"
          aria-label={`View details for ${vehicle.name}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;