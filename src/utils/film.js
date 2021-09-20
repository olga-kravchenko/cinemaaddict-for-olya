const MAX_MINUTES_QUANTITY = 60;

const convertTime = (min) => {
  const minutes = min;
  const hours = Math.floor((min / MAX_MINUTES_QUANTITY));

  if (minutes < MAX_MINUTES_QUANTITY) {
    return `${minutes}m`;
  } else {
    return `${hours}h ${minutes % MAX_MINUTES_QUANTITY}m`;
  }
};

export {convertTime};
