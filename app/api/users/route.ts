import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import Cors from 'cors';
import { User } from '@/types/user';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',
});

// Helper method to run middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Dummy user data
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Handle GET request
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Handle POST request
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
    };

    users.push(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}