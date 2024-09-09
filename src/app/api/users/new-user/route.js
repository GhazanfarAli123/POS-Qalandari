// app/api/users/route.js
import dbConnect from '@utils/dbconnect'

import User from '@models/Users' // Ensure this matches the correct file path

import Slugify from 'slugify'

import bcrypt from 'bcrypt'

export async function POST(req, res) {
  await dbConnect()

  const { name, email, password, group } = await req.json()

  if (!name) {
    return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 })
  }

  const existingUserEmail = await User.findOne({ email })

  if (existingUserEmail) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 })
  }

  const user = new User({
    name,
    email,
    password,
    group,
    slug: Slugify(name, { lower: true })
  })

  await user.save()

  return new Response(JSON.stringify({ message: 'User created successfully', user }), { status: 201 })
}
