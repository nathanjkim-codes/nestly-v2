function ChildOverview({ child }) {
  return (
    <div className="child-overview">
      <div className="child-overview-info">
        <h2>{child.name}</h2>
        <p>
          {child.age} • {child.gender}
        </p>
        <p>Born {child.birthDate}</p>
      </div>
      <div className="ai-insight">
        <h4>{child.insight.title}</h4>
        <h3>{child.insight.message}</h3>
        <p>{child.insight.description}</p>
      </div>
    </div>
  );
}
export default ChildOverview;
