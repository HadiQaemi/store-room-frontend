import { CCard, CCardBody, CCardHeader, CCol, CContainer } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { placeServices } from 'src/services/placeServices'
import ToolList from 'src/pages/receipt/components/ToolList'
import FormRecipt from 'src/pages/receipt/components/FormRecipt'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'

const Addnew = () => {
  const [options, setOptions] = useState([])
  const [tools, setTools] = useState([])
  const [receipt, setReceipt] = useState([])
  const [groupKala, setGroupKala] = useState([])
  const [toolGroups, setToolGroups] = useState([])
  const [toolModels, setToolModels] = useState([])

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
      serial: data.serial,
      amayesh: data.amayesh,
      plaque: data.plaque,
      categoryKala: data.categoryKala,
      typeKala: data.typeKala,
      groupKala: groupKala,
      modelKala: data.modelKala.label,
      uuid: uuidv4(),
    }
    let temp = [...tools, item]
    setTools(temp)
    setReceipt({
      locationDestination: data.locationDestination.value,
      locationKala: data.locationKala.value,
      locationSource: data.locationSource.value,
      date: data.date,
    })
  }
  const submitReceipt = () => {
    const data = { receipt: receipt, tools: tools }
    placeServices.addReceipt(data).then((response) => {
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
        title: 'رسید ثبت شد',
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
            <strong>ثبت رسید</strong>
          </CCardHeader>
          <CCardBody>
            <FormRecipt
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
            />
            <ToolList tools={tools} remove={removeItem} />
          </CCardBody>
        </CCard>
      </CCol>
    </CContainer>
  )
}
export default Addnew
