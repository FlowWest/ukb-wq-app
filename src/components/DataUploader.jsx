import React, { useMemo, useCallback, useContext } from "react"
import { useDropzone } from "react-dropzone"
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../styles/dropzone-style-helper"
import { Icon, Button, Divider } from "semantic-ui-react"

function DataUploader({ setValue, getValues, error, clearErrors }, field) {
  const selectedFile = getValues("file")
  const onDrop = useCallback((acceptedFiles) => {
    setValue("file", acceptedFiles[0])
    clearErrors("file")
  }, [])

  const {
    isDragActive,
    isDragAccept,
    getRootProps,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  return (
    <div className="data-upload-dropzone-container">
      <label htmlFor="file" className="dropzone-label">
        File Upload
      </label>
      <div
        {...getRootProps({ style })}
        className={error && "form-file-upload-error"}
      >
        <input {...getInputProps()} {...field} />
        {!selectedFile && (
          <div className="dropzone-content">
            <Icon name="upload" />
            <br />
            <div>
              <p> Drag and Drop</p>
              <Divider horizontal>OR</Divider>
              <Button color="blue">Select File</Button>
            </div>
          </div>
        )}
        {selectedFile && (
          <div className="dropzone-content">
            <h3>Selected File</h3>
            <Icon name="check circle outline" color="green" />
            <br />
            <div>{selectedFile.path}</div>
            <br />
            <Button color="blue">Select New File</Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default DataUploader
