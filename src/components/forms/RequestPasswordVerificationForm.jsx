import React, { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, Icon, Input } from "semantic-ui-react"
import { Controller, useForm } from "react-hook-form"
import { passwordResetVerificationSchema } from "../../helpers/validationSchemas"

const RequestPasswordVerificationForm = ({
  onSubmit,
  enteredEmail,
  awsErrorMessage,
  resetForm,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    defaultValues: { verificationCode: "" },
    resolver: yupResolver(passwordResetVerificationSchema),
  })
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <Icon name="mail outline" size="massive" />
      <p className="reset-password-header">Password Reset Requested</p>
      <p className="reset-password-subheader">
        We sent a code to <b>{enteredEmail}</b>
      </p>

      <Form onSubmit={handleSubmit(() => onSubmit(getValues()))}>
        <Controller
          control={control}
          name="verificationCode"
          render={({ field }) => (
            <Form.Field
              style={{ textAlign: "left" }}
              error={!!errors.verificationCode}
            >
              <label>Verification Code</label>
              <Input {...field} />
              {!!errors.verificationCode && (
                <p className="form-error-message mt">
                  {errors.verificationCode.message}
                </p>
              )}
            </Form.Field>
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <Form.Field
              style={{ textAlign: "left" }}
              error={!!errors.newPassword}
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
              {!!errors.newPassword && (
                <p className="form-error-message mt">
                  {errors.newPassword.message}
                </p>
              )}
            </Form.Field>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Form.Field
              style={{ textAlign: "left" }}
              error={!!errors.confirmPassword}
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
              {!!errors.confirmPassword && (
                <p className="form-error-message mt">
                  {errors.confirmPassword.message}
                </p>
              )}
              {!!awsErrorMessage && (
                <p className="form-error-message mt">{awsErrorMessage}</p>
              )}
            </Form.Field>
          )}
        />
        <Form.Button type="submit" color="blue" fluid>
          Set New Password
        </Form.Button>
        <p className="reset-password-form-clear" onClick={resetForm}>
          Start Over <Icon name="undo" />
        </p>
      </Form>
    </>
  )
}

export default RequestPasswordVerificationForm
