import React from "react"
import BackgroundImage from "gatsby-background-image"
import { Header, Container, Segment } from "semantic-ui-react"
import { graphql, useStaticQuery } from "gatsby"

const Banner = ({ mobile, pageName }) => {
  const headerContent = {
    index: {
      title: (
        <div>
          The Klamath Tribes
          <br />
          Water Resources Repository
        </div>
      ),
      text: "The largest water quality data collection entity in the Upper Klamath Basin, monitoring water quality conditions in Upper Klamath Lake since 1990 and major tributaries including the Sprague, Williamson, and Wood Rivers since 2001.",
    },
    data: {
      title: (
        <div>
          The Klamath Tribes
          <br />
          Water Quality Monitoring Data
        </div>
      ),
      text: "",
    },
    reports: {
      title: (
        <div>
          The Klamath Tribes
          <br />
          Water Quality Report Repository
        </div>
      ),
      text: "",
    },
    about: {
      title: (
        <div>
          The Klamath Tribes
          <br />
          Water Quality Monitoring Program
        </div>
      ),
      text: "",
    },
    resources: {
      title: (
        <div>
          The Klamath Tribes
          <br />
          Water Quality Monitoring Resources
        </div>
      ),
      text: "",
    },
    notFound: {
      title: <div>Page Not Found</div>,
      text: "",
    },
  }

  const data = useStaticQuery(graphql`
    query {
      index: file(relativePath: { eq: "sucker_photo.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1540) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      data: file(relativePath: { eq: "wq_tech_2.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1540) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      reports: file(
        relativePath: { eq: "Chiloquin_Williamson_2011_by_Tupper.jpg" }
      ) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1540) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      resources: file(
        relativePath: {
          eq: "Sprague_River_above_dam_by_taylor_tupper_copy.jpg"
        }
      ) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1540) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      about: file(relativePath: { eq: "Williamson_2016_by_T_Tupper.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1540) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      notFound: file(
        relativePath: { eq: "Klamath_Tribes_sampling_wq_on_UKL.jpg" }
      ) {
        childImageSharp {
          fluid(quality: 99, maxWidth: 3080) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  if (mobile) {
    if (pageName === "index") {
      return (
        <Segment className="header-image-container">
          <BackgroundImage
            className="header-background-image"
            fluid={[
              `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
              data["index"].childImageSharp.fluid,
            ]}
            style={{
              height: "100%",
              width: "100%",
              position: "cover",
            }}
          >
            <p
              style={{
                color: "white",
                padding: "1rem",
              }}
            >
              {headerContent[pageName].text}
            </p>
          </BackgroundImage>
        </Segment>
      )
    } else {
      return <></>
    }
  } else {
    return (
      <Segment className="header-image-container">
        <BackgroundImage
          className="header-background-image"
          fluid={[
            `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))`,
            ...(data[pageName] ? [data[pageName].childImageSharp.fluid] : []),
          ]}
          style={{
            height: "100%",
            width: "100%",
            position: "cover",
          }}
        >
          <Container textAlign="center" className="header-text-container">
            <Header
              as="h1"
              inverted
              content={
                headerContent[pageName] ? headerContent[pageName].title : ""
              }
              style={{
                fontSize: mobile ? "2em" : "4em",
                fontWeight: "normal",
                marginBottom: 0,
              }}
              className="header-title"
            />
            <Header
              as="h2"
              inverted
              content={
                headerContent[pageName] ? headerContent[pageName].text : ""
              }
              style={{
                fontSize: mobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1.5em",
              }}
              className="header-text"
            />
          </Container>
        </BackgroundImage>
      </Segment>
    )
  }
}

export default Banner
