import React, { useState } from 'react';
import { Tabs, Input, Button, DatePicker, Select, Tag, Radio, Checkbox, Avatar, Space } from 'antd';
import { SaveOutlined, LockOutlined, PlusOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { SubjectiveContent } from './SubjectiveContent';
import { ObjectiveContent } from './ObjectiveContent';
import { AssessmentContent } from './AssessmentContent';
import { PlanContent } from './PlanContent';
import { BillingContent } from './BillingContent';
const { TabPane } = Tabs;
const { TextArea } = Input;

interface SoapNoteProps {
  patientId: string;
}

interface StaffMember {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

const SummaryContent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs('2021-04-28'));
  const [selectedServices] = useState(['Emergency Surgery']);
  const [staff] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'John Connolly',
      title: 'DVM',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JC'
    }
  ]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-2xl text-gray-400">
          <CalendarOutlined />
        </div>
        <h2 className="text-xl font-medium m-0">Summary</h2>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-gray-600 mb-2">Date</label>
          <DatePicker 
            value={selectedDate}
            onChange={(date) => setSelectedDate(date || dayjs())}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Services</label>
          <Select
            mode="multiple"
            value={selectedServices}
            className="w-full"
            options={[
              { value: 'Emergency Surgery', label: 'Emergency Surgery' },
              { value: 'Checkup', label: 'Checkup' },
              { value: 'Vaccination', label: 'Vaccination' }
            ]}
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-gray-600 mb-2">Staff</label>
        <div className="flex items-center gap-2">
          {staff.map(member => (
            <div key={member.id} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
              <Avatar size="small" src={member.avatar} />
              <div>
                <div className="text-xs text-gray-500">{member.title}</div>
                <div className="text-sm">{member.name}</div>
              </div>
            </div>
          ))}
          <Button 
            type="dashed" 
            shape="circle" 
            icon={<PlusOutlined />} 
            size="small"
            className="ml-2"
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-gray-600">Internal notes</label>
          <Tag color="blue" className="flex items-center gap-1">
            <LockOutlined /> Always Private
          </Tag>
        </div>
        <TextArea 
          rows={4} 
          placeholder="Add internal notes here..."
          className="w-full"
        />
      </div>
    </div>
  );
};

export const SoapNote: React.FC<SoapNoteProps> = ({ patientId }) => {
  const [autoSaved, setAutoSaved] = useState<string>('autosaved at 15:39:39');

  const items = [
    {
      key: 'summary',
      label: 'Summary',
      children: <SummaryContent />
    },
    {
      key: 'subjective',
      label: 'Subjective',
      children: <SubjectiveContent />
    },
    {
      key: 'objective',
      label: 'Objective',
      children: <ObjectiveContent />
    },
    {
      key: 'assessment',
      label: 'Assessment',
      children: <AssessmentContent />
    },
    {
      key: 'plan',
      label: 'Plan',
      children: <PlanContent />
    },
    {
      key: 'billing',
      label: 'Billing',
      children: <BillingContent />
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Tabs
        items={items}
        className="soap-note-tabs"
        tabBarExtraContent={{
          right: (
            <div className="flex items-center gap-4 px-4">
              <span className="text-gray-400 text-sm">{autoSaved}</span>
              <Button type="primary" icon={<SaveOutlined />}>
                Save
              </Button>
            </div>
          )
        }}
      />
    </div>
  );
};
