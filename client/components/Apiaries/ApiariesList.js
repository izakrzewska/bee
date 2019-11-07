import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchApiaries from "../../queries/fetchApiaries";
import ApiariesListMap from "../Map/ApiariesListMap";
import fetchApiary from "../../queries/fetchApiary";

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

  const onChangeViewClick = () => {
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
        <button onClick={() => onChangeViewClick()}>Zmień widok</button>
        {isInListView ? apiariesList : apiariesMap}
        <Link to='/apiaries/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
};

const mutation = gql`
  mutation DeleteApiary($id: ID) {
    deleteApiary(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchApiaries)(ApiariesList));
