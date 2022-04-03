import { cilPrint } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import ComponentToPrint from './ComponentToPrint'
import { useSelector } from 'react-redux'

export default function PrintComponent({ toolPrint }) {
  let componentRef = useRef()
  const user = useSelector((state) => state.data.user)
  const info = user.firstname + ' ' + user.lastname
  return (
    <>
      <div>
        <ReactToPrint
          trigger={() => (
            <CButton color="primary" data-tip="پرینت" className="printIcon" variant="ghost">
              <CIcon icon={cilPrint} size="xl" />
            </CButton>
          )}
          content={() => componentRef}
        />
        <ComponentToPrint info={info} ref={(el) => (componentRef = el)} toolPrint={toolPrint} />
      </div>
    </>
  )
}
