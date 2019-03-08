import React from 'react'
import { Typography } from '@material-ui/core'

const UserDetail = (props) => {
  console.log(props.match.params.id)
  return (
    <Typography>
      User Details
    </Typography>
  )
}

export default UserDetail