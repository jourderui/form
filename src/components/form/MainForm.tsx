/**
 * Zde vytvořte formulář pomocí knihovny react-hook-form.
 * Formulář by měl splňovat:
 * 1) být validován yup schématem
 * 2) formulář obsahovat pole "NestedFields" z jiného souboru
 * 3) být plně TS typovaný
 * 4) nevalidní vstupy červeně označit (background/outline/border) a zobrazit u nich chybové hlášky
 * 5) nastavte výchozí hodnoty objektem initalValues
 * 6) mít "Submit" tlačítko, po jeho stisku se vylogují data z formuláře:  "console.log(formData)"
 *
 * V tomto souboru budou definovány pole:
 * amount - number; Validace min=0, max=300
 * damagedParts - string[] formou multi-checkboxu s volbami "roof", "front", "side", "rear"
 * vykresleny pole z form/NestedFields
 */


import React, { ChangeEvent, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useFormContext } from "../../context/UseFormContext";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DAMAGED_PARTS_LABELS, DAMAGED_PARTS_VALUES, Form } from "../../types/Form";

const initialValues = {
  amount: 250,
  allocation: 140,
  damagedParts: ["side", "rear"],
  category: "kitchen-accessories",
  witnesses: [
    {
      name: "Marek",
      email: "marek@email.cz",
    },
    {
      name: "Emily",
      email: "emily.johnson@x.dummyjson.com",
    },
  ],
};

const MainForm = () => {
  const { setForm, form } = useFormContext();
  console.log("FORM", form);

  useEffect(() => {
    setForm(initialValues);
  }, [setForm]);

  const schema = yup.object().shape({
    amount: yup.number().integer().min(0).max(300)
  });

  const useYupValidationResolver = (schema: yup.ObjectSchema<{ amount: number | undefined; }>) =>
    useCallback(
      async (data: any) => {
        try {
          const values = await schema.validate(data, {
            abortEarly: false,
          })
  
          return {
            values,
            errors: {},
          }
        } catch (errors: any) {
          console.log(errors);
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors: any, currentError: { path: any; type: any; message: any; }) => ({
                ...allErrors,
                [currentError.path]: {
                  type: currentError.type ?? "validation",
                  message: currentError.message,
                },
              }),
              {}
            ),
          }
        }
      },
      [schema]
    )

  const updateForm =(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof Form ) => {
    const newForm = {
      ...form,
      [key]: event.currentTarget.value
    }
    setForm(newForm as Form)
  }

  const resolver = useYupValidationResolver(schema)
  const { handleSubmit } = useForm({ resolver })

  return (
    <FormControl onSubmit={handleSubmit((formData) => console.log(formData))}>
      <FormLabel id="demo-radio-buttons-group-label">Damaged Parts</FormLabel>
      <TextField
             type="number"
              name="amount"
              label="Amount"
              variant="filled"
              value={form && form.amount || 0}
              onChange={(event) => updateForm(event, "amount")}

          />
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={DAMAGED_PARTS_VALUES.ROOF}
        name="radio-buttons-group"
      >
        <FormControlLabel
          value={DAMAGED_PARTS_VALUES.ROOF}
          control={<Radio />}
          label={DAMAGED_PARTS_LABELS.ROOF}
        />
        <FormControlLabel
          value={DAMAGED_PARTS_VALUES.FRONT}
          control={<Radio />}
          label={DAMAGED_PARTS_LABELS.FRONT}
        />
        <FormControlLabel
          value={DAMAGED_PARTS_VALUES.SIDE}
          control={<Radio />}
          label={DAMAGED_PARTS_LABELS.SIDE}
        />
        <FormControlLabel
          value={DAMAGED_PARTS_VALUES.REAR}
          control={<Radio />}
          label={DAMAGED_PARTS_LABELS.REAR}
        />
      </RadioGroup>
      {/* <NestedFields register={register} /> */}
    </FormControl>
  );
};

export default MainForm;
