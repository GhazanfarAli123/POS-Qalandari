// app/api/users/route.js
import dbConnect from '@utils/dbconnect'

import User from '@models/Users'

import jwt from 'jsonwebtoken'

// Environment Variables
const JWT_SECRET = 'hallohowareyouwhatisgoingon' // Ensure this is set in your environment variables

export async function POST(req, res) {
  await dbConnect()

  const { email, password } = await req.json()

  // Check if user exists
  const user = await User.findOne({ email })
  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
  }

  // Direct password comparison
  if (user.password !== password) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
  }

  const token = jwt.sign({ id: user._id, email: user.email, group: user.group }, JWT_SECRET, { expiresIn: '7d' })

  return new Response(
    JSON.stringify({
      message: 'Sign-in successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, group: user.group }
    }),
    { status: 200 }
  )
}
