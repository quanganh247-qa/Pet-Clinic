import React from 'react';
import { Modal, Timeline, Button, Tag, Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import type { Appointment } from './AppointmentPage';

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Dayjs;
  appointments: Appointment[];
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  isOpen,
  onClose,
  date,
  appointments
}) => {
  const sortedAppointments = [...appointments].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      title={date.format('MMMM D, YYYY')}
      bodyStyle={{ 
        height: '70vh',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <div className="flex h-full">
        {/* Timeline section with scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <Timeline
            mode="left"
            items={sortedAppointments.map(apt => ({
              color: apt.color || 'blue',
              label: (
                <div className="font-medium text-gray-600 whitespace-nowrap">
                  {apt.startTime} - {apt.endTime}
                </div>
              ),
              children: (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar size="small" src={`https://api.dicebear.com/7.x/initials/svg?seed=${apt.patientName}`} />
                    <div className="font-medium">{apt.patientName}</div>
                  </div>
                  <Tag color="blue" className="mb-2">{apt.type}</Tag>
                  <div className="flex items-center text-gray-500 text-sm">
                    <EnvironmentOutlined className="mr-1" />
                    Room {apt.room || 'TBD'}
                  </div>
                </div>
              )
            }))}
          />
        </div>

        {/* Quick Schedule section */}
        <div className="w-64 border-l bg-gray-50 h-full overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Quick Schedule</h3>
            <Button type="primary" block className="mb-4">
              Add Appointment
            </Button>
            <div className="space-y-3">
              <div className="text-sm text-gray-500">Available Slots</div>
              {['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM'].map(time => (
                <Button 
                  key={time} 
                  block 
                  className="text-left"
                  icon={<ClockCircleOutlined />}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}; 