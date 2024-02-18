import React, { useCallback, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { TCompany } from './Home'
// eslint-disable-next-line no-unused-vars
import { useFieldArray, useFormContext } from 'react-hook-form'

const Companies = () => {
  const { control, register } = We()
  const { fields: companies, append } = useFieldArray({
    control,
    name: 'companies',
  })

  const addCompany = useCallback(() => {
    append({
      companyName: '',
      position: '',
      workedYears: '',
      technologies: '',
    })
  }, [append])

  useEffect(() => {
    addCompany()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies])

  return (
    <div className='mb-4'>
      {companies.length > 1 ? (
        <h3 className='my-3 text-3xl font-bold text-white'>Your list of Companies:</h3>
      ) : null}
      {companies.length > 1 &&
        companies.slice(1).map((company, index) => (
          <div key={index} className='mb-4 rounded-lg border bg-gray-800 p-4 shadow-md'>
            <div className='mb-2'>
              <label htmlFor={`companyName-${index}`} className='text-white'>
                Company Name
              </label>
              <input
                type='text'
                id={`companyName-${index}`}
                className='w-full rounded-md border border-gray-300 bg-transparent p-2'
                {...register(`companies.${index}.companyName`, { required: true })}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor={`position-${index}`} className='text-white'>
                Position
              </label>
              <input
                type='text'
                id={`position-${index}`}
                className='w-full rounded-md border border-gray-300 bg-transparent p-2'
                {...register(`companies.${index}.position`, { required: true })}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor={`workedYears-${index}`} className='text-white'>
                Worked Years
              </label>
              <input
                type='number'
                id={`workedYears-${index}`}
                className='w-full rounded-md border border-gray-300 bg-transparent p-2'
                {...register(`companies.${index}.workedYears`, { required: true })}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor={`workedYears-${index}`} className='text-white'>
                Technologies
              </label>
              <input
                type='text'
                id={`technologies-${index}`}
                className='w-full rounded-md border border-gray-300 bg-transparent p-2'
                {...register(`companies.${index}.technologies`, { required: true })}
              />
            </div>
          </div>
        ))}
      <button
        type='button'
        onClick={addCompany}
        className='pointer mb-4 w-full rounded-lg border-none bg-blue-900 p-2 text-base font-semibold text-white outline-none'
      >
        Add Company
      </button>
    </div>
  )
}

export default Companies
