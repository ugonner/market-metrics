import { Card, CardBody, CardHeader } from "react-bootstrap";
import { IMetricsData } from "../typings/metrics";

interface IMetricAnaltyticsProp {
  metricItem: IMetricsData;
}
export const MetricAnalytics = ({ metricItem }: IMetricAnaltyticsProp) => {
  const clickThroughRate =
    ((Number(metricItem.clicks) / Number(metricItem.impressions)) * 100).toFixed(2) + "%";
  const conversionRate =
  ((Number(metricItem.conversions) / Number(metricItem.impressions)) * 100).toFixed(2) + "%"
  const costPerClick = (Number(metricItem.clicks) / Number(metricItem.spend)).toLocaleString("en-us", {style: "currency", currency: "NGN"})
  const costPerConversion =
    (Number(metricItem.conversions) / Number(metricItem.spend)).toLocaleString("en-us",{style: "currency", currency: "NGN"});
  
    return (
    <div className="row text-center">
      <Card>
        <CardHeader>
          <h4>{metricItem.campaignName}</h4>
          <span className="d6">
            Spends {metricItem.spend.toLocaleString("en-us",{style: "currency", currency: "NGN"})} for {metricItem.impressions} impressions
          </span>
        </CardHeader>
        <CardBody>
          <div className="row mb-4">
            <div className="col-sm-6">
              <div className="fs-6">Click Through Rate (CTR)</div>
              <div className="fs-1">{clickThroughRate}</div>
              <div className="fs-6"> clicks | {metricItem.clicks}</div>
            </div>

            <div className="col-sm-6">
              <div className="fs-6">Cost Per Click (CPC) </div>
              <div className="fs-1">{costPerClick}</div>
              <div className="fs-6"> clicks | {metricItem.clicks}</div>
            </div>

</div>
<div className="row mb-5">

            <div className="col-sm-6">
              <div className="fs-6">Conversion Rate (CR)</div>
              <div className="fs-1">{conversionRate}</div>
              <div className="fs-6">
                {" "}
                conversions | {metricItem.conversions}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="fs-6">Cost Per Conversion (CPCr)</div>
              <div className="fs-1">{costPerConversion}</div>
              <div className="fs-6">
                {" "}
                conversions | {metricItem.conversions}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
