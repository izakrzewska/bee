import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Typography } from '@material-ui/core';
import fetchApiaries from '../../queries/fetchApiaries';
import Loading from '../common/Loading';
import Error from '../common/Error';
import useCommonStyles from '../../style/common';

const MainPage = () => {
  const { data, error, loading } = useQuery(fetchApiaries);
  const commonStyles = useCommonStyles();
  if (loading) {
    return <Loading />;
  } if (error) {
    return <Error />;
  }
  return (
    <div>
      <Typography component="h1" className={commonStyles.heading}>
        Witaj w swojej pasiece
      </Typography>
      <Typography>{`Aktywne pasieki: ${data.apiaries.length}`}</Typography>
    </div>
  );
};

export default MainPage;
