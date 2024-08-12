import React, { useState } from 'react';

function ScopeForm() {
  const [locations, setLocations] = useState([{ buildingName: '', city: '', address: '' }]);

  const handleChange = (index, event) => {
    const values = [...locations];
    values[index][event.target.name] = event.target.value;
    setLocations(values);
  };

  const handleAddRow = () => {
    setLocations([...locations, { buildingName: '', city: '', address: '' }]);
  };

  const handleRemoveRow = (index) => {
    const values = [...locations];
    values.splice(index, 1);
    setLocations(values);
  };

  return (
    <form>
      <h2>Ubicaciones Geográficas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Edificio</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={index}>
              <td><input type="text" name="buildingName" value={location.buildingName} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="text" name="city" value={location.city} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="text" name="address" value={location.address} onChange={(event) => handleChange(index, event)} /></td>
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

export default ScopeForm;

  