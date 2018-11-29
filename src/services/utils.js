import axios from "axios";

export type Irequest = {
  url: string,
  method?: string,
  data?: any,
  params?: any,
  headers?: any
};

export const commonFetch = (request: Irequest) => {
  const { method, data = {}, params = {}, headers = {}, url } = request;
  return axios({
    url,
    method,
    data,
    params,
    headers
  });
};
