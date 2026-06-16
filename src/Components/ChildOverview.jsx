function ChildOverview(props) {
  return (
    <div className="child-overview">
      <div className="child-overview-info">
        <h2>{props.child.name}</h2>
        <p>
          {props.child.age} • {props.child.gender}
        </p>
        <p>Born {props.child.birthDate}</p>
      </div>
      <div className="ai-insight">
        <h4>{props.child.insight.title}</h4>
        <h3>{props.child.insight.message}</h3>
        <p>{props.child.insight.description}</p>
      </div>
    </div>
  );
}
export default ChildOverview;
