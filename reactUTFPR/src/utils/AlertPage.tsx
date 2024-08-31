import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const AlertPage: React.FC<{ variant: string, message: string, show: boolean }> = ({ variant, message, show }) => {

  const [showMessage, setShowMessage] = useState(false); setShowMessage(true);
  setVariant('danger');
  setTimeout(() => {
    setShowMessage(false);
  }, 3000);
  return (
    <>
      {showMessage ?
        <Alert key={variant} variant={variant}>
          {message}
        </Alert> : (null)}

    </>
  );

};

export default AlertPage;
