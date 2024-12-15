import React, { useState } from "react";

export default function CreateEvent() {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    eventType: "",
    country: "",
    state: "",
    venue: "",
    ticketAmount: "",
    ticketPricing: Array(5).fill(""),
    visibility: "Public",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTicketChange = (index, value) => {
    const updatedPricing = [...eventDetails.ticketPricing];
    updatedPricing[index] = value;
    setEventDetails((prev) => ({
      ...prev,
      ticketPricing: updatedPricing,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventDetails);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <hr className="border-t border-gray-300 mb-6" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Overview Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4 col-span-1">
              <div className="border border-gray-300 rounded-lg h-40 flex items-center justify-center">
                <span>Horizontal Thumbnail</span>
              </div>
              <button className="w-full bg-gray-400 text-white p-2 rounded-md text-center hover:bg-gray-500">
                Upload Horizontal Thumbnail
              </button>
              <div className="border border-gray-300 rounded-lg h-40 flex items-center justify-center">
                <span>Vertical Thumbnail</span>
              </div>
              <button className="w-full bg-gray-400 text-white p-2 rounded-md text-center hover:bg-gray-500">
                Upload Vertical Thumbnail
              </button>
            </div>
            <div className="col-span-2">
              <label className="block font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
              <label className="block font-medium mt-4 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md h-[calc(100%-130px)]"
                required
              />
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-300" />

        {/* Details Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                name="eventType"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option>Select</option>
                <option>Conference</option>
                <option>Workshop</option>
              </select>
            </div>
            <div>
              <label>If Others, specify:</label>
              <input
                type="text"
                name="otherType"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label>
                Event Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option>Select</option>
              </select>
            </div>
            <div>
              <label>
                State <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option>Select</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label>
              Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="venue"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-6 gap-4 mt-4">
            <div>
              <label>
                Ticket Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="ticketAmount"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <label>Ticket Pricing {index + 1}</label>
                <input
                  type="number"
                  value={eventDetails.ticketPricing[index]}
                  onChange={(e) => handleTicketChange(index, e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label>
              Visibility <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="Public"
                  checked={eventDetails.visibility === "Public"}
                  onChange={handleChange}
                />{" "}
                Public
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="Private"
                  checked={eventDetails.visibility === "Private"}
                  onChange={handleChange}
                />{" "}
                Private
              </label>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-300" />

        {/* Scheduling */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Scheduling</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label>
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label>
                Time (24H) <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="startTime"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label>Time Zone *</label>
              <input
                type="text"
                placeholder="(UTC +0:00)"
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label>
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label>
                Time (24H) <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="endTime"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-300" />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 w-auto"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
