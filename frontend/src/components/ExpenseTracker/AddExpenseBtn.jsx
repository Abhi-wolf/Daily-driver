import { useState } from "react";
import { Button } from "../ui/button";
import ExpenseForm from "./ExpenseForm";

function AddExpenseBtn() {
  const [isOpen, onClose] = useState(false);

  return (
    <>
      <Button onClick={() => onClose(true)} className="absolute top-2 right-4">
        Add Expense
      </Button>

      {isOpen && <ExpenseForm isOpen={isOpen} onClose={onClose} />}
    </>
  );
}

export default AddExpenseBtn;
