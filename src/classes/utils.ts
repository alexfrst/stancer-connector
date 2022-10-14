import { AxiosResponse } from "axios";

function logAxiosResponse(response: AxiosResponse): AxiosResponse {
    console.log(
    JSON.stringify({
      response: {
        body: response?.data,
        status: response?.status,
      },
      request: {
        body: response.config.headers,
        url: response.config.url,
        method: response.config.method,
        params: response.config.params,
      },
    })
  );
  return response;
}

function logAxiosError(err: any): any {
  console.log(JSON.stringify(err));
  return err;
}

export { logAxiosResponse, logAxiosError };
