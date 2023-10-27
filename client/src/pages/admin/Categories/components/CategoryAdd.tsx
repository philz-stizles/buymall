import { ChangeEvent, FormEvent, useState } from "react";
import Wrapper from "../../../helpers/Wrapper";
import { Button, Card } from "../../../components/ui";
import ErrorModal from "../../../components/ui/ErrorModal/ErrorModal";

const CategoryAdd = () => {
  const [name, setName] = useState({ value: "", isValid: true });
  const [age, setAge] = useState({ value: "", isValid: true });
  const [error, setError] = useState<null| any>(null);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName((prev) => {
      return { ...prev, value: e.target.value, isValid: true };
    });
  };
  const ageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAge((prev) => {
      return { ...prev, value: e.target.value, isValid: true };
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.value.trim().length === 0 || age.value.trim().length === 0) {
      if (name.value.trim().length === 0) {
        setName((prev) => {
          return { ...prev, isValid: false };
        });
      }

      if (age.value.trim().length === 0) {
        setAge((prev) => {
          return { ...prev, isValid: false };
        });
      }

      setError({
        title: "Invalid input",
        message: "Please provide valid name and age",
      });
      return;
    }

    if (+age < 1) {
      setAge((prev) => {
        return { ...prev, isValid: false };
      });
      setError({
        title: "Invalid age",
        message: "Please provide valid age (> 0)",
      });
      return;
    }

    clearForm();
  };

  const clearForm = () => {
    setAge({ value: "", isValid: true });
    setAge({ value: "", isValid: true });
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={() => setError(null)}
        />
      )}
      <Card className="">
        <form onSubmit={onSubmitHandler}>
          <div>
            <label
              style={{
                color: name.isValid ? "unset" : "red",
              }}
              htmlFor="username"
            >
              Username
            </label>
            <input
              style={{
                borderColor: name.isValid ? "unset" : "red",
              }}
              type="text"
              id="username"
              value={name.value}
              onChange={nameChangeHandler}
            />
          </div>
          <div>
            <label
              className={`form-control${!age.isValid ? " invalid" : ""}`}
              htmlFor="age"
            >
              Age (Years)
            </label>
            <input
              className={`form-control${!age.isValid ? " invalid" : ""}`}
              type="number"
              id="age"
              min="5"
              value={age.value}
              onChange={ageChangeHandler}
            />
          </div>
          <div>
            <Button label="Add User" type="submit" />
          </div>
        </form>
      </Card>
    </Wrapper>
  );
};

export default CategoryAdd;
