import React from 'react'
import CreatableSelect from 'react-select/creatable'
import DatePicker from 'react-datepicker2'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import CustomSelect2 from 'src/customComponents/custom-select/CustomSelect2'
import { CustomDate } from 'src/customComponents/custom-date/CustomDate'

const FormRecipt = ({
  handleSubmit,
  onSubmit,
  control,
  options,
  register,
  items,
  formatCreateLabel,
  submitReceipt,
  groups,
  handleInputChange,
  handleChange,
}) => {
  return (
    <>
      <CForm onSubmit={handleSubmit(onSubmit)} className="form">
        <CRow>
          <CCol md={3}>
            <CFormLabel htmlFor="locationKala">محل نگهداری کالا</CFormLabel>
            <CustomSelect2
              name="locationKala"
              control={control}
              placeholder="محل نگهداری کالا"
              className="reactSelect"
              options={options}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="locationSource">محل تامین کالا</CFormLabel>
            <CustomSelect2
              name="locationSource"
              control={control}
              placeholder="محل تامین کالا"
              className="reactSelect"
              options={options}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="locationDestination">محل ارسال</CFormLabel>
            <CustomSelect2
              name="locationDestination"
              control={control}
              placeholder="محل ارسال"
              className="reactSelect"
              options={options}
            />
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="date">زمان</CFormLabel>
            <CustomDate control={control} name="date" />
          </CCol>
        </CRow>
        <hr />
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
                    isClearable
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    className="reactSelect"
                    name="groupKala"
                    placeholder="گروه کالا"
                    options={groups}
                    formatCreateLabel={formatCreateLabel}
                    {...field}
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
                    isClearable
                    onChange={handleChange}
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
export default FormRecipt
