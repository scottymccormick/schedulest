import React from 'react'

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';

const localizer = BigCalendar.momentLocalizer(moment);

const UserCalendar = (props) => {
  return (
    <BigCalendar 
      events={props.events}
      localizer={localizer}
      defaultView={BigCalendar.Views.AGENDA}
      views={['day', 'week', 'agenda']}
      step={60}
      defaultDate={new Date()}
      onSelectEvent={e => props.history.push(`/bookings/${e.id}`)} />
  )
}

export default withRouter(UserCalendar)