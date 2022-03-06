import { cilRecycle, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect } from 'react'

const ToolList = ({ tools, remove }) => {
  useEffect(() => {
    // console.log(tools)
  })
  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">سریال</CTableHeaderCell>
            <CTableHeaderCell scope="col">آمایش</CTableHeaderCell>
            <CTableHeaderCell scope="col">پلاک</CTableHeaderCell>
            <CTableHeaderCell scope="col">دسته بندی کالا</CTableHeaderCell>
            <CTableHeaderCell scope="col">نوع کالا</CTableHeaderCell>
            <CTableHeaderCell scope="col">گروه کالا</CTableHeaderCell>
            <CTableHeaderCell scope="col">مدل کالا</CTableHeaderCell>
            <CTableHeaderCell scope="col">عملیات</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tools.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.serial}</CTableDataCell>
              <CTableDataCell>{item.amayesh}</CTableDataCell>
              <CTableDataCell>{item.plaque}</CTableDataCell>
              <CTableDataCell>{item.categoryKala}</CTableDataCell>
              <CTableDataCell>{item.typeKala}</CTableDataCell>
              <CTableDataCell>{item.groupKala}</CTableDataCell>
              <CTableDataCell>{item.modelKala}</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilTrash} size="sm" className="remove" onClick={() => remove(index)} />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
export default ToolList
