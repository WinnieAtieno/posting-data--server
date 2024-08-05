import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");

  const [listOfStudents, setListOfStudents] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      age,
      description,
    };

// Post data to db
    fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "content-type": "application-json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        setListOfStudents(prevState => [...prevState, data]);

      }
    }).catch(error)(
      console.log(error)

    )
    
  }

  

  useEffect(() => {

    // fetching data
    // WE are handling this inside 
    fetch('http://localhost:3000/students')
    .then(resp => resp.json())
    .then(data => {
      setListOfStudents(data);
    })

  }, []);

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        onSubmit={handleSubmit}
      >
        <input
          style={{ padding: "4px" }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          style={{ padding: "4px" }}
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />
        <input
          style={{ padding: "4px" }}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />

        <button type="submit">Add Student Details</button>
      </form>

      <section>
        <h1>List of students</h1>
        {listOfStudents.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Age</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {listOfStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No student record</p>
        )}
      </section>
    </>
  );
}

export default App;
