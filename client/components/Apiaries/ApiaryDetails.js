import React from "react";
import { useQuery } from "@apollo/react-hooks";
import fetchApiary from "../../queries/fetchApiary";
import { Link } from "react-router";
import BeehiveCreate from "../Beehives/BeehiveCreate";
import BeehivesList from "../Beehives/BeehivesList";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";

const ApiaryDetails = ({ params: { id } }) => {
  const { data, error, loading } = useQuery(fetchApiary, {
    variables: {
      id: id
    }
  });

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
      <div>
        <Link to='/'>Back</Link>
        <h3>{name}</h3>
        <div>{`Liczba uli w pasiece: ${numberOfBeehives}`}</div>
        <div>{`Liczba uli w rzędzie: ${numberOfBeehivesInRow}`}</div>
        <BeehivesList beehives={beehives} />
        <BeehiveCreate
          numberOfBeehives={numberOfBeehives}
          numberOfBeehivesInRow={numberOfBeehivesInRow}
          apiaryId={id}
        />
      </div>
    );
  }
};

export default ApiaryDetails;
