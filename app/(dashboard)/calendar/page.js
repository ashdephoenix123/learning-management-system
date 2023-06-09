'use client';

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'

const CalendarPage = () => {

    return (
        <div className='min-h-screen'>
            <h3 className='fontsz1'>Calendar</h3>
            <div className='mt-2 mr-auto'>
                <p className='fontsz2 mb-4'>Your clases schedules are shown here.</p>
                <div className='calendar-container'>
                    <FullCalendar
                        plugins={[
                            resourceTimelinePlugin,
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin
                        ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'resourceTimelineWeek,dayGridMonth,timeGridWeek'
                        }}
                        initialView='resourceTimelineWeek'
                        nowIndicator={true}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        resources={[
                            { id: 'a', title: 'Auditorium A' },
                            { id: 'b', title: 'Auditorium B', eventColor: 'green' },
                            { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
                        ]}
                        initialEvents={[
                            { title: 'nice event', start: new Date(), resourceId: 'a' }
                        ]}
                    />
                </div>
            </div>

        </div>
    )
}

export default CalendarPage
