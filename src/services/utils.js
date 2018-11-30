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

export const getHeadersFromContext = context => {
  return context.getHeaders();
};
export const extractRequestInfo = (context, req) => {
  const url = context.url + req.subUrl;
  const method = req.method;
  const params = req.params;
  const data = req.data;
  const headers = getHeadersFromContext(context);
  return {
    url,
    params,
    data,
    method,
    headers
  };
};
