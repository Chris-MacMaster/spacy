import rocket from "../images/rocket.gif";
export default function LoadingIcon() {
  return (
    <div className="flex flex-row justify-center  m-[15vw] min-h-screen ">
      <img
        src={rocket}
        alt="loading animation"
        className="object-cover aspect-square max-w-96 max-h-96"
      />
    </div>
  );
}
