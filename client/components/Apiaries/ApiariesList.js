import React, { useState, Fragment } from "react";
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router";
import fetchApiaries from "../../queries/fetchApiaries";
import ApiariesListMap from "../Map/ApiariesListMap";
import apiaryMutations from "../../mutations/apiary_mutations";
import Loading from "../common/Loading";
import Error from "../common/Error";
import AddIcon from "@material-ui/icons/Add";
import useApiariesListStyles from "./ApiariesList.style";
import useCommonStyle from "../../style/common";
import ApiaryCard from "./ApiaryCard";

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

  const renderApiariesList = apiaries => {
    return (
      <Fragment>
        <div className={classes.apiariesCardsSection}>
          {apiaries.map(apiary => {
            return (
              <ApiaryCard
                key={apiary.id}
                apiary={apiary}
                onApiaryDelete={onApiaryDelete}
              />
            );
          })}
        </div>
        <div className={classes.addNewApiaryButton}>
          <Link to="/apiaries/new">
            <Button className={commonClasses.primaryButton}>
              <AddIcon fontSize="large" />
            </Button>
          </Link>
        </div>
      </Fragment>
    );
  };

  const onChangeViewClick = () => {
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
        <div className={classes.switchViewSection}>
          <FormControlLabel
            control={
              <Switch
                checked={!isInListView}
                onChange={onChangeViewClick}
                name="mapView"
                color="primary"
              />
            }
            label="Mapa"
          />
        </div>
        {isInListView ? apiariesList : apiariesMap}
      </div>
    );
  }
};

export default ApiariesList;
