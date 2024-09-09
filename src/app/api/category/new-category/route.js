import dbConnect from '@utils/dbconnect'
import Category from '@models/Category'
import Slugify from 'slugify'

export async function POST(req, res) {
  await dbConnect()

  const { name } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 })
  }

  const existingCategory = await Category.findOne({ name })
  if (existingCategory) {
    return new Response(JSON.stringify({ message: 'Category already exists' }), { status: 400 })
  }

  const cate = new Category({ name, slug: Slugify(name) })
  await cate.save()

  return new Response(JSON.stringify({ message: 'Category created successfully', cate }), { status: 201 })
}
