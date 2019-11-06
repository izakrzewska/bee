import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import enums from "../../enums";
import uuid from "uuid";
const PositionTypes = require("../../../server/schema/position_type");

class BeehiveCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      colors: [],
      active: false,
      statuses: []
    };
  }

  setValue(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  clearValue(key, value) {
    this.setState({
      [key]: value
    });
  }

  chooseBeehiveColor(chosenColor) {
    if (this.state.colors.includes(chosenColor)) {
      this.setState({
        colors: this.state.colors.filter(color => color !== chosenColor)
      });
    } else {
      this.setState({
        colors: [...this.state.colors, chosenColor]
      });
    }
  }

  changeBooleanValue(key, value) {
    this.setState({
      [key]: !value
    });
  }

  getPosition(numberOfBeehivesInRow, numberOfBeehives) {
    const rowValue = numberOfBeehives / numberOfBeehivesInRow + 1;
    let numberValue;
    const modulo = numberOfBeehives % numberOfBeehivesInRow;

    if (
      numberOfBeehives === 0 ||
      numberOfBeehives === numberOfBeehivesInRow ||
      modulo === 0
    ) {
      numberValue = 1;
    } else if (numberOfBeehives < numberOfBeehivesInRow) {
      numberValue = numberOfBeehives + 1;
    } else {
      numberValue = modulo + 1;
    }

    return {
      row: rowValue,
      number: numberValue
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          apiaryId: this.props.apiaryId,
          content: this.state.content,
          colors: this.state.colors,
          active: this.state.active,
          statuses: this.state.statuses,
          position: this.getPosition(
            this.props.numberOfBeehivesInRow,
            this.props.numberOfBeehives
          )
        }
      })
      .then(() => {
        this.clearValue("content", "");
        this.clearValue("colors", []);
        this.changeBooleanValue("active", this.state.active);
      });
  }

  render() {
    const { colors } = enums;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor='content'>Add a content</label>
        <input
          id='content'
          value={this.state.content}
          onChange={e => this.setValue(e, "content")}
        />
        <div>
          <h6>Wybierz kolory ula:</h6>
          {colors.map(color => {
            const { id, displayValue } = color;
            return (
              <div key={id}>
                <label key={uuid()} htmlFor={id}>
                  {displayValue}
                </label>
                <input
                  key={uuid()}
                  type='checkbox'
                  id={id}
                  value={id}
                  onChange={e => this.chooseBeehiveColor(e.target.value)}
                />
              </div>
            );
          })}
        </div>
        <div>
          <label htmlFor='active'>Aktywny:</label>
          <input
            type='checkbox'
            id='active'
            value={this.state.active}
            onChange={() =>
              this.changeBooleanValue("active", this.state.active)
            }
          />
        </div>
        <button
          className='btn-floating btn-large red right'
          onClick={e => this.onSubmit(e)}>
          Dodaj
        </button>
      </form>
    );
  }
}

BeehiveCreate.propTypes = {
  numberOfBeehives: PropTypes.number.isRequired,
  numberOfBeehivesInRow: PropTypes.number.isRequired,
  apiaryId: PropTypes.string.isRequired
};

const mutation = gql`
    mutation addBeehiveToApiary($apiaryId: ID, $content: String, $colors: [String], $active: Boolean, $statuses: [String], $position: ${PositionTypes.PositionInputType}){
        addBeehiveToApiary(apiaryId: $apiaryId, content: $content, colors: $colors, active: $active, statuses: $statuses, position: $position) {
            name
            id
            beehives {
                content
                colors
                active
                statuses
                position {
                    row
                    number
                }
            }
        }
    }
`;

export default graphql(mutation)(BeehiveCreate);
