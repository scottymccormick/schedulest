import React, { Component } from 'react'

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment);

const MultiLocCalendar = (props) => {
  return (
    <BigCalendar 
      events={props.events}
      localizer={localizer}
      defaultView={BigCalendar.Views.DAY}
      views={['day', 'work_week']}
      step={60}
      defaultDate={new Date()}
      resources={props.resourceMap}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle" />
  )
}

export default MultiLocCalendar

// events={events}
//       localizer={localizer}
//       defaultView={BigCalendar.Views.DAY}
//       views={['day', 'work_week']}
//       step={60}
//       defaultDate={new Date(2018, 0, 29)}
//       resources={resourceMap}
//       resourceIdAccessor="resourceId"
//       resourceTitleAccessor="resourceTitle"