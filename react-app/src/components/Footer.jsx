import { Link } from "react-router-dom";
import logo from "../images/favicon.png";
export default function Footer() {
  const devs = [
    [
      "Chris Ludwell",
      "https://www.linkedin.com/in/christian-ludwell-047b18247/",
      "https://github.com/cludwell",
      "https://cludwell.github.io/#",
    ],

    [
      "Dylan Godeck",
      "https://www.linkedin.com/in/dylan-godeck-188622252/",
      "https://github.com/DylanJG01",
      "https://dylanjg01.github.io/",
    ],

    [
      "Chris MacMaster",
      "https://www.linkedin.com/in/christopher-macmaster-9b05b3113/",
      "https://github.com/Chris-MacMaster",
      "https://chris-macmaster.github.io/Portfolio/",
    ],

    [
      "Marc Guggenheim",
      "https://www.linkedin.com/in/marc-guggenheim-270165275/",
      "https://github.com/MarcGugg",
      "https://marcgugg.github.io/",
    ],
  ];
  return (
    <div className="flex flex-row flex-wrap justify-center w-full p-4 mt-16 sm:pb-16 min-h-96 bg-slate-600">
      <div className="mt-16 ml-16 w-80">
        <img src={logo} alt="logo" className="object-cover w-20 sm:w-24" />
        <p className="my-2 font-serif baskerville sm:text-lg text-slate-900">
          Spacey Industries Ltd.
        </p>
        <p className="my-2 font-serif baskerville sm:text-lg text-slate-900">
          Providing e-commerce since 2023
        </p>
      </div>
      <div className="mt-16 ml-4 md:ml-16 ">
        <h2 className="text-2xl font-bold baskerville text-slate-900">DEVELOPERS </h2>
        <div className="flex flex-row mt-4">
          {devs.map((dev, i) => (
            <div className="flex flex-col mx-4" key={`footerperson${i}`}>
              <p className="font-bold uppercase text-slate-900 marcellus" key={`footerpersonname${i}`}>
                {devs[i][0]}
              </p>
              <Link
                to={{ pathname: `${dev[1]}` }}
                target="_blank"
                className="flex text-slate-400 visited:text-slate-300 hover:underline marcellus"
              >
                LinkedIn
              </Link>
              <Link
                to={{ pathname: `${dev[2]}` }}
                target="_blank"
                className="flex text-slate-400 visited:text-slate-300 hover:underline marcellus"
              >
                Github
              </Link>
              <Link
                to={{ pathname: `${dev[3]}` }}
                target="_blank"
                className="flex text-slate-400 visited:text-slate-300 hover:underline marcellus"
              >
                Portfolio
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
