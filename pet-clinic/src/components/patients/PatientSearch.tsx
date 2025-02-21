import React from 'react';
import { Input, Select, Button, Checkbox } from 'antd';

interface PatientSearchProps {
  totalPatients: number;
}

export const PatientSearch: React.FC<PatientSearchProps> = ({ totalPatients }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Search</label>
          <Input placeholder="Search" className="w-full" />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Species</label>
          <Select placeholder="Species" className="w-full" defaultValue="All">
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Dog">Dog</Select.Option>
            <Select.Option value="Cat">Cat</Select.Option>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Breed</label>
          <Select placeholder="Breed" className="w-full" defaultValue="All">
            <Select.Option value="All">All</Select.Option>
          </Select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Pet Status</label>
        <Select placeholder="Pet Status" className="w-48" defaultValue="Active">
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
        </Select>
      </div>

      <div className="mb-4">
        <Checkbox>My Patients</Checkbox>
      </div>

      <Button type="primary" className="mb-6 bg-blue-500">
        Search
      </Button>

      <div className="mb-4 text-gray-600">
        Total Patients: {totalPatients}
      </div>
    </div>
  );
}; 