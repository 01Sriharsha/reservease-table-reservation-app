const GenerateTimeStamp = () => {
  // Define start and end times
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0); // Set to midnight
  const endTime = new Date();
  endTime.setHours(23, 59, 59, 999); // Set to 11:59:59 PM

  // Define interval
  const interval = 30; // 30 minutes

  // Generate timestamps
  const timestamps = [] as {
    label: string;
    value: string;
  }[];
  let currentTime = startTime;
  while (currentTime <= endTime) {
    const hour = currentTime.getHours();
    const hourString = currentTime.getHours().toString().padStart(2, "0");
    const minute = currentTime.getMinutes().toString().padStart(2, "0");
    const amPm = hour < 12 ? "AM" : "PM"; // Determine AM/PM based on hour
    const hour12 = hour % 12 || 12; // Convert hour to 12-hour format

    //24 hour format
    timestamps.push({
      label: `${hour12}:${minute} ${amPm}`,
      value: `${hourString}:${minute}`,
    });
    currentTime.setTime(currentTime.getTime() + interval * 60000); // Add interval in milliseconds
  }

  return timestamps;
};

export default GenerateTimeStamp;
