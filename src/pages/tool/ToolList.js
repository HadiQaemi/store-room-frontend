import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
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
const ToolList = () => {
  const [Other, setOther] = React.useState([])
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [tools, setTools] = useState([])

  const refresh = () => {
    placeServices.allTools([]).then((response) => {
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
    placeServices.toolTransports(tool).then((response) => {
      // setOther(response)
    })
    setVisibleInfo(!visibleInfo)
    // setTools(tool)
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
    {
      Header: 'سریال',
      accessor: 'serial_number',
      width: '10',
      Cell: (row) => <>{row.row.original.serial_number}</>,
    },
    {
      Header: 'آمایش',
      accessor: 'amayesh',
      width: '10',
      Cell: (row) => <>{row.row.original.amayesh}</>,
    },
    {
      Header: 'پلاک',
      accessor: 'pelauqe',
      width: '10',
      Cell: (row) => <>{row.row.original.pelauqe}</>,
    },
    {
      Header: 'نوع',
      accessor: 'type',
      width: '10',
      Cell: (row) => <>{row.row.original.type}</>,
    },
    {
      Header: 'دسته',
      accessor: 'category',
      width: '10',
      Cell: (row) => <>{row.row.original.category}</>,
    },
    {
      Header: 'مدل',
      accessor: 'model',
      width: '10',
      Cell: (row) => <>{row.row.original.model}</>,
    },
    {
      Header: 'عملیات',
      accessor: 'action',
      width: '10',
      Cell: (row) => (
        <>
          <CButton
            color="info"
            data-tip="مشاهده"
            onClick={() => showTools(row.row.original.id)}
            variant="ghost"
          >
            <CIcon icon={cilInfo} size="xl" />
          </CButton>
          <ReactTooltip />
        </>
      ),
    },
  ]
  const data = [...Other]
  return (
    <>
      <CModal size="lg" visible={visibleInfo} onClose={() => setVisibleInfo(false)}>
        <CModalHeader onClose={() => setVisibleInfo(false)}>
          <CModalTitle>انتقالات</CModalTitle>
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
            {/* <CTableBody>
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
            </CTableBody> */}
          </CTable>
        </CModalBody>
      </CModal>
      <CCard className="mb-4">
        <CCardHeader>لیست کالا</CCardHeader>
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

export default ToolList
