// app/api/users/route.js
import dbConnect from '@utils/dbconnect'
import Items from '@models/Items'
import Slugify from 'slugify'

export async function POST(req, res) {
  await dbConnect()

  const { name, quantity, price, saleprice, group, user, barcode, category, photo, slug } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 })
  }

  const existingItem = await Items.findOne({ name })

  if (existingItem) {
    return new Response(JSON.stringify({ message: 'Item already exists' }), { status: 400 })
  }

  const item = new Items({
    name,
    quantity,
    price,
    saleprice,
    group,
    user,
    barcode,
    category,
    slug: Slugify(name, { lower: true })
  })

  await item.save()

  return new Response(JSON.stringify({ message: 'Item created successfully', item }), { status: 201 })
}
