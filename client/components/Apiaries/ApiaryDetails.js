import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import fetchApiary from "../../queries/fetchApiary";
import { Link } from "react-router";
import BeehiveCreate from "../Beehives/BeehiveCreate";
import BeehivesList from "../Beehives/BeehivesList";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useApiaryDetailsStyles from "./ApiaryDetails.style";
import { Typography, Button, Card } from "@material-ui/core";

const ApiaryDetails = ({ params: { id } }) => {
  const classes = useApiaryDetailsStyles();
  const { data, error, loading } = useQuery(fetchApiary, {
    variables: {
      id: id
    }
  });
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const handleIsAddFormVisible = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  } else {
    const { apiary } = data;
    const { name, beehives, numberOfBeehivesInRow } = apiary;
    const numberOfBeehives = beehives.length;

    return (
      <div className={classes.apiaryDetailsContainer}>
        <Link to="/">
          <ArrowBackIcon className={classes.backIcon} />
        </Link>
        <Typography variant="h1" className={classes.apiaryName}>
          {name}
        </Typography>
        <Typography variant="body1" className={classes.apiaryInfo}>
          {`Liczba uli w pasiece: ${numberOfBeehives}`}
        </Typography>
        <Typography variant="body1" className={classes.apiaryInfo}>
          {`Liczba uli w rzędzie: ${numberOfBeehivesInRow}`}
        </Typography>
        {numberOfBeehives > 0 && <BeehivesList beehives={beehives} />}
        <Button onClick={handleIsAddFormVisible} className={classes.button}>
          Dodaj ul do pasieki
        </Button>
        {isAddFormVisible && (
          <BeehiveCreate
            handleIsAddFormVisible={handleIsAddFormVisible}
            isAddFormVisible={isAddFormVisible}
            numberOfBeehives={numberOfBeehives}
            numberOfBeehivesInRow={numberOfBeehivesInRow}
            apiaryId={id}
          />
        )}
      </div>
    );
  }
};

export default ApiaryDetails;
