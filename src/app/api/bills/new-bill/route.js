// app/api/users/route.js
import dbConnect from '@utils/dbconnect'

import Bills from '@models/Bills'

import Slugify from 'slugify'

export async function POST(req, res) {
  await dbConnect()

  const { name, items, quantity, group, user } = await req.json()

  const itemsarr = items
    .split(',')
    .map(items => items.trim())
    .filter(items => items !== '')
  const quantityarr = quantity
    .split(',')
    .map(quantity => quantity.trim())
    .filter(quantity => quantity !== '')

  const bill = new Bills({
    name,
    items: itemsarr,
    quantity: quantityarr,
    group,
    user
  })

  await bill.save()

  return new Response(JSON.stringify({ message: 'Item created successfully', bill }), { status: 201 })
}
