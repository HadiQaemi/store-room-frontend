import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilInfo, cilPen, cilPenNib, cilPrint, cilTrash } from '@coreui/icons'
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
  const [visible, setVisible] = useState(false)

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
            onClick={() => setVisible(!visible)}
            variant="ghost"
          >
            <CIcon icon={cilInfo} size="xl" />
          </CButton>
          <CButton
            color="primary"
            data-tip="پرینت"
            onClick={() => removeItem(row.row.original.id)}
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
      <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>Woohoo, you are reading this text in a modal!</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
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
