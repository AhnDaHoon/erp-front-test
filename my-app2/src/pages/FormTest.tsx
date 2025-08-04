import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTabNavigation } from '../hooks/useTabNavigation';
import { useTabState } from '../hooks/useTabState';
import { createPasswordConfirmValidation } from '../utils/formUtils';
import './FormTest.css';
import FormRenderer from '../components/searchForm/SearchFormRenderer';

/**
 * FormTest 페이지 - React Hook Form 사용법
 * 
 * 이 페이지는 React Hook Form을 사용한 폼 관리의 다양한 기능들을 보여줍니다.
 * 
 * 주요 기능:
 * 1. 두 개의 독립적인 폼 (사용자 정보 + 상품 정보)
 * 2. 중앙 집중식 필드 설정 관리
 * 3. 실시간 유효성 검사
 * 4. 커스텀 validation 규칙
 * 5. 재사용 가능한 폼 컴포넌트
 * 
 * 사용법:
 * 1. 폼 필드 설정을 FORM_CONFIGS에 정의
 * 2. useForm 훅으로 폼 상태 관리
 * 3. FormRenderer 컴포넌트로 필드 자동 렌더링
 * 4. 커스텀 validation은 customValidations prop으로 전달
 */

// 첫 번째 폼 데이터 타입
interface UserFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
  interests: string[];
  bio: string;
  terms: boolean;
}

// 두 번째 폼 데이터 타입
interface ProductFormData {
  productName: string;
  category: string;
  price: number;
  description: string;
  inStock: boolean;
  
  imageUrl: string;
  weight: number;
  test: string;
}



// 폼 필드 ID와 validation 규칙을 중앙에서 관리
// 새로운 필드 추가 시 여기에만 정의하면 자동으로 렌더링됩니다
const FORM_CONFIGS = {
  user: {
    title: '사용자 정보 폼',
    fields: {
      username: {
        label: '사용자명',
        type: 'text',
        required: true,
        validation: {
          required: '사용자명은 필수입니다',
          minLength: {
            value: 2,
            message: '사용자명은 최소 2자 이상이어야 합니다'
          },
          maxLength: {
            value: 20,
            message: '사용자명은 최대 20자까지 가능합니다'
          }
        }
      },
      email: {
        label: '이메일',
        type: 'email',
        required: true,
        validation: {
          required: '이메일은 필수입니다',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '유효한 이메일 주소를 입력해주세요'
          }
        }
      },
      password: {
        label: '비밀번호',
        type: 'password',
        required: true,
        validation: {
          required: '비밀번호는 필수입니다',
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다'
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: '비밀번호는 영문 대소문자와 숫자를 포함해야 합니다'
          }
        }
      },
      confirmPassword: {
        label: '비밀번호 확인',
        type: 'password',
        required: true,
        validation: {
          required: '비밀번호 확인은 필수입니다'
        }
      },
    }
  },
  product: {
    title: '상품 정보 폼',
    fields: {
      productName: {
        label: '상품명',
        type: 'text',
        required: true,
        validation: {
          required: '상품명은 필수입니다',
          minLength: {
            value: 2,
            message: '상품명은 최소 2자 이상이어야 합니다'
          },
          maxLength: {
            value: 100,
            message: '상품명은 최대 100자까지 가능합니다'
          }
        }
      },
      category: {
        label: '카테고리',
        type: 'select',
        required: true,
        options: [
          { value: 'electronics', label: '전자제품' },
          { value: 'clothing', label: '의류' },
          { value: 'books', label: '도서' },
          { value: 'food', label: '식품' }
        ],
        validation: {
          required: '카테고리를 선택해주세요'
        }
      },
      price: {
        label: '가격',
        type: 'number',
        required: true,
        validation: {
          required: '가격은 필수입니다',
          min: {
            value: 0,
            message: '가격은 0원 이상이어야 합니다'
          }
        }
      },
      description: {
        label: '상품 설명',
        type: 'textarea',
        required: false,
        validation: {
          maxLength: {
            value: 1000,
            message: '상품 설명은 최대 1000자까지 가능합니다'
          }
        }
      },
      inStock: {
        label: '재고 있음',
        type: 'checkbox',
        required: false,
        validation: {}
      },
      imageUrl: {
        label: '이미지 URL',
        type: 'url',
        required: false,
        validation: {
          pattern: {
            value: /^https?:\/\/.+/,
            message: '유효한 URL을 입력해주세요'
          }
        }
      },
      weight: {
        label: '무게 (kg)',
        type: 'number',
        required: false,
        validation: {
          min: {
            value: 0,
            message: '무게는 0kg 이상이어야 합니다'
          }
        },
        onChange: (value: string) => {
          console.log('weight 필드 변경:', value);
        }
      },
      test: {
        label: '테스트',
        type: 'select',
        required: true,
        options: [
          { value: '', label: '선택' },
          { value: '1', label: '1' },
          { value: '2', label: '2' }
        ],
        validation: {
          required: '테스트 필드를 선택해주세요'
        },
        onChange: (value: string) => {
          console.log('test 필드 변경:', value);
        }
      }
    }
  }
} as const;

