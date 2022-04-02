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
  resultKala,
  register,
  items,
  formatCreateLabel,
  submitReceipt,
  groups,
  handleInputChange,
  changeGroup,
  searchKalaKeyDown,
  searchKala,
  searchValues,
}) => {
  const [searchVal, setSearchVal] = useState([])
  const handleChangeGroup = (newValue, actionMeta) => {
    changeGroup(newValue, actionMeta)
  }
  const handleSearchKala = (newValue, actionMeta) => {
    alert('handleSearchKala')
    // searchKala(newValue, actionMeta)
    setSearchVal('')
  }
  const handleSearchKalaKeyDown = (e) => {
    if (e.key !== 'Backspace' && e.key !== 'Alt') {
      let search = searchVal + e.key
      setSearchVal(search)
      searchKalaKeyDown(search)
    }
  }
  const optionss = [
    { value: 'apple', label: 'Apple', isFixed: true },
    { value: 'orange', label: 'Orange' },
  ]
  return (
    <>
      <CForm onSubmit={handleSubmit(onSubmit)} className="form">
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
          <CCol md={12}>
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
        </CRow>
        <CRow className="searchKala">
          <CCol md={12}>
            <CFormLabel htmlFor="searchKala">انتخاب کالا</CFormLabel>
            <CustomSelect2
              onChange={handleSearchKala}
              onKeyDown={handleSearchKalaKeyDown}
              options={searchValues}
              value={searchVal}
              control={control}
              name="searchKala"
              placeholder="جستجو براساس سریال، آمایش، پلاک، دسته بندی کالا، نوع کالا"
              className="reactSelect"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={3}>
            <CFormLabel htmlFor="serial">سریال</CFormLabel>
            <CFormInput
              id="serial"
              placeholder="سریال"
              {...register('serial', { required: true })}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="amayesh">آمایش</CFormLabel>
            <CFormInput
              id="amayesh"
              placeholder="آمایش"
              {...register('amayesh', { required: true })}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="plaque">پلاک</CFormLabel>
            <CFormInput
              id="plaque"
              placeholder="پلاک"
              {...register('plaque', { required: true })}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="categoryKala">دسته بندی کالا</CFormLabel>
            <CFormSelect
              id="categoryKala"
              aria-label="دسته بندی کالا"
              {...register('categoryKala', { required: true })}
              options={[
                'انتخاب کنید',
                { label: 'رایانه ای', value: 'رایانه ای' },
                { label: 'اداری', value: 'اداری' },
              ]}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={3}>
            <CFormLabel htmlFor="typeKala">نوع کالا</CFormLabel>
            <CFormSelect
              id="typeKala"
              aria-label="نوع کالا"
              {...register('typeKala', { required: true })}
              options={[
                'انتخاب کنید',
                { label: 'فرسوده', value: 'فرسوده' },
                { label: 'امانی ', value: 'امانی' },
                { label: 'اداری', value: 'اداری' },
              ]}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="group_kala">گروه کالا</CFormLabel>
            <Controller
              name="groupKala"
              control={control}
              render={({ field }) => {
                return (
                  <CreatableSelect
                    onChange={handleChangeGroup}
                    options={groups}
                    className="reactSelect"
                    name="groupKala"
                    formatCreateLabel={formatCreateLabel}
                    placeholder="گروه کالا"
                  />
                )
              }}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="modelKala">مدل کالا</CFormLabel>
            <Controller
              name="modelKala"
              control={control}
              render={({ field }) => {
                return (
                  <CreatableSelect
                    onInputChange={handleInputChange}
                    className="reactSelect"
                    name="modelKala"
                    placeholder="مدل کالا"
                    options={items}
                    formatCreateLabel={formatCreateLabel}
                    {...field}
                  />
                )
              }}
            />
          </CCol>
          <CCol xs={3} className="text-end">
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