export interface BrowserResponse<T> {
  success: boolean;
  message: T;
  data?: T;
  error?: {
    message: string;
  };
}

const request = <T, P = void>(
  url: string,
  body: P | null,
  headers?: HeadersInit | undefined,
  method?: string
): Promise<BrowserResponse<T>> => {
  const isValidBody = body && Object.keys(body).length > 0;
  const isValidHeader = headers && Object.keys(headers).length > 0;
  const originalHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method: method || 'GET',
    body: isValidBody ? JSON.stringify(body) : null,
    headers: isValidHeader
      ? Object.assign(originalHeaders, headers)
      : originalHeaders,
  };

  return fetch(url, options)
    .then((result) => {
      return result.json();
    })
    .catch((e) => {
      throw Error(e);
    });
};

export const sendToApi = <T, P>(
  method: string,
  url: string,
  body: P,
  header?: HeadersInit | undefined
): Promise<BrowserResponse<T>> => {
  return request<T, P>(url, body, header, method);
};

export const getFromApi = <T>(
  url: string,
  header?: HeadersInit | undefined
): Promise<BrowserResponse<T>> => {
  return request<T>(url, null, header, 'GET');
};
