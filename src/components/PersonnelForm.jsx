import React, { useState } from 'react';

function PersonnelForm() {
  const [personnel, setPersonnel] = useState([{ role: '', quantity: '', educationLevel: '', training: '', experience: '' }]);

  const handleChange = (index, event) => {
    const values = [...personnel];
    values[index][event.target.name] = event.target.value;
    setPersonnel(values);
  };

  const handleAddRow = () => {
    setPersonnel([...personnel, { role: '', quantity: '', educationLevel: '', training: '', experience: '' }]);
  };

  const handleRemoveRow = (index) => {
    const values = [...personnel];
    values.splice(index, 1);
    setPersonnel(values);
  };

  return (
    <form>
      <h2>Personal Requerido</h2>
      <table>
        <thead>
          <tr>
            <th>Cargo</th>
            <th>Cantidad</th>
            <th>Grado Académico</th>
            <th>Formación</th>
            <th>Experiencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personnel.map((person, index) => (
            <tr key={index}>
              <td><input type="text" name="role" value={person.role} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="number" name="quantity" value={person.quantity} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="text" name="educationLevel" value={person.educationLevel} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="text" name="training" value={person.training} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="text" name="experience" value={person.experience} onChange={(event) => handleChange(index, event)} /></td>
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

export default PersonnelForm;
