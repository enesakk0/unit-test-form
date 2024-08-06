import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";

function App() {
  const initalValue = {
    email: "",
    password: "",
    terms: false,
  };

  const [form, setForm] = useState(initalValue);
  const [validateCheck, setValidateCheck] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (
      validateEmail(form.email) &&
      validatePassword(form.password) &&
      validateCheckBox(form.terms)
    ) {
      setValidateCheck(true);
    } else {
      setValidateCheck(false);
    }
  }, [form]);

  const errorMessages = {
    email: "Please enter a valid email address",
    password: "Password must be at least 8 characters long",
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateCheckBox = (terms) => {
    return terms;
  };

  const validatePassword = (password) => {
    return String(password).length >= 8;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "checkbox" ? e.target.checked : value;
    setForm({ ...form, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCheck) {
      setIsLogin(true);
    }
  };

  return (
    <section className="container col-6 mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={handleChange}
            value={form.email}
            invalid={form.email.length > 0 && !validateEmail(form.email)}
          />
          {form.email.length > 0 && !validateEmail(form.email) && (
            <FormFeedback>{errorMessages.email}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Enter your password "
            type="password"
            onChange={handleChange}
            value={form.password}
            invalid={
              form.password.length > 0 && !validatePassword(form.password)
            }
          />
          {form.password.length > 0 && !validateEmail(form.password) && (
            <FormFeedback>{errorMessages.password}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="form-label" for="terms">
            <Input
              id="terms"
              name="terms"
              type="checkbox"
              className="form-check-input"
              checked={form.terms}
              onChange={handleChange}
            />
            I agree to
          </Label>
        </FormGroup>
        <FormGroup className="text-center p-4">
          <Button color="primary" disabled={!validateCheck}>
            Sign In
          </Button>
        </FormGroup>
      </Form>
      {isLogin ? <h2>Giriş İşlemi Başarılı</h2> : null}
    </section>
  );
}

export default App;
