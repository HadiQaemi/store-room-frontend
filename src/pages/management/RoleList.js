import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAlarm, cilPen, cilPlus, cilTrash, cilX } from '@coreui/icons'
import { placeServices } from 'src/services/placeServices'
import styled from 'styled-components'
import { CustomTable } from 'src/customComponents/customGrid/CustomTable'
import { fireSwalConfirmation } from 'src/services/utils'
import ReactTooltip from 'react-tooltip'
import RoleModal from './components/RoleModal'

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
const RoleList = () => {
  const [Roles, setRoles] = useState([])
  // const [modal, setModal] = useState(false)

  const refresh = () => {
    placeServices.getRoles([]).then((response) => {
      setRoles(response)
    })
  }
  const removeItem = async (id) => {
    const action = (id) => {
      placeServices.removeRoles(id)
      setTimeout(() => {
        refresh()
      }, 300)
    }
    fireSwalConfirmation(action(id))
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
      Header: 'نام',
      accessor: 'name',
      width: '10',
      Cell: (row) => <>{row.row.original.name}</>,
    },
    {
      Header: 'دسترسی ها',
      accessor: 'permissions',
      width: '10',
      Cell: (row) => (
        <>
          <CButton
            color="success"
            data-tip="دسترسی"
            onClick={() => removeItem(row.row.original.id)}
            variant="ghost"
          >
            <CIcon icon={cilAlarm} size="xl" />
          </CButton>
          <ReactTooltip />
        </>
      ),
    },
    {
      Header: 'عملیات',
      accessor: 'action',
      width: '10',
      Cell: (row) => (
        <>
          <CButton
            color="success"
            data-tip="ویرایش"
            onClick={() => removeItem(row.row.original.id)}
            variant="ghost"
          >
            <CIcon icon={cilPen} size="xl" />
          </CButton>
          <CButton
            color="danger"
            data-tip="حذف"
            onClick={() => removeItem(row.row.original.id)}
            variant="ghost"
          >
            <CIcon icon={cilTrash} size="xl" />
          </CButton>
          <CButton
            color="danger"
            data-tip="فعال"
            onClick={() => removeItem(row.row.original.id)}
            variant="ghost"
          >
            <CIcon icon={cilX} size="xl" />
          </CButton>
          <ReactTooltip />
        </>
      ),
    },
  ]
  const tempObject = { name: null, code: null, phone: null, address: null, id: null }
  const data = [...Roles]
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          لیست نقش ها
          <div className="float-end">
            <RoleModal refresh={refresh} action="add" id={null} object={tempObject} />
          </div>
        </CCardHeader>
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

export default RoleList
