// app/api/users/[id]/route.js
import dbConnect from '@utils/dbconnect'
import User from '@models/Users'
import Group from '@models/Group' // Ensure you import the Group model

export async function GET(req, { params }) {
  await dbConnect()

  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ message: 'ID is required' }), { status: 400 })
  }

  try {
    const user = await User.findById(id).populate({
      path: 'group',
      select: 'name slug'
    })

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })
    }

    return new Response(JSON.stringify({ message: 'User fetched successfully', user }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
