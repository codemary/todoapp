import React, { Component } from "react";

import { Classes, Overlay, Button } from "@blueprintjs/core";

class TicketOverlay extends React.Component {
  render() {
    const { isOpen, onClose } = this.props;
    return (
      <Overlay onClose={onClose} isOpen={isOpen}>
        Hello World
        <Button onClick={onClose}>Close</Button>
      </Overlay>
    );
  }
}

export default TicketOverlay;
