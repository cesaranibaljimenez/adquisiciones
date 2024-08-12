// src/pages/Specifications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Specifications = () => {
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    const fetchSpecifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getSpecifications');
        setSpecifications(response.data);
      } catch (error) {
        console.error('Error fetching specifications:', error);
      }
    };

    fetchSpecifications();
  }, []);

  const generatePDF = (specification) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(specification.title, 20, 20);
    
    specification.tables.forEach((table, tableIndex) => {
      const tableTitle = table.label;
      const columns = table.columns.map((col) => ({ title: col, dataKey: col }));
      const rows = table.rows;

      if (tableIndex > 0) {
        doc.addPage();
      }

      doc.setFontSize(14);
      doc.text(tableTitle, 20, 30 + tableIndex * 10);
      doc.autoTable({
        head: [columns.map(col => col.title)],
        body: rows.map(row => columns.map(col => row[col.dataKey])),
        startY: 40 + tableIndex * 10,
        styles: { fontSize: 12 },
      });
    });

    doc.save(`${specification.title}.pdf`);
  };

  return (
    <div>
      <h1>Especificaciones Guardadas</h1>
      {specifications.map((specification) => (
        <div key={specification._id}>
          <h2>
            {specification.title}{' '}
            <button onClick={() => generatePDF(specification)}>Generar PDF</button>
          </h2>
          {specification.tables.map((table) => (
            <div key={table.label}>
              <h3>{table.label}</h3>
              <table>
                <thead>
                  <tr>
                    {table.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {table.columns.map((column) => (
                        <td key={column}>{row[column]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Specifications;

