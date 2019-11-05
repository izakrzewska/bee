import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchApiaries from "../queries/fetchApiaries";
import ApiariesListMap from "./Map/ApiariesListMap";

class ApiariesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true
    };
  }

  onApiaryDelete(id) {
    this.props
      .mutate({
        variables: { id }
      })
      .then(() => this.props.data.refetch());
  }

  renderApiaries(apiaries) {
    if (apiaries) {
      return apiaries.map(({ id, name, numberOfBeehivesInRow }) => {
        return (
          <li key={id} className='collection-item'>
            <Link to={`/apiaries/${id}`}>{name}</Link>
            <div>liczba uli w rzędzie: {numberOfBeehivesInRow} </div>
            <i
              className='material-icons'
              onClick={() => this.onApiaryDelete(id)}>
              delete
            </i>
          </li>
        );
      });
    }
  }

  changeView() {
    this.setState(prevState => ({
      listView: !prevState.listView
    }));
  }

  render() {
    const apiariesList = (
      <ul className='collection'>
        {this.renderApiaries(this.props.data.apiaries)}
      </ul>
    );

    const apiariesMap = <ApiariesListMap apiaries={this.props.data.apiaries} />;

    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <button onClick={() => this.changeView()}>Zmień widok</button>
          {this.state.listView ? apiariesList : apiariesMap}
          <Link to='/apiaries/new' className='btn-floating btn-large red right'>
            <i className='material-icons'>add</i>
          </Link>
        </div>
      );
    }
  }
}

const mutation = gql`
  mutation DeleteApiary($id: ID) {
    deleteApiary(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchApiaries)(ApiariesList));
