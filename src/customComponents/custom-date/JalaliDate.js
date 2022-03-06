import React, { useState } from 'react'
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2'

export const JalaliDate = () => {
  const [state, setState] = useState(moment())
  return (
    <>
      <DatePicker isGregorian={false} value={state} timePicker={false} />
    </>
  )
}
