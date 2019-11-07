import React from "react";
import PropTypes from "prop-types";

const BeehivesList = ({ beehives }) => {
  const renderBeehives = beehives => {
    return beehives.map(({ content, colors, active, position, id }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          {colors.map(color => (
            <div key={color}>{color}</div>
          ))}
          {active ? "Aktywny" : "Nieaktywny"}
          <div>
            {`Rząd: ${position.row} Miejsce w rzędzie: ${position.number}`}
          </div>
        </li>
      );
    });
  };

  return <ul className='collection'>{renderBeehives(beehives)}</ul>;
};

BeehivesList.propTypes = {
  beehives: PropTypes.array.isRequired
};

export default BeehivesList;
