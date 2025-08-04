import React from 'react';
import { Link } from 'react-router-dom';

const PageC: React.FC = () => {
  const [selectedColor, setSelectedColor] = React.useState('green');
  const [isVisible, setIsVisible] = React.useState(true);

  const colors = [
    { name: '초록색', value: 'green', bg: 'bg-green-500', text: 'text-green-600' },
    { name: '파란색', value: 'blue', bg: 'bg-blue-500', text: 'text-blue-600' },
    { name: '보라색', value: 'purple', bg: 'bg-purple-500', text: 'text-purple-600' },
    { name: '주황색', value: 'orange', bg: 'bg-orange-500', text: 'text-orange-600' },
    { name: '빨간색', value: 'red', bg: 'bg-red-500', text: 'text-red-600' },
  ];

  const currentColor = colors.find(color => color.value === selectedColor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-block mb-4 text-green-600 hover:text-green-800 font-semibold"
          >
            ← 홈으로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            페이지 C
          </h1>
          <p className="text-gray-600">
            세 번째 추가 페이지입니다
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            {/* 페이지 소개 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">페이지 C 소개</h2>
              <p className="text-gray-600 leading-relaxed">
                이 페이지는 React Router를 사용한 멀티 페이지 구조의 세 번째 추가 페이지입니다. 
                다양한 상태 관리와 동적 UI 요소들을 포함하고 있습니다.
              </p>
            </section>

            {/* 기능 카드 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">주요 기능</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">🎨 동적 UI</h3>
                  <p className="text-gray-700">
                    사용자 인터랙션에 따라 동적으로 변화하는 UI 요소들을 통해 
                    React의 상태 관리 기능을 테스트할 수 있습니다.
                  </p>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                  <h3 className="text-lg font-semibold text-teal-800 mb-3">⚡ 상태 관리</h3>
                  <p className="text-gray-700">
                    다양한 상태 변화와 조건부 렌더링을 통해 
                    React의 핵심 기능들을 체험할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 색상 선택기 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">색상 선택기</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold ${currentColor?.text} mb-4`}>
                    현재 선택된 색상: {currentColor?.name}
                  </div>
                  <div className={`w-32 h-32 mx-auto rounded-full ${currentColor?.bg} shadow-lg`}></div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`p-4 rounded-lg font-semibold transition-all duration-300 ${
                        selectedColor === color.value
                          ? `${color.bg} text-white shadow-lg transform scale-105`
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 토글 버튼 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">토글 기능</h2>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <button
                  onClick={() => setIsVisible(!isVisible)}
                  className="bg-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-300 mb-4"
                >
                  {isVisible ? '숨기기' : '보이기'}
                </button>
                {isVisible && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      🎉 토글된 컨텐츠!
                    </h3>
                    <p className="text-gray-600">
                      이 컨텐츠는 버튼을 클릭하여 보이거나 숨길 수 있습니다.
                      React의 조건부 렌더링 기능을 보여줍니다.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 통계 정보 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">페이지 통계</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                  <div className="text-gray-600">페이지 순서</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">C</div>
                  <div className="text-gray-600">페이지 이름</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                  <div className="text-gray-600">색상 옵션</div>
                </div>
              </div>
            </section>

            {/* 네비게이션 링크 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">다른 페이지로 이동</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  to="/page-a" 
                  className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-lg text-center font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  페이지 A로 이동
                </Link>
                <Link 
                  to="/page-b" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  페이지 B로 이동
                </Link>
              </div>
            </section>

            {/* 추가 링크 */}
            <section className="text-center pt-8">
              <div className="space-x-4">
                <Link 
                  to="/form" 
                  className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  폼 테스트
                </Link>
                <Link 
                  to="/about" 
                  className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  프로젝트 정보
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageC; 