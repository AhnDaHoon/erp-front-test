// 비밀번호 확인 validation 생성 함수
export const createPasswordConfirmValidation = (passwordFieldName: string, passwordValue: string) => ({
  required: '비밀번호 확인은 필수입니다',
  validate: (value: string) => value === passwordValue || '비밀번호가 일치하지 않습니다'
});

// 공통 validation 규칙들
export const commonValidations = {
  required: (message: string) => ({ required: message }),
  minLength: (value: number, message: string) => ({ minLength: { value, message } }),
  maxLength: (value: number, message: string) => ({ maxLength: { value, message } }),
  min: (value: number, message: string) => ({ min: { value, message } }),
  max: (value: number, message: string) => ({ max: { value, message } }),
  pattern: (value: RegExp, message: string) => ({ pattern: { value, message } }),
  email: () => ({ 
    pattern: { 
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
      message: '유효한 이메일 주소를 입력해주세요' 
    } 
  }),
  password: () => ({ 
    pattern: { 
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      message: '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다' 
    } 
  }),
  url: () => ({ 
    pattern: { 
      value: /^https?:\/\/.+/, 
      message: '유효한 URL을 입력해주세요' 
    } 
  })
}; 