import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import {Typography} from '@material-ui/core'

const useStyles = makeStyles({
  label: {
    margin: 'auto',
    display: 'flex',
    padding: '0 10px',
  },
  icon: {
    marginRight: 10,
  },
})

const MyBook = ({reservedBooks = []}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpen(open)
  }

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {reservedBooks.map((book) => {
          return (
            <>
              <ListItem key={book.id} dense>
                <LibraryBooksIcon className={classes.icon} />
                <ListItemText
                  id={book.id}
                  primary={book.title}
                  secondary={book.author}
                />
              </ListItem>
            </>
          )
        })}
      </List>
    </div>
  )

  return (
    <div>
      <Button variant="outlined" onClick={toggleDrawer(true)}>
        My Reserved Books
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {reservedBooks.length ? (
          list()
        ) : (
          <Typography variant="p" className={classes.label}>
            You do not have any books reserved currently.
          </Typography>
        )}
      </Drawer>
    </div>
  )
}

export default MyBook
