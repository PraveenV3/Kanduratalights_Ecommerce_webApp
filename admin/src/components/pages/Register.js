import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Register, RegisterReset } from "../../redux/actions/userActions";

const RegisterPage = ({ history }) => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { register_status } = userRegister;

  // Set isAdmin to true in the initial state
  const [formState, setFormState] = useState({
    values: {
      name: "",
      email: "",
      password: "",
      isAdmin: true, // Set isAdmin to true by default
    },
  });

  const handleChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const { name, email, password, isAdmin } = formState.values;
    if (name && email && password) {
      dispatch(Register(name, email, password, isAdmin));
    }
  };

  useEffect(() => {
    if (register_status) {
      history.push("/");
      dispatch(RegisterReset());
    }
  }, [dispatch, register_status, history]);

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <h4>New here?</h4>
                  <h6 className="fw-light">Signing up is easy. It only takes a few steps</h6>
                  <form className="pt-3" onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group">
                      <input
                        type="text"
                        className={"form-control form-control-lg" + (submitted && !formState.values.name ? " is-invalid" : "")}
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formState.values.name || ""}
                        style={{ backgroundColor: "#E0F2F7" }} // Set background color to #E0F2F7
                      />
                      {submitted && !formState.values.name && (
                        <div className="inline-errormsg">Name is required</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className={"form-control form-control-lg" + (submitted && !formState.values.email ? " is-invalid" : "")}
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formState.values.email || ""}
                        style={{ backgroundColor: "#E0F2F7" }} // Set background color to #E0F2F7
                      />
                      {submitted && !formState.values.email && (
                        <div className="inline-errormsg">Email is required</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className={"form-control form-control-lg" + (submitted && !formState.values.password ? " is-invalid" : "")}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formState.values.password || ""}
                        style={{ backgroundColor: "#E0F2F7" }} // Set background color to #E0F2F7
                      />
                      {submitted && !formState.values.password && (
                        <div className="inline-errormsg">Password is required</div>
                      )}
                    </div>
                    {/* Hidden checkbox input */}
                    <div className="form-check mt-3" style={{ display: "none" }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isAdmin"
                        name="isAdmin"
                        checked={formState.values.isAdmin}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="isAdmin">
                        Admin
                      </label>
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" style={{ background: "black", color: "white" }}>
                        SIGN UP
                      </button>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center"></div>
                    <div className="text-center mt-4 fw-light">
                      Already have an account? <Link to="/login" className="text-primary">Login</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
