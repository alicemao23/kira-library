import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import BookmarkIcon from '@material-ui/icons/Bookmark'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
}))

const BookListItem = ({value, handleClick, key}) => {
  const classes = useStyles()
  const [reserve, setReserve] = useState(false)
  const onClick = () => {
    setReserve(true)
    !reserve && handleClick()
  }
  return (
    <Paper style={{margin: 16}}>
      <ListItem key={value.id} role={undefined} dense>
        <LibraryBooksIcon className={classes.icon} />
        <ListItemText id={key} primary={value.title} secondary={value.author} />
        <IconButton edge="end" aria-label="reserve" onClick={onClick}>
          <BookmarkIcon style={{color: reserve ? '#E76F51' : 'inherit'}} />
        </IconButton>
      </ListItem>
    </Paper>
  )
}

export default BookListItem
