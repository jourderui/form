import "./App.css";
import { FormContextProvider } from "./context/FormContext";
import MainForm from "./components/form/MainForm";

function App() {
  return (
    <FormContextProvider>
      <MainForm />
    </FormContextProvider>
  );
}

export default App;
