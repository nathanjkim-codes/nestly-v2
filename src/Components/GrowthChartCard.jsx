import {
  heightConversion,
  weightConversion,
} from "../utils/measurementConversion";
import { measurementUnits } from "../utils/measurementUnits";
import { formatDecimal } from "../utils/formatDecimal";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function GrowthChartCard({ growthRecords, selectedUnit }) {
  const units = measurementUnits(selectedUnit);

  const convertedGrowthRecords = growthRecords.map((record) => {
    return {
      date: record.date,
      height: heightConversion(record.height, selectedUnit),
      weight: weightConversion(record.weight, selectedUnit),
    };
  });

  const hasGrowthRecords = growthRecords.length >= 1;

  const latestGrowthRecord = hasGrowthRecords
    ? growthRecords[growthRecords.length - 1]
    : null;

  const hasPreviousRecord = growthRecords.length >= 2;

  const previousGrowthRecord = hasPreviousRecord
    ? growthRecords[growthRecords.length - 2]
    : null;

  const heightDifference = hasPreviousRecord
    ? latestGrowthRecord.height - previousGrowthRecord.height
    : null;

  const weightDifference = hasPreviousRecord
    ? latestGrowthRecord.weight - previousGrowthRecord.weight
    : null;

  const trendHeightUp =
    hasPreviousRecord &&
    latestGrowthRecord.height > previousGrowthRecord.height;

  const trendWeightUp =
    hasPreviousRecord &&
    latestGrowthRecord.weight > previousGrowthRecord.weight;

  const trendHeightDown =
    hasPreviousRecord &&
    latestGrowthRecord.height < previousGrowthRecord.height;

  const trendWeightDown =
    hasPreviousRecord &&
    latestGrowthRecord.weight < previousGrowthRecord.weight;

  let trendHeight;

  if (!hasPreviousRecord) {
    trendHeight = "none";
  } else if (trendHeightUp) {
    trendHeight = "up";
  } else if (trendHeightDown) {
    trendHeight = "down";
  } else {
    trendHeight = "same";
  }

  let trendWeight;

  if (!hasPreviousRecord) {
    trendWeight = "none";
  } else if (trendWeightUp) {
    trendWeight = "up";
  } else if (trendWeightDown) {
    trendWeight = "down";
  } else {
    trendWeight = "same";
  }

  let trendHeightDisplay;

  if (trendHeight === "none") {
    trendHeightDisplay = "No previous measurement";
  } else if (trendHeight === "up") {
    trendHeightDisplay = "↑";
  } else if (trendHeight === "down") {
    trendHeightDisplay = "↓";
  } else {
    trendHeightDisplay = "No change";
  }

  let trendWeightDisplay;

  if (trendWeight === "none") {
    trendWeightDisplay = "No previous measurement";
  } else if (trendWeight === "up") {
    trendWeightDisplay = "↑";
  } else if (trendWeight === "down") {
    trendWeightDisplay = "↓";
  } else {
    trendWeightDisplay = "No change";
  }

  return (
    <div className="dashboard-card growth-chart-card">
      <div className="chart-header">
        <h3 className="card-title">Growth Over Time</h3>
        <button className="card-action-button">View all</button>
      </div>
      {hasGrowthRecords ? (
        <>
          <div className="chart-legend">
            <p className="legend-height">◆ Height ({units.height})</p>
            <p className="legend-weight">● Weight ({units.weight})</p>
          </div>
          <div className="growth-chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={convertedGrowthRecords}
                margin={{ top: 30, right: 24, left: -10, bottom: 20 }}
              >
                <CartesianGrid vertical={false} stroke="#1E293B" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  padding={{ left: 12, right: 12 }}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  domain={[0, "dataMax + 5"]}
                />

                <Tooltip />

                <Line
                  dataKey="height"
                  stroke="#4F7CFF"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  dataKey="weight"
                  stroke="#FF5C9A"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="summary-row">
            <div className="summary-card">
              <p className="summary-label">Height</p>
              <h3 className="summary-value">
                {hasGrowthRecords
                  ? `${formatDecimal(heightConversion(latestGrowthRecord.height, selectedUnit))} ${units.height}`
                  : null}
              </h3>
              <p className="summary-percentile">72nd percentile</p>
              <p className="summary-trend">
                {hasPreviousRecord
                  ? `${trendHeightDisplay} ${formatDecimal(heightConversion(heightDifference, selectedUnit))} ${units.height} from last month`
                  : null}
              </p>
            </div>

            <div className="summary-card">
              <p className="summary-label">Weight</p>
              <h3 className="summary-value">
                {hasGrowthRecords
                  ? `${formatDecimal(weightConversion(latestGrowthRecord.weight, selectedUnit))} ${units.weight}`
                  : null}
              </h3>
              <p className="summary-percentile">65th percentile</p>
              <p className="summary-trend">
                {hasPreviousRecord
                  ? `${trendWeightDisplay} ${formatDecimal(weightConversion(weightDifference, selectedUnit))} ${units.weight} from last month`
                  : null}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="growth-empty-state">
          <p>No growth records yet.</p>
        </div>
      )}
    </div>
  );
}
export default GrowthChartCard;
