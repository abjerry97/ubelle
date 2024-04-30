import logoU from "../ubelle.png";
export const Header =()=>{
    return  <header className="App-header p-10">
    <h1 className="font-bold text-blue-700">
      <img alt="" src={logoU} width={150} className="inline mr-12" />
      <a
        href="https://www.ubellenigeria.com/"
        target="_blank"
        rel="noreferrer"
        className="hover:text-blue-900"
      >
        Ubelle Nigeria Limited
      </a>{" "}
      |{" "}
      <a
        href="https://techneo.ng/"
        target="_blank"
        rel="noreferrer"
        className="hover:text-blue-900"
      >
        Neo Cloud Technologies
      </a>
    </h1>
  </header>
}