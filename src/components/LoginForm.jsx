import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Container, Form, Input, Icon } from "semantic-ui-react"
import {
  loginFormSchema,
  setNewPasswordSchema,
} from "../helpers/validationSchemas"
import { useAwsLogin } from "../hooks/useAwsAuth"
import { Link } from "gatsby"

const LoginForm = () => {
  const {
    handleSubmit: loginHandleSubmit,
    control: loginControl,
    formState: { errors: loginErrors },
    watch: loginWatch,
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(loginFormSchema),
  })

  const {
    handleSubmit: newPasswordHandleSubmit,
    control: newPasswordControl,
    formState: { errors: newPasswordErrors },
    watch: newPasswordWatch,
  } = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: yupResolver(setNewPasswordSchema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const newPassword = newPasswordWatch("newPassword")
  const {
    isSubmitting,
    setIsSubmitting,
    handleLoginFormSubmit,
    invalidCredentialsError,
    tempUserObject,
    setTempUserObject,
  } = useAwsLogin(loginWatch)

  return !tempUserObject.isFirstLogin ? (
    <Form key="login" onSubmit={loginHandleSubmit(handleLoginFormSubmit)}>
      <Controller
        name="username"
        control={loginControl}
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
            {loginErrors?.username && (
              <p className="form-error-message">
                {loginErrors.username.message}
              </p>
            )}
          </>
        )}
      />
      <Controller
        name="password"
        control={loginControl}
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
            {loginErrors?.password && (
              <p className="form-error-message">
                {loginErrors.password.message}
              </p>
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
  ) : (
    <>
      <Form
        key={"newPassword"}
        onSubmit={newPasswordHandleSubmit(() => {
          tempUserObject.changePassword(
            newPassword,
            tempUserObject.cognitoUser,
            tempUserObject.userAttributes
          )
        })}
      >
        <p
          style={{
            fontSize: "1.1rem",
            marginBlock: 0,
            marginBottom: 10,
            fontWeight: 600,
          }}
        >
          New Password is Required
        </p>
        <Controller
          control={newPasswordControl}
          name="newPassword"
          render={({ field }) => (
            <Form.Field
              style={{ textAlign: "left" }}
              error={!!newPasswordErrors.newPassword}
            >
              <label>New Password</label>
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Password must be at least 8 characters"
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
              {!!newPasswordErrors.newPassword && (
                <p className="form-error-message mt">
                  {newPasswordErrors.newPassword.message}
                </p>
              )}
            </Form.Field>
          )}
        />
        <Controller
          control={newPasswordControl}
          name="confirmPassword"
          render={({ field }) => (
            <Form.Field
              style={{ textAlign: "left" }}
              error={!!newPasswordErrors.confirmPassword}
            >
              <label>Confirm Password</label>
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Password must match"
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
              {!!newPasswordErrors.confirmPassword && (
                <p className="form-error-message mt">
                  {newPasswordErrors.confirmPassword.message}
                </p>
              )}
              {/* {!!awsErrorMessage && (
                <p className="form-error-message mt">{awsErrorMessage}</p>
              )} */}
            </Form.Field>
          )}
        />
        <Form.Button type="submit" color="blue" fluid>
          Set New Password
        </Form.Button>
        <p
          className="reset-password-form-clear"
          onClick={() => {
            setIsSubmitting(false)
            setTempUserObject({})
          }}
        >
          Start Over <Icon name="undo" />
        </p>
      </Form>
    </>
  )
}

export default LoginForm
