import React from 'react';
import PlaceIcon from '@material-ui/icons/Place';
import useApiaryMapMarkerStyle from './ApiaryMarker.style';

const ApiaryCreateMarker = () => {
  const classes = useApiaryMapMarkerStyle();
  return <PlaceIcon fontSize="large" className={classes.apiaryMarker} />;
};

export default ApiaryCreateMarker;
