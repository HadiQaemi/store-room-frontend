import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { Controller } from 'react-hook-form'
import CustomSelect2 from 'src/customComponents/custom-select/CustomSelect2'
import { CustomDate } from 'src/customComponents/custom-date/CustomDate'
import Select from 'react-select'

const FormTransference = ({
  handleSubmit,
  onSubmit,
  control,
  options,
  register,
  submitReceipt,
  changeGroup,
  searchKalaKeyDown,
  searchValues,
}) => {
  const [searchVal, setSearchVal] = useState([])
  const [tool, setTool] = useState([])
  const handleSearchKala = (data) => {
    setTool(data.data)
  }
  const onHandleSubmit = (data) => {
    onSubmit({ data, tool })
  }
  const handleSearchKalaKeyDown = (e) => {
    if (e.key !== 'Backspace' && e.key !== 'Alt') {
      let search = searchVal + e.key
      setSearchVal(search)
      searchKalaKeyDown(search)
    }
  }
  return (
    <>
      <CForm onSubmit={handleSubmit(onHandleSubmit)} className="form">
        <CRow>
          <CCol md={4}>
            <CFormLabel htmlFor="transferenceNumber">شماره حواله</CFormLabel>
            <CFormInput
              id="transferenceNumber"
              placeholder="شماره حواله"
              {...register('transferenceNumber', { required: true })}
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="transferenceDestination">مقصد حواله</CFormLabel>
            <CustomSelect2
              name="transferenceDestination"
              control={control}
              placeholder="مقصد حواله"
              className="reactSelect"
              options={options}
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="date">زمان</CFormLabel>
            <CustomDate control={control} name="date" />
          </CCol>
        </CRow>
        <hr />
        <CRow className="searchKala">
          <CCol md={11}>
            <CFormLabel htmlFor="searchKala">انتخاب کالا</CFormLabel>
            <Select
              name="searchKala"
              classNamePrefix="select"
              onChange={handleSearchKala}
              onKeyDown={handleSearchKalaKeyDown}
              options={searchValues}
              placeholder="جستجو براساس سریال، آمایش، پلاک، دسته بندی کالا، نوع کالا"
              className="reactSelect"
            />
          </CCol>
          <CCol xs={1} className="text-end">
            <CButton
              color="info"
              type="submit"
              // onClick={() => addTool()}
              className="right plus-btn"
            >
              <CIcon icon={cilPlus} size="sm" />
            </CButton>
          </CCol>
        </CRow>
        <hr />
        <CRow>
          <CCol xs={12} className="text-end">
            <CButton color="primary" type="button" onClick={() => submitReceipt()}>
              ثبت
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}
export default FormTransference
