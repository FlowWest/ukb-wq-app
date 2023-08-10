import React from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, Icon, Input } from "semantic-ui-react"
import { Controller, useForm } from "react-hook-form"
import { setNewPasswordSchema } from "../../helpers/validationSchemas"

const SetNewPasswordForm = ({ onSubmit, enteredEmail }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: yupResolver(setNewPasswordSchema),
  })
  return (
    <>
      <Icon name="key" size="massive" />
      <p className="reset-password-header">Set New Password</p>
      <p className="reset-password-subheader">Must be at least 8 characters.</p>
      <Form onSubmit={handleSubmit(() => onSubmit(getValues()))}>
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <Form.Field
              style={{ textAlign: "left" }}
              error={!!errors.newPassword}
            >
              <label>New Password</label>
              <Input {...field} />
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
              <Input {...field} />
              {!!errors.confirmPassword && (
                <p className="form-error-message mt">
                  {errors.confirmPassword.message}
                </p>
              )}
            </Form.Field>
          )}
        />
        <Form.Button type="submit" color="blue" fluid>
          Reset Password
        </Form.Button>
      </Form>
    </>
  )
}

export default SetNewPasswordForm
