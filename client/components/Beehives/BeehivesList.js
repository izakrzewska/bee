import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import uuid from "uuid";

class BeehivesList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  }

  renderBeehives() {
    return this.props.beehives.map(({ content, colors, active, position }) => {
      return (
        <li key={uuid()} className='collection-item'>
          {content}
          {colors.map(color => (
            <div>{color}</div>
          ))}
          {active ? "Aktywny" : "Nieaktywny"}
          <div>
            {`Rząd: ${position.row} Miejsce w rzędzie: ${position.number}`}
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className='collection'>{this.renderBeehives()}</ul>;
  }
}

BeehivesList.propTypes = {
  beehives: PropTypes.array.isRequired
};

const mutation = gql`
  mutation likeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(BeehivesList);
