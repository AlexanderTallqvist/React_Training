import React from "react";
import PersonList from "./PersonList";
import { List, Map } from "immutable";
import HirePersonForm from "./HirePersonForm";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const personsQuery = gql`
  query {
    getPersons {
      id
      firstName
      lastName
      gender
      age
      handedness
      relatedToCEO
    }
  }
`;

const IndexPage = props => {
  const { hirePerson, firePerson } = props;

  return (
    <Query query={personsQuery}>
      {({ loading, data }) => {
        if (loading) {
          return "Laddare...";
        }

        const persons = List(data.getPersons);

        const isGood = p => {
          if (p.relatedToCEO === true) {
            return true;
          }
          return p.age < 30 && p.gender === "m" && p.handedness === "r";
        };

        const goodPersons = persons.filter(isGood);
        const badPersons = persons.filter(p => !isGood(p));

        return (
          <div>
            <HirePersonForm hirePerson={hirePerson} />
            <h2>Bad People</h2>
            <PersonList
              showMetaData={true}
              persons={badPersons}
              firePerson={firePerson}
            />
            <h2>Good People</h2>
            <PersonList
              showMetaData={false}
              persons={goodPersons}
              firePerson={firePerson}
            />
          </div>
        );
      }}
    </Query>
  );
};

export default IndexPage;
