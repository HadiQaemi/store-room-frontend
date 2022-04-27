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

const RoleModal = ({ refresh, action = 'add', id, object }) => {
  const [visible, setVisible] = useState(false)
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = async (data) => {
    if (action === 'add') {
      placeServices.insertRole(data).then((response) => {
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
    setValue('name', object.name)
  })
  return (
    <>
      <CButton onClick={() => setVisible(!visible)} color="info" variant="ghost">
        <CIcon icon={action === 'add' ? cilPlus : cilPencil} size="xl" />
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{action === 'add' ? 'نقش جدید' : 'ویرایش نقش'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <CCol md={12}>
              <CFormLabel htmlFor="name">نام</CFormLabel>
              <CFormInput id="name" placeholder="نام" {...register('name', { required: true })} />
              <CFormInput id="id" hidden {...register('id')} />
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
export default RoleModal
