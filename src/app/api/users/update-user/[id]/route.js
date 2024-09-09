import dbConnect from '@utils/dbconnect'
import User from '@models/Users'
import slugify from 'slugify'

export async function PUT(req, { params }) {
  await dbConnect()

  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 })
  }

  const { name, email, password, group } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 })
  }

  try {
    const user = await User.findById(id)

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })
    }

    user.name = name || user.name
    user.email = email || user.email
    user.password = password || user.password
    user.group = group || user.group
    user.slug = slugify(name, { lowercase: true })

    const updatedUser = await user.save()

    return new Response(JSON.stringify({ message: 'User updated successfully', user: updatedUser }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
