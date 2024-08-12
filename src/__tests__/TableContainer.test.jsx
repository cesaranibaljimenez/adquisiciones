// src/__tests__/TableContainer.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableContainer from '../components/TableContainer';

test('should add a table when a label is dropped', () => {
  const onUpdate = jest.fn();
  render(
    <DndProvider backend={HTML5Backend}>
      <TableContainer onUpdate={onUpdate} />
    </DndProvider>
  );

  // Find the label to add a table
  const tableLabel = screen.getByText('Presupuesto Referencial');

  // Create a mock dataTransfer object
  const dataTransfer = {
    getData: jest.fn().mockReturnValue(JSON.stringify({ name: 'Presupuesto Referencial' })),
    setData: jest.fn(),
    dropEffect: 'move',
  };

  // Simulate drag start
  fireEvent.dragStart(tableLabel, { dataTransfer });

  // Simulate drop
  fireEvent.drop(screen.getByText('Tablas'), { dataTransfer });

  // Simulate drag end
  fireEvent.dragEnd(tableLabel);

  // Verify if the table has been added
  expect(screen.getAllByText('Presupuesto Referencial').length).toBeGreaterThan(1);
});
