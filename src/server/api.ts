const BASE_URL = 'http://localhost:8080';

export async function fetchClient(
  path: string,
  options?: RequestInit
): Promise<Response> {
  try {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    throw error;
  }
}
