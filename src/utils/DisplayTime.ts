export default function displayTime(time: string) {
  const hour = parseInt(time.split(":")[0]);
  const min = parseInt(time.split(":")[1]);

  const date = new Date();
  date.setHours(hour, min, 0, 0);

  const timeString = date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
}
