import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {
  getBooks,
  reserveBook,
  searchBookByTitle,
  getReservedBooks,
} from '../redux/actions'
import SearchBar from './SearchBar'
import BookListItem from './BookListItem'
import MyBooks from './MyBooks'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginBottom: '1rem',
  },
  header: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  container: {
    width: '80%',
    maxWidth: '1440px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2rem',
  },
}))

const HomePage = ({
  bookList = {},
  reservedBooks = {},
  userName,
  dispatchGetBooks = () => {},
  dispatchReserveBook = () => {},
  dispatchGetReservedBooks = () => {},
  dispatchSearchBooks = () => {},
}) => {
  useEffect(dispatchGetBooks, [])

  useEffect(() => {
    userName && dispatchGetReservedBooks(userName)
  }, [userName, dispatchGetReservedBooks])

  const classes = useStyles()
  const {result = [], _links: {prev = '', next = ''} = {}} = bookList

  const handleClick = (bookId, userName) => () => {
    dispatchReserveBook({bookId, userName})
  }

  const navigatePage = (url) => {
    dispatchGetBooks(url)
  }

  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.header}>
        WELCOME TO KIRA LIBRARY
      </Typography>
      <SearchBar dispatchSearchBooks={dispatchSearchBooks} />
      <List className={classes.list}>
        {result.map((value) => {
          const labelId = `book-list-label-${value.id}`
          return (
            <BookListItem
              value={value}
              handleClick={handleClick(value.id, userName)}
              key={labelId}
            />
          )
        })}
      </List>
      {result.length ? (
        <div className={classes.button}>
          <Button
            disabled={!prev}
            onClick={() => {
              navigatePage(prev)
            }}>
            Prev
          </Button>
          <Button
            disabled={!next}
            onClick={() => {
              navigatePage(next)
            }}>
            Next
          </Button>
        </div>
      ) : (
        ''
      )}
      <MyBooks reservedBooks={reservedBooks}></MyBooks>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetBooks: (url) => {
      dispatch(getBooks(url))
    },
    dispatchReserveBook: ({userName, bookId}) => {
      dispatch(reserveBook({userName, bookId}))
    },
    dispatchSearchBooks: (queryString) => {
      dispatch(searchBookByTitle(queryString))
    },
    dispatchGetReservedBooks: (userName) => {
      dispatch(getReservedBooks(userName))
    },
  }
}

const mapStateToProps = ({
  books: {bookList, reservedBooks},
  user: {userName},
}) => {
  return {
    bookList,
    reservedBooks,
    userName,
  }
}

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage)
export default ConnectedHomePage
