import React from "react";
import { useQuery } from "@apollo/react-hooks";
import fetchApiary from "../../queries/fetchApiary";
import { Link } from "react-router";
import BeehiveCreate from "../Beehives/BeehiveCreate";
import BeehivesList from "../Beehives/BeehivesList";

const ApiaryDetails = ({ params: { id } }) => {
  const { data, error, loading } = useQuery(fetchApiary, {
    variables: {
      id: id
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Przepraszamy, coś poszło nie tak: {error} </div>;
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
