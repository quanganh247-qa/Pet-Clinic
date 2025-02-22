import React from 'react';
import { Button, Tag, Card, Avatar } from 'antd';
import { 
  CalendarOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  PlusOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

interface AppointmentSidebarProps {
  isCollapsed: boolean;
}

interface UpcomingAppointment {
  id: string;
  time: string;
  patientName: string;
  ownerName: string;
  type: string;
  room: string;
  status: 'upcoming' | 'delayed' | 'ready';
}

const getStatusColor = (status: UpcomingAppointment['status']) => {
  const colors = {
    'upcoming': 'bg-blue-50 border-blue-100',
    'delayed': 'bg-red-50 border-red-100',
    'ready': 'bg-green-50 border-green-100'
  };
  return colors[status];
};

const getStatusTextColor = (status: UpcomingAppointment['status']) => {
  const colors = {
    'upcoming': 'text-blue-600',
    'delayed': 'text-red-600',
    'ready': 'text-green-600'
  };
  return colors[status];
};

export const AppointmentSidebar: React.FC<AppointmentSidebarProps> = ({ isCollapsed }) => {
  const upcomingAppointments: UpcomingAppointment[] = [
    {
      id: '1',
      time: '09:00 AM',
      patientName: 'Moon',
      ownerName: 'Thomas Castle',
      type: 'Day Care',
      room: 'D231',
      status: 'upcoming'
    },
    {
      id: '2',
      time: '09:30 AM',
      patientName: 'Harpie',
      ownerName: 'Theodor Cubic',
      type: 'General Checkup',
      room: 'D232',
      status: 'delayed'
    }
  ];

  if (isCollapsed) {
    return (
      <div className="p-4">
        <Button type="primary" icon={<PlusOutlined />} className="w-8 h-8 p-0 mb-4" />
        <div className="space-y-2">
          {upcomingAppointments.map(apt => (
            <div key={apt.id} className={`rounded-lg p-2 ${getStatusColor(apt.status)}`}>
              <Avatar size="small" src={`https://api.dicebear.com/7.x/initials/svg?seed=${apt.patientName}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xs uppercase text-gray-400 font-medium mb-4">
        APPOINTMENTS
      </h2>

      <Button 
        type="primary" 
        icon={<PlusOutlined />}
        className="w-full mb-4"
      >
        New Appointment
      </Button>

      <div className="space-y-4">
        {upcomingAppointments.map(apt => (
          <Card 
            key={apt.id}
            className={`${getStatusColor(apt.status)} border shadow-sm`}
            size="small"
          >
            <div className="flex items-center gap-2 mb-2">
              <ClockCircleOutlined className={getStatusTextColor(apt.status)} />
              <span className="font-medium">{apt.time}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Avatar size="small" src={`https://api.dicebear.com/7.x/initials/svg?seed=${apt.patientName}`} />
              <div>
                <div className="font-medium">{apt.patientName}</div>
                <div className="text-sm text-gray-500">{apt.ownerName}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Tag color="blue">{apt.type}</Tag>
              <div className="flex items-center text-gray-500 text-sm">
                <EnvironmentOutlined className="mr-1" />
                {apt.room}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}; 