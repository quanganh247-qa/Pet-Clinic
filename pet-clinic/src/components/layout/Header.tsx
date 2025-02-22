import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BellOutlined, 
  SearchOutlined,
  UserOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';

interface HeaderProps {
  isCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isCollapsed }) => {
  return (
    <header className={`fixed top-0 right-0 bg-white h-16 border-b border-gray-100 transition-all duration-300 z-10 ${isCollapsed ? 'left-16' : 'left-60'}`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          <Link to="/flowboard" className="flex items-center text-gray-600 hover:text-blue-600 group">
            <AppstoreOutlined className="text-xl mr-2" />
            <span className="group-hover:text-blue-600">Flowboard</span>
          </Link>
          <Link to="/patients" className="flex items-center text-gray-600 hover:text-blue-600 group">
            <UserOutlined className="text-xl mr-2" />
            <span className="group-hover:text-blue-600">Patients</span>
          </Link>
          <Link to="/appointments" className="flex items-center text-gray-600 hover:text-blue-600">
            <CalendarOutlined className="text-xl mr-2" />
            <span>Appointments</span>
          </Link>
          <Link to="/inventory" className="flex items-center text-gray-600 hover:text-blue-600">
            <MedicineBoxOutlined className="text-xl mr-2" />
            <span>Inventory</span>
          </Link>
          <Link to="/counter-sell" className="flex items-center text-gray-600 hover:text-blue-600">
            <ShoppingOutlined className="text-xl mr-2" />
            <span>Counter Sell</span>
          </Link>
          <Link to="/statistics" className="flex items-center text-gray-600 hover:text-blue-600">
            <BarChartOutlined className="text-xl mr-2" />
            <span>Statistics</span>
          </Link>
      
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-blue-600">
            <SearchOutlined className="text-xl" />
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            <BellOutlined className="text-xl" />
          </button>
          <Avatar 
            src="/avatar.jpg" 
            size="large"
            icon={<UserOutlined />} // Fallback icon if image fails to load
          />
        </div>
      </div>
    </header>
  );
}; 