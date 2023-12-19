import React, { useState } from "react";

function TimeLimitBox() {
  const [timeLimitType, setTimeLimitType] = useState("permanent");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const handleTimeLimitChange = (event) => {
    setTimeLimitType(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const isFinished = () => {
    if (timeLimitType === "permanent") {
      return true;
    } else if (timeLimitType === "temporary") {
      const now = new Date();
      return now >= startDate && now <= endDate;
    }
    return false;
  };

  return (
    <div className="w-full">
      <div className="flex">
        <label htmlFor="timeLimitType" className="w-1/5">
          Time Limit:
        </label>
        <select
          id="timeLimitType"
          value={timeLimitType}
          onChange={handleTimeLimitChange}
          className="w-4/5 bg-white text-black focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue rounded-md"
        >
          <option value="permanent">Permanent</option>
          <option value="temporary">Temporary</option>
        </select>
      </div>
      {timeLimitType === "temporary" && (
        <div className="mt-4">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate.toISOString().substring(0, 10)}
            onChange={(event) =>
              handleStartDateChange(new Date(event.target.value))
            }
            className="bg-white"
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate?.toISOString().substring(0, 10)}
            onChange={(event) =>
              handleEndDateChange(new Date(event.target.value))
            }
            className="bg-white"
          />
        </div>
      )}
      {isFinished() && <p className="finished-message"></p>}
    </div>
  );
}

export default TimeLimitBox;
