import { use } from 'react'
import { Box, ThemeProvider, Avatar, CircularProgress } from '@mui/material'

// Fetch data directly in a server component
async function fetchCategoryData() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/category/get-categories`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data.category || []
}

export default async function Page() {
  // Fetch data on the server side
  const category = await fetchCategoryData()

  return (
    <div className='category-items'>
      {category.map(e => (
        <div key={e._id}>
          {e.name}
          <a href={`/update-category/${e._id}`}>Edit</a>
        </div>
      ))}
    </div>
  )
}
