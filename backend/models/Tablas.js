const TableSchema = new mongoose.Schema({
    label: { type: String, required: true },
    columns: [{ type: String, required: true }],
    rows: [{ type: mongoose.Schema.Types.Mixed, required: true }],
  });
  
  const Table = mongoose.model('Table', TableSchema);
  