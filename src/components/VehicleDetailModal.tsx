import { useEffect } from 'react';
import type { Vehicle } from '../types/vehicle';
import { X } from 'lucide-react';

interface Props {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleDetailModal = ({ vehicle, onClose }: Props) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div onClick={(e) => e.stopPropagation()} className="relative bg-white dark:bg-dark-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-dark-700">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{vehicle.name}</h2>
        <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full rounded-lg shadow-lg mb-6" />
        <div className="space-y-2">
          
          {/* ✅ Price display updated */}
          <p><strong>Price:</strong> {vehicle.price}</p>

          <p><strong>Status:</strong> <span className={
            vehicle.status === 'Available' ? 'text-green-500' : 
            vehicle.status === 'Coming Soon' ? 'text-yellow-500' : 'text-red-500'
          }>{vehicle.status}</span></p>
          <p><strong>Category:</strong> {vehicle.category}</p>
          {vehicle.description && <p className="pt-3"><strong>Description:</strong> {vehicle.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailModal;