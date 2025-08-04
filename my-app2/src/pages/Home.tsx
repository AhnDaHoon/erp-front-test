import React from 'react';
import { useTabNavigation } from '../hooks/useTabNavigation';
import FormTest from './FormTest';
import NotUsedHotForm from './NotUsedHotForm';
import SearchFormTest from './SearchFormTest';
import About from './About';

const Home: React.FC = () => {
  const { openOrActivateTab } = useTabNavigation();

  const handleOpenTab = (path: string, title: string, component: React.ComponentType) => {
    openOrActivateTab(path, title, component);
  };

  return (
    <div className="page-container">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-8">
          React Hook Form 테스트
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          다양한 폼 예제와 React Hook Form의 기능들을 테스트해보세요.
          유효성 검사, 실시간 업데이트, 에러 처리 등 모든 기능을 체험할 수 있습니다.
        </p>
        <div className="space-x-6">
          <button 
            onClick={() => handleOpenTab('/form', '폼 예제', FormTest)}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            폼 예제보기
          </button>
          <br />
          <button 
            onClick={() => handleOpenTab('/not-used-hot-form', '폼 예제(Hot Form 사용안함)', NotUsedHotForm)}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            폼 예제보기(Hot Form 사용안함)
          </button>
          <br />
          <button 
            onClick={() => handleOpenTab('/search-form', '검색 폼 예제', SearchFormTest)}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            검색 폼 예제보기
          </button>
          <br />
          <button 
            onClick={() => handleOpenTab('/about', '프로젝트 정보', About)}
            className="inline-block bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            프로젝트 정보
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 