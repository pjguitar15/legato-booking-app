import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";

const UserDetailsAndPayment: React.FC = () => {
  const {
    packageData,
    contactPerson,
    setContactPerson,
    contactNumber,
    setContactNumber,
    email,
    setEmail,
    specialRequests,
    setSpecialRequests,
    eventDate,
    startTime,
    endTime,
    setupTime,
    venueAddress,
    eventType,
    eventSize,
  } = useBookingContext();

  const navigate = useNavigate();

  const handlePreviousStep = () => {
    navigate("/booking/step-two");
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log({
      contactPerson,
      contactNumber,
      email,
      specialRequests,
    });
    // Proceed to confirmation or final step
  };

  const totalPrice = packageData?.price || 0;

  return (
    <div className='flex p-6'>
      <div className='w-2/3 pr-6'>
        <h1 className='text-3xl font-bold mb-4'>User Details</h1>
        <form>
          <label className='block mb-2'>
            Contact Person:
            <input
              type='text'
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className='ml-2 p-1 border rounded'
            />
          </label>
          <label className='block mb-2'>
            Contact Number:
            <input
              type='tel'
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className='ml-2 p-1 border rounded'
            />
          </label>
          <label className='block mb-2'>
            Email:
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='ml-2 p-1 border rounded'
            />
          </label>
          <label className='block mb-4'>
            Special Requests:
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className='ml-2 p-1 border rounded w-full h-24'
            />
          </label>
          <button
            type='button'
            onClick={handleSubmit}
            className='mt-4 px-4 py-2 bg-green-500 text-white rounded'
          >
            Confirm
          </button>
          <button
            type='button'
            onClick={handlePreviousStep}
            className='mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded'
          >
            Back
          </button>
        </form>
      </div>

      <div className='w-1/3 pl-6'>
        <h1 className='text-3xl font-bold mb-4'>Invoice</h1>
        <div className='border p-4 rounded'>
          <h2 className='text-xl font-semibold mb-2'>
            Package: {packageData?.name || "Customized Package"}
          </h2>
          <p className='mb-2'>Date: {eventDate}</p>
          <p className='mb-2'>Start Time: {startTime}</p>
          <p className='mb-2'>End Time: {endTime}</p>
          <p className='mb-2'>Setup Time: {setupTime}</p>
          <p className='mb-2'>Venue Address: {venueAddress}</p>
          <p className='mb-2'>Event Type: {eventType}</p>
          <p className='mb-2'>Event Size: {eventSize}</p>
          <h2 className='text-xl font-semibold mt-4'>
            Total Price: ${totalPrice}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsAndPayment;
