import { CCard, CCardBody, CCardHeader, CCol, CContainer } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { placeServices } from 'src/services/placeServices'
import ToolList from 'src/pages/receipt/components/ToolList'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'
import FormTransference from './components/FormTransference'

const AddTransference = () => {
  const [options, setOptions] = useState([])
  const [tools, setTools] = useState([])
  const [itemIds, setItemIds] = useState([])
  const [receipt, setReceipt] = useState([])
  const [groupKala, setGroupKala] = useState([])
  const [toolGroups, setToolGroups] = useState([])
  const [toolModels, setToolModels] = useState([])
  const [searchValues, setSearchValues] = useState([])

  const { register, handleSubmit, control } = useForm({
    defaultValues: {},
  })
  useEffect(() => {
    placeServices.getPlaces().then((data) => {
      setOptions(data)
    })
    placeServices.getToolGroups().then((data) => {
      let groups = []
      data.map((data) => {
        groups.push({ value: data.tool_group, label: data.tool_group })
      })
      setToolGroups(groups)
    })
  }, [])
  const onSubmit = (data) => {
    let item = {
      serial: data.tool.serial_number,
      amayesh: data.tool.amayesh,
      plaque: data.tool.pelauqe,
      categoryKala: data.tool.category,
      typeKala: data.tool.type,
      groupKala: data.tool.group,
      modelKala: data.tool.model,
      uuid: uuidv4(),
    }
    console.log(item, data.tool)
    let temp = [...tools, item]
    setTools(temp)
    setItemIds([...itemIds, data.tool.id])
    setReceipt({
      transferenceDestination: data.data.transferenceDestination.value,
      transferenceNumber: data.data.transferenceNumber,
      date: data.data.date,
    })
  }
  const submitReceipt = () => {
    const data = { transference: receipt, tools: itemIds }
    placeServices.addTransference(data).then((response) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
      Toast.fire({
        icon: 'success',
        title: 'حواله ثبت شد',
      })
      setTools([])
      setReceipt([])
    })
  }
  const changeGroup = (newValue, actionMeta) => {
    // console.log(newValue.value)
    setGroupKala(newValue.value)
    placeServices.getToolModels(newValue.value).then((data) => {
      let models = []
      data.map((data, index) => {
        models.push({ value: data.tool_model, label: data.tool_model })
      })
      setToolModels(models)
    })
  }
  const searchKala = (newValue, actionMeta) => {
    alert(newValue)
    console.log(newValue)
    // setGroupKala(newValue.value)
    // placeServices.getToolModels(newValue.value).then((data) => {
    //   let models = []
    //   data.map((data, index) => {
    //     models.push({ value: data.tool_model, label: data.tool_model })
    //   })
    //   setToolModels(models)
    // })
  }
  const searchKalaKeyDown = (search) => {
    placeServices.getTools({ search: search }).then((data) => {
      let tools = []
      data.map((data, index) => {
        tools.push(data)
      })
      setSearchValues(tools)
    })
  }
  const removeItem = (id) => {
    let temp = tools.filter((q) => q.uuid !== tools[id].uuid)
    setTools(temp)
  }
  const handleInputChange = (inputValue, actionMeta) => {
    // console.group('Input Changed')
    // console.log(inputValue)
    // console.log(`action:`)
    // console.log(actionMeta)
    // console.groupEnd()
  }
  const formatCreateLabel = (inputValue) => `جدید: ${inputValue}`

  return (
    <CContainer>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>ثبت حواله</strong>
          </CCardHeader>
          <CCardBody>
            <FormTransference
              register={register}
              handleSubmit={handleSubmit}
              control={control}
              handleInputChange={handleInputChange}
              formatCreateLabel={formatCreateLabel}
              changeGroup={changeGroup}
              onSubmit={onSubmit}
              items={toolModels}
              options={options}
              groups={toolGroups}
              submitReceipt={submitReceipt}
              searchKala={searchKala}
              searchKalaKeyDown={searchKalaKeyDown}
              searchValues={searchValues}
            />
            <ToolList tools={tools} remove={removeItem} />
          </CCardBody>
        </CCard>
      </CCol>
    </CContainer>
  )
}
export default AddTransference
