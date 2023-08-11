import React from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, Icon, Input } from "semantic-ui-react"
import { Controller, useForm } from "react-hook-form"
import { requestPasswordResetSchema } from "../../helpers/validationSchemas"

const RequestPasswordResetForm = ({ onSubmit, awsErrorMessage }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },

    watch,
    getValues,
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(requestPasswordResetSchema),
  })
  return (
    <>
      <Icon name="unlock alternate" size="massive" />
      <p className="reset-password-header">Forgot Password?</p>
      <p className="reset-password-subheader">
        Enter the email associated with your account and we'll send a
        verification code so you can reset your password.
      </p>
      <Form onSubmit={handleSubmit(() => onSubmit(getValues("email")))}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Form.Field style={{ textAlign: "left" }} error={!!errors.email}>
              <label>Email</label>
              <Input {...field} />
              {!!errors.email && (
                <p className="form-error-message mt">{errors.email.message}</p>
              )}
              {!!awsErrorMessage && (
                <p className="form-error-message mt">{awsErrorMessage}</p>
              )}
            </Form.Field>
          )}
        />
        <Form.Button type="submit" fluid color="blue">
          Submit
        </Form.Button>
      </Form>
    </>
  )
}

export default RequestPasswordResetForm
