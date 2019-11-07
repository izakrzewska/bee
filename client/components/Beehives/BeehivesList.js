import React, { Component } from "react";
import PropTypes from "prop-types";

class BeehivesList extends Component {
  renderBeehives() {
    return this.props.beehives.map(
      ({ content, colors, active, position, id }) => {
        return (
          <li key={id} className='collection-item'>
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
      }
    );
  }

  render() {
    return <ul className='collection'>{this.renderBeehives()}</ul>;
  }
}

BeehivesList.propTypes = {
  beehives: PropTypes.array.isRequired
};

export default BeehivesList;
