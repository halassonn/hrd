import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Box, Button } from "./shared";

const DialogContainer = styled(Box)`
  background: white;
  border-color: ${({ status }) => (status === "error" ? "red" : "white")};
  padding-top: 15px;
`;

const _Dialog = ({ onClose, message, open, status, action }) => {
  return (
    <Modal open={open}>
      <DialogContainer status={status}>
        <div>{message}</div>
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {" "}
          {action === null ? <Button onClick={onClose}>close</Button> : action}
        </div>
      </DialogContainer>
    </Modal>
  );
};
export default _Dialog;
