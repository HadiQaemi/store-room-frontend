import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import BranchModal from './components/BranchModal'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { placeServices } from 'src/services/placeServices'
import styled from 'styled-components'
import { CustomTable } from 'src/customComponents/customGrid/CustomTable'
import Swal from 'sweetalert2'

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

const Branch = () => {
  const [branches, setBranch] = useState([])

  const tempObject = { name: null, code: null, phone: null, address: null, id: null }

  const refresh = () => {
    placeServices.getBranches([]).then((response) => {
      setBranch(response)
    })
  }

  const removeItem = async (id) => {
    Swal.fire({
      title: 'در صورت حذف قابل بازیابی نمی باشد',
      showCancelButton: true,
      confirmButtonText: `تایید`,
      cancelButtonText: `انصراف`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        placeServices.removeBranch(id)
        setTimeout(() => {
          refresh()
        }, 300)
      }
    })
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
      Cell: (row) => {
        return <div>{parseInt(row.row.id) + 1}</div>
      },
    },
    { Header: 'نام', width: '20', accessor: 'name' },
    { Header: 'کد', width: '20', accessor: 'code' },
    { Header: 'شماره تماس', width: '20', accessor: 'phone' },
    { Header: 'آدرس', width: '100', accessor: 'address' },
    {
      Header: 'عملیات',
      accessor: 'action',
      width: '10',
      Cell: (row) => (
        <>
          <CButton color="danger" onClick={() => removeItem(row.row.original.id)} variant="ghost">
            <CIcon icon={cilTrash} size="xl" />
          </CButton>
          <BranchModal
            refresh={refresh}
            action="update"
            id={row.row.original.id}
            object={row.row.original}
          />
        </>
      ),
    },
  ]
  const data = [...branches]
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          لیست شعب
          <div className="float-end">
            <BranchModal refresh={refresh} action="add" id={null} object={tempObject} />
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
      </CCard>
    </>
  )
}

export default Branch
