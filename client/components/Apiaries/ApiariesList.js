import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router";
import fetchApiaries from "../../queries/fetchApiaries";
import ApiariesListMap from "../Map/ApiariesListMap";
import apiaryMutations from "../../mutations/apiary_mutations";

const ApiariesList = () => {
  const [isInListView, handleListViewChange] = useState(true);
  const { data, error, loading } = useQuery(fetchApiaries);
  const { DELETE_APIARY } = apiaryMutations;
  const [deleteApiary] = useMutation(DELETE_APIARY);

  const onApiaryDelete = id => {
    deleteApiary({
      variables: { id: id },
      refetchQueries: [
        {
          query: fetchApiaries
        }
      ]
    });
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

export default ApiariesList;
