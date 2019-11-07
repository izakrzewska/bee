import React from "react";
import { graphql } from "react-apollo";
import fetchApiary from "../../queries/fetchApiary";
import { Link } from "react-router";
import BeehiveCreate from "../Beehives/BeehiveCreate";
import BeehivesList from "../Beehives/BeehivesList";

const ApiaryDetails = props => {
  const { apiary } = props.data;

  if (!apiary) {
    return <div>Loading...</div>;
  }

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
        apiaryId={props.params.id}
      />
    </div>
  );
};

export default graphql(fetchApiary, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(ApiaryDetails);
