const getPosition = (numberOfBeehives, numberOfBeehivesInRow) => {
  const rowValue = Math.floor(numberOfBeehives / numberOfBeehivesInRow + 1);
  let numberValue;
  const modulo = numberOfBeehives % numberOfBeehivesInRow;

  if (
    numberOfBeehives === 0
      || numberOfBeehives === numberOfBeehivesInRow
      || modulo === 0
  ) {
    numberValue = 1;
  } else if (numberOfBeehives < numberOfBeehivesInRow) {
    numberValue = numberOfBeehives + 1;
  } else {
    numberValue = modulo + 1;
  }
  return {
    row: rowValue,
    number: numberValue,
  };
};

export default getPosition;
