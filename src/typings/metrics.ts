export interface IMetricsData{
    campaignName: string,
    impressions: number,
    clicks: number,
    conversions: number,
    spend: number,
  }

  export interface IErrorInfo {
    status: boolean,
    message: string
  }

  export interface IMetricsErrorInfo {
    campaignName: IErrorInfo,
    impressions: IErrorInfo,
    clicks: IErrorInfo,
    conversions: IErrorInfo,
    spend: IErrorInfo,
  }