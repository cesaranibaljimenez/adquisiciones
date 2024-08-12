import React from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
  COLUMN_LABEL: 'columnLabel',
};

function TableColumn({ label, onDropLabel, onRemove }) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.COLUMN_LABEL,
    drop: (item) => onDropLabel(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <th ref={drop} style={{ backgroundColor: isOver ? 'lightyellow' : 'white', position: 'relative' }}>
      {label}
      <button onClick={onRemove} style={{ position: 'absolute', right: '5px', top: '5px' }}>x</button>
    </th>
  );
}

export default TableColumn;
