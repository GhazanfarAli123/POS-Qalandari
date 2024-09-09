import dbConnect from '../../../../../utils/dbconnect'
import MarketGetItems from '../../../../../models/MarketGetItems'
import Slugify from 'slugify'
import path from 'path'
import { promises as fs } from 'fs'

async function saveFile(file) {
  const uploadPath = path.join(process.cwd(), 'public', 'uploads')

  await fs.mkdir(uploadPath, { recursive: true })

  const ext = path.extname(file.name)
  const filename = `${Slugify(path.basename(file.name, ext), { lower: true })}-${Date.now()}${ext}`
  const filepath = path.join(uploadPath, filename)

  await fs.writeFile(filepath, Buffer.from(await file.arrayBuffer()))

  return `/uploads/${filename}`
}

export async function PATCH(req, res) {
  await dbConnect()

  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()

  const formData = await req.formData()
  const name = formData.get('name')
  const quantity = formData.get('quantity')
  const group = formData.get('group')
  const user = formData.get('user')
  const itemstatus = formData.get('itemstatus')
  const category = formData.get('category')
  const imageFile = formData.get('image')
  const price = formData.get('price')

  if (!id) {
    return new Response(JSON.stringify({ message: 'Item ID is required' }), { status: 400 })
  }

  const item = await MarketGetItems.findById(id)
  if (!item) {
    return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 })
  }

  if (name) item.name = name
  if (quantity) item.quantity = quantity
  if (group) item.group = group
  if (user) item.user = user
  if (itemstatus) item.itemstatus = itemstatus
  if (category) item.category = category
  if (price) item.price = price

  // If a new image is uploaded, replace the old one
  if (imageFile && imageFile.name && imageFile.type.startsWith('image/')) {
    const imagePath = await saveFile(imageFile)
    item.image = imagePath
  }

  // Save the updated item
  await item.save()

  return new Response(JSON.stringify({ message: 'Item updated successfully', item }), { status: 200 })
}
