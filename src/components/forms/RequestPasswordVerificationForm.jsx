import React from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form, Icon, Input } from "semantic-ui-react"
import { Controller, useForm } from "react-hook-form"
import { passwordResetVerificationSchema } from "../../helpers/validationSchemas"

const RequestPasswordVerificationForm = ({ onSubmit, enteredEmail }) => {
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
  return (
    <>
      <Icon name="mail outline" size="massive" />
      <p className="reset-password-header">Password Reset Requested</p>
      <p className="reset-password-subheader">
        We sent a code to <b>{enteredEmail}</b>
      </p>
      <Form
        onSubmit={handleSubmit(() => onSubmit(getValues("verificationCode")))}
      >
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
        <Form.Button type="submit" color="blue" fluid>
          Continue
        </Form.Button>
      </Form>
    </>
  )
}

export default RequestPasswordVerificationForm
