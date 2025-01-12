// rrd imports
import { FetcherWithComponents, Link, useFetcher } from "react-router-dom"

// Library imports
import { TrashIcon } from "@heroicons/react/24/solid";

// helper imports
import { formatCurrency, formatDateToLocalString, getAllMatchingItems } from "../helpers/HelperFun"
import { budgetType, expenseType } from "../helpers/HelpersTypes"

interface ExpenseItemInputType {
    expense: expenseType,
    showBudgets: boolean,
}

const ExpenseItem = ({ expense, showBudgets }: ExpenseItemInputType) => {
    const fetcher = useFetcher<FetcherWithComponents<any>>();
    const budget: budgetType = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId,
    })[0]
    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToLocalString(expense.createdAt)}</td>
            {
                showBudgets && (
                    <td>
                        <Link
                            to={`/budget/${budget.id}`}
                            style={{
                                // "--accent": budget.color,
                            }}
                        >
                            {budget.name}
                        </Link>
                    </td>
                )
            }
            <td>
                <fetcher.Form
                    method="post"
                >
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button
                        type="submit"
                        className="btn --btn warning"
                        aria-label={`Delete ${expense.name} Expense`}
                    >
                        <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default ExpenseItem