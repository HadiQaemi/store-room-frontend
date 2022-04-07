import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

export const AppSidebarNav = ({ items, user }) => {
  const location = useLocation()
  const [info, setInfo] = React.useState(user)
  const navLink = (name, icon, badge, role) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {/* {role && role} */}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index, user) => {
    const { component, name, badge, role, icon, ...rest } = item
    const Component = component
    var isAdmin = 0
    if (role !== undefined) {
      if (role === 'admin') {
        isAdmin = 1
        if (role == info.type) {
          return (
            <Component
              {...(rest.to && !rest.items && { component: NavLink, activeClassName: 'active' })}
              key={index}
              role={role}
              {...rest}
            >
              {navLink(name, icon, badge, role)}
            </Component>
          )
        }
      }
    }
    if (!isAdmin) {
      return (
        <Component
          {...(rest.to && !rest.items && { component: NavLink, activeClassName: 'active' })}
          key={index}
          role={role}
          {...rest}
        >
          {navLink(name, icon, badge, role)}
        </Component>
      )
    }
  }
  const navGroup = (item, index) => {
    const { component, name, role, icon, to, ...rest } = item
    const Component = component
    var isAdmin = 0
    if (role !== undefined) {
      if (role === 'admin') {
        isAdmin = 1
        if (role == info.type) {
          return (
            <Component
              idx={String(index)}
              key={index}
              toggler={navLink(name, icon, role)}
              visible={location.pathname.startsWith(to)}
              {...rest}
            >
              {item.items?.map((item, index) =>
                item.items ? navGroup(item, index) : navItem(item, index),
              )}
            </Component>
          )
        }
      }
    }
    if (!isAdmin) {
      return (
        <Component
          idx={String(index)}
          key={index}
          toggler={navLink(name, icon, role)}
          visible={location.pathname.startsWith(to)}
          {...rest}
        >
          {item.items?.map((item, index) =>
            item.items ? navGroup(item, index) : navItem(item, index),
          )}
        </Component>
      )
    }
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
