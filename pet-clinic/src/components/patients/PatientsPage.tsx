import React from 'react';
import { Input, Select, Button, Table, Card, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PatientSearch } from './PatientSearch';
interface Patient {
  id: number;
  petName: string;
  species: string;
  clientName: string;
  phone: string;
  nextAppointment: string;
  lastUpdate: string;
}

export const PatientsPage: React.FC = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Pet Name',
      dataIndex: 'petName',
      key: 'petName',
    },
    {
      title: 'Species',
      dataIndex: 'species',
      key: 'species',
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Next Appointment',
      dataIndex: 'nextAppointment',
      key: 'nextAppointment',
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      sorter: true,
    },
  ];

  const dummyData: Patient[] = [
    {
      id: 18,
      petName: 'Sarge',
      species: 'Dog',
      clientName: 'Asia Karn',
      phone: '954-647-2274',
      nextAppointment: '05-31-2021 09:00',
      lastUpdate: '05-26-2021 18:48',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 m-0">
          <span role="img" aria-label="paw">🐾</span> Patients
        </h1>
        <Button type="primary" icon={<PlusOutlined />} className="bg-blue-500">
          Add Patient
        </Button>
      </div>

      <Card className="shadow-sm">
        <PatientSearch totalPatients={dummyData.length} />
        
        <Table
          columns={columns}
          dataSource={dummyData}
          rowKey="id"
          className="shadow-sm"
        />
      </Card>
    </div>
  );
};