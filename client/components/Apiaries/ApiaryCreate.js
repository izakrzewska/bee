import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link, hashHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button, Typography } from "@material-ui/core";
import fetchApiaries from "../../queries/fetchApiaries";
import ApiaryCreateMap from "../Map/ApiaryCreateMap";
import apiaryMutations from "../../mutations/apiary_mutations";
import useApiaryCreateStyles from "./ApiaryCreate.style";
import useCommonStyle from "../../style/common";
import classnames from "classnames";

const ApiaryCreate = () => {
  const [apiaryName, setApiaryName] = useState("");
  const [numberOfBeehivesInRow, setNumberOfBeehivesInRow] = useState(1);
  const [apiaryCoordinates, setApiaryCoordinates] = useState({
    lng: 0,
    lat: 0
  });
  const [isMarkerVisible, isMarkerVisibleHandler] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState({ lat: 0, lng: 0 });
  const { ADD_APIARY } = apiaryMutations;
  const [addApiary] = useMutation(ADD_APIARY, {
    onCompleted() {
      hashHistory.push("/");
    }
  });
  const classes = useApiaryCreateStyles();
  const commonClasses = useCommonStyle();

  const getUserLocation = () => {
    const geo = navigator.geolocation;

    if (geo) {
      geo.getCurrentPosition(({ coords: { longitude, latitude } }) => {
        setUserCoordinates({
          lng: longitude,
          lat: latitude
        });
      });
    } else {
      console.log("geolocation is unavailable");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const setNewApiaryCoordinates = ({ lng, lat }) => {
    isMarkerVisibleHandler(true);
    setApiaryCoordinates({ lng, lat });
  };

  const onApiaryCreate = e => {
    e.preventDefault();
    addApiary({
      variables: {
        name: apiaryName,
        numberOfBeehivesInRow: numberOfBeehivesInRow,
        coordinates: apiaryCoordinates
      },
      refetchQueries: [{ query: fetchApiaries }],
      awaitRefetchQueries: true
    });
  };

  return (
    <div>
      <Link to="/">
        <ArrowBackIcon className={classes.backIcon} />
      </Link>
      <Typography
        component="h1"
        className={classnames(classes.addApiaryHeading, commonClasses.heading)}
      >
        Nowa pasieka
      </Typography>
      <form className={classes.addApiaryForm}>
        <div className={classes.formInputs}>
          <label htmlFor="apiaryName">Nazwa pasieki:</label>
          <input
            id="apiaryName"
            onChange={({ target: { value } }) => setApiaryName(value)}
            value={apiaryName}
          />
          <label htmlFor="numberOfBeehivesInRow">Liczba uli w rzędzie:</label>
          <input
            id="numberOfBeehivesInRow"
            min={1}
            type="number"
            onChange={({ target: { value } }) =>
              setNumberOfBeehivesInRow(Number(value))
            }
            value={numberOfBeehivesInRow}
          />
          <div className={classes.formButton}>
            <Button
              onClick={e => onApiaryCreate(e)}
              className={commonClasses.primaryButton}
            >
              Zapisz
            </Button>
          </div>
        </div>
        <div className={classes.apiaryLocation}>
          <label htmlFor="apiaryLocation">Lokalizacja pasieki:</label>
          <ApiaryCreateMap
            id="apiaryLocation"
            userCoordinates={userCoordinates}
            setNewApiaryCoordinates={setNewApiaryCoordinates}
            isMarkerVisible={isMarkerVisible}
          />
        </div>
      </form>
    </div>
  );
};

export default ApiaryCreate;
