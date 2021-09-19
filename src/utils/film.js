const convertTime = (min) => {
  const minutes = Math.floor((min).toFixed(1));
  const hours = Math.floor((min / 60).toFixed(1));

  if (minutes < 60) {
    return `${minutes}m`;
  } else {
    return `${hours}h ${minutes % 60}m`;
  }
};

export {convertTime};
