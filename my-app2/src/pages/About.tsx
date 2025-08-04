import React from 'react';
import { useTabNavigation } from '../hooks/useTabNavigation';
import FormTest from './FormTest';

const About: React.FC = () => {
  const { openOrActivateTab } = useTabNavigation();

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            프로젝트 정보
          </h1>
          <p className="text-gray-600">
            React Hook Form 테스트 프로젝트에 대한 상세 정보
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            {/* 프로젝트 개요 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">프로젝트 개요</h2>
              <p className="text-gray-600 leading-relaxed">
                이 프로젝트는 React Hook Form 라이브러리의 다양한 기능들을 테스트하고 학습하기 위해 제작되었습니다. 
                실제 웹 애플리케이션에서 자주 사용되는 폼 패턴들을 포함하여, 
                개발자들이 React Hook Form의 강력한 기능들을 쉽게 이해하고 활용할 수 있도록 구성되었습니다.
              </p>
            </section>

            {/* 주요 기능 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">주요 기능</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">📝 다양한 폼 필드</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• 텍스트 입력 (사용자명, 이메일)</li>
                    <li>• 비밀번호 입력 및 확인</li>
                    <li>• 숫자 입력 (나이)</li>
                    <li>• 라디오 버튼 (성별)</li>
                    <li>• 체크박스 (관심사)</li>
                    <li>• 텍스트 영역 (자기소개)</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">✅ 유효성 검사</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• 필수 입력 검증</li>
                    <li>• 이메일 형식 검증</li>
                    <li>• 비밀번호 복잡도 검증</li>
                    <li>• 비밀번호 일치 검증</li>
                    <li>• 길이 제한 검증</li>
                    <li>• 범위 검증 (나이)</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">🔄 실시간 기능</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• 실시간 폼 값 감시</li>
                    <li>• 동적 유효성 검사</li>
                    <li>• 실시간 에러 표시</li>
                    <li>• 폼 상태 관리</li>
                    <li>• 제출 상태 표시</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">🎨 사용자 경험</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• 직관적인 에러 메시지</li>
                    <li>• 샘플 데이터 입력</li>
                    <li>• 폼 초기화 기능</li>
                    <li>• 반응형 디자인</li>
                    <li>• 부드러운 애니메이션</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 기술 스택 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">기술 스택</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                  <p className="text-gray-600">React 19, TypeScript</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">폼 관리</h3>
                  <p className="text-gray-600">React Hook Form</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">라우팅</h3>
                  <p className="text-gray-600">React Router DOM</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">스타일링</h3>
                  <p className="text-gray-600">Tailwind CSS</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">개발 도구</h3>
                  <p className="text-gray-600">Create React App</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">코드 품질</h3>
                  <p className="text-gray-600">ESLint, TypeScript</p>
                </div>
              </div>
            </section>

            {/* React Hook Form 장점 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">React Hook Form의 장점</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">성능 최적화</h3>
                    <p className="text-gray-600">불필요한 리렌더링을 방지하여 높은 성능을 제공합니다.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">간단한 API</h3>
                    <p className="text-gray-600">직관적이고 사용하기 쉬운 API로 빠른 개발이 가능합니다.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">유연한 유효성 검사</h3>
                    <p className="text-gray-600">다양한 유효성 검사 옵션과 커스텀 검증 함수를 지원합니다.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">TypeScript 지원</h3>
                    <p className="text-gray-600">완전한 TypeScript 지원으로 타입 안정성을 보장합니다.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">5</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">번들 크기</h3>
                    <p className="text-gray-600">작은 번들 크기로 빠른 로딩 시간을 제공합니다.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 액션 버튼 */}
            <section className="text-center pt-8">
              <button 
                onClick={() => openOrActivateTab('/form', '폼 예제', FormTest)}
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                폼 테스트 시작하기
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 