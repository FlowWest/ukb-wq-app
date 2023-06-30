import React, { useState } from "react"
import { Button, Header, Icon, Modal, Menu } from "semantic-ui-react"

function ModalExampleBasic({ open, setOpen, onClick, trigger }) {
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={trigger}
    >
      <Header icon>
        <Icon name="log out" />
        End Current Session
      </Header>
      <Modal.Content>
        <p>
          Are you sure you sure you want to logout? This action will end the
          current admin session.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={onClick}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleBasic
