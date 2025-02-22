import React from 'react';
import { Avatar } from 'antd';
import { FileTextOutlined, EyeOutlined } from '@ant-design/icons';

interface PatientDetailSidebarProps {
  isCollapsed: boolean;
  patientDetails: {
    id: number;
    petName: string;
    species: string;
    breed: string;
    age: string;
    weight: string;
    clientName: string;
    phone: string;
    status: 'active' | 'inactive';
  };
}

export const PatientDetailSidebar: React.FC<PatientDetailSidebarProps> = ({
  isCollapsed,
  patientDetails
}) => {
  if (isCollapsed) {
    return (
      <div className="w-16 p-4">
        <Avatar
          size={48}
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${patientDetails.petName}`}
          className="mb-4"
        />
        <div className="space-y-2">
          <FileTextOutlined className="text-gray-600 text-lg" />
          <EyeOutlined className="text-gray-600 text-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-60 p-4">
      <div className="text-center mb-6">
        <Avatar
          size={96}
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${patientDetails.petName}`}
          className="mb-2"
        />
        <h2 className="text-xl font-medium mb-1">{patientDetails.petName}</h2>
        <div className="text-gray-500">#{patientDetails.id}</div>
        <div className="text-sm text-gray-500">{patientDetails.species}</div>
      </div>

      <div className="text-sm text-gray-500 mb-2">{patientDetails.clientName}</div>
      <div className="text-sm text-gray-500 mb-6">{patientDetails.phone}</div>

      <div className="space-y-4">
        <h3 className="text-xs uppercase text-gray-400 font-medium">MAIN</h3>
        <div className="space-y-2">
          <button className="flex items-center text-gray-600 hover:text-blue-600 w-full text-left">
            <FileTextOutlined className="mr-2" />
            Patient's Records
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600 w-full text-left">
            <EyeOutlined className="mr-2" />
            Health Card
          </button>
        </div>

        <h3 className="text-xs uppercase text-gray-400 font-medium pt-4">QUICK ACTIONS</h3>
        <div className="space-y-2">
          <button className="flex items-center text-gray-600 hover:text-blue-600 w-full text-left">
            <FileTextOutlined className="mr-2" />
            Add SOAP
          </button>
        </div>
      </div>
    </div>
  );
};
