import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import axios from "axios";

const equipmentTypes = [
  "Mixer",
  "Drumset",
  "Microphone",
  "PAR Light",
  "Guitar Amplifier",
];

const AddEquipment: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "mixer",
    category: "",
    brand: "",
    model: "",
    specifications: {
      power: "",
      frequencyResponse: "",
      channels: "",
      inputs: [] as string[],
      outputs: [] as string[],
      colorTemperature: "",
      beamAngle: "",
      weight: "",
      type: "",
      polarPattern: "",
      effects: [] as string[],
    },
    pricePerDay: 0,
    quantityAvailable: 0,
    condition: "",
    location: "",
    imageUrl: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Conditional fields based on equipment type
  const isMixer = formData.type === "Mixer";
  const isLight = formData.type === "PAR Light";
  const isMicrophone = formData.type === "Microphone";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle the type field
    if (name === "type") {
      setFormData((prevState) => ({
        ...prevState,
        type: value,
      }));
      return;
    }

    // Handle nested fields like specifications
    if (name.startsWith("specifications.")) {
      const field = name.split(".").slice(1).join(".");
      setFormData((prevState) => ({
        ...prevState,
        specifications: {
          ...prevState.specifications,
          [field]: value,
        },
      }));
    } else {
      // Handle other inputs
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "legato_equipments");

      fetch("https://api.cloudinary.com/v1_1/dbibwzs6c/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevState) => ({
            ...prevState,
            imageUrl: data.secure_url,
          }));
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/equipment/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error adding equipment:", error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl'>
        <h1 className='text-3xl font-bold mb-4 text-gray-800'>Add Equipment</h1>
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <FormSelect
            id='type'
            name='type'
            value={formData.type}
            options={equipmentTypes}
            onChange={handleChange}
          />
          <FormInput
            id='category'
            name='category'
            value={formData.category}
            onChange={handleChange}
            placeholder='Category'
            required
          />
          <FormInput
            id='brand'
            name='brand'
            value={formData.brand}
            onChange={handleChange}
            placeholder='Brand'
            required
          />
          <FormInput
            id='model'
            name='model'
            value={formData.model}
            onChange={handleChange}
            placeholder='Model'
            required
          />
          <FormInput
            id='pricePerDay'
            name='pricePerDay'
            type='number'
            value={formData.pricePerDay}
            onChange={handleChange}
            placeholder='Price Per Day'
            required
          />
          <FormInput
            id='quantityAvailable'
            name='quantityAvailable'
            type='number'
            value={formData.quantityAvailable}
            onChange={handleChange}
            placeholder='Quantity Available'
            required
          />
          <FormInput
            id='condition'
            name='condition'
            value={formData.condition}
            onChange={handleChange}
            placeholder='Condition'
            required
          />
          <FormInput
            id='location'
            name='location'
            value={formData.location}
            onChange={handleChange}
            placeholder='Location'
            required
          />
          <FormInput
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description'
            isTextArea
          />

          {/* Conditional Inputs */}
          {isMixer && (
            <>
              <FormInput
                id='specifications.channels'
                name='specifications.channels'
                value={formData.specifications.channels}
                onChange={handleChange}
                placeholder='Channels'
              />
              <FormInput
                id='specifications.inputs'
                name='specifications.inputs'
                value={formData.specifications.inputs.join(", ")}
                onChange={(e) => {
                  const inputs = e.target.value
                    .split(",")
                    .map((item) => item.trim());
                  setFormData((prev) => ({
                    ...prev,
                    specifications: { ...prev.specifications, inputs },
                  }));
                }}
                placeholder='Inputs (comma-separated)'
              />
            </>
          )}

          {isLight && (
            <>
              <FormInput
                id='specifications.colorTemperature'
                name='specifications.colorTemperature'
                value={formData.specifications.colorTemperature}
                onChange={handleChange}
                placeholder='Color Temperature'
              />
              <FormInput
                id='specifications.beamAngle'
                name='specifications.beamAngle'
                value={formData.specifications.beamAngle}
                onChange={handleChange}
                placeholder='Beam Angle'
              />
            </>
          )}

          {isMicrophone && (
            <>
              <FormInput
                id='specifications.polarPattern'
                name='specifications.polarPattern'
                value={formData.specifications.polarPattern}
                onChange={handleChange}
                placeholder='Polar Pattern'
              />
              <FormInput
                id='specifications.type'
                name='specifications.type'
                value={formData.specifications.type}
                onChange={handleChange}
                placeholder='Microphone Type'
              />
            </>
          )}

          {/* File upload input */}
          <div className='flex items-center'>
            <input
              type='file'
              onChange={handleFileChange}
            />
          </div>
          {formData.imageUrl && (
            <div className='mt-4'>
              <img
                src={formData.imageUrl}
                alt='Uploaded'
                className='w-32 h-32 object-cover'
              />
            </div>
          )}
          <button
            type='submit'
            className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          >
            Add Equipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;
