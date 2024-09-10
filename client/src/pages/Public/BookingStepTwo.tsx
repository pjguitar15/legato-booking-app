import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";

const eventTypes = ["PARTY", "FULL BAND", "WEDDING"];

const BookingStepTwo: React.FC = () => {
  const {
    packageData,
    selectedEquipment,
    eventDate,
    setEventDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    setupTime,
    setSetupTime,
    venueAddress,
    setVenueAddress,
    eventType,
    setEventType,
    eventSize,
    setEventSize,
  } = useBookingContext();
  const navigate = useNavigate();

  const handlePreviousStep = () => {
    navigate("/booking/step-one");
  };

  const handleSubmit = () => {
    if (packageData) {
      navigate(`/booking/step-three/${packageData._id}`);
    } else {
      console.error("No package data available.");
    }
  };

  React.useEffect(() => {
    if (!eventType) {
      setEventType(eventTypes[0]);
    }
  }, [eventType, setEventType]);

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>
        {packageData?.name ? packageData.name : "Customized Package"}
      </h1>

      <h2 className='text-2xl font-semibold mb-4'>Equipment Included:</h2>
      <ul className='list-disc pl-5 mb-6'>
        {selectedEquipment.map((equipment) => (
          <li
            key={equipment._id}
            className='mb-2'
          >
            {equipment.brand}
          </li>
        ))}
      </ul>

      <h2 className='text-2xl font-semibold mb-4'>
        Total Package Amount: ${packageData?.price || "0.00"}
      </h2>

      <form>
        <label className='block mb-2'>
          Event Date:
          <input
            type='date'
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className='ml-2 p-1 border rounded'
          />
        </label>
        <label className='block mb-2'>
          Start Time:
          <input
            type='time'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className='ml-2 p-1 border rounded'
          />
        </label>
        <label className='block mb-2'>
          End Time:
          <input
            type='time'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className='ml-2 p-1 border rounded'
          />
        </label>
        <label className='block mb-2'>
          Setup Time:
          <input
            type='time'
            value={setupTime}
            onChange={(e) => setSetupTime(e.target.value)}
            className='ml-2 p-1 border rounded'
          />
        </label>
        <label className='block mb-2'>
          Venue Address:
          <input
            type='text'
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            className='ml-2 p-1 border rounded'
          />
        </label>
        <label className='block mb-2'>
          Type of Event:
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className='ml-2 p-1 border rounded'
          >
            {eventTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className='block mb-4'>
          Event Size:
          <input
            type='text'
            value={eventSize}
            onChange={(e) => setEventSize(e.target.value)}
            className='ml-2 p-1 border rounded'
          />
        </label>
        <button
          type='button'
          onClick={handleSubmit}
          className='mt-4 px-4 py-2 bg-green-500 text-white rounded'
        >
          Next
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
  );
};

export default BookingStepTwo;
