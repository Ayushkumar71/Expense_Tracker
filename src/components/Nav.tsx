// rrd imports
import { Form, NavLink } from "react-router-dom";

// assets 
import logomark from "../assets/logomark.svg"

// library
import { TrashIcon } from "@heroicons/react/20/solid";

const Nav = ({ userName }: any) => {
  return <nav>
    <NavLink to="/" aria-label="Go to Home">
      <img src={logomark} alt="" />
      <span>Home Budget</span>
    </NavLink>
    {
      userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (!window.confirm("Delete user and all data")) {
              event.preventDefault()
            }
          }}>
          <button type="submit" className="btn btn--warning">
            <span>Delete User
              <TrashIcon width={20} />
            </span>
          </button>
        </Form>
      )
    }
  </nav>;
};

export default Nav;