const FormTest: React.FC = () => {
  const { openTab } = useTabNavigation();
  
  // 탭 상태 관리
  const { state: tabState, updateState } = useTabState('form-test', {
    userFormData: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: 18,
      gender: '',
      interests: [] as string[],
      bio: '',
      terms: false
    },
    productFormData: {
      productName: '',
      category: '',
      price: 0,
      description: '',
      inStock: true,
      imageUrl: '',
      weight: 0
    }
  });

  // 사용자 정보 폼 - React Hook Form으로 상태 관리
  const userForm = useForm<UserFormData>({
    mode: 'onChange',
    defaultValues: tabState.userFormData
  });

  // 상품 정보 폼 - 사용자 폼과 독립적으로 관리
  const productForm = useForm<ProductFormData>({
    mode: 'onChange',
    defaultValues: tabState.productFormData
  });

  // 폼 값 변경 시 탭 상태 업데이트
  const watchedUserForm = userForm.watch();
  const watchedProductForm = productForm.watch();

  useEffect(() => {
    updateState({
      userFormData: watchedUserForm,
      productFormData: watchedProductForm
    });
  }, [watchedUserForm, watchedProductForm, updateState]);

  // 비밀번호 필드의 값을 실시간으로 감시 (비밀번호 확인용)
  const watchedPassword = userForm.watch('password');

  // 비밀번호 확인 validation을 동적으로 생성
  // 비밀번호와 비밀번호 확인이 일치하는지 검증
  const getConfirmPasswordValidation = () => ({
    ...FORM_CONFIGS.user.fields.confirmPassword.validation,
    validate: (value: string) =>
      value === watchedPassword || '비밀번호가 일치하지 않습니다'
  });

  // 폼 제출 처리
  const onSubmit = async (data: any) => {
    console.log(data);
    // 실제 API 호출을 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    userForm.reset();
    productForm.reset();
  };

  // 폼 초기화 - 모든 필드를 초기값으로 되돌림
  const handleReset = () => {
    userForm.reset();
    productForm.reset();
  };

  // 샘플 데이터 입력 - 테스트를 위한 예시 데이터 자동 입력
  const fillSampleData = () => {
    userForm.setValue('username', '홍길동');
    userForm.setValue('email', 'hong@example.com');

    userForm.setValue('gender', 'male');
    userForm.setValue('interests', ['react', 'typescript']);

    
    productForm.setValue('productName', '스마트폰');
    productForm.setValue('category', 'electronics');
    productForm.setValue('price', 500000);
    productForm.setValue('description', '최신 스마트폰입니다.');
    productForm.setValue('inStock', true);
    productForm.setValue('imageUrl', 'https://example.com/phone.jpg');
    productForm.setValue('weight', 0.2);
  };



  return (
    <div className="form-container">
      <div className="form-wrapper">
        {/* 헤더 */}
        <div className="form-header">
          <h1 className="form-title">
            React Hook Form 테스트
          </h1>
          <p className="form-subtitle">
            다양한 폼 필드와 유효성 검사를 테스트해보세요
          </p>
        </div>

        {/* 컨트롤 버튼 */}
        <div className="control-buttons">
          <button 
            onClick={fillSampleData} 
            className="btn btn-primary"
          >
            샘플 데이터 입력
          </button>
          <button 
            onClick={handleReset} 
            className="btn btn-secondary"
          >
            폼 초기화
          </button>
        </div>

        {/* 두 폼을 나란히 배치 - 데스크톱에서는 좌우로, 모바일에서는 세로로 배치 */}
        <div className="forms-container">
          {/* 사용자 폼 */}
          <div className="form-card">
            <h2 className="form-subtitle">{FORM_CONFIGS.user.title}</h2>
            <form onSubmit={userForm.handleSubmit(onSubmit)} className="form">
              <FormRenderer
                fields={FORM_CONFIGS.user.fields}
                register={userForm.register}
                errors={userForm.formState.errors}
                clearErrors={userForm.clearErrors}
                customValidations={{
                  confirmPassword: createPasswordConfirmValidation('password', watchedPassword)
                }}
              />
              <button 
                type="submit" 
                disabled={userForm.formState.isSubmitting} 
                className="submit-btn"
              >
                {userForm.formState.isSubmitting ? '제출 중...' : '사용자 정보 제출'}
              </button>
            </form>
          </div>

          {/* 상품 폼 */}
          <div className="form-card">
            <h2 className="form-subtitle">{FORM_CONFIGS.product.title}</h2>
            <form onSubmit={productForm.handleSubmit(onSubmit)} className="form">
              <FormRenderer
                fields={FORM_CONFIGS.product.fields}
                register={productForm.register}
                errors={productForm.formState.errors}
                clearErrors={productForm.clearErrors}
              />

              {/* 제출 버튼 */}
              <button 
                type="submit" 
                disabled={productForm.formState.isSubmitting} 
                className="submit-btn"
              >
                {productForm.formState.isSubmitting ? '제출 중...' : '상품 정보 제출'}
              </button>
            </form>
          </div>
        </div>

        {/* 폼 값 표시 */}
        <div className="form-values">
          <h3>현재 폼 값들:</h3>
          <div className="values-container">
            <div className="value-section">
              <h4>사용자 정보:</h4>
              <pre>
                {JSON.stringify(userForm.getValues(), null, 2)}
              </pre>
            </div>
            <div className="value-section">
              <h4>상품 정보:</h4>
              <pre>
                {JSON.stringify(productForm.getValues(), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTest; 