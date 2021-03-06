import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography, Button, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { string, shape } from 'prop-types';
import fetchApiary from '../../queries/fetchApiary';
import BeehiveCreateModal from '../Beehives/BeehiveCreateModal';
import BeehivesList from '../Beehives/BeehivesList';
import Loading from '../common/Loading';
import Error from '../common/Error';
import useApiaryDetailsStyles from './ApiaryDetails.style';
import useCommonStyle from '../../style/common';

const ApiaryDetails = ({ params }) => {
  const classes = useApiaryDetailsStyles();
  const commonClasses = useCommonStyle();
  const { data, error, loading } = useQuery(fetchApiary, {
    variables: {
      id: params.id,
    },
  });
  const [isAddBeehiveOpen, setIsAddBeehiveOpen] = useState(false);

  const handleIsAddBeehiveOpen = () => {
    setIsAddBeehiveOpen(!isAddBeehiveOpen);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  const { apiary } = data;
  const { name, beehives, numberOfBeehivesInRow } = apiary;
  const numberOfBeehives = beehives.length;
  const activeBeehives = beehives.filter((beehive) => beehive.active);

  return (
    <div>
      <Link to="/apiaries" className={commonClasses.link}>
        <Tooltip title="Wróc do widoku pasiek">
          <ArrowBackIcon className={commonClasses.backIcon} />
        </Tooltip>
      </Link>
      <Typography component="h1" className={commonClasses.heading}>
        {name}
      </Typography>
      <Typography>{`Liczba uli: ${numberOfBeehives}`}</Typography>
      <Typography>{`Liczba aktywych uli: ${activeBeehives.length}`}</Typography>
      <Typography>{`Uli w rzędzie: ${numberOfBeehivesInRow}`}</Typography>
      {numberOfBeehives > 0 && (
      <BeehivesList
        apiaryId={params.id}
        beehives={beehives}
      />
      )}
      <div className={classes.addNewBeehiveIcon}>
        <Tooltip title="Dodaj ul do pasieki">
          <Button
            onClick={handleIsAddBeehiveOpen}
            className={commonClasses.primaryButton}
          >
            <AddIcon fontSize="large" />
          </Button>
        </Tooltip>
      </div>
      <BeehiveCreateModal
        apiaryName={name}
        isAddBeehiveOpen={isAddBeehiveOpen}
        numberOfBeehives={numberOfBeehives}
        numberOfBeehivesInRow={numberOfBeehivesInRow}
        apiaryId={params.id}
        handleIsAddBeehiveOpen={handleIsAddBeehiveOpen}
      />
    </div>
  );
};

ApiaryDetails.propTypes = {
  params: shape({
    id: string.isRequired,
  }).isRequired,
};

export default ApiaryDetails;
