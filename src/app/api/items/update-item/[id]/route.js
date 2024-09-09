import dbConnect from '@utils/dbconnect'

import Items from '@models/Items'

import slugify from 'slugify'

export async function PUT(req, { params }) {
  await dbConnect()

  const { id } = params
  const { name, quantity, price, saleprice, group, user, barcode, category, photo, slug } = await req.json()

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 })
  }

  try {
    const existingItem = await Items.findById(id)

    if (!existingItem) {
      return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 })
    }

    if (name) existingItem.name = name
    if (quantity) existingItem.quantity = quantity
    if (price) existingItem.price = price
    if (saleprice) existingItem.saleprice = saleprice
    if (group) existingItem.group = group
    if (user) existingItem.user = user
    if (barcode) existingItem.barcode = barcode
    if (category) existingItem.category = category
    if (photo) existingItem.photo = photo
    if (name) existingItem.slug = slugify(name, { lower: true })

    await existingItem.save()

    return new Response(JSON.stringify({ message: 'Item updated successfully', item: existingItem }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
