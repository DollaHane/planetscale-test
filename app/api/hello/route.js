import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const books = await prisma.bookSuggestions.findMany();
  return new Response(JSON.stringify(books), {success: true})
}

export async function POST(req) {
  const body = await req.json()
  const newEntry = await prisma.bookSuggestions.create({
    data: {
      bookTitle: body.title,
      bookAuthor: body.author,
      bookGenre: body.genre,
    }
  })
  return new Response(JSON.stringify(newEntry), { success: true })
}


/*


***** API **************************
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await addBook(req, res)
  } else if (req.method === 'GET') {
    return await readBooks(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function readBooks(req, res) {
  const body = req.body;
  try {
    const books = await prisma.bookSuggestions.findMany();
    return res.status(200).json(books, {success: true})
  } catch (error) {
    console.log(error) 
    return res.status(500).json({error: "Error reading from database..", success: false})
  }
}

async function addBook(req, res) {
  const body = req.body
  try {
    const newEntry = await prisma.bookSuggestions.create({
      data: {
        bookTitle: body.title,
        bookAuthor: body.author,
        bookGenre: body.genre,
      }
    })
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating question', success: false })
  }
}

*/