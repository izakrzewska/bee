import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link, hashHistory } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Button, Typography, TextField, FormLabel,
} from '@material-ui/core';
import fetchApiaries from '../../queries/fetchApiaries';
import ApiaryCreateMap from '../Map/ApiaryCreateMap';
import apiaryMutations from '../../mutations/apiary_mutations';
import useApiaryCreateStyles from './ApiaryCreate.style';
import useCommonStyle from '../../style/common';

const ApiaryCreate = () => {
  const [apiaryName, setApiaryName] = useState('');
  const [numberOfBeehivesInRow, setNumberOfBeehivesInRow] = useState();
  const [apiaryCoordinates, setApiaryCoordinates] = useState({
    lng: 0,
    lat: 0,
  });
  const [isMarkerVisible, isMarkerVisibleHandler] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState({ lat: 0, lng: 0 });
  const { ADD_APIARY } = apiaryMutations;
  const [addApiary] = useMutation(ADD_APIARY, {
    onCompleted() {
      hashHistory.push('/apiaries');
    },
  });
  const classes = useApiaryCreateStyles();
  const commonClasses = useCommonStyle();

  const getUserLocation = () => {
    /* global navigator */
    const geo = navigator.geolocation;

    if (geo) {
      geo.getCurrentPosition(({ coords: { longitude, latitude } }) => {
        setUserCoordinates({
          lng: longitude,
          lat: latitude,
        });
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const setNewApiaryCoordinates = ({ lng, lat }) => {
    isMarkerVisibleHandler(true);
    setApiaryCoordinates({ lng, lat });
  };

  const onApiaryCreate = (e) => {
    e.preventDefault();
    addApiary({
      variables: {
        name: apiaryName,
        numberOfBeehivesInRow,
        coordinates: apiaryCoordinates,
        active: true,
      },
      refetchQueries: [{ query: fetchApiaries }],
      awaitRefetchQueries: true,
    });
  };

  return (
    <div>
      <Link to="/apiaries" className={commonClasses.link}>
        <ArrowBackIcon className={commonClasses.backIcon} />
      </Link>
      <Typography component="h1" className={commonClasses.heading}>
        Tworzenie nowej pasieki
      </Typography>

      <form className={classes.addApiaryForm}>
        <div className={classes.nameContainer}>
          <TextField
            id="apiaryName"
            label="Nazwa pasieki"
            value={apiaryName}
            onChange={({ target: { value } }) => setApiaryName(value)}
            color="secondary"
            fullWidth
          />
        </div>
        <div className={classes.textFieldContainer}>
          <TextField
            type="number"
            id="numberOfBeehivesInRow"
            label="Liczba uli w rzędzie"
            value={numberOfBeehivesInRow}
            onChange={({ target: { value } }) => setNumberOfBeehivesInRow(Number(value))}
            color="secondary"
          />
        </div>
        <div className={classes.apiaryLocation}>
          <FormLabel htmlFor="apiaryLocation">Lokalizacja</FormLabel>
          <ApiaryCreateMap
            id="apiaryLocation"
            userCoordinates={userCoordinates}
            setNewApiaryCoordinates={setNewApiaryCoordinates}
            isMarkerVisible={isMarkerVisible}
          />
        </div>
        <div className={classes.addApiaryButton}>
          <Button
            onClick={(e) => onApiaryCreate(e)}
            className={commonClasses.primaryButton}
          >
            Zapisz
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApiaryCreate;
