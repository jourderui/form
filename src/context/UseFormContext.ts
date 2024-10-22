import { useContext } from "react";
import { FormContext, FormContextType } from "./FormContext";

export const useFormContext = () => {
  const context = useContext(FormContext) as FormContextType;
  if (!context) {
    throw new Error(
      "useFormContext must be used within an FormContextProvider"
    );
  }
  return context;
};
