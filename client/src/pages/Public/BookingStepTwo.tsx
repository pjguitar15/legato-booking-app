// src/pages/Public/BookingStepTwo.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";

const eventTypes = ["PARTY", "FULL BAND", "WEDDING"];

const BookingStepTwo: React.FC = () => {
  const { packageData } = useBookingContext();
  const [eventDate, setEventDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [setupTime, setSetupTime] = useState<string>("");
  const [venueAddress, setVenueAddress] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventSize, setEventSize] = useState<string>("");
  const navigate = useNavigate();

  const handlePreviousStep = () => {
    navigate("/booking/step-one");
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log({
      eventDate,
      startTime,
      endTime,
      setupTime,
      venueAddress,
      eventType,
      eventSize,
    });
    // Proceed to the next step or confirmation
  };

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-4'>
        {packageData?.name ? packageData.name : "Customized Package"}
      </h1>
      <form>
        <label>
          Event Date:
          <input
            type='date'
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </label>
        <label>
          Start Time:
          <input
            type='time'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          End Time:
          <input
            type='time'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          Setup Time:
          <input
            type='text'
            value={setupTime}
            onChange={(e) => setSetupTime(e.target.value)}
          />
        </label>
        <label>
          Venue Address:
          <input
            type='text'
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
          />
        </label>
        <label>
          Type of Event:
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
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
        <label>
          Event Size:
          <input
            type='text'
            value={eventSize}
            onChange={(e) => setEventSize(e.target.value)}
          />
        </label>
        <button
          onClick={handleSubmit}
          className='mt-4 px-4 py-2 bg-green-500 text-white rounded'
        >
          Submit
        </button>
        <button
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
