// Here Token is used for postfix for those types which are for types that are as:  { requiredType }

// type of the object with one **(variable or parameter)** of type string.
export type userNameToken = {
  userName: String;
};

// Type of object contatining "budgets" which containes budget's.
export type budgetsToken = {
  budgets: budgetType[];
};

// Type of object containing "budget" with its listed attributes below.
export type budgetToken = {
  budget: budgetType;
};

// Type of object containing "expenses" which contains expenses's.
export type expensesToken = {
  // [x: string]: any;
  expenses: expenseType[];
};

// Type of object containing "expense" with its listed attributes below
export type expenseToken = {
  expense: expenseType;
};

export type budgetType = {
  id: any;
  name: String;
  createdAt: number;
  amount: number;
  color: number;
};
export type expenseType = {
  id: any;
  name: String;
  createdAt: number;
  amount: number;
  budgetId: string;
};
