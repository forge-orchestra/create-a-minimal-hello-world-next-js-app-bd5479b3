// lib/api.ts

import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Type for API response data
 */
export type ApiResponse<T> = {
  data: T;
  error?: string;
};

/**
 * Fetch data from a given API endpoint
 * @param url - The API endpoint URL
 * @returns A promise that resolves to the API response
 */
export async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data: T = await response.json();
    return { data };
  } catch (error) {
    return { data: null as any, error: error.message };
  }
}

/**
 * Handle API requests with proper error handling
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 * @param handler - Function to handle the request
 */
export async function handleApiRequest<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<T>
): Promise<void> {
  try {
    const result = await handler(req, res);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { fetchData, handleApiRequest };