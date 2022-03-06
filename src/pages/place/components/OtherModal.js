import { cilPencil, cilPlus, cilSave, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { placeServices } from 'src/services/placeServices'

const OtherModal = ({ refresh, action = 'add', id, object }) => {
  const [visible, setVisible] = useState(false)
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = async (data) => {
    if (action === 'add') {
      placeServices.insertOther(data).then(() => {
        refresh()
        setVisible(false)
      })
    } else if (action === 'update') {
      placeServices.updateOther(object.id, data).then(() => {
        refresh()
        setVisible(false)
        object = null
      })
    }
  }

  useEffect(() => {
    setValue('name', object.name)
    setValue('code', object.code)
    setValue('phone', object.phone)
    setValue('address', object.address)
    setValue('id', object.id)
  })
  return (
    <>
      <CButton onClick={() => setVisible(!visible)} color="info" variant="ghost">
        <CIcon icon={action === 'add' ? cilPlus : cilPencil} size="xl" />
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{action === 'add' ? 'سایر جدید' : 'ویرایش سایر'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <CCol md={6}>
              <CFormLabel htmlFor="name">نام</CFormLabel>
              <CFormInput id="name" placeholder="نام" {...register('name', { required: true })} />
              <CFormInput id="id" hidden {...register('id')} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="code">کد</CFormLabel>
              <CFormInput
                type="code"
                id="code"
                placeholder="کد"
                {...register('code', { required: true })}
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="phone">شماره تماس</CFormLabel>
              <CFormInput
                id="phone"
                placeholder="شماره تماس"
                {...register('phone', { required: true })}
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="address">آدرس</CFormLabel>
              <CFormInput
                id="address"
                placeholder="آدرس"
                {...register('address', { required: true })}
              />
            </CCol>
            <hr />
            <CCol xs={12} className="text-end">
              <CButton color="danger" variant="ghost" onClick={() => setVisible(false)}>
                <CIcon icon={cilX} size="xl" />
              </CButton>
              <CButton color="success" variant="ghost" type="submit">
                <CIcon icon={cilSave} size="xl" />
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}
export default OtherModal
