// import React from 'react'
import {useState} from 'react'
import logoU from "../ubelle.png";
const PhotoCard = () => {

    const [userDetails, setUserDetails] = useState("")

    const handleUserDetails = (e) => {
        setUserDetails(e.target.value)
    }
    



  return (
    <main className="mt-20 flex">
    <div>
      <h1 className='font-mono font-bold text-2xl mx-4'>Welcome to the Trainee (Graduants) Portal</h1>

      <form className='form'>
        <label htmlFor="userImage">Upload a photo</label>
        <input type='file' id="userImage"/>

        <label htmlFor="regNo">Registration Number</label>
        <input type='text' id="regNo" onChange={handleUserDetails} value={userDetails} className='border'/>
      </form>
    </div>



    {/* "babel": "@babel/plugin-proposal-private-property-in-object" */}

    <div className="">
      <p className='bg-slate-400 p-2 text-white mb-8'>Preview</p>
      <h1 className="font-mono text-4xl font-bold mb-4">Trainee Photocard</h1>
      <img alt="user" src={logoU} width={200} className="border-2 border-blue-300 rounded-lg mx-auto mb-8"/>

      <div className="w-3/4 mx-auto">
        
        <h1 className="border-b-4 border-blue-400 font-bold text-xl mb-6 pb-3">Student Details</h1>
        
        <div className="w-full flex mb-10">
          {/* Column 1: Title */}
          <div className="text-left mr-6 text-xl leading-10">
            <p>Registration Number:</p>
            <p>Trainee&apos;s Names:</p>
            <p>NIN:</p>
            <p>State of Origin</p>
            <p>Programme of Study</p>
          </div>

          {/* Column 2: Data */}
          <div className="text-left font-bold uppercase text-xl leading-10">
              <p>{userDetails}</p>
              <p>Lagbaja Tamedo</p>
              <p>1223435</p>
              <p>Niger</p>
              <p>Course</p>
          </div>

        </div>

        <h1 className="border-b-4 border-blue-400 font-bold text-xl mb-6 pb-3">Certification(s)</h1>
        
        <div className="w-full flex gap-y-4">
          {/* Column 1: Title */}
          <div className="text-left mr-6 text-xl leading-10">
            <p>Course Title:</p>
          </div>

          {/* Column 2: Data */}
          <div className="text-left leading-10">
              <p>The number appears here.</p>
          </div>

        </div>
      </div>

      
    </div>
  </main>
  )
}

export default PhotoCard