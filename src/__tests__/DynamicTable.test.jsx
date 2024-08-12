import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DynamicTable from '../components/DynamicTable';

test('should add column when column label is dropped', () => {
  const onUpdate = jest.fn();
  
  render(
    <DndProvider backend={HTML5Backend}>
      <DynamicTable columns={[]} rows={[{}]} onUpdate={onUpdate} testMode={true} />
    </DndProvider>
  );

  const addColumnButton = screen.getByText('Agregar Columna');
  fireEvent.click(addColumnButton);

  expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
    columns: expect.arrayContaining([{ name: 'Nueva Columna' }]),
  }));
});

