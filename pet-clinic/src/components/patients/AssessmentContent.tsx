import React, { useState } from 'react';
import { Input, Select, Button, Tag, Radio, Space } from 'antd';
import { PlusOutlined, FileSearchOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface Diagnosis {
  id: string;
  condition: string;
  type: 'primary' | 'differential';
  certainty: 'confirmed' | 'suspected' | 'ruled-out';
  notes: string;
}

export const AssessmentContent: React.FC = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([
    {
      id: '1',
      condition: 'Acute Gastritis',
      type: 'primary',
      certainty: 'confirmed',
      notes: ''
    },
    {
      id: '2',
      condition: 'Food Intolerance',
      type: 'differential',
      certainty: 'suspected',
      notes: ''
    }
  ]);

  const [progression, setProgression] = useState<'improving' | 'stable' | 'worsening'>('improving');

  const getCertaintyColor = (certainty: string) => ({
    'confirmed': 'green',
    'suspected': 'orange',
    'ruled-out': 'red'
  }[certainty]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-2xl text-gray-400">
          <FileSearchOutlined />
        </div>
        <h2 className="text-xl font-medium m-0">Assessment</h2>
      </div>

      {/* Diagnoses Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-600 font-medium m-0">Diagnoses</h3>
          <Button type="link" icon={<PlusOutlined />}>
            Add Diagnosis
          </Button>
        </div>

        <div className="space-y-4">
          {diagnoses.map((diagnosis) => (
            <div key={diagnosis.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Input 
                    value={diagnosis.condition}
                    placeholder="Enter condition"
                    bordered={false}
                    className="text-lg font-medium bg-transparent p-0"
                  />
                  <Tag color={getCertaintyColor(diagnosis.certainty)}>
                    {diagnosis.certainty}
                  </Tag>
                </div>
                <Select
                  value={diagnosis.certainty}
                  onChange={(value) => {
                    const newDiagnoses = diagnoses.map(d => 
                      d.id === diagnosis.id ? {...d, certainty: value} : d
                    );
                    setDiagnoses(newDiagnoses);
                  }}
                  options={[
                    { value: 'confirmed', label: 'Confirmed' },
                    { value: 'suspected', label: 'Suspected' },
                    { value: 'ruled-out', label: 'Ruled Out' }
                  ]}
                />
              </div>
              <TextArea
                value={diagnosis.notes}
                onChange={(e) => {
                  const newDiagnoses = diagnoses.map(d =>
                    d.id === diagnosis.id ? {...d, notes: e.target.value} : d
                  );
                  setDiagnoses(newDiagnoses);
                }}
                placeholder="Add notes about this diagnosis..."
                className="mb-2"
                rows={2}
              />
              <Radio.Group
                value={diagnosis.type}
                onChange={(e) => {
                  const newDiagnoses = diagnoses.map(d =>
                    d.id === diagnosis.id ? {...d, type: e.target.value} : d
                  );
                  setDiagnoses(newDiagnoses);
                }}
                size="small"
              >
                <Radio.Button value="primary">Primary</Radio.Button>
                <Radio.Button value="differential">Differential</Radio.Button>
              </Radio.Group>
            </div>
          ))}
        </div>
      </div>

      {/* Condition Progress */}
      <div>
        <h3 className="text-gray-600 font-medium mb-4">Condition Progress</h3>
        <div className="space-y-4">
          <Radio.Group 
            value={progression}
            onChange={(e) => setProgression(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio value="improving" className="w-full">
                <div className="flex items-center justify-between w-full">
                  <span>Improving</span>
                  <Tag color="green">↗</Tag>
                </div>
              </Radio>
              <Radio value="stable" className="w-full">
                <div className="flex items-center justify-between w-full">
                  <span>Stable</span>
                  <Tag color="blue">→</Tag>
                </div>
              </Radio>
              <Radio value="worsening" className="w-full">
                <div className="flex items-center justify-between w-full">
                  <span>Worsening</span>
                  <Tag color="red">↘</Tag>
                </div>
              </Radio>
            </Space>
          </Radio.Group>

          <TextArea
            rows={4}
            placeholder="Add additional notes about the patient's condition and progress..."
            className="w-full mt-4"
          />
        </div>
      </div>
    </div>
  );
}; 