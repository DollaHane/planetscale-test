require('dotenv').config()

export async function GET(req) {
  const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/resources/image`, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
      }
  }).then(res => res.json());
  if (req.method === 'GET') {
    return new Response(JSON.stringify(results), {success: true})
    } else {
      return res.status(405).json({ message: 'Method not allowed', success: false })
    }
}

