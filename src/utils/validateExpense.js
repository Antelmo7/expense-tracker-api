export default function validateExpense(expense, props = ['description', 'amount', 'category']) {
  if (!expense) return false;

  return props.every(prop => {
    const value = expense[prop];

    if (value === null || value === undefined) return false;

    if (!(prop in expense)) return false;

    if (typeof value === 'string' && value.trim() === '') return false;

    if (typeof value === 'number' && parseFloat(value).toFixed(2) <= parseFloat(0).toFixed(2)) return false;

    return true;
  });
}