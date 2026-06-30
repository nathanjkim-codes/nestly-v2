function ChildOverview({ child }) {
  return (
    <div className="child-overview">
      <div className="child-overview-info">
        <h2 className="child-name">{child.profile.name}</h2>
        <p className="child-age">
          {child.profile.age} • {child.profile.gender}
        </p>
        <p className="child-birthdate">Born {child.profile.birthDate}</p>
      </div>
      <div className="ai-insight">
        <h4 className="insight-title">{child.insight.title}</h4>
        <h3 className="insight-message">{child.insight.message}</h3>
        <p className="insight-description">{child.insight.description}</p>
      </div>
    </div>
  );
}
export default ChildOverview;
