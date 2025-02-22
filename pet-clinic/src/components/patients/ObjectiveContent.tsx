import React, { useState } from 'react';
import { Input, Select, Divider, Button, Tag, InputNumber } from 'antd';
import { PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface VitalSigns {
  temperature: number | null;
  heartRate: number | null;
  respiratoryRate: number | null;
  weight: number | null;
}

interface PhysicalExam {
  category: string;
  findings: string;
  status: 'normal' | 'abnormal' | 'not-examined';
}

export const ObjectiveContent: React.FC = () => {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    temperature: 38.5,
    heartRate: 80,
    respiratoryRate: 20,
    weight: 15
  });

  const [physicalExams, setPhysicalExams] = useState<PhysicalExam[]>([
    { category: 'General Appearance', findings: '', status: 'normal' },
    { category: 'Cardiovascular', findings: '', status: 'not-examined' },
    { category: 'Respiratory', findings: '', status: 'normal' },
    { category: 'Gastrointestinal', findings: '', status: 'normal' },
    { category: 'Musculoskeletal', findings: '', status: 'not-examined' },
    { category: 'Neurological', findings: '', status: 'normal' },
    { category: 'Skin/Hair/Nails', findings: '', status: 'abnormal' }
  ]);

  const getStatusColor = (status: string) => ({
    'normal': 'green',
    'abnormal': 'red',
    'not-examined': 'default'
  }[status]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-2xl text-gray-400">
          <FileSearchOutlined />
        </div>
        <h2 className="text-xl font-medium m-0">Objective</h2>
      </div>

      {/* Vital Signs Section */}
      <div className="mb-8">
        <h3 className="text-gray-600 font-medium mb-4">Vital Signs</h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <label className="block text-gray-500 text-sm mb-1">Temperature (°C)</label>
            <InputNumber
              value={vitalSigns.temperature}
              onChange={value => setVitalSigns({...vitalSigns, temperature: value})}
              className="w-full"
              step={0.1}
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Heart Rate (bpm)</label>
            <InputNumber
              value={vitalSigns.heartRate}
              onChange={value => setVitalSigns({...vitalSigns, heartRate: value})}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Respiratory Rate</label>
            <InputNumber
              value={vitalSigns.respiratoryRate}
              onChange={value => setVitalSigns({...vitalSigns, respiratoryRate: value})}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Weight (kg)</label>
            <InputNumber
              value={vitalSigns.weight}
              onChange={value => setVitalSigns({...vitalSigns, weight: value})}
              className="w-full"
              step={0.1}
            />
          </div>
        </div>
      </div>

      <Divider />

      {/* Physical Examination Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-600 font-medium m-0">Physical Examination</h3>
          <Button type="link" icon={<PlusOutlined />}>
            Add Category
          </Button>
        </div>
        
        <div className="space-y-4">
          {physicalExams.map((exam, index) => (
            <div key={exam.category} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{exam.category}</span>
                  <Tag color={getStatusColor(exam.status)}>{exam.status}</Tag>
                </div>
                <Select
                  value={exam.status}
                  onChange={(value) => {
                    const newExams = [...physicalExams];
                    newExams[index].status = value;
                    setPhysicalExams(newExams);
                  }}
                  options={[
                    { value: 'normal', label: 'Normal' },
                    { value: 'abnormal', label: 'Abnormal' },
                    { value: 'not-examined', label: 'Not Examined' }
                  ]}
                />
              </div>
              <TextArea
                value={exam.findings}
                onChange={(e) => {
                  const newExams = [...physicalExams];
                  newExams[index].findings = e.target.value;
                  setPhysicalExams(newExams);
                }}
                placeholder="Enter examination findings..."
                className="w-full"
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 