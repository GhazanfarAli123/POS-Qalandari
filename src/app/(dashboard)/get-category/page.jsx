'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Cards from '../../../components/Cards'

import { Box, ThemeProvider, Avatar, CircularProgress } from '@mui/material'

export default function Page() {
  const [category, setCategory] = useState([])

  const categoryData = async () => {
    try {
      const res = await fetch('/api/category/get-categories', { cache: 'no-store', next: { revalidate: 60 } })
      const data = await res.json()
      setCategory(data.category)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteategory = async id => {
    try {
      const confirmmation = confirm('Are you sure you want to delete category')
      // console.log(confirmmation)
      if (confirmmation) {
        const data = await axios.delete(`/api/category/delete-category/${id}`)
        alert('Category deleted successfully')
        categoryData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    categoryData()
  }, [])

  return (
    <>
      <div className='category-items'>
        {category.map(e => (
          <div>
            {e.name}
            <button className='submit-button-edit' href={`/update-category/${e._id}`}>
              Edit
            </button>
            <button className='submit-button-edit' onClick={() => deleteategory(e._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
