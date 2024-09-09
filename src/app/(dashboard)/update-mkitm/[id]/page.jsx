'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation'

import { Box, ThemeProvider, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default function Page() {
  const [category, setCategory] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('')

  const router = useRouter()
  const currentPath = window.location.pathname
  const extractedId = currentPath.split('/').pop()

  const getUrlItem = async () => {
    try {
      const { data } = await axios.get(`/api/marketitems/get-mktm/${extractedId}`)
      setName(data.marketitems[0].name)
      setCategoryId(data.marketitems[0].category._id)
      setQuantity(data.marketitems[0].quantity)
      setImage(data.marketitems[0].image)
      setStatus(data.marketitems[0].itemstatus)
      setPrice(data.marketitems[0].price)
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = event => {
    setCategoryId(event.target.value)
  }

  const handleImageChange = event => {
    setImage(event.target.files[0])
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleQuantityChange = event => {
    setQuantity(event.target.value)
  }

  const handlePriceChange = event => {
    setPrice(event.target.value)
  }

  const handleStatusChange = event => {
    setStatus(event.target.value)
  }

  const getCategoryData = async () => {
    try {
      const { data } = await axios.get('/api/category/get-categories')
      setCategory(data.category)
    } catch (e) {
      console.error(e)
    }
  }

  let user
  const userCookie = Cookies.get('user')
  if (userCookie) {
    user = JSON.parse(userCookie)
  }

  const createItem = async e => {
    try {
      e.preventDefault()
      const mkitm = new FormData()

      mkitm.append('name', name)
      mkitm.append('quantity', quantity)
      mkitm.append('group', user.group)
      mkitm.append('user', user.id)
      mkitm.append('category', categoryId)
      mkitm.append('image', image)
      mkitm.append('price', price)
      mkitm.append('itemstatus', status)
      const { data } = await axios.patch(`/api/marketitems/update-mkitm/${extractedId}`, mkitm)
      alert('item updated successfully')
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getCategoryData()
    getUrlItem()
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
        onSubmit={createItem}
      >
        <div>
          <TextField
            required
            id='outlined-required'
            label='Name'
            value={name}
            onChange={handleNameChange}
            width='50%'
          />
          <TextField
            type='number'
            required
            id='outlined-required'
            value={quantity}
            onChange={handleQuantityChange}
            label='Quantity'
            defaultValue='Quantity'
          />
          {user.name === 'Ghazanfar' || user.name === 'Shan' ? (
            <TextField
              type='number'
              required
              id='outlined-required'
              value={price}
              onChange={handlePriceChange}
              label='Price'
              defaultValue='Price'
            />
          ) : (
            ''
          )}

          <FormControl>
            <InputLabel id='demo-simple-select-label'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={categoryId}
              label='Category'
              onChange={handleChange}
            >
              {category.map((e, index) => (
                <MenuItem key={index} value={e._id}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id='demo-simple-select-label'>Status</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={status}
              label='Status'
              onChange={handleStatusChange}
            >
              <MenuItem value='pending'>pending</MenuItem>
              <MenuItem value='bought'>Bought</MenuItem>
            </Select>
          </FormControl>
          <div>
            <span className='file-input'>
              <input
                type='file'
                onChange={handleImageChange}
                name='file-input'
                id='file-input'
                className='file-input__input'
              />
              <label className='file-input__label' htmlFor='file-input'>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fas'
                  data-icon='upload'
                  className='svg-inline--fa fa-upload fa-w-16'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                >
                  <path
                    fill='currentColor'
                    d='M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'
                  ></path>
                </svg>
                <span>Upload file</span>
              </label>
            </span>
          </div>
          <div>
            <button type='submit' className='submit-button'>
              Submit
            </button>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  )
}
