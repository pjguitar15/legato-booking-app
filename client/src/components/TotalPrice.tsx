import React from "react";

interface TotalPriceProps {
  totalPrice: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ totalPrice }) => {
  return (
    <h3 className='text-xl font-semibold mb-4'>
      Total Price: ₱{totalPrice.toFixed(2)} {/* Changed $ to ₱ */}
    </h3>
  );
};

export default TotalPrice;
