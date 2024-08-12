import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  TABLE_LABEL: 'tableLabel',
};

function TableLabel({ name }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TABLE_LABEL,
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

export default TableLabel;
