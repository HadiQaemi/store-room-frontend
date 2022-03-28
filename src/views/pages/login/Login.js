import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import { authenticationServices } from 'src/services/authenticationServices'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from 'src/state-managements/actions/userActions'
import {
  setUserFailed,
  setUserStart,
  setUserSucc,
} from 'src/state-managements/actions/userActionsThunk'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  // const user = useSelector((state) => state)
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    dispatch(setUserStart())
    await authenticationServices
      .login(data)
      .then((response) => {
        dispatch(setUser(response))
        return response
      })
      .then((response) => {
        dispatch(setUserSucc(response))
        return response
      })
      .then(() => {
        history.replace('/')
      })
      .catch((error) => {
        dispatch(setUserFailed(error))
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1>سامانه انبارداری</h1>
                    <p className="text-medium-emphasis">صفحه ورود</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('username', { required: true })}
                        placeholder="نام کاربری"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('password', { required: true })}
                        type="password"
                        placeholder="رمز عبور"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          ورود
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          فراموشی رمز عبور
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>ثبت نام</h2>
                    <p>برای ثبت نام لطفا فرم مورد نظر را تکمیل نمایید</p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        ثبت نام کن!
                      </CButton>
                    </Link> */}
                    <CButton color="primary" className="mt-3" active tabIndex={-1}>
                      ثبت نام کن!
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
