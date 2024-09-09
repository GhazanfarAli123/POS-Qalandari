import dbConnect from '@utils/dbconnect'

import Category from '@models/Category'

export async function GET(req, { params }) {
  await dbConnect()

  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 })
  }

  try {
    const category = await Category.findById(id)

    if (!category) {
      return new Response(JSON.stringify({ message: 'Category not found' }), { status: 404 })
    }

    return new Response(JSON.stringify({ message: 'category fetched successfully', category }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
