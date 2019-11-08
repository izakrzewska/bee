import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import fetchApiaries from "../../queries/fetchApiaries";
import ApiaryCreateMap from "../Map/ApiaryCreateMap";
import apiaryMutations from "../../mutations/apiary_mutations";

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
      <Link to='/'>Back</Link>
      <h3>Dodaj nową pasiekę</h3>
      <form>
        <div>
          <label>Nazwa pasieki:</label>
          <input
            onChange={({ target: { value } }) => setApiaryName(value)}
            value={apiaryName}
          />
        </div>
        <div>
          <label>Liczba uli w rzędzie:</label>
          <input
            min={1}
            type='number'
            onChange={({ target: { value } }) =>
              setNumberOfBeehivesInRow(Number(value))
            }
            value={numberOfBeehivesInRow}
          />
        </div>
        <div>
          <div>My location :</div>
          <ApiaryCreateMap
            userCoordinates={userCoordinates}
            setNewApiaryCoordinates={setNewApiaryCoordinates}
            isMarkerVisible={isMarkerVisible}
          />
        </div>
        <div>
          <button
            onClick={e => onApiaryCreate(e)}
            className='btn-floating btn-large red right'>
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApiaryCreate;
