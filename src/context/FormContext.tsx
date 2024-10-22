import { createContext, ReactNode, useState } from "react";
import { Form } from "../types/Form";

export interface FormContextType {
  form: Form | undefined;
  setForm: (form: Form) => void;
}

export const FormContext = createContext<FormContextType | null>(null);

interface ContextProviderProps {
  children: ReactNode;
}

export const FormContextProvider = ({ children }: ContextProviderProps) => {
  const [form, setForm] = useState<Form>();

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
};
