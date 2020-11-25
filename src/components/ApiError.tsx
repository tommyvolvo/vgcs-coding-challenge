import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

type ApiErrorProps = {
  open: boolean,
  message: string
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ApiError = ({ open, message }: ApiErrorProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <Alert severity='error'>
        An error occurred loading API data {message}
      </Alert>
    </Snackbar>
  )
}

export default ApiError
