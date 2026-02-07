import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { DDQAnswerPanel } from './components/ddq/DDQAnswerPanel';

export default function App() {
  return (
    <MainLayout>
      <DDQAnswerPanel />
    </MainLayout>
  );
}
