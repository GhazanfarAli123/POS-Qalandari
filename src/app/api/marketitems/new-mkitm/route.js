import dbConnect from '@utils/dbconnect'

import MarketGetItems from '@models/MarketGetItems'

import Slugify from 'slugify'

import path from 'path'

import { promises as fs } from 'fs'

// Helper function to save the file
async function saveFile(file) {
  const uploadPath = path.join(process.cwd(), 'public', 'uploads')

  // Ensure the directory exists
  await fs.mkdir(uploadPath, { recursive: true })

  const ext = path.extname(file.name)
  const filename = `${Slugify(path.basename(file.name, ext), { lower: true })}-${Date.now()}${ext}`
  const filepath = path.join(uploadPath, filename)

  // Write the file to the filesystem
  await fs.writeFile(filepath, Buffer.from(await file.arrayBuffer()))

  return `/uploads/${filename}`
}

export async function POST(req, res) {
  await dbConnect()

  const formData = await req.formData()
  const name = formData.get('name')
  const quantity = formData.get('quantity')
  const group = formData.get('group')
  const user = formData.get('user')
  const itemstatus = formData.get('itemstatus')
  const category = formData.get('category')
  const imageFile = formData.get('image')
  const price = formData.get('price')
  const time = formData.get('time')

  if (!name) {
    return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 })
  }

  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Karachi'
  })

  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Karachi'
  })

  const dateObj = new Date(currentDate)
  const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`

  let imagePath = null
  if (imageFile && imageFile.name && imageFile.type.startsWith('image/')) {
    imagePath = await saveFile(imageFile)
  }

  const item = new MarketGetItems({
    name,
    quantity,
    group,
    user,
    itemstatus,
    category,
    image: imagePath,
    price,
    time: currentTime,
    date: formattedDate
  })
  await item.save()

  return new Response(JSON.stringify({ message: 'Item created successfully', item }), { status: 201 })
}
