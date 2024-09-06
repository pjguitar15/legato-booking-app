import React from "react";

interface Equipment {
  type: string;
  category: string;
  brand: string;
  model: string;
  specifications: {
    power: string;
    frequencyResponse: string;
    channels: string;
    inputs: string[];
    outputs: string[];
    colorTemperature: string;
    beamAngle: string;
    weight: string;
    type: string;
    polarPattern: string;
    effects: string[];
  };
  pricePerDay: number;
  quantityAvailable: number;
  condition: string;
  location: string;
  imageUrl: string;
  description: string;
}

interface EquipmentModalProps {
  equipment: Equipment;
  onClose: () => void;
}

const EquipmentModal: React.FC<EquipmentModalProps> = ({
  equipment,
  onClose,
}) => (
  <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
    <div className='bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative'>
      <button
        onClick={onClose}
        className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
      >
        &times;
      </button>
      <h2 className='text-2xl font-bold mb-4'>
        {equipment.brand} {equipment.model}
      </h2>
      <div className='flex flex-col sm:flex-row sm:space-x-4'>
        <img
          src={equipment.imageUrl}
          alt={`${equipment.brand} ${equipment.model}`}
          className='w-full sm:w-1/3 h-auto rounded-md object-cover mb-4 sm:mb-0'
        />
        <div className='sm:w-2/3'>
          <p className='mb-2'>
            <strong>Type:</strong> {equipment.type}
          </p>
          <p className='mb-2'>
            <strong>Category:</strong> {equipment.category}
          </p>
          <p className='mb-2'>
            <strong>Brand:</strong> {equipment.brand}
          </p>
          <p className='mb-2'>
            <strong>Model:</strong> {equipment.model}
          </p>
          <p className='mb-2'>
            <strong>Price per Day:</strong> ${equipment.pricePerDay}
          </p>
          <p className='mb-2'>
            <strong>Condition:</strong> {equipment.condition}
          </p>
          <p className='mb-2'>
            <strong>Location:</strong> {equipment.location}
          </p>
          <p className='mb-4'>
            <strong>Description:</strong> {equipment.description}
          </p>

          <div className='border-t border-gray-300 pt-4 mt-4'>
            <h3 className='text-lg font-semibold mb-2'>Specifications</h3>
            <p className='mb-2'>
              <strong>Power:</strong> {equipment.specifications.power}
            </p>
            <p className='mb-2'>
              <strong>Frequency Response:</strong>{" "}
              {equipment.specifications.frequencyResponse}
            </p>
            <p className='mb-2'>
              <strong>Channels:</strong> {equipment.specifications.channels}
            </p>
            <p className='mb-2'>
              <strong>Inputs:</strong>{" "}
              {equipment.specifications.inputs.join(", ")}
            </p>
            <p className='mb-2'>
              <strong>Outputs:</strong>{" "}
              {equipment.specifications.outputs.join(", ")}
            </p>
            <p className='mb-2'>
              <strong>Color Temperature:</strong>{" "}
              {equipment.specifications.colorTemperature}
            </p>
            <p className='mb-2'>
              <strong>Beam Angle:</strong> {equipment.specifications.beamAngle}
            </p>
            <p className='mb-2'>
              <strong>Weight:</strong> {equipment.specifications.weight}
            </p>
            <p className='mb-2'>
              <strong>Type:</strong> {equipment.specifications.type}
            </p>
            <p className='mb-2'>
              <strong>Polar Pattern:</strong>{" "}
              {equipment.specifications.polarPattern}
            </p>
            <p className='mb-2'>
              <strong>Effects:</strong>{" "}
              {equipment.specifications.effects.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EquipmentModal;
