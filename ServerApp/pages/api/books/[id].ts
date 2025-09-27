import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { BookUpdateInput } from '../../../types'

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

  const { method, query: { id } } = req
  const bookId = parseInt(id as string)

  if (isNaN(bookId)) {
    return res.status(400).json({ error: 'Invalid book ID' })
  }

  switch (method) {
    case 'GET':
      try {
        const book = await prisma.book.findUnique({
          where: { id: bookId }
        })
        
        if (!book) {
          return res.status(404).json({ error: 'Book not found' })
        }
        
        res.status(200).json(book)
      } catch (error) {
        console.error('Error fetching book:', error)
        res.status(500).json({ error: 'Failed to fetch book' })
      }
      break

    case 'PUT':
      try {
        const updateData: BookUpdateInput = req.body
        const book = await prisma.book.update({
          where: { id: bookId },
          data: updateData
        })
        res.status(200).json(book)
      } catch (error) {
        console.error('Error updating book:', error)
        res.status(500).json({ error: 'Failed to update book' })
      }
      break

    case 'DELETE':
      try {
        await prisma.book.delete({
          where: { id: bookId }
        })
        res.status(204).end()
      } catch (error) {
        console.error('Error deleting book:', error)
        res.status(500).json({ error: 'Failed to delete book' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}