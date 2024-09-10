import * as React from 'react'
import { Box, ThemeProvider, Avatar, CircularProgress } from '@mui/material'

export default function Page({ category }) {
  return (
    <>
      <div className='category-items'>
        {category.map(e => (
          <div key={e._id}>
            {e.name}
            <a href={`/update-category/${e._id}`}>Edit</a>
          </div>
        ))}
      </div>
    </>
  )
}

// This function runs on the server side and fetches data before rendering the page
export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/category/get-categories`, { cache: 'no-store' })
    const data = await res.json()

    return {
      props: {
        category: data.category || [] // Pass fetched data as props to the component
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        category: [] // Handle errors by providing an empty array or some default data
      }
    }
  }
}
