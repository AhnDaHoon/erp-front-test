import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SearchFormRenderer from '../components/searchForm/SearchFormRenderer';
import './FormTest.css';

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
interface SearchFormData {
  gender: string;
  searchText: string;
}


// 폼 필드 ID와 validation 규칙을 중앙에서 관리
// 새로운 필드 추가 시 여기에만 정의하면 자동으로 렌더링됩니다
const FORM_CONFIGS = {
  search: {
    title: '검색 폼',
    fields: {
      gender: {
        label: '성별',
        type: 'select',
        required: true,
        options: [
          { label: '남자', value: 'male' },
          { label: '여자', value: 'female' }
        ],
        validation: {
          required: '비밀번호 확인은 필수입니다'
        }
      },
      searchText: {
        label: '검색어',
        type: 'text',
        required: true,
        validation: {
          required: '검색어는 필수입니다',
          minLength: {
            value: 1,
            message: '검색어는 최소 1자 이상이어야 합니다'
          },
          maxLength: {
            value: 20,
            message: '검색어는 최대 20자까지 가능합니다'
          }
        }
      },
    }
  }
} as const;

const FormTest: React.FC = () => {

  // 사용자 정보 폼 - React Hook Form으로 상태 관리
  const searchForm = useForm<SearchFormData>({
    mode: 'onChange',
    defaultValues: {
      gender: '',
      searchText: ''
    }
  });

  // 폼 제출 처리
  const onSearchSubmit = async (data: any) => {
      // 실제 API 호출을 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    searchForm.reset();
  };

  // 폼 초기화 - 모든 필드를 초기값으로 되돌림
  const handleReset = () => {
      searchForm.reset();
  };

  // 샘플 데이터 입력 - 테스트를 위한 예시 데이터 자동 입력
  const fillSampleData = () => {
    searchForm.setValue('searchText', '홍길동');
    searchForm.setValue('gender', 'male');
  };



  return (
    <div className="form-container">
      <div className="form-wrapper">
        {/* 헤더 */}
        <div className="form-header">
          <Link 
            to="/" 
            className="back-link"
          >
            ← 홈으로 돌아가기
          </Link>
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
            <h2 className="form-subtitle">{FORM_CONFIGS.search.title}</h2>
            <form onSubmit={searchForm.handleSubmit(onSearchSubmit)} className="form">
              <SearchFormRenderer
                fields={FORM_CONFIGS.search.fields}
                register={searchForm.register}
                errors={searchForm.formState.errors}
                clearErrors={searchForm.clearErrors}
              />
              <button 
                type="submit" 
                disabled={searchForm.formState.isSubmitting} 
                className="submit-btn"
              >
                {searchForm.formState.isSubmitting ? '검색중...' : '검색'}
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
                {JSON.stringify(searchForm.getValues(), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTest; 