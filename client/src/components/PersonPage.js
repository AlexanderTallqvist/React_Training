import React from "react";

const needsPerson = check => Component => props => {
  const { person } = props;

  if (!person) {
    return null;
  }

  if (!check(person)) {
    return "Forbidden";
  }

  return <Component {...props} person={person} />;
};

const NeedsPerson = props => {
  const { person, check, children, ...rest } = props;
  console.log(person);

  if (!person) {
    return null;
  }

  if (!check(person)) {
    return "Forbidden";
  }

  return children({
    ...rest,
    person
  });
};

const PersonPage = props => {
  return (
    <NeedsPerson person={props.person} check={p => true}>
      {({ person }) => (
        <div>
          <strong>{person.firstName}</strong>, {person.firstName}
        </div>
      )}
    </NeedsPerson>
  );
};

export default PersonPage;
