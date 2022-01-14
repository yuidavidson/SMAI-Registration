const getDateMonth = (timestampOrDate) => {
  let months = {
    0: 'January',
    1: 'Febuary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };
  return months[((timestampOrDate instanceof Date) ? timestampOrDate : new Date(timestampOrDate *1000)).getMonth()];
};

export {getDateMonth};