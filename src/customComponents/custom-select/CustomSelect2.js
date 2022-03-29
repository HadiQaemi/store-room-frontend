import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

const CustomSelect2 = ({
  name,
  control,
  placeholder,
  className,
  options,
  onChange,
  onKeyDown,
  value,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <Select
              // onChange={(e) => alert(e)}
              onKeyDown={onKeyDown}
              onChange={onChange}
              options={options}
              value={value}
              control={control}
              className={className}
              name={name}
              placeholder={placeholder}
              {...field}
            />
          )
        }}
      />
    </>
  )
}
export default CustomSelect2
