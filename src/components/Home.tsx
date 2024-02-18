'use client'

import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Companies from '@/components/Companies'
import axios from 'axios'
import { serialize } from 'object-to-formdata'

export type TUserDetails = {
  firstName: string
  lastName: string
  photo: string
  email: string
  companies: TCompany[]
}

export type TCompany = {
  companyName: string
  position: string
  workedYears: string
  technologies: string
}

const Home = () => {
  const [finished, setFinished] = useState<boolean>(false)
  const methods = useForm<TUserDetails>()

  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = methods

  const handleFormSubmit = async (values: TUserDetails) => {
    axios.post('/api/create', serialize(values))
    setFinished(true)
  }

  if (finished) {
    return <div className='mt-10'>Sent to the queue! Check your email</div>
  }

  return (
    <div className='flex flex-col items-center justify-center p-7'>
      <div className='flex w-full flex-col items-center justify-center rounded-t-lg bg-slate-500 py-3 text-white'>
        <h1 className='text-3xl font-bold text-white'>Resume Builder</h1>
        <p className='text-gray-300'>Generate a resume with GPT in seconds 🚀</p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='flex w-full flex-col p-4'>
          <div className='flex flex-col gap-4 lg:flex-row'>
            <div className='flex w-full flex-col'>
              <label htmlFor='firstName'>First name</label>
              <input
                type='text'
                required
                id='firstName'
                placeholder='e.g. John'
                className='rounded-md border border-gray-500 bg-transparent p-3 text-white outline-none'
                {...register('firstName')}
              />
            </div>
            <div className='flex w-full flex-col'>
              <label htmlFor='lastName'>Last name</label>
              <input
                type='text'
                required
                id='lastName'
                placeholder='e.g. Doe'
                className='rounded-md border border-gray-500 bg-transparent p-3 text-white outline-none'
                {...register('lastName')}
              />
            </div>
          </div>
          <hr className='mt-3 h-1 w-full' />
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            required
            id='email'
            placeholder='e.g. john.doe@gmail.com'
            className='rounded-md border border-gray-500 bg-transparent p-3 text-white outline-none'
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          <hr className='mt-3 h-1 w-full' />
          <label htmlFor='photo'>Upload your image 😎</label>
          <input
            type='file'
            id='photo'
            accept='image/x-png'
            className='mb-3 rounded-md border border-gray-500 p-3 outline-none'
            {...register('photo', { required: true })}
          />
          <Companies />
          <button className='pointer rounded-lg border-none bg-blue-500 p-4 text-base font-semibold text-white outline-none'>
            CREATE RESUME
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Home
