// react imports
import { useEffect, useRef } from "react"

// rrd imports
import { FetcherWithComponents, useFetcher } from "react-router-dom"

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"


const AddBudgetForm = () => {
    // hooks
    const fetcher = useFetcher<FetcherWithComponents<HTMLFormElement>>();
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
                Create Budget
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget</label>
                    <input
                        type="text"
                        name="newBudget"
                        id="newBudget"
                        placeholder="eg: Groceries"
                        ref={focusRef}
                        required />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="eg: $350"
                        inputMode="decimal"
                        required />
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button className="btn btn--dark"
                    disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> :
                            <>
                                <span>Create Budget</span>
                                <CurrencyDollarIcon width={20} />
                            </>
                    }
                </button>
            </fetcher.Form>
        </div >
    )
}

export default AddBudgetForm