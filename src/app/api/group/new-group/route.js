import dbConnect from '@utils/dbconnect'
import Group from '@models/Group'
import Slugify from 'slugify'

export async function POST(req, res) {
  await dbConnect()

  const { name } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 })
  }

  const existingGroup = await Group.findOne({ name })
  if (existingGroup) {
    return new Response(JSON.stringify({ message: 'Group already exists' }), { status: 400 })
  }

  const group = new Group({ name, slug: Slugify(name) })
  await group.save()

  return new Response(JSON.stringify({ message: 'Group created successfully', group }), { status: 201 })
}
