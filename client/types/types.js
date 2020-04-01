import {
  shape, number, string, bool, arrayOf,
} from 'prop-types';

export const positionType = shape({
  row: number.isRequired,
  number: number.isRequired,
});


export const beehiveType = shape({
  id: string.isRequired,
  active: bool.isRequired,
  position: positionType.isRequired,
  colors: arrayOf(string).isRequired,
});

export const apiaryType = shape({
  id: string.isRequired,
  name: string.isRequired,
  active: bool.isRequired,
  beehives: arrayOf(beehiveType).isRequired,
});
