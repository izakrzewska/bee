import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { string } from 'prop-types';
import fetchApiary from '../../queries/fetchApiary';
import BeehiveCreateModal from '../Beehives/BeehiveCreateModal';
import BeehivesList from '../Beehives/BeehivesList';
import Loading from '../common/Loading';
import Error from '../common/Error';
import useApiaryDetailsStyles from './ApiaryDetails.style';
import useCommonStyle from '../../style/common';


const ApiaryDetails = ({ params: { id } }) => {
  const classes = useApiaryDetailsStyles();
  const commonClasses = useCommonStyle();
  const { data, error, loading } = useQuery(fetchApiary, {
    variables: {
      id,
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
        <ArrowBackIcon className={commonClasses.backIcon} />
      </Link>
      <Typography component="h1" className={commonClasses.heading}>
        {name}
      </Typography>
      <Typography>{`Liczba uli: ${numberOfBeehives}`}</Typography>
      <Typography>{`Liczba aktywych uli: ${activeBeehives.length}`}</Typography>
      <Typography>{`Uli w rzędzie: ${numberOfBeehivesInRow}`}</Typography>
      {numberOfBeehives > 0 && (
      <BeehivesList
        apiaryId={apiary.id}
        isActiveApiary={apiary.active}
        beehives={beehives}
      />
      )}
      <div className={classes.addNewBeehiveIcon}>
        <Button
          onClick={handleIsAddBeehiveOpen}
          className={commonClasses.primaryButton}
        >
          <AddIcon fontSize="large" />
        </Button>
      </div>
      <BeehiveCreateModal
        apiaryName={name}
        isAddBeehiveOpen={isAddBeehiveOpen}
        numberOfBeehives={numberOfBeehives}
        numberOfBeehivesInRow={numberOfBeehivesInRow}
        apiaryId={id}
        handleIsAddBeehiveOpen={handleIsAddBeehiveOpen}
      />
    </div>
  );
};

ApiaryDetails.propTypes = {
  params: {
    id: string.isRequired,
  }.isRequired,
};

export default ApiaryDetails;
