import React from 'react';
import { useDrop } from 'react-dnd';

const DynamicTable = ({ columns = [], rows = [], onUpdate, onDropColumn }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN',
    drop: (item) => onDropColumn(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addRow = () => {
    const newRow = {};
    columns.forEach((col) => {
      newRow[col] = '';
    });
    onUpdate({ columns, rows: [...rows, newRow] });
  };

  const removeRow = (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    onUpdate({ columns, rows: updatedRows });
  };

  return (
    <div ref={drop} style={{ border: isOver ? '2px dashed green' : '2px dashed black' }}>
      <button onClick={addRow}>Agregar Fila</button>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`${column}-${index}`}>
                {column} <button onClick={() => onUpdate({ columns: columns.filter((col) => col !== column), rows })}>x</button>
              </th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={`${column}-${colIndex}`}>
                  <input
                    type="text"
                    value={row[column] || ''}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[rowIndex] = {
                        ...updatedRows[rowIndex],
                        [column]: e.target.value,
                      };
                      onUpdate({ columns, rows: updatedRows });
                    }}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => removeRow(rowIndex)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
