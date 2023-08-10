import React from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, Icon, Input } from "semantic-ui-react"
import { Controller, useForm } from "react-hook-form"
import { requestPasswordResetSchema } from "../../helpers/validationSchemas"

const RequestPasswordResetForm = ({ onSubmit }) => {
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
        No worries, we'll send reset instructions
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
