import React, { useState } from 'react';
import { Card, Badge, Avatar, Tooltip, Button, Tag, Select } from 'antd';
import { MessageOutlined, CopyOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';

interface Visit {
  id: string;
  time: string;
  date: string;
  room: string;
  status: 'scheduled' | 'checked-in' | 'in-progress' | 'hospitalized'| 'closed';
  patientName: string;
  ownerName: string;
  description: string;
  assignedTo: string;
  assignedToRole: string;
  waitingTime?: string;
  followUpCount: number;
  tasksCount: number;
  tasksCompleted: number;
  ticketNumber?: string;
  type: string;
}

interface ColumnProps {
  title: string;
  count: number;
  visits: Visit[];
  color?: string;
  id: string;
  onStatusChange: (visitId: string, newStatus: Visit['status']) => void;
}

const getStatusColor = (status: Visit['status']) => {
  const colors = {
    'scheduled': 'bg-badge-scheduled text-status-success',
    'checked-in': 'bg-badge-pending text-status-pending',
    'in-progress': 'bg-badge-inProgress text-primary',
    'hospitalized': 'bg-orange-100 text-status-error',
    'closed': 'bg-gray-100 text-text-secondary'
  };
  return colors[status];
};

const VisitColumn: React.FC<ColumnProps> = ({ title, count, visits, id, onStatusChange }) => (
  <div className="w-[280px] flex-shrink-0 rounded-lg p-3 bg-gray-50/50">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h3 className="text-gray-600 font-medium m-0">{title}</h3>
        <Badge count={count} style={{ backgroundColor: '#8c8c8c' }} />
      </div>
      <Button type="text" icon={<EllipsisOutlined />} />
    </div>
    
    <div className="space-y-4 min-h-[200px]">
      {visits.map((visit) => (
        <div key={visit.id}>
          <Card 
            className="bg-white border shadow-sm hover:shadow-md transition-all duration-300"
            style={{ 
              width: '100%',
              margin: '4px'
            }}
            size="small"
            bodyStyle={{
              padding: '12px'
            }}
            actions={[
              <Select
                key="status"
                value={visit.status}
                style={{ width: '100%' }}
                onChange={(value) => onStatusChange(visit.id, value)}
                options={[
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'checked-in', label: 'Checked In' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'hospitalized', label: 'Hospitalized' },
                  { value: 'closed', label: 'Closed' }
                ]}
              />
            ]}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{visit.time}</span>
                {visit.room && <span className="text-sm text-gray-500">- Room {visit.room}</span>}
              </div>
              <div className="flex gap-2">
                {visit.waitingTime && (
                  <Badge 
                    count={<span className="text-xs">{visit.waitingTime}</span>}
                    style={{ backgroundColor: '#f5222d' }}
                  />
                )}
                <Button type="text" icon={<EllipsisOutlined />} size="small" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Tag className={`border-0 ${getStatusColor(visit.status)}`}>
                {visit.type}
              </Tag>
              {visit.ticketNumber && (
                <span className="text-gray-400 text-sm">#{visit.ticketNumber}</span>
              )}
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Avatar size="small" src={`https://api.dicebear.com/7.x/initials/svg?seed=${visit.patientName}`} />
                <div>
                  <div className="font-medium">{visit.patientName}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <CopyOutlined className="text-xs" />
                    <span>{visit.ownerName}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 m-0">{visit.description}</p>
            </div>
            
            <div className="border-t pt-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar.Group>
                  <Avatar size="small" src={`https://api.dicebear.com/7.x/initials/svg?seed=${visit.assignedTo}`} />
                </Avatar.Group>
                <span className="text-sm text-gray-500">{visit.assignedToRole}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Tooltip title="Follow-ups">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <MessageOutlined />
                    {visit.followUpCount}
                  </span>
                </Tooltip>
                <Tooltip title="Tasks">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <CheckOutlined />
                    {visit.tasksCompleted}/{visit.tasksCount}
                  </span>
                </Tooltip>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

export const FlowboardPage: React.FC = () => {
  // Sample data matching the image
  const visits: Visit[] = [
    {
      id: '1',
      time: '10:00',
      date: '10.11.2021',
      room: 'D231',
      status: 'scheduled',
      type: 'Recheck',
      patientName: 'Daisy',
      ownerName: 'Olivia Johnson',
      description: 'Daisy needs to have her ears rechecked. She seems to be doing better.',
      assignedTo: 'DVM',
      assignedToRole: 'Sarah Connelly',
      waitingTime: '4 hours',
      followUpCount: 1,
      tasksCount: 3,
      tasksCompleted: 1
    }
    // Add more visits here matching the image
    ,
    {
      id: '2',
      time: '11:30',
      date: '10.11.2021', 
      room: 'D232',
      status: 'checked-in',
      type: 'Vaccination',
      patientName: 'Max',
      ownerName: 'James Smith',
      description: 'Annual vaccination and general checkup.',
      assignedTo: 'DVM',
      assignedToRole: 'Dr. Anderson',
      waitingTime: '30 min',
      followUpCount: 0,
      tasksCount: 2,
      tasksCompleted: 0
    },
    {
      id: '3',
      time: '09:15',
      date: '10.11.2021',
      room: 'D233',
      status: 'in-progress',
      type: 'Surgery',
      patientName: 'Luna',
      ownerName: 'Emma Davis',
      description: 'Dental cleaning and extraction.',
      assignedTo: 'DVM',
      assignedToRole: 'Dr. Wilson',
      waitingTime: '1 hour',
      followUpCount: 2,
      tasksCount: 5,
      tasksCompleted: 3
    },
    {
      id: '4',
      time: '14:00',
      date: '10.11.2021',
      room: 'D234',
      status: 'hospitalized',
      type: 'Emergency',
      patientName: 'Charlie',
      ownerName: 'Michael Brown',
      description: 'Monitoring after emergency surgery.',
      assignedTo: 'DVM',
      assignedToRole: 'Dr. Martinez',
      followUpCount: 3,
      tasksCount: 6,
      tasksCompleted: 4
    },
    {
      id: '5',
      time: '15:30',
      date: '10.11.2021',
      room: 'D235',
      status: 'closed',
      type: 'Consultation',
      patientName: 'Bella',
      ownerName: 'Sophia Wilson',
      description: 'Regular checkup completed.',
      assignedTo: 'DVM',
      assignedToRole: 'Dr. Thompson',
      followUpCount: 1,
      tasksCount: 3,
      tasksCompleted: 3
    }
  ];

  const [visitsList, setVisitsList] = useState(visits);

  const handleStatusChange = (visitId: string, newStatus: Visit['status']) => {
    setVisitsList(prevVisits => 
      prevVisits.map(visit => 
        visit.id === visitId 
          ? { ...visit, status: newStatus }
          : visit
      )
    );
  };

  const columns = {
    scheduled: visitsList.filter(v => v.status === 'scheduled'),
    'checked-in': visitsList.filter(v => v.status === 'checked-in'),
    'in-progress': visitsList.filter(v => v.status === 'in-progress'),
    hospitalized: visitsList.filter(v => v.status === 'hospitalized'),
    closed: visitsList.filter(v => v.status === 'closed')
  };

  return (
    <div className="p-6 max-w-[calc(100vw-240px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold m-0">Flowboard</h1>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 pr-6 min-w-0">
        {Object.entries(columns).map(([columnId, columnVisits]) => (
          <VisitColumn 
            key={columnId}
            id={columnId}
            title={columnId.charAt(0).toUpperCase() + columnId.slice(1).replace('-', ' ')} 
            count={columnVisits.length}
            visits={columnVisits}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}; 