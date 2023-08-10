import { Link, navigate } from "gatsby"
import React, { useState } from "react"
import "semantic-ui-css/semantic.min.css"
import { Grid, Icon, Progress, Segment } from "semantic-ui-react"
import KlamathLogo from "../components/KlamathLogo"
import SEO from "../components/Seo"
import RequestPasswordResetForm from "../components/forms/RequestPasswordResetForm"
import RequestPasswordVerificationForm from "../components/forms/RequestPasswordVerificationForm"
import SetNewPasswordForm from "../components/forms/SetNewPasswordForm"
import { useForm } from "react-hook-form"

const ResetPasswordPage = () => {
  const [enteredEmail, setEnteredEmail] = useState("")
  const [activeTab, setActiveTab] = useState(0)

  const handlePasswordResetRequest = (value) => {
    console.log("🚀 ~ handlePasswordResetRequest ~ values:", value)
    setEnteredEmail(value)
    setActiveTab(1)
  }
  const handleVerificationCodeSubmit = (value) => {
    console.log("🚀 ~ handleVerificationCodeSubmit ~ value:", value)
    setActiveTab(2)
  }
  const handleNewPasswordSubmit = (value) => {
    console.log("🚀 ~ handleVerificationCodeSubmit ~ value:", value)
    setActiveTab(3)
    setTimeout(() => {
      navigate("/")
    }, 2500)
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
                />
              )}
              {activeTab === 1 && (
                <RequestPasswordVerificationForm
                  onSubmit={handleVerificationCodeSubmit}
                  enteredEmail={enteredEmail}
                />
              )}
              {activeTab === 2 && (
                <SetNewPasswordForm
                  onSubmit={handleNewPasswordSubmit}
                  enteredEmail={enteredEmail}
                />
              )}
              {activeTab === 3 && (
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
              color={activeTab === 3 ? "green" : "blue"}
              percent={activeTab === 3 ? 100 : 33 * activeTab}
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
