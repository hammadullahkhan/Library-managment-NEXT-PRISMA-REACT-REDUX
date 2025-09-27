import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

function corsMiddleware(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return true
  }
  return false
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | { error: string }>
) {
  // Apply CORS
  if (corsMiddleware(req, res)) return

  if (req.method === 'GET') {
    try {
      const categories = await prisma.book.findMany({
        select: { category: true },
        distinct: ['category']
      })
      
      const categoryList = categories.map(c => c.category)
      res.status(200).json(categoryList)
    } catch (error) {
      console.error('Error fetching categories:', error)
      res.status(500).json({ error: 'Failed to fetch categories' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}