import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Container, Form } from "semantic-ui-react"
import { loginFormSchema } from "../helpers/validationSchemas"
import { useAwsLogin } from "../hooks/useAwsAuth"
import { Link } from "gatsby"

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(loginFormSchema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const { isSubmitting, handleLoginFormSubmit, invalidCredentialsError } =
    useAwsLogin(watch)
  return (
    <Form onSubmit={handleSubmit(handleLoginFormSubmit)}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <>
            <Form.Input
              {...field}
              id="form-input-control-username"
              label="Username"
              placeholder="Username"
              icon="user"
              iconPosition="left"
            />
            {errors?.username && (
              <p className="form-error-message">{errors.username.message}</p>
            )}
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <>
            <Form.Input
              {...field}
              id="form-input-control-password"
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              icon="key"
              iconPosition="left"
              action={{
                type: "button",
                basic: true,
                color: "white",
                icon: showPassword ? "eye slash outline" : "eye",
                onClick: (e) => {
                  setShowPassword((prevState) => !prevState)
                },
              }}
            />
            {errors?.password && (
              <p className="form-error-message">{errors.password.message}</p>
            )}
            {invalidCredentialsError && (
              <p className="form-error-message">{invalidCredentialsError}</p>
            )}
            <Container className="form-forgot-password-wrapper">
              <Link className="form-forgot-password" to="/reset-password">
                Reset Password
              </Link>
            </Container>
          </>
        )}
      />

      <Form.Button
        color="vk"
        fluid
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Login
      </Form.Button>
    </Form>
  )
}

export default LoginForm
