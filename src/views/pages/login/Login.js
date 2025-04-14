import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
import { authenticateAPI } from './Login.Thunk'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // State to manage password visibility
  const navigate = useNavigate()
  // const loading = useSelector((state) => state.LoginSlice.loading)
  // const message = useSelector((state) => state.LoginSlice.message)
  if (!localStorage.getItem('uniqueId')) {
    const uuid = uuidv4()
    localStorage.setItem('uniqueId', uuid)
    console.log('New UUID generated and set:', uuid)
  }
  const dispatch = useDispatch()
  const showAlert = (message, type = 'error') => {
    Swal.fire({
      icon: type, // 'error', 'success', 'warning', 'info', 'question'
      title: message,
      confirmButtonText: 'OK',
      timer: 3000, // Auto close after 3 seconds
      timerProgressBar: true,
    })
  }

  console.log('email----->', email)
  console.log('password----->', password)

  const login_button_click = async () => {
    if (!email) {
      showAlert('Please enter a valid email id')
      return // Early return to prevent further execution
    }

    if (!password) {
      showAlert('Please enter a valid password')
      return // Early return to prevent further execution
    }

    const body = {
      userid: email,
      pswd: password,
    }

    try {
      const response = await authenticateAPI(body)

      // Check if response exists and has the expected properties
      if (!response) {
        throw new Error('No response received from server')
      }

      // Store approval status in localStorage if it exists
      if (response.approvalStatus) {
        localStorage.setItem('approvalStatus', response.approvalStatus)
      }

      // Check for successful login conditions
      const isApproved = response.approvalStatus
      const isStatus200 = response.status === 200
      const hasValidPayload = response?.payload?.length > 0

      // Navigate to home page if approved or status is 200
      if (isApproved || isStatus200) {
        navigate('/', { replace: true })
        localStorage.setItem('isApproved', response.data.approvalStatus)
        showAlert('Login successful', 'success')
        return
      }

      // Handle other cases
      if (hasValidPayload) {
        // Additional success case if needed
        showAlert('Login successful', 'success')
      } else {
        showAlert(response.message || 'Invalid userid/password', 'error')
      }
    } catch (error) {
      console.error('Authentication error:', error)
      showAlert(error.message || 'An error occurred. Please try again.', 'error')
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={login_button_click}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
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
