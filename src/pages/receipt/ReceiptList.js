import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNavLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilInfo, cilList, cilPen, cilPenNib, cilPrint, cilTrash } from '@coreui/icons'
import { placeServices } from 'src/services/placeServices'
import styled from 'styled-components'
import { CustomTable } from 'src/customComponents/customGrid/CustomTable'
import moment from 'moment-jalaali'
import { fireSwalConfirmation } from 'src/services/utils'
import ReactTooltip from 'react-tooltip'

const Styles = styled.div`
  padding: 1rem;
  tbody {
    tr:hover {
      background-color: #f7f7f7;
    }
  }
  table {
    border-spacing: 0;
    width: 100%;
    tr {
      width: 100%;
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #dbdbdb;
    }
  }
`
const ReceiptList = () => {
  const [Other, setOther] = React.useState([])
  const tempObject = { name: null, code: null, phone: null, address: null, id: null }
  const [modal, setModal] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [visiblePrint, setVisiblePrint] = useState(false)
  const [toolPrint, setToolPrint] = useState({ tools: [], source: [], destination: [], holder: [] })
  const [tools, setTools] = useState([])

  const refresh = () => {
    placeServices.getReceipt([]).then((response) => {
      setOther(response)
    })
  }
  const removeItem = async (id) => {
    const action = (id) => {
      placeServices.removeOther(id)
      setTimeout(() => {
        refresh()
      }, 300)
    }
    fireSwalConfirmation(action(id))
  }
  const showTools = async (tool) => {
    setVisibleInfo(!visibleInfo)
    setTools(tool)
  }
  const showPrint = async (tool) => {
    console.log(tool)
    setVisiblePrint(!visiblePrint)
    setToolPrint(tool)
  }

  useEffect(() => {
    refresh()
  }, [])

  const columns = [
    {
      Header: '#',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      Cell: (row) => <>{parseInt(row.row.id) + 1}</>,
    },
    // { Header: 'نام', width: '20', accessor: 'name' },
    {
      Header: 'محل نگهداری کالا',
      accessor: 'holder',
      width: '10',
      Cell: (row) => <>{row.row.original.holder.name}</>,
    },
    {
      Header: 'محل تامین کالا',
      accessor: 'source',
      width: '10',
      Cell: (row) => <>{row.row.original.source.name}</>,
    },
    {
      Header: 'محل ارسال',
      accessor: 'destination',
      width: '10',
      Cell: (row) => <>{row.row.original.destination.name}</>,
    },
    {
      Header: 'زمان',
      accessor: 'name',
      width: '10',
      Cell: (row) => (
        <>
          {moment(row.row.original.receipt, 'YYYY-M-D HH:mm:ss')
            .endOf('jMonth')
            .format('jYYYY/jM/jD')}
        </>
      ),
    },
    {
      Header: 'تعداد کالا',
      accessor: 'tools',
      width: '10',
      Cell: (row) => <>{row.row.original.toolsCount}</>,
    },
    {
      Header: 'عملیات',
      accessor: 'action',
      width: '10',
      Cell: (row) => (
        <>
          <CButton
            color="danger"
            data-tip="حذف"
            onClick={() => removeItem(row.row.original.id)}
            variant="ghost"
          >
            <CIcon icon={cilTrash} size="xl" />
          </CButton>
          <CButton
            color="info"
            data-tip="مشاهده"
            onClick={() => showTools(row.row.original.tools)}
            variant="ghost"
          >
            <CIcon icon={cilInfo} size="xl" />
          </CButton>
          <CButton
            color="primary"
            data-tip="پرینت"
            onClick={() => showPrint(row.row.original)}
            variant="ghost"
          >
            <CIcon icon={cilPrint} size="xl" />
          </CButton>
          <CButton
            color="success"
            data-tip="ویرایش"
            onClick={() => removeItem(row.row.original.id)}
            variant="ghost"
          >
            <CIcon icon={cilPen} size="xl" />
          </CButton>
          <ReactTooltip />
        </>
      ),
    },
  ]
  const toggle = () => {
    setModal(!modal)
  }
  const data = [...Other]
  return (
    <>
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
        </CModalBody>
      </CModal>
      <CModal fullscreen visible={visiblePrint} onClose={() => setVisiblePrint(false)}>
        <CModalHeader onClose={() => setVisiblePrint(false)}>
          <CModalTitle>کالاها</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {moment(toolPrint.receipt, 'YYYY-M-D HH:mm:ss').endOf('jMonth').format('jYYYY/jM/jD')}
          {JSON.stringify(toolPrint.receipt)}
          <CRow>
            <CCol sm={4}>
              <CCard>
                <CCardHeader>مبدا</CCardHeader>
                <CCardBody>
                  <CCardTitle>نام: {toolPrint.source.name}</CCardTitle>
                  <CCardText>کد: {toolPrint.source.code}</CCardText>
                  <CCardText>تلفن: {toolPrint.source.phone}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={4}>
              <CCard>
                <CCardHeader>نگهدارنده</CCardHeader>
                <CCardBody>
                  <CCardTitle>نام: {toolPrint.holder.name}</CCardTitle>
                  <CCardText>کد: {toolPrint.holder.code}</CCardText>
                  <CCardText>تلفن: {toolPrint.holder.phone}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={4}>
              <CCard>
                <CCardHeader>مقصد</CCardHeader>
                <CCardBody>
                  <CCardTitle>نام: {toolPrint.destination.name}</CCardTitle>
                  <CCardText>کد: {toolPrint.destination.code}</CCardText>
                  <CCardText>تلفن: {toolPrint.destination.phone}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
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
              {toolPrint.tools.map((item, index) => {
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
        </CModalBody>
      </CModal>
      <CCard className="mb-4">
        <CCardHeader>لیست رسید</CCardHeader>
        <CCardBody>
          <CRow>
            <Styles>
              <CustomTable
                columns={columns}
                data={data}
                removeItem={removeItem}
                refresh={refresh}
              />
            </Styles>
          </CRow>
        </CCardBody>
        <ReactTooltip />
      </CCard>
    </>
  )
}

export default ReceiptList
