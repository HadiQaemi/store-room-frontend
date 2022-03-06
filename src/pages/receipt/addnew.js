import { CCard, CCardBody, CCardHeader, CCol, CContainer, CFormLabel } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { placeServices } from 'src/services/placeServices'
import ToolList from 'src/pages/receipt/components/ToolList'
import FormRecipt from 'src/pages/receipt/components/FormRecipt'
import { v4 as uuidv4 } from 'uuid'
import CreatableSelect from 'react-select/creatable'

const Addnew = () => {
  const [options, setOptions] = useState([])
  const [tools, setTools] = useState([])
  const [receipt, setReceipt] = useState([])
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
      data.map((data, index) => {
        groups.push({ value: data.tool_group, label: data.tool_group })
      })
      setToolGroups(groups)
    })
    // placeServices.getToolModels().then((data) => {
    //   let models = []
    //   data.map((data, index) => {
    //     models.push({ value: data.tool_model, label: data.tool_model })
    //   })
    //   setToolModels(models)
    // })
  }, [])
  const onSubmit = (data) => {
    let item = {
      serial: data.serial,
      amayesh: data.amayesh,
      plaque: data.plaque,
      categoryKala: data.categoryKala,
      typeKala: data.typeKala,
      groupKala: data.groupKala.label,
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
      console.log(response)
    })
  }
  const changeGroup = (e) => {
    alert(e)
    console.log(e)
  }
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: `)
    console.groupEnd()
  }
  const removeItem = (id) => {
    let temp = tools.filter((q) => q.uuid != tools[id].uuid)
    setTools(temp)
  }
  const handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed')
    console.log(inputValue)
    console.log(`action:`)
    console.log(actionMeta)
    console.groupEnd()
  }
  const colourOptions = [
    { value: '1', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: '2', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: '3', label: 'Purple', color: '#5243AA' },
    { value: '4', label: 'Red', color: '#FF5630', isFixed: true },
    { value: '5', label: 'Orange', color: '#FF8B00' },
    { value: '6', label: 'Yellow', color: '#FFC400' },
    { value: '7', label: 'Green', color: '#36B37E' },
    { value: '8', label: 'Forest', color: '#00875A' },
    { value: '9', label: 'Slate', color: '#253858' },
    { value: '10', label: 'Silver', color: '#666666' },
  ]
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
              handleChange={handleChange}
              onSubmit={onSubmit}
              items={colourOptions}
              options={options}
              groups={toolGroups}
              changeGroup={changeGroup}
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
