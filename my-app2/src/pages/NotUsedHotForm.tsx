import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  age: number;
  message: string;
}

const NotUsedHotForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    getValues,
    trigger,
    clearErrors,
    setError,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      age: 0,
      message: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    console.log('폼 데이터:', data);
    
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('폼이 성공적으로 제출되었습니다!');
    reset();
  };

  const onError = (errors: any) => {
    console.log('폼 에러:', errors);
  };

  // 현재 폼 값들을 감시
  const watchedValues = watch();

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>React Hot Form 예제</h2>
      
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">이름:</label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: '이름은 필수입니다',
              minLength: {
                value: 2,
                message: '이름은 최소 2자 이상이어야 합니다'
              }
            })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.name && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">이메일:</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: '이메일은 필수입니다',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '유효한 이메일 주소를 입력해주세요'
              }
            })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.email && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="age">나이:</label>
          <input
            id="age"
            type="number"
            {...register('age', {
              required: '나이는 필수입니다',
              min: {
                value: 1,
                message: '나이는 1세 이상이어야 합니다'
              },
              max: {
                value: 120,
                message: '나이는 120세 이하여야 합니다'
              }
            })}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.age && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.age.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message">메시지:</label>
          <textarea
            id="message"
            {...register('message', {
              maxLength: {
                value: 500,
                message: '메시지는 500자 이하여야 합니다'
              }
            })}
            rows={4}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.message && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.message.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '10px 20px',
              backgroundColor: isSubmitting ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            {isSubmitting ? '제출 중...' : '제출'}
          </button>
          
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            초기화
          </button>

          <button
            type="button"
            onClick={() => {
              setValue('name', '홍길동');
              setValue('email', 'hong@example.com');
              setValue('age', 25);
              setValue('message', '안녕하세요!');
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            샘플 데이터 입력
          </button>
        </div>
      </form>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h4>현재 폼 값:</h4>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '15px' }}>
        <button
          onClick={() => {
            const values = getValues();
            console.log('현재 폼 값들:', values);
            alert('콘솔을 확인해보세요!');
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          현재 값 가져오기
        </button>

        <button
          onClick={async () => {
            const isValid = await trigger();
            alert(isValid ? '모든 필드가 유효합니다!' : '유효하지 않은 필드가 있습니다.');
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          유효성 검사
        </button>

        <button
          onClick={() => {
            clearErrors();
            alert('모든 에러가 지워졌습니다!');
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          에러 지우기
        </button>
      </div>
    </div>
  );
};

export default NotUsedHotForm;