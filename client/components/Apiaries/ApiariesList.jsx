import React, { useState } from 'react';
import {
  Button, FormControlLabel, Switch, Tooltip,
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import fetchApiaries from '../../queries/fetchApiaries';
import fetchApiary from '../../queries/fetchApiary';
import ApiariesListMap from '../Map/ApiariesListMap';
import apiaryMutations from '../../mutations/apiary_mutations';
import Loading from '../common/Loading';
import Error from '../common/Error';
import useApiariesListStyles from './ApiariesList.style';
import useCommonStyle from '../../style/common';
import ApiaryCard from './ApiaryCard';

const ApiariesList = () => {
  const [isInListView, handleListViewChange] = useState(true);
  const { data, error, loading } = useQuery(fetchApiaries);
  const { DELETE_APIARY, DESACTIVATE_APIARY } = apiaryMutations;
  const [deleteApiary] = useMutation(DELETE_APIARY);
  const [desactivateApiary] = useMutation(DESACTIVATE_APIARY);
  const classes = useApiariesListStyles();
  const commonClasses = useCommonStyle();

  const onApiaryDelete = (id) => {
    deleteApiary({
      variables: { id },
      refetchQueries: [
        {
          query: fetchApiaries,
        },
      ],
    });
  };

  const apiaryDesactivateHandler = (id) => {
    desactivateApiary({
      variables: { id },
      refetchQueries: [
        {
          query: fetchApiary,
          variables: { id },
        },
      ],
    });
  };

  const renderApiariesList = (apiaries) => (
    [
      <div key="card" className={classes.apiariesCardsSection}>
        {apiaries.map((apiary) => (
          <ApiaryCard
            key={apiary.id}
            apiary={apiary}
            onApiaryDelete={onApiaryDelete}
            apiaryDesactivateHandler={apiaryDesactivateHandler}
          />
        ))}
      </div>,
      <div key="buttons" className={classes.addNewApiaryButton}>
        <Link to="/apiaries/new">
          <Tooltip title="Dodaj pasiekę">
            <Button className={commonClasses.primaryButton}>
              <AddIcon fontSize="large" />
            </Button>
          </Tooltip>
        </Link>
      </div>,
    ]
  );

  const onChangeViewClick = () => {
    handleListViewChange(!isInListView);
  };

  if (loading) {
    return <Loading />;
  } if (error) {
    return <Error />;
  }
  const { apiaries } = data;
  const apiariesList = renderApiariesList(apiaries);
  const apiariesMap = <ApiariesListMap apiaries={apiaries} />;
  return (
    <div>
      <div className={classes.switchViewSection}>
        <FormControlLabel
          control={(
            <Switch
              checked={!isInListView}
              onChange={onChangeViewClick}
              name="mapView"
              color="primary"
            />
            )}
          label="Mapa"
        />
      </div>
      {isInListView ? apiariesList : apiariesMap}
    </div>
  );
};

export default ApiariesList;
