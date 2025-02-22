import React from 'react';
import { Button, Avatar, Tag } from 'antd';
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons';

interface MedicalRecordSidebarProps {
  isCollapsed: boolean;
}

interface RecentRecord {
  id: string;
  type: 'SOAP' | 'Prescription' | 'Lab Result';
  date: string;
  doctor: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export const MedicalRecordSidebar: React.FC<MedicalRecordSidebarProps> = ({ isCollapsed }) => {
  const recentRecords: RecentRecord[] = [
    {
      id: '1',
      type: 'SOAP',
      date: '2024-03-15',
      doctor: 'Dr. Smith',
      status: 'completed'
    },
    {
      id: '2',
      type: 'Prescription',
      date: '2024-03-14',
      doctor: 'Dr. Jones',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'green',
      pending: 'orange',
      cancelled: 'red'
    };
    return colors[status as keyof typeof colors] || 'blue';
  };

  if (isCollapsed) {
    return (
      <div className="p-4">
        <Button type="primary" icon={<PlusOutlined />} className="w-8 h-8 p-0 mb-4" />
        <div className="space-y-2">
          {recentRecords.map(record => (
            <div key={record.id} className="rounded-lg p-2 bg-gray-50">
              <FileTextOutlined style={{ color: getStatusColor(record.status) }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-60">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium m-0">Recent Records</h2>
        <Button type="primary" icon={<PlusOutlined />}>Add</Button>
      </div>
      <div className="space-y-3">
        {recentRecords.map(record => (
          <div key={record.id} className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{record.type}</span>
              <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
            </div>
            <div className="text-sm text-gray-500">
              {record.date} • {record.doctor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 