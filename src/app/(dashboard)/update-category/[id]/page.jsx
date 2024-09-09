'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation'

import { Box, ThemeProvider, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function Page() {
  const [category, setCategory] = useState('')

  const router = useRouter()
  const currentPath = window.location.pathname
  const extractedId = currentPath.split('/').pop()

  const handleChange = event => {
    setCategory(event.target.value)
  }

  const getCategoryData = async () => {
    try {
      const { data } = await axios.get(`/api/category/get-category/${extractedId}`)
      setCategory(data.category.name)
    } catch (e) {
      console.error(e)
    }
  }

  const updateCategory = async e => {
    try {
      e.preventDefault()
      const categoryData = { name: category }
      const { data } = await axios.put(`/api/category/update-category/${extractedId}`, categoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      alert('Category updated successfully!')
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getCategoryData()
  }, [])

  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#37335e',
            dark: '#25293c'
          }
        }
      }}
    >
      <Box
        component='form'
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete='off'
        onSubmit={updateCategory}
      >
        <div>
          <TextField
            required
            id='outlined-required'
            label='Category'
            value={category}
            onChange={handleChange}
            width='50%'
          />

          <button type='submit' className='submit-button'>
            Submit
          </button>
        </div>
      </Box>
    </ThemeProvider>
  )
}
