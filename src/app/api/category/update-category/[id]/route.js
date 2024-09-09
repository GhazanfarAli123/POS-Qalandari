import dbConnect from '@utils/dbconnect'

import Category from '@models/Category'

import slugify from 'slugify'

export async function PUT(req, { params }) {
  await dbConnect()

  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 })
  }

  const { name } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ message: 'Category is required' }), { status: 400 })
  }

  try {
    const category = await Category.findById(id)

    if (!category) {
      return new Response(JSON.stringify({ message: 'Category not found' }), { status: 404 })
    }

    category.name = name
    category.slug = slugify(name)

    const updatedCategory = await category.save()

    return new Response(JSON.stringify({ message: 'Category updated successfully', category: updatedCategory }), {
      status: 200
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
