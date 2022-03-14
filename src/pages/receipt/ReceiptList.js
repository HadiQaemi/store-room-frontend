import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilDevices, cilTrash, cilViewColumn, cilViewModule } from '@coreui/icons'
import { placeServices } from 'src/services/placeServices'
import styled from 'styled-components'
import { CustomTable } from 'src/customComponents/customGrid/CustomTable'
import Swal from 'sweetalert2'
import moment from 'moment-jalaali'
import { fireSwal } from 'src/services/utils'

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
    fireSwal(action(id))
    // Swal.fire({
    //   title: 'در صورت حذف قابل بازیابی نمی باشد',
    //   showCancelButton: true,
    //   confirmButtonText: `تایید`,
    //   cancelButtonText: `انصراف`,
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     placeServices.removeOther(id)
    //     setTimeout(() => {
    //       refresh()
    //     }, 300)
    //   }
    // })
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
      Cell: (row) => <>{row.row.original.tools[0].category}</>,
    },
    {
      Header: 'عملیات',
      accessor: 'action',
      width: '10',
      Cell: (row) => (
        <>
          <CButton color="danger" onClick={() => removeItem(row.row.original.id)} variant="ghost">
            <CIcon icon={cilTrash} size="xl" />
          </CButton>
          <CButton color="info" onClick={() => removeItem(row.row.original.id)} variant="ghost">
            <CIcon icon={cilDevices} size="xl" />
          </CButton>
          <CButton color="success" onClick={() => removeItem(row.row.original.id)} variant="ghost">
            <CIcon icon={cilAddressBook} size="xl" />
          </CButton>
        </>
      ),
    },
  ]
  const data = [...Other]

  return (
    <CCard className="mb-4">
      <CCardHeader>لیست رسید</CCardHeader>
      <CCardBody>
        <CRow>
          <Styles>
            <CustomTable columns={columns} data={data} removeItem={removeItem} refresh={refresh} />
          </Styles>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default ReceiptList
