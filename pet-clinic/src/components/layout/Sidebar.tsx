import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ClockCircleOutlined,
  UserOutlined,
  TagOutlined,
  SendOutlined,
  MessageOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4">
        <img src="/logo.svg" alt="Logo" className="h-25" />
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 hover:text-blue-600"
        >
          {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {/* CLINIC Section */}
      <div className="p-4">
        <h2 className={`text-xs uppercase text-gray-400 font-medium mb-4 ${isCollapsed ? 'hidden' : ''}`}>CLINIC</h2>
        
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <ClockCircleOutlined className="mr-2" />
            <span className={isCollapsed ? 'hidden' : ''}>4:26</span>
          </div>

          <Link to="/patients" className="flex items-center text-gray-600 hover:text-blue-600">
            <UserOutlined className="mr-2" />
            <span className={isCollapsed ? 'hidden' : ''}>Patients</span>
          </Link>

          <Link to="/new-patients" className="flex items-center justify-between text-gray-600 hover:text-blue-600">
            <div className="flex items-center">
              <UserOutlined className="mr-2" />
              <span className={isCollapsed ? 'hidden' : ''}>New Patients</span>
            </div>
            <span className={`bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${isCollapsed ? 'ml-0' : ''}`}>1</span>
          </Link>

          <Link to="/clinic-nametag" className="flex items-center text-gray-600 hover:text-blue-600">
            <TagOutlined className="mr-2" />
            <span className={isCollapsed ? 'hidden' : ''}>Clinic Nametag</span>
          </Link>
        </div>
      </div>

      {/* COMMUNICATION Section */}
      <div className="p-4">
        <h2 className={`text-xs uppercase text-gray-400 font-medium mb-4 ${isCollapsed ? 'hidden' : ''}`}>COMMUNICATION</h2>
        
        <div className="space-y-4">
          <Link to="/message-clients" className="flex items-center text-gray-600 hover:text-blue-600">
            <SendOutlined className="mr-2" />
            <span className={isCollapsed ? 'hidden' : ''}>Message All Clients</span>
          </Link>

          <Link to="/chat" className="flex items-center text-gray-600 hover:text-blue-600">
            <MessageOutlined className="mr-2" />
            <span className={isCollapsed ? 'hidden' : ''}>Chat</span>
          </Link>

          <Link to="/notifications" className="flex items-center text-gray-600 hover:text-blue-600">
            <BellOutlined className="mr-2" />
            <span className={isCollapsed ? 'hidden' : ''}>Notifications</span>
          </Link>
        </div>
      </div>
    </div>
  );
};