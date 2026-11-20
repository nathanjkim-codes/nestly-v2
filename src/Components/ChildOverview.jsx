import { calculateAge } from "../utils/calculateAge";
import { formatDate } from "../utils/formatDate";

function ChildOverview({ child }) {
  const age = calculateAge(child.profile.birthDate);

  return (
    <div className="child-overview">
      <div className="child-overview-info">
        <h2 className="child-name">{child.profile.name}</h2>
        <p className="child-age">
          {age.years > 0 ? `${age.years} years ` : ""}
          {age.months} months old • {child.profile.gender}
        </p>
        <p className="child-birthdate">
          Born{" "}
          {child.profile.birthDate
            ? formatDate(child.profile.birthDate)
            : "Unknown"}
        </p>
      </div>
      <div className="ai-insight">
        <h4 className="insight-title">
          {child.insight?.title ?? "No insight available"}
        </h4>
        <h3 className="insight-message">
          {child.insight?.message ?? "No message"}
        </h3>
        <p className="insight-description">
          {child.insight?.description ?? "No description"}
        </p>
      </div>
    </div>
  );
}
export default ChildOverview;
