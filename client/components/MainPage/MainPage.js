import React from "react";
import fetchApiaries from "../../queries/fetchApiaries";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { Typography } from "@material-ui/core";
import useCommonStyles from "../../style/common";

const MainPage = () => {
  const { data, error, loading } = useQuery(fetchApiaries);
  const commonStyles = useCommonStyles();
  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    return (
      <div>
        <Typography component="h1" className={commonStyles.heading}>
          Witaj w swojej pasiece
        </Typography>
        <Typography>{`Aktywne pasieki: ${data.apiaries.length}`}</Typography>
      </div>
    );
  }
};

export default MainPage;
