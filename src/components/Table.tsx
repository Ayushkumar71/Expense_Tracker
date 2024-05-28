import { expenseType } from "../helpers/HelpersTypes"
import ExpenseItem from "./ExpenseItem"

interface tableInputType {
    expenses: expenseType[],
    showBudgets: boolean,
}

const Table = ({ expenses, showBudgets = true }: tableInputType) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date", showBudgets ? ("Budgets") : (""), ""].map((i, index) => {
                                return <th key={index}>{i}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        // some extra stuff added in, "expense" other than those in expenseToken.
                        expenses.map((expense: any) => {
                            return <tr key={expense.id}>
                                <ExpenseItem
                                    expense={expense}
                                    showBudgets={showBudgets}
                                />
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table