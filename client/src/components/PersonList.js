import React from "react";
import Person from "./Person";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

const PersonList = props => {
  const { persons, firePerson, showMetaData } = props;
  const avgAge = persons.reduce((r, p) => r + p.age, 0) / persons.count();

  return (
    <div>
      {showMetaData && (
        <h3>
          Number of persons: {persons.count()}, Average age: {avgAge.toFixed(2)}
        </h3>
      )}

      {persons
        .toList()
        .sortBy(p => p.firstName)
        .sortBy(p => p.lastName)
        .map(p => (
          <Person key={p.id} person={p} firePerson={firePerson} />
        ))}
    </div>
  );
};

PersonList.propTypes = {
  firePerson: PropTypes.func.isRequired,
  persons: ImmutablePropTypes.map.isRequired,
  showMetaData: PropTypes.bool.isRequired
};

PersonList.defaultProps = {
  showMetaData: false
};

export default PersonList;
