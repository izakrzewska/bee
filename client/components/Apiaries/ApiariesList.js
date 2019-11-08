import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchApiaries from "../../queries/fetchApiaries";
import ApiariesListMap from "../Map/ApiariesListMap";
import fetchApiary from "../../queries/fetchApiary";
import apiaryMutations from "../../mutations/apiary_mutations";

const ApiariesList = ({ mutate }) => {
  const [isInListView, handleListViewChange] = useState(true);
  const { data, error, loading } = useQuery(fetchApiaries);

  const onApiaryDelete = id => {
    mutate({
      variables: { id },
      refetchQueries: [{ query: fetchApiary }]
    });
    // then refetch pasiek
  };

  const renderApiaries = apiaries => {
    return apiaries.map(({ id, name, beehives }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/apiaries/${id}`}>{name}</Link>
          <div>liczba uli w pasiece: {beehives.length} </div>
          <i className='material-icons' onClick={() => onApiaryDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  };

  const onChangeViewClick = isInListView => {
    handleListViewChange(!isInListView);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Przepraszamy, coś poszło nie tak: {error} </div>;
  } else {
    const apiariesList = (
      <ul className='collection'>{renderApiaries(data.apiaries)}</ul>
    );
    const apiariesMap = <ApiariesListMap apiaries={data.apiaries} />;
    return (
      <div>
        <button onClick={() => onChangeViewClick(isInListView)}>
          Zmień widok
        </button>
        {isInListView ? apiariesList : apiariesMap}
        <Link to='/apiaries/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
};

const { DELETE_APIARY } = apiaryMutations;
export default graphql(DELETE_APIARY)(ApiariesList);
