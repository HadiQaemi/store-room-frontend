import React from 'react'
import { Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker2'

export const CustomDate = ({ control, name, placeholder }) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        placeholder={placeholder}
        rules={{ required: true }} //optional
        render={({
          field: { onChange, name, value },
          fieldState: { invalid, isDirty }, //optional
          formState: { errors }, //optional, but necessary if you want to show an error message
        }) => (
          <>
            <DatePicker
              isGregorian={false}
              timePicker={false}
              placeholder={placeholder}
              onChange={(date) => {
                onChange(date?.isValid ? date.format('YYYY-M-D hh:mm:ss') : '')
              }}
              className="form-control"
              format={'YYYY/MM/DD'}
            />
          </>
        )}
      />
    </>
  )
}
