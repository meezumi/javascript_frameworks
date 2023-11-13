import React, { useState } from "react";

function App() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");

  function handlefirstName(event) {
    setfname(event.target.value);
  }

  function handlelastName(event) {
    setlname(event.target.value);
  }
  return (
    <div className="container">
      <h1>
        Hello {fname} {lname}
      </h1>
      <form>
        <input
          onChange={handlefirstName}
          name="fName"
          placeholder="First Name"
          value={fname}
        />
        <input
          onChange={handlelastName}
          name="lName"
          placeholder="Last Name"
          value={lname}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
