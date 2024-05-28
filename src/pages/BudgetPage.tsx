// rrd imports
import { useLoaderData } from "react-router-dom"

// library imports
import { toast } from "react-toastify";

// helper functions
import { createExpense, deleteExpense, getAllMatchingItems } from "../helpers/HelperFun"
import { budgetToken, expensesToken } from "../helpers/HelpersTypes";

// components
import Table from "../components/Table";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";


// Loader function
export async function budgetLoader({ params }: any) {
    // why wasnt Ts giving error when i was not using [0], cause before budget would have been an array of object, now just an object
    const budget: any = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id,
    })[0];
    const expenses: any = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });
    if (!budget) {
        throw new Error("The budget you are trying to find doesnt exist.");

    }
    return { budget, expenses }
}
export async function budgetAction({ request }: any) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget,
            });
            return toast.success(`Expense ${values.newExpense} created!`);
        } catch (e) {
            throw new Error("There was a problem creating your expense.");
        }
    }

    if (_action === "deleteExpense") {
        try {
            deleteExpense({
                key: "expenses",
                id: values.expenseId,

            })
            return toast.success("Expense deleted!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
    }
}

const BudgetPage = () => {
    const { budget } = useLoaderData() as budgetToken;
    const { expenses } = useLoaderData() as expensesToken;
    return (
        <div className="grid-lg">
            <h1 className="h2">
                <span className="accent">{budget.name}</span>{" "}
                Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses && expenses.length > 0
                && (
                    <div className="grid-md">
                        <h2><span className="accent">{budget.name} </span>{" "}
                            Expenses
                        </h2>
                        <Table expenses={expenses} showBudgets={false} />
                    </div>
                )
            }
        </div>
    )
}

export default BudgetPage