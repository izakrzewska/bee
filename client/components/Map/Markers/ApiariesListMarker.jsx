import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router';
import PlaceIcon from '@material-ui/icons/Place';
import useApiaryMapMarkerStyle from './ApiaryMarker.style';

const ApiariesListMarker = ({ id }) => {
  const classes = useApiaryMapMarkerStyle();

  return (
    <Link to={`/apiaries/${id}`}>
      <PlaceIcon fontSize="large" className={classes.apiaryMarker} />
    </Link>
  );
};

ApiariesListMarker.propTypes = {
  id: string.isRequired,
};

export default ApiariesListMarker;
