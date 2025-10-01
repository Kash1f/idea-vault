import React from 'react'
import Form from '../../components/form/Form'

const Login = () => {
  return (
   <Form route="/api/token/" method="login" />
  )
}

export default Login