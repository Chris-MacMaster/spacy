import "./LoadingIcon.css";
import rocket from "../../images/rocket.gif";
export default function LoadingIcon() {
  return (
    <div className="loading-container">
      <img src={rocket} alt="" className="loading-icon" />
    </div>
  );
}
