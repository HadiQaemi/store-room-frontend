import { cilPrint } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import ComponentToPrint from './ComponentToPrint'

export default function PrintComponent({ toolPrint }) {
  let componentRef = useRef()

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
        <ComponentToPrint ref={(el) => (componentRef = el)} toolPrint={toolPrint} />
      </div>
    </>
  )
}
