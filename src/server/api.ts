const BASE_URL = 'http://localhost:8080';

export async function fetchClient(
  path: string,
  options?: RequestInit
): Promise<Response> {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }
  return response;
}
