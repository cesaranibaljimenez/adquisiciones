import React, { useState } from 'react';

function EquipmentForm() {
  const [equipment, setEquipment] = useState([{ equipmentName: '', quantity: '', technicalSpecifications: '', standard: '' }]);

  const handleChange = (index, event) => {
    const values = [...equipment];
    values[index][event.target.name] = event.target.value;
    setEquipment(values);
  };

  const handleAddRow = () => {
    setEquipment([...equipment, { equipmentName: '', quantity: '', technicalSpecifications: '', standard: '' }]);
  };

  const handleRemoveRow = (index) => {
    const values = [...equipment];
    values.splice(index, 1);
    setEquipment(values);
  };

  return (
    <form>
      <h2>Equipos y Herramientas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Características Técnicas</th>
            <th>Estándar a Cumplir</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item, index) => (
            <tr key={index}>
              <td><input type="text" name="equipmentName" value={item.equipmentName} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="number" name="quantity" value={item.quantity} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="text" name="technicalSpecifications" value={item.technicalSpecifications} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="text" name="standard" value={item.standard} onChange={(event) => handleChange(index, event)} /></td>
              <td>
                <button type="button" onClick={() => handleRemoveRow(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddRow}>Agregar Fila</button>
    </form>
  );
}

export default EquipmentForm;
