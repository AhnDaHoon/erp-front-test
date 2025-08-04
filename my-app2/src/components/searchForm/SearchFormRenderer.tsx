import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormClearErrors } from 'react-hook-form';
import FormField, { FieldConfig } from './SearchFormField';

interface FormRendererProps {
  fields: Record<string, FieldConfig>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  clearErrors: UseFormClearErrors<any>;
  customValidations?: Record<string, any>;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  fields,
  register,
  errors,
  clearErrors,
  customValidations,
}) => {
  return (
    <>
      {Object.entries(fields).map(([fieldName, field]) => (
        <FormField
          key={fieldName}
          field={field}
          fieldName={fieldName}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          customValidation={customValidations?.[fieldName]}
        />
      ))}
    </>
  );
};

export default FormRenderer; 