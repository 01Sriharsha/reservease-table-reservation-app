export const calculateSearchTimes = (time: string) => {
    const specificTime = new Date();
    const times: string[] = time.split(":");
    specificTime.setHours(parseInt(times[0])); // Set the desired hour (example: 12 PM)
    specificTime.setMinutes(parseInt(times[1])); // Set the desired minutes (example: 0)
    // Find the time after 1 hour
    const afterOneHour = new Date(
      specificTime.getTime() + 60 * 60 * 1000
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }); // Adding milliseconds of 1 hour
  
    // Find the time before 1 hour
    const beforeOneHour = new Date(
      specificTime.getTime() - 60 * 60 * 1000
    ).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  
    const afterThirtyMinutes = new Date(
      specificTime.getTime() + 30 * 60 * 1000
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }); // Adding milliseconds of 30 minutes
  
    // Find the time before 30 minutes
    const beforeThirtyMinutes = new Date(
      specificTime.getTime() - 30 * 60 * 1000
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }); // Subtracting milliseconds of 30 minutes
  
    //Standard time format - 19:00:00.000Z
    return [
      `${beforeOneHour}:00.000Z`,
      `${beforeThirtyMinutes}:00.000Z`,
      `${time}:00.000Z`,
      `${afterThirtyMinutes}:00.000Z`,
      `${afterOneHour}:00.000Z`,
    ];
  };