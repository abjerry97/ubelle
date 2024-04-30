import logoU from "../ubelle.png";
import avatar from "../avatar.png";
import { useState } from "react";

import Image2Base64 from "../utils/image2Base64";

import makeRequest from "../axios";
import { Header } from "./Header";

function AddStudent() {
  const [certification, addCertification] = useState(false);
  const [file, setFile] = useState("");
  const [userDetails, setUserDetails] = useState({
    regNo: "",
    name: "",
    nin: "",
    stateOfOrigin: "",
    progOfStudy: "",
    img: "",
    cert: [],
  });

  const handleUserImgUpload = async (e, field) => {
    const file = e.target.files[0];
    const imgData = await Image2Base64(file);
    if (field === "img") {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        img: "",
      }));
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        img: imgData,
      }));

      setFile(file);
    } else if (field === "cert") {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        cert: [...prevDetails.cert, imgData],
      }));
    }
  };

  const handleUserDetails = (e) => {
    const { name, value } = e.target;

    setUserDetails((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  };

  // API Call
  const handleSubmitUserDetails = async () => {
    const { regNo, name, nin, stateOfOrigin, progOfStudy, img, cert } =
      userDetails;

    if (regNo && name && nin && stateOfOrigin && progOfStudy && img && cert) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("nin", nin);
        formData.append("regNo", regNo);
        formData.append("state", stateOfOrigin);
        formData.append("program", progOfStudy);
        formData.append("file", file);

        const response = await makeRequest.post("students", formData);

        alert("User details saved successfully!");

        setUserDetails({
          regNo: "",
          name: "",
          nin: "",
          stateOfOrigin: "",
          progOfStudy: "",
          img: "",
          cert: [],
        });

        setFile("");
        // Error occurred
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    } else {
      // Required fields are missing
      alert("Please fill all the required fields!");
    }
  };

  return (
    <div className="App">
      <Header />

      <main className="flex flex-col md:flex-row">
        <div className="w-3/4 mx-auto">
          <h1 className="font-mono font-bold text-2xl p-3 text-white bg-blue-950">
            Form of Completion
          </h1>

          <form
            method="POST"
            action=""
            onSubmit={(e) => e.preventDefault()}
            className="container mx-auto flex flex-col p-24 gap-4 mt-12"
          >
            <div className="mb-4 mx-auto bg-white flex flex-col relative">
              {userDetails.img ? (
                <img
                  alt=""
                  src={userDetails.img}
                  className="rounded-full mx-4"
                  width="100px"
                />
              ) : (
                <img
                  alt=""
                  src={avatar}
                  className="rounded-full mx-4"
                  width="100px"
                />
              )}

              <label htmlFor="profileImg">
                <div className="absolute bottom-0 mx-auto cursor-pointer">
                  <p className="bg-white opacity-50 text-blue-800 text-center px-10 py-1.5">
                    Upload
                  </p>
                </div>
                <input
                  type={"file"}
                  id="profileImg"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUserImgUpload(e, "img")}
                />
              </label>
            </div>

            <input
              className="p-3 outline-none focus:border-b-2 focus:border-blue-400"
              type="text"
              name="regNo"
              placeholder="Registration Number"
              onChange={handleUserDetails}
              value={userDetails.regNo}
              required
            />
            <input
              className="p-3 outline-none focus:border-b-2 focus:border-blue-400"
              type="text"
              name="name"
              placeholder="Trainee's Name"
              onChange={handleUserDetails}
              value={userDetails.name}
              required
            />
            <input
              className="p-3 outline-none focus:border-b-2 focus:border-blue-400"
              type="text"
              name="nin"
              placeholder="Nin Address"
              onChange={handleUserDetails}
              value={userDetails.nin}
              required
            />
            <input
              className="p-3 outline-none focus:border-b-2 focus:border-blue-400"
              type="text"
              name="stateOfOrigin"
              placeholder="State of Origin"
              onChange={handleUserDetails}
              value={userDetails.stateOfOrigin}
              required
            />
            <input
              className="p-3 outline-none focus:border-b-2 focus:border-blue-400"
              type="text"
              name="progOfStudy"
              placeholder="Programme of Study"
              onChange={handleUserDetails}
              value={userDetails.progOfStudy}
              required
            />

            {certification && (
              <span className="flex items-center">
                <input
                  className="p-3 outline-none focus:border-b-2 focus:border-blue-400"
                  type="text"
                  name="certCourseTitle"
                  placeholder="Certification Course Title"
                  onChange={handleUserDetails}
                  value={userDetails.certCourseTitle}
                  required
                />

                <input
                  type="file"
                  name="cert"
                  id="cert"
                  accept="image/*"
                  onChange={(e) => handleUserImgUpload(e, "cert")}
                />
              </span>
            )}

            <button
              className="rounded-full bg-blue-400 text-white p-3 font-bold w-2/4 mx-auto hover:bg-blue-500 mt-4"
              type="submit"
              onClick={handleSubmitUserDetails}
            >
              Submit
            </button>
          </form>
        </div>

        <div className="w-2/4">
          <p className="bg-slate-400 p-4 text-white mb-16">Preview Tab</p>
          <h1 className="font-mono text-2xl font-bold mb-4">
            Trainee Photocard
          </h1>
          {userDetails.img ? (
            <img
              alt="user"
              src={userDetails.img}
              width={200}
              className="border-2 border-blue-300 rounded-xl mx-auto mb-8"
            />
          ) : (
            <img
              alt="default avatar"
              src={avatar}
              width={200}
              className="border-2 border-blue-300 rounded-lg mx-auto mb-8"
            />
          )}

          <div className="w-3/4 mx-auto">
            <h1 className="border-b-4 border-blue-400 font-bold text-xl mb-6 pb-3">
              Student Details
            </h1>

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
                <p>{userDetails.regNo}</p>
                <p>{userDetails.name}</p>
                <p>{userDetails.nin}</p>
                <p>{userDetails.stateOfOrigin}</p>
                <p>{userDetails.progOfStudy}</p>
              </div>
            </div>

            <h1 className="border-b-4 border-blue-400 font-bold text-xl mb-6 pb-3">
              Certification(s)
            </h1>

            <div className="w-full flex gap-y-4">
              {/* Column 1: Title */}
              <div className="text-left mr-6 text-xl leading-10">
                <button
                  onClick={() => addCertification(true)}
                  className="bg-blue-300 p-6 text-sm rounded-full"
                >
                  Add Certification
                </button>
                {/* <p>{userDetails.certCourseTitle}</p> */}
              </div>

              {/* Column 2: Data */}
              <div className="text-left leading-10">
                {userDetails.cert.map((certificate, index) => (
                  <img
                    key={index}
                    alt={`Certificate ${index + 1}`}
                    src={certificate}
                    className="rounded-full mx-4"
                    width="100px"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddStudent;
