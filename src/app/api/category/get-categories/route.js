import dbConnect from '@utils/dbconnect'

import Category from '@models/Category'

export async function GET(req, res) {
  await dbConnect()
  try {
    const category = await Category.find({})
    return new Response(JSON.stringify({ message: 'Get all categories successfully', category }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store', // Prevents Vercel caching
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
