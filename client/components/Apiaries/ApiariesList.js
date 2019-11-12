import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router";
import fetchApiaries from "../../queries/fetchApiaries";
import ApiariesListMap from "../Map/ApiariesListMap";
import apiaryMutations from "../../mutations/apiary_mutations";
import Loading from "../common/Loading";
import Error from "../common/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import MapIcon from "@material-ui/icons/Map";
import useStyles from "./ApiariesList.style";

const ApiariesList = () => {
  const [isInListView, handleListViewChange] = useState(true);
  const { data, error, loading } = useQuery(fetchApiaries);
  const { DELETE_APIARY } = apiaryMutations;
  const [deleteApiary] = useMutation(DELETE_APIARY);
  const classes = useStyles();

  const onApiaryDelete = id => {
    deleteApiary({
      variables: { id: id },
      refetchQueries: [
        {
          query: fetchApiaries
        }
      ]
    });
  };

  const {
    card,
    mapIcon,
    deleteIcon,
    cardText,
    button,
    actions,
    container
  } = classes;

  const renderApiaries = apiaries => {
    return apiaries.map(({ id, name, beehives }) => {
      return (
        <Card id={id} className={card}>
          <Link to={`/apiaries/${id}`}>
            <CardContent>
              <Typography variant='h6' className={cardText}>
                {name}
              </Typography>
              <Typography variant='body1' className={cardText}>
                Liczba uli w pasiece: <b>{beehives.length}</b>
              </Typography>
            </CardContent>
          </Link>
          <CardActions className={actions}>
            <DeleteIcon
              className={deleteIcon}
              onClick={() => onApiaryDelete(id)}
            />
          </CardActions>
        </Card>
      );
    });
  };

  const onChangeViewClick = isInListView => {
    handleListViewChange(!isInListView);
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    const { apiaries } = data;
    const apiariesList = renderApiaries(apiaries);
    const apiariesMap = <ApiariesListMap apiaries={apiaries} />;
    return (
      <div className={container}>
        <MapIcon
          className={mapIcon}
          onClick={() => onChangeViewClick(isInListView)}
        />
        <div>{isInListView ? apiariesList : apiariesMap}</div>
        <Link to='/apiaries/new'>
          <Button className={button}>
            <AddIcon fontSize='large' />
          </Button>
        </Link>
      </div>
    );
  }
};

export default ApiariesList;
