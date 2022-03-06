import { cilSave, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { placeServices } from 'src/services/placeServices'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

const Add = ({ refresh, action = 'add', id, object }) => {
  const [options, setOptions] = useState([])
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = async (data) => {
    // if (action === 'add') {
    //   placeServices.insertOther(data).then(() => {
    //     refresh()
    //   })
    // } else if (action === 'update') {
    //   placeServices.updateOther(object.id, data).then(() => {
    //     refresh()
    //     object = null
    //   })
    // }
    alert('asdasdsd')
    console.log(data)
  }
  const [selectedOption, setSelectedOption] = useState(null)
  const [locationKala, setlocationKala] = useState(null)

  useEffect(() => {
    placeServices.getPlaces().then((data) => {
      console.log(data)
      setOptions(data)
    })
  }, [])
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: `)
    console.groupEnd()
  }
  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed')
    console.log(inputValue)
    console.log(`action:`)
    console.groupEnd()
  }
  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ]
  const handleChangeSelect = (selectedOption) => {
    // setlocationKala({ selectedOption.value })
    console.log(`Option selected:`, selectedOption.value)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>ثبت رسید</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <CCol md={4}>
                <CFormLabel htmlFor="location_kala">محل نگهداری کالا</CFormLabel>
                <Select
                  // {...register('location_kala', { required: true })}
                  {...register('locationKala')}
                  // id="location_kala"
                  name="locationKala"
                  placeholder="محل نگهداری کالا"
                  defaultValue={locationKala}
                  onChange={handleChangeSelect}
                  options={options}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="location_source">محل تامین کالا</CFormLabel>
                <Select
                  // {...register('location_source', { required: true })}
                  {...register('location_source')}
                  id="location_source"
                  placeholder="محل تامین کالا"
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="location_destination">محل ارسال</CFormLabel>
                <Select
                  // {...register('location_destination', { required: true })}
                  {...register('location_destination')}
                  id="location_destination"
                  placeholder="محل ارسال"
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </CCol>
              <hr />
              <CCol md={4}>
                <CFormLabel htmlFor="serial">سریال</CFormLabel>
                <CFormInput
                  id="serial"
                  placeholder="سریال"
                  // {...register('serial', { required: true })}
                  {...register('serial')}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="amayesh">آمایش</CFormLabel>
                <CFormInput
                  id="amayesh"
                  placeholder="آمایش"
                  // {...register('amayesh', { required: true })}
                  {...register('amayesh')}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="plaque">پلاک</CFormLabel>
                <CFormInput
                  id="plaque"
                  placeholder="پلاک"
                  // {...register('plaque', { required: true })}
                  {...register('plaque')}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="category_kala">دسته بندی کالا</CFormLabel>
                <CFormSelect
                  id="category_kala"
                  aria-label="دسته بندی کالا"
                  // {...register('category_kala', { required: true })}
                  {...register('category_kala')}
                  options={[
                    'انتخاب کنید',
                    { label: 'رایانه ای', value: 'pc' },
                    { label: 'اداری', value: 'official' },
                  ]}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="type_kala">نوع کالا</CFormLabel>
                <CFormSelect
                  id="type_kala"
                  aria-label="نوع کالا"
                  // {...register('type_kala', { required: true })}
                  {...register('type_kala')}
                  options={[
                    'انتخاب کنید',
                    { label: 'فرسوده', value: 'old' },
                    { label: 'امانی ', value: 'mercy' },
                    { label: 'اداری', value: 'official' },
                  ]}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="group_kala">گروه کالا</CFormLabel>
                <CreatableSelect
                  isClearable
                  isRtl
                  onChange={handleChange}
                  onInputChange={handleInputChange}
                  options={colourOptions}
                  placeholder="گروه کالا"
                  id="group_kala"
                  // {...register('group_kala', { required: true })}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="model_kala">مدل کالا</CFormLabel>
                <CreatableSelect
                  isClearable
                  onChange={handleChange}
                  onInputChange={handleInputChange}
                  options={colourOptions}
                  placeholder="مدل کالا"
                  id="group_kala"
                  // {...register('group_kala', { required: true })}
                />
              </CCol>
              <hr />
              <CCol xs={12} className="text-end">
                <CButton color="success" variant="ghost" type="submit">
                  <CIcon icon={cilSave} size="xl" />
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Add
