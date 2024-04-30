import avatar from "../avatar.png";
import { useEffect, useState } from "react";

import makeRequest from "../axios";
import { Header } from "./Header";
import { useParams } from "react-router-dom";

function PreviewStudent() {
  let { studentId } = useParams();
  const [userDetails, setUserDetails] = useState({
    regNo: "",
    name: "",
    nin: "",
    stateOfOrigin: "",
    progOfStudy: "",
    img: "",
    cert: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await makeRequest.get(`/students/${studentId}`);

        const { id, name, nin, image, state, regNo, program, Certification } =
          response.data.data;
        setUserDetails({
          regNo,
          name,
          nin,
          stateOfOrigin: state,
          progOfStudy: program,
          img: image,
          cert: Certification,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="flex flex-col">
        <p className="bg-slate-400 p-4 text-white mb-16">Preview Tab</p>
        {error ? (
          <>{error}</>
        ) : loading ? (
          <>Loading</>
        ) : (
          <div className="w-full flex items-center flex-col">
            <div className=" w-full md:w-8/12">
              <h1 className="font-mono text-2xl font-bold mb-4">
                Trainee Photocard
              </h1>
              {userDetails.img ? (
                <img
                  alt="user"
                  src={`/${userDetails.img}`}
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
                      // onClick={() => addCertification(true)}
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
          </div>
        )}
      </main>
    </div>
  );
}

export default PreviewStudent;
