function BudgetForm() {
    return (
      <form>
        <h2>Costos y Presupuestos</h2>
        <label>
          Presupuesto Referencial:
          <input type="number" name="budget" />
        </label>
        <label>
          Forma y Condiciones de Pago:
          <textarea name="paymentTerms"></textarea>
        </label>
      </form>
    );
  }
  
  export default BudgetForm;
  