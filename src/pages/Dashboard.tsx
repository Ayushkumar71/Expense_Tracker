// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// pages
import Intro from "../components/Intro";

// components
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helper functions
import { createBudget, createExpense, deleteExpense, fetchData, wait } from "../helpers/HelperFun";
import { userNameToken, budgetsToken, expensesToken } from "../helpers/HelpersTypes";

// loader function
export function dashboardLoader() {
    const userName = fetchData("userName")
    const budgets = fetchData("budgets")
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses }
}

// action function, using "any" here !!!
export async function dashboardAction({ request }: any) {
    await wait();

    // unwrapping the promise "request"
    const data = await request.formData();

    // Takes a list of key-value pairs and converts into an object with props
    const { _action, ...values } = Object.fromEntries(data);

    // for debugging
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome ${values.userName}`)
        } catch (e) {
            throw new Error("There was a problem adding your entry.");
        }

    }
    if (_action === "createBudget") {
        try {
            // Both parameters are type protected.
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })

            return toast.success("Budget created")
        } catch (e) {
            throw new Error("There was a problem creating your budget.");

        }
    }
    if (_action === "createExpense") {
        // console.log(`${typeof (values.newExpense)}, ${typeof (values.newExpenseAmount)}, ${typeof (values.newExpenseBudget)}`)
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget,
                // which we get from inside the value prop of option component inside map function
                // idk how from value={budget.id}  @@@
            })

            return toast.success(`Expense  ${values.newExpense} created`)
        } catch (e) {
            throw new Error("There was a Problem adding you Expense.");

        }
    }
    if (_action === "deleteExpense") {
        try {
            // delete the expense
            deleteExpense({
                key: "expenses",
                id: values.expenseId,

            })
            return toast.success("Expense deleted")
        } catch (e) {
            throw new Error("There was a Problem deleting you Expense.");

        }
    }

}


const Dashboard = () => {
    const { userName } = useLoaderData() as userNameToken;
    const { budgets } = useLoaderData() as budgetsToken;
    const { expenses } = useLoaderData() as expensesToken;
    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent"> {userName}</span></h1>
                    <div className="grid-sm">
                        {
                            budgets && budgets.length > 0
                                ? (
                                    <div className="grid-lg">
                                        <div className="flex-lg">
                                            <AddBudgetForm />
                                            <AddExpenseForm budgets={budgets} />
                                        </div>
                                        <h2>Existing Budgets</h2>
                                        <div className="budgets">
                                            {
                                                budgets.map((budget: any) => {
                                                    return <BudgetItem key={budget.id} budget={budget} />
                                                })
                                            }
                                        </div>
                                        {
                                            // Recent Expenses here
                                            expenses && expenses.length > 0
                                            && (
                                                <div className="grid-sm">
                                                    <h2>Recent Expenses</h2>
                                                    <Table
                                                        expenses={expenses
                                                            .sort((a, b) => b.createdAt - a.createdAt)
                                                            .slice(0, 8)}
                                                        showBudgets={true}
                                                    />
                                                    {
                                                        expenses.length > 8
                                                        && (
                                                            <Link
                                                                to="expenses"
                                                                className="btn btn--dark"
                                                            >
                                                                View all Expenses
                                                            </Link>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                                : (
                                    <div className="grid-sm">
                                        <p>Personal budgetting is the secret to financial freedom.</p>
                                        <p>Create a budget to get started.</p>
                                        <div className="grid-lg">
                                            <div className="flex-lg">
                                                <AddBudgetForm />
                                            </div>
                                        </div></div>
                                )}
                    </div>
                </div>
            ) : (<Intro />)}
        </>
    )
}

export default Dashboard
