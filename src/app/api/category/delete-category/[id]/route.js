import dbConnect from '@utils/dbconnect'

import Category from '@models/Category'

export async function DELETE(req, { params }) {
  await dbConnect()

  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 })
  }

  try {
    const category = await Category.findByIdAndDelete(id)

    if (!category) {
      return new Response(JSON.stringify({ message: 'Category not found' }), { status: 404 })
    }

    return new Response(JSON.stringify({ message: 'Category deleted successfully', category }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
