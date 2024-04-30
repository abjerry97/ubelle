 

import { useEffect, useState } from "react";
import "./App.css";  
import makeRequest from "./axios";

function App() {
   const [students,setStudents]= useState(null)

const [loading,setLoading]=useState(false)
   useEffect(async ()=>{
    try {
      setLoading(true)
      const response = await makeRequest.get("students")

      setStudents(response.data)
      setLoading(false)
    } catch (error) {
      alert(error.message)
      setLoading(false)
    }
   })
  return (
    <div>
      <ul>
        <li>{JSON.stringify(students)}</li>
      </ul>
    </div>
  );
}

export default App;
