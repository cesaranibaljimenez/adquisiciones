import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  COLUMN_LABEL: 'columnLabel',
};

function ColumnLabel({ name }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN_LABEL,
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', margin: '5px 0' }}>
      {name}
    </div>
  );
}

export default ColumnLabel;
