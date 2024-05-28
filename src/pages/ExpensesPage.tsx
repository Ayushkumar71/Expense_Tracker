// rrd imports
import { useLoaderData } from "react-router-dom";

// helper functions
import { deleteExpense, fetchData } from "../helpers/HelperFun"
import { expensesToken } from "../helpers/HelpersTypes";

// components
import Table from "../components/Table";
import { toast } from "react-toastify";

// loader function
export function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses };
}

export async function expensesAction({ request }: any) {
    // unwrapping the promise "request"
    const data = await request.formData();

    // Takes a list of key-value pairs and converts into an object with props
    const { _action, ...values } = Object.fromEntries(data);


    if (_action === "deleteExpense") {
        try {
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
const ExpensesPage = () => {
    const { expenses } = useLoaderData() as expensesToken;
    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>
                        Recent Expenses <small>({expenses.length} total)</small>
                    </h2>
                    <Table expenses={expenses} showBudgets={false} />
                </div>
            ) : (
                <p>No Expenses to show</p>
            )}
        </div>
    )
}

export default ExpensesPage