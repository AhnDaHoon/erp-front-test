import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormClearErrors } from 'react-hook-form';

// 필드 타입 정의
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';

// 필드 옵션 타입
export interface FieldOption {
  readonly value: string;
  readonly label: string;
}

// 필드 설정 타입
export interface FieldConfig {
  readonly id?: string;
  readonly label: string;
  readonly type: FieldType;
  readonly required: boolean;
  readonly validation: any;
  readonly options?: readonly FieldOption[];
  readonly onChange?: (value: any) => void;
}

// 폼 필드 컴포넌트 Props
interface FormFieldProps {
  field: FieldConfig;
  fieldName: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  clearErrors: UseFormClearErrors<any>;
  customValidation?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  fieldName,
  register,
  errors,
  clearErrors,
  customValidation,
}) => {
  const fieldErrors = errors[fieldName];
  
  const fieldId = field.id || fieldName;
  
  // 필드값이 바꼇을 때 실행되는 함수수
  const handleFieldChange = (value: any) => {
    // 필드값이 바꼇을 때 오류가 오류메세지 제거
    if (fieldErrors) {
      clearErrors(fieldName);
    }

     // 사용자가 정의한 onChange 함수 실행
    if (field.onChange) {
      field.onChange(value);
    }
  };
  
  return (
    <div className="form-group">
      <label htmlFor={fieldId} className="form-label">
        {field.label} {field.required && '*'}
      </label>
      
      {field.type === 'textarea' ? (
        <textarea
          id={fieldId}
          {...register(fieldName, customValidation || field.validation)}
          placeholder={`${field.label}을 입력하세요`}
          rows={4}
          className="form-textarea"
          onChange={(e) => handleFieldChange(e.target.value)}
        />
      ) : field.type === 'select' ? (
        <select
          id={fieldId}
          {...register(fieldName, field.validation)}
          className="form-input"
          onChange={(e) => handleFieldChange(e.target.value)}
        >
          {field.options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === 'checkbox' ? (
        <div>
          <label className="checkbox-terms">
            <input
              type="checkbox"
              id={fieldId}
              {...register(fieldName, field.validation)}
              onChange={(e) => handleFieldChange(e.target.checked)}
            />
            <span className="form-label">
              {field.label} {field.required && '*'}
            </span>
          </label>
        </div>
      ) : (
        <input
          id={fieldId}
          type={field.type}
          {...register(fieldName, customValidation || field.validation)}
          placeholder={`${field.label}을 입력하세요`}
          className="form-input"
          onChange={(e) => handleFieldChange(e.target.value)}
        />
      )}
      
      {fieldErrors && (
        <p className="form-error">
          <span className="error-icon">⚠️</span>
          {fieldErrors.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default FormField; 