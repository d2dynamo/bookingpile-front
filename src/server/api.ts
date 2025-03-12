import { APIResponseBody } from './types';

const BASE_URL = 'http://localhost:8080';

export async function fetchClient<T>(
  path: string,
  options?: RequestInit
): Promise<APIResponseBody<T>> {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, options);
  const body = await response.json();

  if (
    typeof body.error === 'undefined' ||
    typeof body.message === 'undefined'
  ) {
    throw new Error('Invalid response from server');
  }

  return body;
}
