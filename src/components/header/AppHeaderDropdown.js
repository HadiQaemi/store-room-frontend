import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import avatar8 from './../../assets/images/avatars/6.jpg'
import { authenticationServices } from 'src/services/authenticationServices'

import { useSelector } from 'react-redux'

const AppHeaderDropdown = () => {
  const user = useSelector((state) => state.data.user)
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          {user.firstname + ' ' + user.lastname}
        </CDropdownHeader>
        <CDropdownItem href="#">پروفایل کاربری</CDropdownItem>
        <CDropdownItem href="#" onClick={() => authenticationServices.logout()}>
          خروج
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default React.memo(AppHeaderDropdown)
