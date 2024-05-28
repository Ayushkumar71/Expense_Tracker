import { expenseType } from "./HelpersTypes";

// Interfaces and types
interface budgetInputType {
  name: string;
  amount: number;
}
interface newExpenseType {
  name: string;
  amount: string;
  budgetId: string;
}
interface categoryInputType {
  category: string;
  key: string;
  value: string;
}

// Fetches userName
export const fetchData = (key: string) => {
  var temp: string | null = localStorage.getItem(key);
  if (temp != null) {
    return JSON.parse(temp);
  } else {
    // this is what was the website to break when no value was given
    return null;
  }
};

// Delete's the userName
export const deleteItem = ({ key }: any) => {
  return localStorage.removeItem(key);
};

// Get All items from local storage, using any here  !!!
export const getAllMatchingItems = ({
  category,
  key,
  value,
}: categoryInputType) => {
  const data = fetchData(category) ?? [];
  return data.filter((item: any) => item[key] === value);
};

// Creates budget and adds to Budgets
export const createBudget = ({ name, amount }: budgetInputType) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  // creates a budgets array if not there.
  const exisitingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...exisitingBudgets, newItem])
  );
};

// delete an expense from the local storage   |   I have no idea how this function works
export const deleteExpense = ({ key, id }: any) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item: any) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// create an expense and adds it to Expenses
export const createExpense = ({ name, amount, budgetId }: newExpenseType) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  // creates a expenses array if not there.
  const exisitingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...exisitingExpenses, newItem])
  );
};

// Misc functions

// This is not creating random colours ?? due to a typo in the identifiers used below.
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Wait function
export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 1400));

// total spent by budget
export const calculateSpentByBudget = (budgetId: string) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc: any, expense: expenseType) => {
    //  check if expense. id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    //  add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// Format Currency
export const formatCurrency = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

// format percentage { takes in spent - amount }
export const formatPercentage = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocalString = (epoch: number) => {
  return new Date(epoch).toLocaleDateString();
};
