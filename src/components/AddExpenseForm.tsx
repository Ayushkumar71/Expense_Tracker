// react imports
import { useEffect, useRef } from "react";

// rrd imports
import { FetcherWithComponents, useFetcher } from "react-router-dom"

// helper types
import { budgetsToken } from "../helpers/HelpersTypes"

//library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }: budgetsToken) => {
    // hooks
    const fetcher = useFetcher<FetcherWithComponents<any>>();
    // isSub.. is true when submitting and false when loading or idle.
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef<HTMLFormElement>(null);
    const focusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isSubmitting) {
            if (formRef.current != null && focusRef.current != null) {
                formRef.current.reset();
                focusRef.current.focus();
            }
        }
    }, [isSubmitting])


    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Add new {"    "}
                <span className="accent">
                    {budgets.length === 1 && `${budgets.map((budget) => budget.name)}`}
                </span>{" "}
                Expense
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="Eg: Coffee"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="Eg: 3.50"
                            required
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">
                        Budget Category
                    </label>
                    <select
                        name="newExpenseBudget"
                        id="newExpenseBudget"
                        required
                    >
                        {
                            budgets
                                .sort((a, b) => a.createdAt - b.createdAt)
                                .map((budget) => {
                                    return (
                                        <option
                                            key={budget.id}
                                            value={budget.id}>
                                            {budget.name}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div>
                <input
                    type="hidden"
                    name="_action"
                    value="createExpense" />
                <button
                    type="submit"
                    className="btn btn--dark"
                    disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> :
                            (
                                <>
                                    <span>Create Budget</span>
                                    <PlusCircleIcon width={20} />
                                </>
                            )
                    }
                </button>

            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm