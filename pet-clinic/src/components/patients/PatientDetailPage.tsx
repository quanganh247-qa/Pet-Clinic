import React from 'react';
import { useParams } from 'react-router-dom';
import { SoapNote } from './SoapNote';

export const PatientDetailPage: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div className="flex-1 p-6 overflow-auto">
      <SoapNote patientId={id || ''} />
    </div>
  );
};