import React, { useState } from 'react';
import { Timeline, Tag, Button, Tooltip, Tabs, Card, Table, Badge } from 'antd';
import {
  FileTextOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  PlusOutlined,
  HeartOutlined,
  FileSearchOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

interface MedicalRecord {
  id: string;
  date: string;
  type: 'SOAP' | 'Prescription' | 'Lab Result' | 'Vaccination' | 'Preventive Care';
  doctor: string;
  description: string;
  status?: 'completed' | 'pending' | 'cancelled';
}

interface Identification {
  microchipNumber: string;
  registrationNumber: string;
  color: string;
  birthDate: string;
  sex: 'Male' | 'Female';
}

interface Vaccination {
  id: string;
  name: string;
  date: string;
  nextDueDate: string;
  administrator: string;
  manufacturer: string;
  lotNumber: string;
}

export const MedicalRecordsTab: React.FC<{ initialTab?: string }> = ({ initialTab = 'timeline' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const identification: Identification = {
    microchipNumber: '985112345678903',
    registrationNumber: 'REG123456',
    color: 'Brown and White',
    birthDate: '2022-01-15',
    sex: 'Female'
  };

  const vaccinations: Vaccination[] = [
    {
      id: '1',
      name: 'DHPP',
      date: '2024-01-15',
      nextDueDate: '2025-01-15',
      administrator: 'Dr. Smith',
      manufacturer: 'Zoetis',
      lotNumber: 'LOT123456'
    },
    {
      id: '2',
      name: 'Rabies',
      date: '2024-01-15',
      nextDueDate: '2025-01-15',
      administrator: 'Dr. Smith',
      manufacturer: 'Merck',
      lotNumber: 'LOT789012'
    }
  ];

  const records: MedicalRecord[] = [
    {
      id: '1',
      date: '2024-02-20',
      type: 'SOAP',
      doctor: 'Dr. Smith',
      description: 'Regular checkup',
      status: 'completed'
    }
  ];

  const getStatusColor = (status?: string) => {
    const colors = {
      completed: 'green',
      pending: 'orange',
      cancelled: 'red'
    };
    return colors[status as keyof typeof colors] || 'blue';
  };

  const getIcon = (type: MedicalRecord['type']) => {
    const icons = {
      'SOAP': <FileTextOutlined />,
      'Prescription': <MedicineBoxOutlined />,
      'Lab Result': <ExperimentOutlined />,
      'Vaccination': <MedicineBoxOutlined />,
      'Preventive Care': <HeartOutlined />
    };
    return icons[type];
  };

  const vaccinationColumns = [
    {
      title: 'Vaccine',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date Given',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Next Due',
      dataIndex: 'nextDueDate',
      key: 'nextDueDate',
      render: (date: string) => (
        <Badge 
          status={new Date(date) < new Date() ? 'error' : 'success'} 
          text={date} 
        />
      ),
    },
    {
      title: 'Administrator',
      dataIndex: 'administrator',
      key: 'administrator',
    },
  ];

  const items = [
    {
      key: 'timeline',
      label: (
        <span>
          <FileSearchOutlined />
          Timeline
        </span>
      ),
      children: (
        <Timeline
          mode="left"
          items={records.map(record => ({
            color: getStatusColor(record.status),
            label: record.date,
            children: (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tooltip title={record.type}>
                      {getIcon(record.type)}
                    </Tooltip>
                    <span className="font-medium">{record.type}</span>
                  </div>
                  <Tag color={getStatusColor(record.status)}>
                    {record.status}
                  </Tag>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  By {record.doctor}
                </div>
                <div className="text-gray-700">
                  {record.description}
                </div>
              </div>
            ),
          }))}
        />
      ),
    },
    {
      key: 'identification',
      label: (
        <span>
          <SafetyCertificateOutlined />
          Identification
        </span>
      ),
      children: (
        <Card className="bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-500 mb-1">Microchip Number</div>
              <div className="font-medium">{identification.microchipNumber}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Registration Number</div>
              <div className="font-medium">{identification.registrationNumber}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Color</div>
              <div className="font-medium">{identification.color}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Birth Date</div>
              <div className="font-medium">{identification.birthDate}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Sex</div>
              <div className="font-medium">{identification.sex}</div>
            </div>
          </div>
        </Card>
      ),
    },
    {
      key: 'vaccinations',
      label: (
        <span>
          <MedicineBoxOutlined />
          Vaccinations
        </span>
      ),
      children: (
        <div>
          <div className="flex justify-end mb-4">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Vaccination
            </Button>
          </div>
          <Table 
            columns={vaccinationColumns} 
            dataSource={vaccinations}
            rowKey="id"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium m-0">Medical Records</h2>
        <div className="space-x-2">
          <Button icon={<PlusOutlined />}>Add SOAP</Button>
          <Button icon={<PlusOutlined />}>Add Prescription</Button>
          <Button icon={<PlusOutlined />}>Add Lab Result</Button>
        </div>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        items={items}
        className="medical-records-tabs" 
      />
    </div>
  );
}; 