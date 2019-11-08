import React, { useState } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchApiaries from "../../queries/fetchApiaries";
import ApiariesListMap from "../Map/ApiariesListMap";
import fetchApiary from "../../queries/fetchApiary";
import apiaryMutations from "../../mutations/apiary_mutations";

const ApiariesList = ({ mutate, data }) => {
  const [isInListView, handleListViewChange] = useState(true);
  const { refetch, apiaries, loading } = data;

  const onApiaryDelete = id => {
    mutate({
      variables: { id },
      refetchQueries: [{ query: fetchApiary }]
    }).then(() => refetch());
  };

  const renderApiaries = apiaries => {
    if (apiaries) {
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
    }
  };

  const onChangeViewClick = isInListView => {
    handleListViewChange(!isInListView);
  };

  const apiariesList = (
    <ul className='collection'>{renderApiaries(apiaries)}</ul>
  );
  const apiariesMap = <ApiariesListMap apiaries={apiaries} />;

  if (loading) {
    return <div>Loading...</div>;
  } else {
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
export default graphql(DELETE_APIARY)(graphql(fetchApiaries)(ApiariesList));
