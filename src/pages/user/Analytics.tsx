import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import { IMetricsData } from "../../typings/metrics";
import { useParams } from "react-router-dom";
import { MetricAnalytics } from "../../components/MetricsAnalytics";
import { baseUrl } from "../../utils/api";
import axios from 'axios'
import { toast } from "react-toastify";

export const Analytics = () => {
    const navParam = useParams();
    const [metricItems, setMetricItems] = useState([
        {
            impressions: 6,
            clicks: 4,
            conversions: 2,
            spend: 20,
            campaignName: "Ugo"
        }
    ] as IMetricsData[])

    

  const getMetrics =  () => {
    const queryParam = navParam.campaignName;
    const query = queryParam === "all" ?"": `campaignName=${queryParam}`
    alert(query)
    const url = baseUrl+"/metrics?"+query;
    axios.get(url, {
        headers: {
          "content-type": "application/json"
        }
      })
      .then((res) => {
        setMetricItems(res.data.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message)
        ///alert(JSON.stringify(err))
      })

  }

    useEffect(() => {
      getMetrics()
    }, [])
  return (
    <div className="row">
      <div className="col-sm-2"></div>
      <div className="col-sm-8">
        {
            metricItems?.length > 0 ?
            (
                metricItems.map((item) => <MetricAnalytics metricItem={item}  /> )
            )
            :
            (
                <div className="row">
                <div className="col-sm-3"></div>
                  <div className="col-sm-6">
                    <h3>No Metrics Found</h3>
                  </div>
                  <div className="col-sm-3"></div>
                </div>
            )
        }
      </div>
      <div className="col-sm-2"></div>
    </div>
  );
}