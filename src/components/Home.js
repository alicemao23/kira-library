import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

import {getBooks, reserveBook, searchBookByTitle} from '../redux/actions'
import SearchBar from './SearchBar'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center;',
  },
}))

const HomePage = ({
  bookList = {},
  userName = 'alicemao',
  dispatchGetBooks = () => {},
  dispatchReserveBook = () => {},
  dispatchSearchBooks = () => {},
}) => {
  useEffect(dispatchGetBooks, [])
  const classes = useStyles()
  const {result = []} = bookList

  const handleClick = (bookId, userName) => {
    dispatchReserveBook({bookId, userName})
  }
  return (
    <div className={classes.container}>
      <Typography variant="h3">WELCOME TO KIRA LIBRARY</Typography>
      <SearchBar dispatchSearchBooks={dispatchSearchBooks} />
      <List className={classes.root}>
        {result.map((value) => {
          const labelId = `book-list-label-${value.id}`
          const authorId = `book-list-author-${value.id}`
          return (
            <Paper style={{margin: 16}}>
              <ListItem key={value.id} role={undefined} dense>
                <LibraryBooksIcon />
                <ListItemText id={labelId} primary={value.title} />
                <ListItemText id={authorId} secondary={value.author} />
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => handleClick(value.id, userName)}>
                  Reserve
                </Button>
              </ListItem>
            </Paper>
          )
        })}
      </List>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetBooks: () => {
      dispatch(getBooks())
    },
    dispatchReserveBook: ({userName, bookId}) => {
      dispatch(reserveBook({userName, bookId}))
    },
    dispatchSearchBooks: (queryString) => {
      console.log('hllo')
      dispatch(searchBookByTitle(queryString))
    },
  }
}

const mapStateToProps = ({books: {bookList}}) => {
  return {
    bookList,
  }
}

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage)
export default ConnectedHomePage
