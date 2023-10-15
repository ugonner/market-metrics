import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Toast } from "react-bootstrap";
import {
  IErrorInfo,
  IMetricsData,
  IMetricsErrorInfo,
} from "../../typings/metrics";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const SetMetrics = () => {
  const [metricsData, setMetricsData] = useState({
    campaignName: "",
    impressions: 0,
    clicks: 0,
    conversions: 0,
    spend: 0,
  } as IMetricsData);
const [serverMessage, setServerMessage] = useState("")

  const [metricsErrorInfo, setMetricsErrorInfo] = useState(
    {} as IMetricsErrorInfo
  );
  const [metricsCreated, setmetricsCreated] = useState(false)

  const navigate = useNavigate();

  const [metricsDataIsErrored, setmetricsDataIsErrored] = useState(true);

  const handleInput = (eventTarget: HTMLInputElement) => {
    const { name, value } = eventTarget;

    if (name === "spend" && !/^[\d,]+(\.\d{2})?$/.test(value)) {
      setMetricsErrorInfo({
        ...metricsErrorInfo,
        [name]: {
          status: true,
          message: `${name} must be a valid currency format`,
        },
      });
      return;
    }

    if (!["campaignName", "spend"].includes(name) && !/^[0-9]+$/.test(value)) {
      setMetricsErrorInfo({
        ...metricsErrorInfo,
        [name]: { status: true, message: `${name} must be a numer` },
      });
      return;
    }

    if (name === "clicks") {
      if (metricsData.impressions && Number(value) > metricsData.impressions) {
        setMetricsErrorInfo({
          ...metricsErrorInfo,
          [name]: {
            status: true,
            message: `clicks cannot be more than impression r`,
          },
        });
        return;
      }
    }

    if (name === "conversions") {
      if (metricsData.impressions && Number(value) > metricsData.clicks) {
        setMetricsErrorInfo({
          ...metricsErrorInfo,
          [name]: {
            status: true,
            message: `conversons cannot be more than impression r`,
          },
        });
        return;
      }
    }
    const formattedValue = !["campaignName", "spend"].includes(name) ? Number(value) : value;
    setMetricsData({ ...metricsData, [name]: formattedValue });
    //reste error object
    setMetricsErrorInfo({
      ...metricsErrorInfo,
      [name]: {
        status: false,
        message: "",
      },
    });
  };

  const saveMetric =  () => {
    
    const url = baseUrl+"/metrics";
    axios.post(url, metricsData)
      .then((res) => {
        setmetricsCreated(true)
        setServerMessage(res.data.message);
        toast.success(res.data.message);
      })
      .catch((err) => {
        setServerMessage(err.data?.message ?? err.message)
        console.log(err)
        //alert(JSON.stringify(err))
      })

  }

  return (
    <div className="row">
      <div className="col-sm-2"></div>
      <div className="col-sm-8">
        <Card>
          <CardHeader>
            <h2 className="mb-5">Create Metrics</h2>
            <p>
              Input your desired user engagement metrics data.
              <br />
              <small>
                Data will be stored and Analytics information will be gernerated
                and viewed in your analytics tab
              </small>
            </p>
            <p>
              <small>
                Note Conversions, Clicks can not be greater than impressions
              </small>
            </p>
          </CardHeader>
          <CardBody>
            <form>
              <div>
                <h6 className="text-danger">{serverMessage}</h6>
              </div>
              <div className="form-group">
                <label htmlFor="impressions">Canmpaign Name</label>
                <input
                  className="form-control lg"
                  required={true}
                  type="text"
                  name="campaignName"
                  placeholder="My campaign"
                  onChange={(e) => handleInput(e.target)}
                />
                <div className="text-danger">
                  {" "}
                  {metricsErrorInfo.campaignName?.status
                    ? metricsErrorInfo.campaignName?.message
                    : ""}{" "}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="impressions">Impressions</label>
                <input
                  className="form-control lg"
                  required={true}
                  type="number"
                  name="impressions"
                  placeholder="1"
                  onChange={(e) => handleInput(e.target)}
                />
                <div className="text-danger">
                  {" "}
                  {metricsErrorInfo.impressions?.status
                    ? metricsErrorInfo.impressions?.message
                    : ""}{" "}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="impressions">Clicks</label>
                <input
                  className="form-control lg"
                  required={true}
                  type="number"
                  name="clicks"
                  placeholder="1"
                  onChange={(e) => handleInput(e.target)}
                />
                <div className="text-danger font-weight-bolder">
                  {" "}
                  {metricsErrorInfo.clicks?.status
                    ? metricsErrorInfo.clicks?.message
                    : ""}{" "}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="impressions">Conversions</label>
                <input
                  className="form-control lg"
                  required={true}
                  type="number"
                  name="conversions"
                  placeholder="1"
                  onChange={(e) => handleInput(e.target)}
                />
                <div className="text-danger font-weight-bolder">
                  {" "}
                  {metricsErrorInfo.conversions?.status
                    ? metricsErrorInfo.conversions?.message
                    : ""}{" "}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="impressions">Spend</label>
                <input
                  className="form-control lg"
                  required={true}
                  type="text"
                  name="spend"
                  placeholder="20,000.00"
                  onChange={(e) => handleInput(e.target)}
                />
                <div className="text-danger font-weight-bolder">
                  {" "}
                  {metricsErrorInfo.spend?.status
                    ? metricsErrorInfo.spend?.message
                    : ""}{" "}
                </div>
              </div>

              <div className="form-group">
                <button
                  disabled={
                    Object.values(metricsErrorInfo).find(
                      (ele: IErrorInfo) => ele?.status || ele.status
                    ) ||
                    Object.keys(metricsData).length >
                      Object.keys(metricsErrorInfo).length
                      ? true
                      : false
                  }
                  className="btn btn-primary btn-block round-pill w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    saveMetric();
                  }}
                >
                  Save Metrics
                </button>
              </div>
            </form>
            <div>
              {
                metricsCreated ? 
                (
                  
            <button className="btn btn-block btn-succcess"
            onClick={() => navigate(`/analytics/${metricsData.campaignName}`) }
            >Retrieve Metrics</button>
                )
                :
                (<></>)
              }
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="col-sm-2"></div>
    </div>
  );
};
