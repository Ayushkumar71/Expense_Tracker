// rrd imports 
import { redirect } from "react-router-dom";

// library imports
// library
import { toast } from 'react-toastify';


// helper functions
import { deleteItem } from "../helpers/HelperFun";


export async function logoutAction() {
    // delete all userData.
    deleteItem({
        key: "userName"
    });
    deleteItem({
        key: "budgets"
    });
    deleteItem({
        key: "expenses"
    });
    toast.success("user Data deleted")
    // return redirect 
    return redirect("/")

}