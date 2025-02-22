import React, { useState } from 'react';
import { Input, Button, Table, Tag, Select, InputNumber } from 'antd';
import { PlusOutlined, DollarOutlined } from '@ant-design/icons';

interface BillingItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'consultation' | 'procedure' | 'medication' | 'laboratory' | 'other';
}

export const BillingContent: React.FC = () => {
  const [items, setItems] = useState<BillingItem[]>([
    {
      id: '1',
      description: 'Emergency Surgery',
      quantity: 1,
      unitPrice: 1200,
      total: 1200,
      category: 'procedure'
    },
    {
      id: '2',
      description: 'Amoxicillin 250mg',
      quantity: 14,
      unitPrice: 5,
      total: 70,
      category: 'medication'
    }
  ]);

  const getCategoryColor = (category: string) => ({
    'consultation': 'blue',
    'procedure': 'purple',
    'medication': 'green',
    'laboratory': 'orange',
    'other': 'default'
  }[category]);

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: BillingItem) => (
        <div>
          <div>{text}</div>
          <Tag color={getCategoryColor(record.category)}>{record.category}</Tag>
        </div>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
      render: (value: number, record: BillingItem) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(newValue) => {
            const newItems = items.map(item =>
              item.id === record.id
                ? { ...item, quantity: newValue || 1, total: (newValue || 1) * item.unitPrice }
                : item
            );
            setItems(newItems);
          }}
        />
      )
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 120,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 120,
      render: (value: number) => `$${value.toFixed(2)}`
    }
  ];

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-2xl text-gray-400">
          <DollarOutlined />
        </div>
        <h2 className="text-xl font-medium m-0">Billing</h2>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            const newItem: BillingItem = {
              id: String(items.length + 1),
              description: '',
              quantity: 1,
              unitPrice: 0,
              total: 0,
              category: 'other'
            };
            setItems([...items, newItem]);
          }}
        >
          Add Item
        </Button>
        <div className="text-right">
          <div className="text-gray-500">Total Amount</div>
          <div className="text-2xl font-medium">${totalAmount.toFixed(2)}</div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="id"
        className="billing-table"
      />

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-2">Payment Method</label>
          <Select
            className="w-full"
            placeholder="Select payment method"
            options={[
              { value: 'cash', label: 'Cash' },
              { value: 'credit', label: 'Credit Card' },
              { value: 'debit', label: 'Debit Card' },
              { value: 'insurance', label: 'Insurance' }
            ]}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Status</label>
          <Select
            className="w-full"
            defaultValue="pending"
            options={[
              { value: 'paid', label: 'Paid' },
              { value: 'pending', label: 'Pending' },
              { value: 'partial', label: 'Partial Payment' }
            ]}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-600 mb-2">Notes</label>
        <Input.TextArea
          rows={4}
          placeholder="Add billing notes..."
          className="w-full"
        />
      </div>
    </div>
  );
}; 