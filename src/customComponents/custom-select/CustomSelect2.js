import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

const CustomSelect2 = ({ name, control, placeholder, className, options }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <Select
              className={className}
              name={name}
              placeholder={placeholder}
              options={options}
              {...field}
            />
          )
        }}
      />
    </>
  )
}
export default CustomSelect2
