import dbConnect from '@utils/dbconnect'
import Group from '@models/Group'
import slugify from 'slugify'

export async function PUT(req, { params }) {
  await dbConnect()

  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 })
  }

  const { name } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 })
  }

  try {
    const group = await Group.findById(id)

    if (!group) {
      return new Response(JSON.stringify({ message: 'Group not found' }), { status: 404 })
    }

    group.name = name
    group.slug = slugify(name)

    const updatedGroup = await group.save()

    return new Response(JSON.stringify({ message: 'Group updated successfully', group: updatedGroup }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
