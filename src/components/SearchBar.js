import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

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
}))

const SearchBar = ({dispatchSearchBooks = () => {}}) => {
  const classes = useStyles()
  const [searchQuery, setSearchQuery] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatchSearchBooks(searchQuery)
  }
  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search books by title"
        inputProps={{'aria-label': 'search books by title'}}
      />
    </Paper>
  )
}

export default SearchBar
