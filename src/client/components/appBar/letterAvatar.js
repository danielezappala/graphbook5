import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export default function LetterAvatar(props) {
  
  const {letter} = props
  console.log('letter',letter)
  const classes = useStyles();
  console.log('classes ' + JSON.stringify(classes))

  return (
    <div className={classes.root}>
      <Avatar className={classes.orange}>{letter}</Avatar>
    </div>
  );
}
