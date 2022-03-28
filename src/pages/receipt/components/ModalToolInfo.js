import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'

export const ModalToolInfo = (visibleInfo, tools, setVisibleInfo) => {
  alert(visibleInfo)
  return (
    <CModal size="lg" visible={visibleInfo} onClose={() => setVisibleInfo(false)}>
      <CModalHeader onClose={() => setVisibleInfo(false)}>
        <CModalTitle>کالاها</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableDataCell>دسته بندی</CTableDataCell>
              <CTableDataCell>پلاک</CTableDataCell>
              <CTableDataCell>آمایش</CTableDataCell>
              <CTableDataCell>شماره سریال</CTableDataCell>
              <CTableDataCell>نوع</CTableDataCell>
              <CTableDataCell>گروه</CTableDataCell>
              <CTableDataCell>مدل</CTableDataCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {tools.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.category}</CTableDataCell>
                  <CTableDataCell>{item.pelauqe}</CTableDataCell>
                  <CTableDataCell>{item.amayesh}</CTableDataCell>
                  <CTableDataCell>{item.serial_number}</CTableDataCell>
                  <CTableDataCell>{item.type}</CTableDataCell>
                  <CTableDataCell>{item.group}</CTableDataCell>
                  <CTableDataCell>{item.model}</CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </CModalBody>
    </CModal>
  )
}
