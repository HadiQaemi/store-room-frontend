import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilInfo, cilSearch } from '@coreui/icons'
import { placeServices } from 'src/services/placeServices'
import styled from 'styled-components'
import { CustomTable } from 'src/customComponents/customGrid/CustomTable'
import { fireSwalConfirmation } from 'src/services/utils'
import ReactTooltip from 'react-tooltip'
import { useForm } from 'react-hook-form'

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
const ToolListAttrib = () => {
  const [Other, setOther] = React.useState([])
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [transports, setTransports] = useState([])
  const placeTypes = []
  placeTypes['storeRoomRepository'] = 'انبار'
  placeTypes['bankUnitsRepository'] = 'واحد بانک'
  placeTypes['branchRepository'] = 'شعبه'
  placeTypes['otherRepository'] = 'سایر'
  // const [toolGroups, setToolGroups] = useState([])

  // const handleChangeGroup = (newValue, actionMeta) => {
  //   console.log('asdasd')
  //   // changeGroup(newValue, actionMeta)
  // }
  const formatCreateLabel = (inputValue) => `جدید: ${inputValue}`
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
      setTransports(response)
    })
    setVisibleInfo(!visibleInfo)
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
  const { register, handleSubmit, control } = useForm({
    defaultValues: {},
  })
  const onSubmit = (data) => {
    alert('hi hadi')
    console.log(data)
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>لیست کالا</CCardHeader>
        <CCardBody>
          <CRow className="form-filter">
            <CForm onSubmit={handleSubmit(onSubmit)} className="form">
              <CRow className="row">
                <CCol md={2}>
                  <CFormInput id="serial" placeholder="سریال" {...register('serial')} />
                </CCol>
                <CCol md={2}>
                  <CFormInput id="serial" placeholder="آمایش" {...register('serial')} />
                </CCol>
                <CCol md={2}>
                  <CFormInput id="serial" placeholder="پلاک" {...register('serial')} />
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    id="categoryKala"
                    aria-label="دسته بندی کالا"
                    {...register('categoryKala')}
                    options={[
                      { label: 'دسته بندی کالا...', value: '' },
                      { label: 'رایانه ای', value: 'رایانه ای' },
                      { label: 'اداری', value: 'اداری' },
                    ]}
                  />
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    id="typeKala"
                    aria-label="نوع کالا"
                    {...register('typeKala')}
                    options={[
                      { label: 'نوع کالا...', value: '' },
                      { label: 'فرسوده', value: 'فرسوده' },
                      { label: 'امانی ', value: 'امانی' },
                      { label: 'اداری', value: 'اداری' },
                    ]}
                  />
                </CCol>
                <CCol md={1}>
                  <CButton color="default" type="submit">
                    <CIcon icon={cilSearch} size="sm" />
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CRow>
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

export default ToolListAttrib
