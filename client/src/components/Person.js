import React, { memo } from "react";
import styles from "./Person.pcss";
import cx from "classnames";
import Button from "./Button";
import posed from "react-pose";
import { Link } from "react-router-dom";

const PosedBox = posed.div({
  hidden: {
    opacity: 0,
    width: "0%"
  },
  visible: {
    opacity: 1,
    width: "100%",
    transition: {
      width: { ease: "easeOut", duration: 3000 }
    }
  },
  gone: {
    rotate: 2000,
    scale: 0.2,
    transition: {
      duration: 5000
    }
  }
});

const PosedDetails = posed.strong({
  start: {
    position: "relative",
    left: "0%"
  },
  finish: {
    left: "45%",
    transition: {
      default: { ease: "linear", duration: 5000 }
    }
  }
});

const Person = props => {
  const { person, firePerson } = props;

  const calsses = cx(styles.person, {
    [styles.male]: person.gender === "m",
    [styles.female]: person.gender === "f"
  });
  return (
    <PosedBox
      className={calsses}
      initialPose="hidden"
      pose={person.isBeingFired ? "gone" : "visible"}
    >
      <div>
        <PosedDetails initialPose="start" pose="finish">
          <Link to={`/person/${person.id}`}>
            {person.lastName}, {person.firstName}
          </Link>
        </PosedDetails>
      </div>
      <div>
        <strong>Age:</strong> {person.age}
      </div>
      <div>
        <strong>Gender:</strong> {person.gender}
      </div>
      <div>
        <Button
          disabled={person.isBeingFired}
          block
          onClick={() => firePerson(person.id)}
        >
          Vapauta
        </Button>
      </div>
      {person.isBeingFired && <div>Odota hetki...</div>}
    </PosedBox>
  );
};

export default memo(Person);
