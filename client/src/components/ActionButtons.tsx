import React from "react";
import { Equipment } from "../types/PackageTypes";

interface ActionButtonsProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEquipment: Equipment[];
  packageId: string | undefined;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isEditing,
  setIsEditing,
  selectedEquipment,
  packageId,
}) => {
  const handleCustomize = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem(
      `custom-package-${packageId}`,
      JSON.stringify(selectedEquipment)
    );
    setIsEditing(false);
  };

  return (
    <div className='mt-6 flex justify-between'>
      {!isEditing ? (
        <>
          <button
            onClick={handleCustomize}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Customize
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleSave}
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
