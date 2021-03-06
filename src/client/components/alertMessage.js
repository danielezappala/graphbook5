import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    snackbar: {
      [theme.breakpoints.down('xs')]: {
        bottom: 90,
      },
      backgroundColor: theme.palette.background.paper,
    },
  }));


export default function AlertMessage({ message }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={open}
        //autoHideDuration={2000}
        onClose={handleClose}
        variant="warning"
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={message}
        action={[
          <IconButton key="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ]}
      >
          <Alert severity="error">{message}</Alert>
    </Snackbar>
    </div>
  );
}
