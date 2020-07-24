import React, {useState} from 'react'
import {connect} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import {saveUserName} from './redux/actions'
import Home from './components/Home'
import './App.css'

const useStyles = makeStyles({
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  card: {
    width: 500,
    height: 500,
    margin: 'auto',
  },
  icon: {
    height: '100%',
  },
  input: {
    flexGrow: 2,
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

function App({dispatchSaveUserName = () => {}}) {
  const [userName, setUserName] = useState('')
  const [open, setOpen] = useState(!userName)
  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatchSaveUserName(userName)
    !!userName.length && setOpen(false)
  }
  return (
    <>
      <Home />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <div className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Welcome to KIRA Library
          </Typography>
          <Paper
            component="form"
            className={classes.paper}
            elevation={3}
            onSubmit={handleSubmit}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <AccountCircleIcon className={classes.icon} />
            </IconButton>
            <InputBase
              placeholder="Please enter your username"
              className={classes.input}
              onChange={(e) => setUserName(e.target.value)}
              inputProps={{'aria-label': 'enter user name'}}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleSubmit}>
              Enter
            </Button>
          </Paper>
        </div>
      </Dialog>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSaveUserName: (userName) => {
      dispatch(saveUserName(userName))
    },
  }
}
const ConnectedApp = connect(null, mapDispatchToProps)(App)
export default ConnectedApp
