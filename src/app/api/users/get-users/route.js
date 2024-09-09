import dbConnect from '@utils/dbconnect'

import Users from '@models/Users'

import '@models/Group'

export async function GET(req, res) {
  await dbConnect()

  try {
    const user = await Users.find({}).populate({
      path: 'group', // Path to populate
      select: 'name slug' // Fields to select from the Group model
    })

    return new Response(JSON.stringify({ message: 'Get all categories successfully', user }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 })
  }
}
