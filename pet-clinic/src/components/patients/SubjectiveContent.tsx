import React, { useState } from 'react';
import { Input, Select, DatePicker, Tag, Button, Divider } from 'antd';
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface Symptom {
  id: string;
  description: string;
  duration: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export const SubjectiveContent: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: '1',
      description: 'Decreased appetite',
      duration: '3 days',
      severity: 'moderate'
    }
  ]);

  const severityColors = {
    mild: 'green',
    moderate: 'orange',
    severe: 'red'
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-2xl text-gray-400">
          <FileTextOutlined />
        </div>
        <h2 className="text-xl font-medium m-0">Subjective</h2>
      </div>

      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <Tag className="px-4 py-2 bg-white">Initial Complaint ✓</Tag>
          <Tag className="px-4 py-2 bg-blue-100">History ✓</Tag>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Chief Complaint */}
          <div>
            <label className="block text-gray-600 mb-2">Chief Complaint</label>
            <TextArea 
              rows={3}
              placeholder="Enter the main reason for visit as reported by owner..."
              className="w-full"
            />
          </div>

          {/* Symptoms List */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-600">Symptoms & Duration</label>
              <Button type="link" icon={<PlusOutlined />}>
                Add Symptom
              </Button>
            </div>
            <div className="space-y-3">
              {symptoms.map(symptom => (
                <div key={symptom.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <Input 
                      value={symptom.description}
                      placeholder="Symptom description"
                      bordered={false}
                      className="bg-transparent"
                    />
                  </div>
                  <div className="w-32">
                    <Input 
                      value={symptom.duration}
                      placeholder="Duration"
                      bordered={false}
                      className="bg-transparent"
                    />
                  </div>
                  <Select
                    value={symptom.severity}
                    className="w-24"
                    options={[
                      { value: 'mild', label: 'Mild' },
                      { value: 'moderate', label: 'Moderate' },
                      { value: 'severe', label: 'Severe' }
                    ]}
                  />
                  <Tag color={severityColors[symptom.severity]}>
                    {symptom.severity}
                  </Tag>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Behavioral Changes */}
          <div>
            <label className="block text-gray-600 mb-2">Behavioral Changes</label>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-500 text-sm mb-1">Activity Level</label>
                <Select
                  className="w-full"
                  defaultValue="normal"
                  options={[
                    { value: 'normal', label: 'Normal' },
                    { value: 'decreased', label: 'Decreased' },
                    { value: 'increased', label: 'Increased' }
                  ]}
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">Appetite</label>
                <Select
                  className="w-full"
                  defaultValue="normal"
                  options={[
                    { value: 'normal', label: 'Normal' },
                    { value: 'decreased', label: 'Decreased' },
                    { value: 'increased', label: 'Increased' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Owner's Observations */}
          <div>
            <label className="block text-gray-600 mb-2">Owner's Observations & Concerns</label>
            <TextArea 
              rows={4}
              placeholder="Enter detailed observations and concerns from the owner..."
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 