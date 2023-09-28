export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedMonth = month.toString().length === 1 ? `0${month}` : month;
  const formattedDay = day.toString().length === 1 ? `0${day}` : day;
  
  return `${year}-${formattedMonth}-${formattedDay}`;
};
