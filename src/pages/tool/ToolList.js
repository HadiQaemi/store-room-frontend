import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
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
  const [Tools, setTools] = useState(false)

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
    setVisibleInfo(!visibleInfo)
    setTools(tool)
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
            onClick={() => showTools(row.row.original.tools)}
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
