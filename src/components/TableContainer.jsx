import React, { useState, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import DynamicTable from './DynamicTable';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const TableContainer = () => {
  const [tables, setTables] = useState([{ id: uuidv4(), label: 'Tabla 1', columns: [], rows: [{}] }]);
  const [labels, setLabels] = useState([
    { id: uuidv4(), text: 'Especificaciones de Lugares Donde Se Prestará El Servicio' },
    { id: uuidv4(), text: 'Especificaciones de Personal Requerido Para la Prestación Del Servicio' },
    { id: uuidv4(), text: 'Especificaciones de Equipos/Herramientas Necesarios Para La Prestación Del Servicio' },
    { id: uuidv4(), text: 'Especificaciones de Documentos Requeridos Para La Prestación Del Servicio' },
    { id: uuidv4(), text: 'Presupuesto Referencial' }
  ]);
  const [columnLabels, setColumnLabels] = useState([
    { id: uuidv4(), text: 'Ciudad' },
    { id: uuidv4(), text: 'Nombre Edificio' },
    { id: uuidv4(), text: 'Dirección' }
  ]);
  const [newLabel, setNewLabel] = useState('');
  const [newColumnLabel, setNewColumnLabel] = useState('');
  const [specificationTitle, setSpecificationTitle] = useState('');

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getSpecifications`);
        const data = Array.isArray(response.data) ? response.data : [];
        setTables(data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const handleSaveSpecification = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/saveSpecification`, { title: specificationTitle, tables });
      console.log('Specification saved successfully:', response.data);
      setSpecificationTitle('');
      setTables([]); // Limpiar tablas en la UI
    } catch (error) {
      console.error('Error saving specification:', error);
    }
  };

  const handleCreateNewSpecification = () => {
    setTables([{ id: uuidv4(), label: 'Tabla 1', columns: [], rows: [{}] }]);
  };

  const handleUpdateTable = (id, updatedTable) => {
    setTables((prevTables) =>
      prevTables.map((table) => (table.id === id ? { ...table, ...updatedTable } : table))
    );
  };

  const handleDropColumn = (tableId, columnName) => {
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (table.id === tableId) {
          const updatedColumns = [...table.columns, columnName];
          return { ...table, columns: updatedColumns };
        }
        return table;
      })
    );
  };

  const handleAddNewLabel = () => {
    if (newLabel.trim()) {
      setLabels((prevLabels) => [...prevLabels, { id: uuidv4(), text: newLabel.trim() }]);
      setNewLabel('');
    }
  };

  const handleAddNewColumnLabel = () => {
    if (newColumnLabel.trim()) {
      setColumnLabels((prevLabels) => [...prevLabels, { id: uuidv4(), text: newColumnLabel.trim() }]);
      setNewColumnLabel('');
    }
  };

  const handleAddTable = (label) => {
    setTables((prevTables) => [
      ...prevTables,
      { id: uuidv4(), label, columns: [], rows: [{}] }
    ]);
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'LABEL',
    drop: (item) => handleAddTable(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const renderLabels = () => {
    return labels.map((label) => (
      <DraggableLabel key={label.id} label={label.text} />
    ));
  };

  const renderColumnLabels = () => {
    return columnLabels.map((label) => (
      <DraggableColumnLabel key={label.id} label={label.text} />
    ));
  };

  return (
    <div>
      <h1>Especificaciones Técnicas</h1>
      <input
        type="text"
        value={specificationTitle}
        onChange={(e) => setSpecificationTitle(e.target.value)}
        placeholder="Título de la Especificación"
      />
      <button onClick={handleSaveSpecification}>Guardar</button>
      <button onClick={handleCreateNewSpecification}>Crear Nueva Especificación Técnica</button>
      <h2>Etiquetas de Nombres de Tabla</h2>
      <div>{renderLabels()}</div>
      <input
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        placeholder="Nueva etiqueta"
      />
      <button onClick={handleAddNewLabel}>Crear Nueva Etiqueta</button>

      <h2>Etiquetas de Columna</h2>
      <div>{renderColumnLabels()}</div>
      <input
        type="text"
        value={newColumnLabel}
        onChange={(e) => setNewColumnLabel(e.target.value)}
        placeholder="Nueva etiqueta de columna"
      />
      <button onClick={handleAddNewColumnLabel}>Crear Nueva Etiqueta de Columna</button>

      <h2>Tablas</h2>
      <div ref={drop} style={{ padding: '20px', border: isOver ? '2px solid green' : '2px solid black' }}>
        {Array.isArray(tables) && tables.map((table) => (
          <div key={table.id} style={{ marginBottom: '20px' }}>
            <h3>
              {table.label}{' '}
              <button onClick={() => setTables(tables.filter((t) => t.id !== table.id))}>x</button>
            </h3>
            <DynamicTable
              columns={table.columns}
              rows={table.rows}
              onUpdate={(updatedTable) => handleUpdateTable(table.id, updatedTable)}
              onDropColumn={(columnName) => handleDropColumn(table.id, columnName)}
            />
          </div>
        ))}
        <button onClick={() => handleAddTable(`Tabla ${uuidv4()}}`)}>Agregar Tabla</button>
      </div>
    </div>
  );
};

const DraggableLabel = ({ label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'LABEL',
    item: { name: label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {label}
    </div>
  );
};

const DraggableColumnLabel = ({ label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: { name: label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {label}
    </div>
  );
};

export default TableContainer;

