import React from 'react';
import { Timeline, Avatar, Tag } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import type { Appointment } from './AppointmentPage';
import type { Dayjs } from 'dayjs';

interface DayViewProps {
  date: Dayjs;
  appointments: Appointment[];
}

export const DayView: React.FC<DayViewProps> = ({ date, appointments }) => {
  const sortedAppointments = [...appointments].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );

  // Convert 12-hour format to 24-hour format for comparison
  const getHour = (time: string) => {
    const [hours, modifier] = time.split(' ');
    let [hour] = hours.split(':');
    if (modifier === 'PM' && hour !== '12') {
      hour = String(parseInt(hour) + 12);
    }
    if (modifier === 'AM' && hour === '12') {
      hour = '00';
    }
    return hour.padStart(2, '0');
  };

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">{date.format('dddd, MMMM D, YYYY')}</h2>
      </div>
      
      <div className="grid grid-cols-[100px_1fr] gap-4">
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="text-gray-500 text-right pr-4 py-4">{time}</div>
            <div className="border-t border-gray-100 relative py-4" style={{ height: '100px' }}>
              {sortedAppointments
                .filter(apt => getHour(apt.startTime) === time.split(':')[0])
                .map((apt, index) => (
                  <div 
                    key={apt.id}
                    className="absolute w-[calc(100%-16px)] bg-blue-50 rounded-lg p-3 border-l-4"
                    style={{ 
                      borderLeftColor: apt.color || '#2196F3',
                      top: `${index * 5}px`,
                      zIndex: index
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        {apt.startTime} - {apt.endTime}
                      </span>
                      <Tag color={apt.color || 'blue'}>{apt.type}</Tag>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar 
                        size="small" 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${apt.patientName}`} 
                      />
                      <span className="font-medium">{apt.patientName}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                      <EnvironmentOutlined className="mr-1" />
                      Room {apt.room}
                    </div>
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}; 