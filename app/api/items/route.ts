import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Helper method to wait for a middleware to execute before continuing
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

type Item = {
  id: number;
  name: string;
  description: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const items: Item[] = await prisma.item.findMany();
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
      }
      break;

    case 'POST':
      try {
        const { name, description } = req.body;
        if (!name || !description) {
          return res.status(400).json({ error: 'Name and description are required' });
        }
        const newItem: Item = await prisma.item.create({
          data: { name, description },
        });
        res.status(201).json(newItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
      }
      break;

    case 'PUT':
      try {
        const { id, name, description } = req.body;
        if (!id || !name || !description) {
          return res.status(400).json({ error: 'ID, name, and description are required' });
        }
        const updatedItem: Item = await prisma.item.update({
          where: { id },
          data: { name, description },
        });
        res.status(200).json(updatedItem);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'ID is required' });
        }
        await prisma.item.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}