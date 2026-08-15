import { useState } from 'react';

type Expense = {
  id: string;
  name: string;
  amount: number;
  dueDay: number;
  paid: boolean;
};

const demoExpenses: Expense[] = [
  { id: 'housing', name: 'Housing', amount: 950, dueDay: 1, paid: true },
  { id: 'utilities', name: 'Utilities', amount: 120, dueDay: 5, paid: false },
  { id: 'transport', name: 'Transport', amount: 49, dueDay: 10, paid: false },
  { id: 'subscriptions', name: 'Subscriptions', amount: 22, dueDay: 15, paid: false },
];

const recipes = [
  { name: 'Creamy mushroom pasta', url: 'https://www.bbcgoodfood.com/recipes/collection/pasta-recipes' },
  { name: 'Colourful vegetable curry', url: 'https://www.bbcgoodfood.com/recipes/collection/curry-recipes' },
  { name: 'Roasted vegetable traybake', url: 'https://www.bbcgoodfood.com/recipes/collection/traybake-recipes' },
  { name: 'Mediterranean grain bowl', url: 'https://www.bbcgoodfood.com/recipes/collection/bowl-food-recipes' },
];

function App() {
  const [view, setView] = useState<'home' | 'budget' | 'roulette'>('home');
  const [expenses, setExpenses] = useState(demoExpenses);
  const [selectedRecipe, setSelectedRecipe] = useState<(typeof recipes)[number] | null>(null);
  const [spinning, setSpinning] = useState(false);

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paid = expenses.filter((expense) => expense.paid).reduce((sum, expense) => sum + expense.amount, 0);

  const toggleExpense = (id: string) => {
    setExpenses((current) => current.map((expense) => (
      expense.id === id ? { ...expense, paid: !expense.paid } : expense
    )));
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedRecipe(null);
    window.setTimeout(() => {
      setSelectedRecipe(recipes[Math.floor(Math.random() * recipes.length)]);
      setSpinning(false);
    }, 700);
  };

  if (view === 'budget') {
    return <main className="app-shell">
      <button className="back" onClick={() => setView('home')}>← All demos</button>
      <p className="eyebrow">Interactive demo</p>
      <h1>Monthly budget tracker</h1>
      <p className="notice">This version uses fictional, in-browser data only. Changes reset on refresh.</p>
      <section className="summary" aria-label="Budget summary">
        <div><span>Monthly total</span><strong>€{total.toFixed(2)}</strong></div>
        <div><span>Paid</span><strong>€{paid.toFixed(2)}</strong></div>
        <div><span>Remaining</span><strong>€{(total - paid).toFixed(2)}</strong></div>
      </section>
      <section className="expense-list" aria-label="Demo expenses">
        {expenses.map((expense) => <label className="expense" key={expense.id}>
          <input type="checkbox" checked={expense.paid} onChange={() => toggleExpense(expense.id)} />
          <span className="expense-name">{expense.name}<small>Due on day {expense.dueDay}</small></span>
          <strong>€{expense.amount.toFixed(2)}</strong>
        </label>)}
      </section>
    </main>;
  }

  if (view === 'roulette') {
    return <main className="app-shell roulette">
      <button className="back" onClick={() => setView('home')}>← All demos</button>
      <p className="eyebrow">Interactive demo</p>
      <h1>Recipe roulette</h1>
      <p>Need dinner inspiration? Spin for a randomly selected recipe category.</p>
      <div className={spinning ? 'wheel spinning' : 'wheel'} aria-hidden="true">🍽️</div>
      <button className="primary" onClick={spin} disabled={spinning}>{spinning ? 'Spinning…' : 'Spin the wheel'}</button>
      {selectedRecipe && <section className="selection">
        <p>Tonight’s pick</p>
        <h2>{selectedRecipe.name}</h2>
        <a href={selectedRecipe.url} target="_blank" rel="noreferrer">Browse recipes ↗</a>
      </section>}
    </main>;
  }

  return <main className="app-shell home">
    <p className="eyebrow">Portfolio project</p>
    <h1>Two small apps, safely demonstrated.</h1>
    <p className="intro">These interactive demos showcase the product flows without connecting to private accounts, personal financial data, Firebase, or analytics.</p>
    <div className="cards">
      <button className="card" onClick={() => setView('budget')}>
        <span className="icon">€</span><span><strong>Monthly budget tracker</strong><small>Track recurring costs and payment status</small></span><b>Open →</b>
      </button>
      <button className="card" onClick={() => setView('roulette')}>
        <span className="icon">🍲</span><span><strong>Recipe roulette</strong><small>Choose a dinner idea with one spin</small></span><b>Open →</b>
      </button>
    </div>
  </main>;
}

export default App;
