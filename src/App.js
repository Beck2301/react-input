import React, { useState } from "react";

function Lista({ persons }) {
  const renderedPersons = persons.map(person => {
    const { firstname, lastname } = person;
    const fullName = `${firstname} ${lastname}`;
    return <li>{fullName}</li>;
  });
  return <ul>{renderedPersons}</ul>;
}

//este
function Manera1() {
  const [persons, setPersons] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  //agregar y setear personas nuevas
  function addPerson() {
    setPersons(prevPersons => {
      const newPerson = { firstname, lastname };
      return [...prevPersons, newPerson];
    });
    setFirstname("");
    setLastname("");
  }

  return (
    <>
      <input
        value={firstname}
        onChange={({ target: { value } }) => setFirstname(value)}
      />
      <input
        value={lastname}
        onChange={({ target: { value } }) => setLastname(value)}
      />
      <button onClick={addPerson}>Agregar</button>
      <Lista persons={persons} />
    </>
  );
}

export default function Manera2() {
  const [persons, setPersons] = useState([]);

  //evento para setear
  function onSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const [$first, $last] = target.querySelectorAll("input");
    const firstname = $first.value;
    const lastname = $last.value;
    setPersons(prevPersons => {
      return [
        ...prevPersons,
        {
          firstname,
          lastname
        }
      ];
    });
    $first.value = "";
    $last.value = "";
  }

  return (
    <form onSubmit={onSubmit}>
      <div class="form-group">
        <input className="form-control" />
        <input />
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </div>
      <Lista persons={persons} />
    </form>
  );
}
