import React, { useState } from 'react';
import { Calendar, Badge, Select, Button, Tabs, Dropdown } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  CalendarOutlined,
  UnorderedListOutlined,
  TableOutlined,
  PlusOutlined,
  FilterOutlined,
  DownOutlined
} from '@ant-design/icons';
import { DayDetailModal } from './DayDetailModal';
import { DayView } from './DayView';

export interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  type: string;
  room: string;
  patientName: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  color?: string;
  date: string;
}

export const AppointmentPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedDayModal, setSelectedDayModal] = useState<Dayjs | null>(null);

  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: '1',
      startTime: '06:00 PM',
      endTime: '06:30 PM',
      type: 'Preoperative Evaluation',
      patientName: 'Max',
      room: '101',
      status: 'scheduled',
      color: '#4CAF50',
      date: dayjs().format('YYYY-MM-DD')
    },
    {
      id: '2',
      startTime: '03:34 PM',
      endTime: '04:19 PM',
      type: 'Oncology',
      patientName: 'Luna',
      room: '102',
      status: 'scheduled',
      color: '#2196F3',
      date: dayjs().format('YYYY-MM-DD')
    },
    {
      id: '3',
      startTime: '04:34 PM',
      endTime: '05:19 PM',
      type: 'Oncology',
      patientName: 'Max',
      room: '103',
      status: 'scheduled',
      color: '#2196F3',
      date: dayjs().format('YYYY-MM-DD')
    },
    {
      id: '4',
      startTime: '04:34 PM',
      endTime: '05:19 PM',
      type: 'Oncology',
      patientName: 'Max',
      room: '104',
      status: 'scheduled',
      color: '#2196F3',
      date: dayjs().format('YYYY-MM-DD')
    }
  ];

  const dateCellRender = (value: Dayjs) => {
    const dayAppointments = appointments.filter(apt => {
      return value.date() === 15 || value.date() === 16;
    });

    return (
      <ul 
        className="events p-0 m-0 list-none cursor-pointer"
        onClick={() => setSelectedDayModal(value)}
      >
        {dayAppointments.map(apt => (
          <li key={apt.id} className="mb-1">
            <div 
              className="rounded-md p-1 text-xs cursor-pointer hover:bg-blue-50 transition-colors"
              style={{ 
                backgroundColor: '#F0F9FF',
                borderLeft: `4px solid ${apt.color || '#2196F3'}`
              }}
            >
              <div className="text-gray-600">
                {apt.startTime} - {apt.endTime}
              </div>
              <div className="font-medium text-blue-600">
                {apt.type}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const filterOptions = [
    { label: 'All Appointments', value: 'all' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold m-0">Appointments</h1>
          <Select
            defaultValue="all"
            style={{ width: 180 }}
            options={filterOptions}
            prefix={<FilterOutlined />}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button type="default" onClick={() => setSelectedDate(dayjs())}>
            Today
          </Button>
          <div className="flex border rounded-lg">
            <Button 
              icon={<TableOutlined />}
              type={selectedView === 'month' ? 'primary' : 'default'}
              onClick={() => setSelectedView('month')}
            >
              Month
            </Button>
            <Button 
              icon={<CalendarOutlined />}
              type={selectedView === 'day' ? 'primary' : 'default'}
              onClick={() => setSelectedView('day')}
            >
              Day
            </Button>
          </div>
          <Select
            defaultValue="all-doctors"
            style={{ width: 200 }}
            options={[
              { value: 'all-doctors', label: 'All Doctors' },
              { value: 'dr-smith', label: 'Dr. Smith' },
              { value: 'dr-jones', label: 'Dr. Jones' }
            ]}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Add Appointment
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {selectedView === 'day' ? (
          <DayView 
            date={selectedDate}
            appointments={appointments}
          />
        ) : (
          <Calendar 
            value={selectedDate}
            onChange={setSelectedDate}
            dateCellRender={dateCellRender}
            className="custom-calendar"
            mode={'month'}
            headerRender={({ value, onChange }) => {
              return (
                <div className="flex justify-between items-center px-4 py-2">
                  <div className="text-lg font-medium">
                    {value.format('MMMM YYYY')}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => {
                      const unit = 'month';
                      onChange(value.subtract(1, unit));
                    }}>
                      Previous
                    </Button>
                    <Button onClick={() => {
                      const unit = 'month';
                      onChange(value.add(1, unit));
                    }}>
                      Next
                    </Button>
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>

      <DayDetailModal
        isOpen={!!selectedDayModal}
        onClose={() => setSelectedDayModal(null)}
        date={selectedDayModal || dayjs()}
        appointments={appointments}
      />
    </div>
  );
}; 