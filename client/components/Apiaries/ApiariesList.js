import React, { useState, Fragment } from "react";
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
import DnsIcon from "@material-ui/icons/Dns";
import useApiariesListStyles from "./ApiariesList.style";
import useCommonStyle from "../../style/common";

const ApiariesList = () => {
  const [isInListView, handleListViewChange] = useState(true);
  const { data, error, loading } = useQuery(fetchApiaries);
  const { DELETE_APIARY } = apiaryMutations;
  const [deleteApiary] = useMutation(DELETE_APIARY);
  const classes = useApiariesListStyles();
  const commonClasses = useCommonStyle();

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
    viewIcon,
    deleteIcon,
    cardText,
    actions,
    apiariesCardsSection,
    cardName,
    topIconsSection
  } = classes;

  const renderApiariesList = apiaries => {
    return (
      <div className={apiariesCardsSection}>
        {apiaries.map(({ id, name, beehives }) => {
          return (
            <Card key={id} id={id} className={card}>
              <CardContent>
                <Link to={`/apiaries/${id}`}>
                  <Typography variant="h6" className={cardName}>
                    {name}
                  </Typography>
                </Link>
                <Typography variant="body1" className={cardText}>
                  Liczba uli w pasiece: <b>{beehives.length}</b>
                </Typography>
              </CardContent>
              <CardActions className={actions}>
                <DeleteIcon
                  className={deleteIcon}
                  onClick={() => onApiaryDelete(id)}
                />
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
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
    const apiariesList = renderApiariesList(apiaries);
    const apiariesMap = <ApiariesListMap apiaries={apiaries} />;
    return (
      <div>
        <div className={topIconsSection}>
          {isInListView ? (
            <MapIcon
              className={viewIcon}
              onClick={() => onChangeViewClick(isInListView)}
            />
          ) : (
            <DnsIcon
              className={viewIcon}
              onClick={() => onChangeViewClick(isInListView)}
            />
          )}
        </div>
        {isInListView ? apiariesList : apiariesMap}
        <div className={classes.addNewApiaryButton}>
          <Link to="/apiaries/new">
            <Button className={commonClasses.primaryButton}>
              <AddIcon fontSize="large" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default ApiariesList;
