import { Link, navigate } from "gatsby"
import React, { useState } from "react"
import "semantic-ui-css/semantic.min.css"
import { Grid, Icon, Progress, Segment } from "semantic-ui-react"
import KlamathLogo from "../components/KlamathLogo"
import SEO from "../components/Seo"
import RequestPasswordResetForm from "../components/forms/RequestPasswordResetForm"
import RequestPasswordVerificationForm from "../components/forms/RequestPasswordVerificationForm"
import { useAwsPasswordReset } from "../hooks/useAwsAuth"

const ResetPasswordPage = () => {
  const [enteredEmail, setEnteredEmail] = useState("")
  const [activeTab, setActiveTab] = useState(0)
  const {
    requestAwsPasswordReset,
    handlePasswordResetVerification,
    awsErrorMessage,
  } = useAwsPasswordReset()

  const handleFormReset = () => setActiveTab(0)

  const handlePasswordResetRequest = async (value) => {
    setEnteredEmail(value)

    try {
      const passwordResetResult = await requestAwsPasswordReset(value)
      setActiveTab(1)
    } catch (error) {
      console.log("error", error)
    }
  }
  const handleNewPasswordSubmit = async (value) => {
    try {
      const { verificationCode, newPassword } = value
      const newPasswordResult = await handlePasswordResetVerification(
        enteredEmail,
        verificationCode,
        newPassword
      )

      setActiveTab(2)
      setTimeout(() => {
        navigate("/")
      }, 2500)
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <>
      <SEO title="Reset Password" keywords={[`Reset`, `Password`]} />
      <div className="reset-password-page-wrapper">
        <Grid
          textAlign="center"
          verticalAlign="middle"
          style={{ height: "100%" }}
        >
          <Grid.Column style={{ maxWidth: 550 }}>
            <KlamathLogo />
            <Segment style={{ padding: "50px 25px" }}>
              {activeTab === 0 && (
                <RequestPasswordResetForm
                  onSubmit={handlePasswordResetRequest}
                  awsErrorMessage={awsErrorMessage}
                />
              )}
              {activeTab === 1 && (
                <RequestPasswordVerificationForm
                  onSubmit={handleNewPasswordSubmit}
                  enteredEmail={enteredEmail}
                  awsErrorMessage={awsErrorMessage}
                  resetForm={handleFormReset}
                />
              )}
              {activeTab === 2 && (
                <>
                  <Icon
                    name="check circle outline"
                    size="massive"
                    color="green"
                  />
                  <p className="reset-password-header">SUCCESS</p>
                  <p className="reset-password-subheader">
                    Your password has successfully been reset
                  </p>
                  <p className="reset-password-subheader">
                    You will be redirected back to the homepage
                  </p>
                </>
              )}
            </Segment>

            <Progress
              size="tiny"
              color={activeTab === 2 ? "green" : "blue"}
              percent={50 * activeTab}
            />
            <Link to="/">
              <Icon name="left arrow" /> Back to Homepage
            </Link>
          </Grid.Column>
        </Grid>
      </div>
    </>
  )
}

export default ResetPasswordPage
