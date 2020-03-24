import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import fetchApiary from "../../queries/fetchApiary";
import { Link } from "react-router";
import BeehiveCreateModal from "../Beehives/BeehiveCreateModal";
import BeehivesList from "../Beehives/BeehivesList";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useApiaryDetailsStyles from "./ApiaryDetails.style";
import { Typography, Button } from "@material-ui/core";
import useCommonStyle from "../../style/common";
import AddIcon from "@material-ui/icons/Add";

const ApiaryDetails = ({ params: { id } }) => {
  const classes = useApiaryDetailsStyles();
  const commonClasses = useCommonStyle();
  const { data, error, loading } = useQuery(fetchApiary, {
    variables: {
      id: id
    }
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
  } else {
    const { apiary } = data;
    const { name, beehives, numberOfBeehivesInRow } = apiary;
    const numberOfBeehives = beehives.length;

    return (
      <div className={classes.apiaryDetailsContainer}>
        <Link to="/" className={commonClasses.link}>
          <ArrowBackIcon className={commonClasses.backIcon} />
        </Link>
        <div className={classes.apiaryInfo}>
          <Typography component="h1" className={commonClasses.heading}>
            {name}
          </Typography>
          <Typography>{`Liczba uli: ${numberOfBeehives}`}</Typography>
          <Typography>{`Uli w rzędzie: ${numberOfBeehivesInRow}`}</Typography>
        </div>

        {numberOfBeehives > 0 && <BeehivesList beehives={beehives} />}
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
  }
};

export default ApiaryDetails;
