import React, { useState } from 'react';
import { Input, Select, Button, Tag, DatePicker, Divider, Checkbox } from 'antd';
import { PlusOutlined, MedicineBoxOutlined, CalendarOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
}

interface Test {
  id: string;
  name: string;
  status: 'pending' | 'scheduled' | 'completed';
  dueDate: string;
  notes: string;
}

export const PlanContent: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Amoxicillin',
      dosage: '250mg',
      frequency: 'Twice daily',
      duration: '7 days',
      notes: 'Give with food'
    }
  ]);

  const [tests, setTests] = useState<Test[]>([
    {
      id: '1',
      name: 'Blood Work',
      status: 'pending',
      dueDate: '2024-03-25',
      notes: 'Complete blood count and chemistry panel'
    }
  ]);

  const getStatusColor = (status: string) => ({
    'pending': 'orange',
    'scheduled': 'blue',
    'completed': 'green'
  }[status]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-2xl text-gray-400">
          <MedicineBoxOutlined />
        </div>
        <h2 className="text-xl font-medium m-0">Treatment Plan</h2>
      </div>

      {/* Medications Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-600 font-medium m-0">Medications</h3>
          <Button type="link" icon={<PlusOutlined />}>
            Add Medication
          </Button>
        </div>

        <div className="space-y-4">
          {medications.map((medication) => (
            <div key={medication.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Medication</label>
                  <Input 
                    value={medication.name}
                    placeholder="Medication name"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Dosage</label>
                  <Input 
                    value={medication.dosage}
                    placeholder="Dosage"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Frequency</label>
                  <Input 
                    value={medication.frequency}
                    placeholder="How often"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-sm mb-1">Duration</label>
                  <Input 
                    value={medication.duration}
                    placeholder="How long"
                  />
                </div>
              </div>
              <TextArea
                value={medication.notes}
                placeholder="Additional instructions..."
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Additional Testing Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-600 font-medium m-0">Additional Testing</h3>
          <Button type="link" icon={<PlusOutlined />}>
            Add Test
          </Button>
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <Input 
                  value={test.name}
                  placeholder="Test name"
                  bordered={false}
                  className="text-lg font-medium bg-transparent p-0"
                />
                <Tag color={getStatusColor(test.status)}>{test.status}</Tag>
              </div>
              <div className="mb-3">
                <label className="block text-gray-500 text-sm mb-1">Due Date</label>
                <DatePicker className="w-full" />
              </div>
              <TextArea
                value={test.notes}
                placeholder="Test details and instructions..."
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Recommendations Section */}
      <div className="mb-8">
        <h3 className="text-gray-600 font-medium mb-4">Recommendations</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-2">Diet</label>
            <TextArea
              placeholder="Dietary recommendations..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Activity</label>
            <div className="space-y-2">
              <Checkbox>Restrict exercise</Checkbox>
              <TextArea
                placeholder="Activity restrictions and instructions..."
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Follow-up Section */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <CalendarOutlined className="text-xl text-gray-400" />
          <h3 className="text-gray-600 font-medium m-0">Follow-up</h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-500 text-sm mb-1">Next Appointment</label>
            <DatePicker 
              className="w-full"
              placeholder="Select date"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Type</label>
            <Select
              className="w-full"
              placeholder="Select type"
              options={[
                { value: 'recheck', label: 'Recheck' },
                { value: 'follow-up', label: 'Follow-up' },
                { value: 'testing', label: 'Testing' }
              ]}
            />
          </div>
        </div>
        <TextArea
          className="mt-4"
          placeholder="Additional follow-up instructions..."
          rows={3}
        />
      </div>
    </div>
  );
}; 