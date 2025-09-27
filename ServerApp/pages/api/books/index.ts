import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { BookFilters, BooksResponse, BookCreateInput } from '../../../types'

// CORS middleware function
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
  res: NextApiResponse
) {
  // Apply CORS
  if (corsMiddleware(req, res)) return

  const { method, query } = req

  switch (method) {
    case 'GET':
      try {
        const {
          page = '1',
          limit = '12',
          category,
          sortBy = 'title',
          sortOrder = 'asc',
          search
        } = query as Record<string, string>

        const skip = (parseInt(page) - 1) * parseInt(limit)
        const take = parseInt(limit)

        const where: any = {}
        
        if (category && category !== 'all') {
          where.category = category
        }
        
        if (search) {
          where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { author: { contains: search, mode: 'insensitive' } }
          ]
        }

        const orderBy: Record<string, 'asc' | 'desc'> = {}
        orderBy[sortBy] = sortOrder as 'asc' | 'desc'

        const [books, total] = await Promise.all([
          prisma.book.findMany({
            where,
            orderBy,
            skip,
            take
          }),
          prisma.book.count({ where })
        ])

        const response: BooksResponse = {
          books,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          }
        }

        res.status(200).json(response)
      } catch (error) {
        console.error('Error fetching books:', error)
        res.status(500).json({ error: 'Failed to fetch books' })
      }
      break

    case 'POST':
      try {
        const bookData: BookCreateInput = req.body
        const book = await prisma.book.create({
          data: bookData
        })
        res.status(201).json(book)
      } catch (error) {
        console.error('Error creating book:', error)
        res.status(500).json({ error: 'Failed to create book' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}