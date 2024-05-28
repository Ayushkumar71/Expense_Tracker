// rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import Main, { MainLoader } from "./layouts/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import Error from "./pages/Error";

// actions
import { logoutAction } from "./actions/Logout";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: MainLoader,
      errorElement: <Error />,
      children: [
        {
          index: true,               // set as default child.
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          errorElement: <Error />    // This way it also handles errors form inside the component.
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          action: budgetAction,
          errorElement: <Error />
        },
        {
          path: "expenses",
          element: <ExpensesPage />,
          loader: expensesLoader,
          action: expensesAction,
          errorElement: <Error />
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ]
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
