import React, { useState } from 'react';

function OtherRequirementsForm() {
  const [documents, setDocuments] = useState([{ documentName: '', deliveryFrequency: '' }]);

  const handleChange = (index, event) => {
    const values = [...documents];
    values[index][event.target.name] = event.target.value;
    setDocuments(values);
  };

  const handleAddRow = () => {
    setDocuments([...documents, { documentName: '', deliveryFrequency: '' }]);
  };

  const handleRemoveRow = (index) => {
    const values = [...documents];
    values.splice(index, 1);
    setDocuments(values);
  };

  return (
    <form>
      <h2>Documentos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Documento</th>
            <th>Frecuencia de Entrega</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td><input type="text" name="documentName" value={doc.documentName} onChange={(event) => handleChange(index, event)} /></td>
              <td><input type="text" name="deliveryFrequency" value={doc.deliveryFrequency} onChange={(event) => handleChange(index, event)} /></td>
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

export default OtherRequirementsForm;
