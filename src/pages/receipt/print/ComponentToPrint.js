import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import moment from 'moment-jalaali'
import React from 'react'

class ComponentToPrint extends React.Component {
  render() {
    return (
      <>
        <CRow className="printDom">
          <CRow>
            <CCol sm={4} className="cardPrint">
              تاریخ ثبت:{' '}
              {moment(this.props.toolPrint.receipt, 'YYYY-M-D HH:mm:ss')
                .endOf('jMonth')
                .format('jYYYY/jM/jD')}
            </CCol>
            <CCol sm={4} className="cardPrint">
              تاریخ انتقال:{' '}
              {moment(this.props.toolPrint.receipt, 'YYYY-M-D HH:mm:ss')
                .endOf('jMonth')
                .format('jYYYY/jM/jD')}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={4} className="cardPrint">
              <CCard>
                <CCardHeader>مبدا</CCardHeader>
                <CCardBody>
                  <CCardTitle>نام: {this.props.toolPrint.source.name}</CCardTitle>
                  <CCardText>کد: {this.props.toolPrint.source.code}</CCardText>
                  <CCardText>تلفن: {this.props.toolPrint.source.phone}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={4} className="cardPrint">
              <CCard>
                <CCardHeader>نگهدارنده</CCardHeader>
                <CCardBody>
                  <CCardTitle>نام: {this.props.toolPrint.holder.name}</CCardTitle>
                  <CCardText>کد: {this.props.toolPrint.holder.code}</CCardText>
                  <CCardText>تلفن: {this.props.toolPrint.holder.phone}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={4} className="cardPrint">
              <CCard>
                <CCardHeader>مقصد</CCardHeader>
                <CCardBody>
                  <CCardTitle>نام: {this.props.toolPrint.destination.name}</CCardTitle>
                  <CCardText>کد: {this.props.toolPrint.destination.code}</CCardText>
                  <CCardText>تلفن: {this.props.toolPrint.destination.phone}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CTable className="printTools">
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
              {this.props.toolPrint.tools.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
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
        </CRow>
      </>
    )
  }
}

export default ComponentToPrint
