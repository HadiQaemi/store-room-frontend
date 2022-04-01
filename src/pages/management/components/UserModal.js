import { cilPencil, cilPlus, cilSave, cilX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { placeServices } from 'src/services/placeServices'

const UserModal = ({ refresh, action = 'add', id, object }) => {
  const [visible, setVisible] = useState(false)
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = async (data) => {
    if (action === 'add') {
      placeServices.insertUser(data).then((response) => {
        if (response.status !== 'error') {
          refresh()
          setVisible(false)
        }
      })
    } else if (action === 'update') {
      placeServices.updateStoreRoom(object.id, data).then(() => {
        refresh()
        setVisible(false)
        object = null
      })
    }
  }

  useEffect(() => {
    setValue('firstname', object.firstname)
    setValue('lastname', object.lastname)
    setValue('user_type', object.user_type)
    setValue('username', object.username)
    setValue('status', 'true')
    setValue('id', object.id)
  })
  return (
    <>
      <CButton onClick={() => setVisible(!visible)} color="info" variant="ghost">
        <CIcon icon={action === 'add' ? cilPlus : cilPencil} size="xl" />
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{action === 'add' ? 'کاربر جدید' : 'ویرایش کاربر'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <CCol md={6}>
              <CFormLabel htmlFor="firstname">نام</CFormLabel>
              <CFormInput
                id="firstname"
                placeholder="نام"
                {...register('firstname', { required: true })}
              />
              <CFormInput id="id" hidden {...register('id')} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="lastname">نام خانوادگی</CFormLabel>
              <CFormInput
                type="code"
                id="lastname"
                placeholder="نام خانوادگی"
                {...register('lastname', { required: true })}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="username">نام کاربری</CFormLabel>
              <CFormInput
                id="username"
                placeholder="نام کاربری"
                {...register('username', { required: true })}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="usertype">نقش</CFormLabel>
              <CFormSelect aria-label="انتخاب نقش" {...register('user_type', { required: true })}>
                <option>انتخاب نقش</option>
                <option value="branch">شعبه</option>
                <option value="admin">مدیر</option>
              </CFormSelect>
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="password">رمز عبور</CFormLabel>
              <CFormInput
                id="password"
                placeholder="رمز عبور"
                type="password"
                {...register('password', { required: true })}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="confirm_password">تکرار رمز عبور</CFormLabel>
              <CFormInput
                id="confirm_password"
                placeholder="تکرار رمز عبور"
                type="password"
                {...register('confirm_password', { required: true })}
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
export default UserModal
