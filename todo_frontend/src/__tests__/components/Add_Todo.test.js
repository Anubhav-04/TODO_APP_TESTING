/** @format */

import React from "react";
import "@testing-library/jest-dom";
import AddTodo from "../../components/addTodo";

import { render, screen, fireEvent, waitFor } from '@testing-library/react';


describe("Testing the add todo component", () => {
  test("Render the input field and test add button", () => {
    render(<AddTodo onAdd={() => {}} />);
    expect(
      screen.getByPlaceholderText("Add Todos")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Todo" })
    ).toBeInTheDocument();
  });
  
});
