# React Tab System with Dynamic Component Mapping

React Hook Form과 탭 시스템을 결합한 동적 메뉴 관리 애플리케이션입니다. API에서 메뉴 데이터를 받아와서 동적으로 컴포넌트를 매핑하고, 브라우저 탭과 유사한 UI로 여러 페이지를 동시에 관리할 수 있습니다.

## 🚀 주요 기능

### 1. 브라우저 탭과 유사한 UI
- 여러 페이지를 탭으로 동시에 열기
- 탭 간 자유로운 이동
- 각 탭의 독립적인 상태 유지
- 탭 닫기 기능

### 2. 동적 컴포넌트 매핑
- API에서 메뉴 데이터를 받아와서 동적으로 컴포넌트 매핑
- 새로운 페이지 추가 시 코드 수정 최소화
- 컴포넌트 이름으로 동적 로딩

### 3. 상태 유지 시스템
- 탭 간 이동 시에도 폼 데이터 유지
- 로컬 스토리지에 상태 저장/복원
- 페이지 새로고침 시에도 탭 상태 유지

### 4. React Hook Form 통합
- 다양한 폼 필드와 유효성 검사
- 실시간 폼 상태 감시
- 커스텀 validation 규칙

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Header.tsx              # 헤더 컴포넌트 (API 메뉴)
│   ├── TabBar.tsx              # 탭 UI 컴포넌트
│   ├── StatefulTabContent.tsx  # 탭 내용 렌더링
│   ├── TabStateManager.tsx     # 탭 상태 저장/복원
│   └── TabRouter.tsx           # 탭 기반 라우팅
├── context/
│   └── TabContext.tsx          # 전역 탭 상태 관리
├── hooks/
│   ├── useTabNavigation.ts     # 탭 네비게이션 훅
│   ├── useTabState.ts          # 탭별 상태 관리 훅
│   └── useMenuAPI.ts           # API 메뉴 데이터 훅
├── pages/
│   ├── Home.tsx                # 홈 페이지
│   ├── FormTest.tsx            # 폼 테스트 페이지
│   ├── SearchFormTest.tsx      # 검색 폼 테스트
│   ├── NotUsedHotForm.tsx      # Hot Form 미사용 예제
│   └── About.tsx               # 프로젝트 정보
├── utils/
│   └── componentMapper.ts      # 동적 컴포넌트 매핑
└── App.tsx                     # 메인 앱 컴포넌트
```

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript
- **폼 관리**: React Hook Form
- **라우팅**: React Router DOM
- **스타일링**: CSS3, Tailwind CSS
- **상태 관리**: React Context API
- **데이터 저장**: LocalStorage

## 🚀 시작하기

### 설치

```bash
npm install
```

### 실행

```bash
npm start
```

### 빌드

```bash
npm run build
```

## 📖 사용법

### 1. 탭 시스템 사용

```typescript
import { useTabNavigation } from './hooks/useTabNavigation';

const MyComponent = () => {
  const { openOrActivateTab } = useTabNavigation();
  
  const handleOpenTab = () => {
    openOrActivateTab('/form', '폼 예제', FormTest);
  };
  
  return <button onClick={handleOpenTab}>폼 열기</button>;
};
```

### 2. 탭별 상태 관리

```typescript
import { useTabState } from './hooks/useTabState';

const FormComponent = () => {
  const { state, updateState } = useTabState('form-tab', {
    formData: { name: '', email: '' }
  });
  
  // 상태가 자동으로 로컬 스토리지에 저장됨
  return <input value={state.formData.name} />;
};
```

### 3. 동적 컴포넌트 매핑

```typescript
import { getComponentByPath, addComponentMapping } from './utils/componentMapper';

// 새로운 컴포넌트 매핑 추가
addComponentMapping('/new-page', NewPageComponent, '새 페이지');

// 경로로 컴포넌트 가져오기
const { component, title } = getComponentByPath('/form');
```

### 4. API 메뉴 데이터 구조

```typescript
interface MenuItem {
  path: string;           // URL 경로
  title: string;          // 메뉴 제목
  componentName?: string; // 컴포넌트 이름
  icon?: string;          // 아이콘
}

// API 응답 예시
const menuData = [
  {
    path: '/form',
    title: '폼 예제',
    componentName: 'FormTest',
    icon: '📝'
  }
];
```

## 🔧 주요 컴포넌트 설명

### TabProvider
전역 탭 상태를 관리하는 Context Provider입니다.

```typescript
const { tabs, addTab, closeTab, activateTab } = useTabContext();
```

### StatefulTabContent
각 탭의 컴포넌트를 독립적으로 렌더링하여 상태를 유지합니다.

### useTabNavigation
탭 네비게이션을 위한 커스텀 훅입니다.

```typescript
const { openOrActivateTab, closeTab, switchTab } = useTabNavigation();
```

### componentMapper
URL 경로를 컴포넌트에 동적으로 매핑하는 유틸리티입니다.

## 🎯 주요 기능 상세

### 1. 스마트 탭 관리
- 기존 탭이 있으면 활성화, 없으면 새 탭 생성
- 중복 탭 생성 방지
- 탭 간 상태 완전 독립

### 2. 동적 메뉴 시스템
- API에서 메뉴 데이터 동적 로딩
- 컴포넌트 이름으로 동적 매핑
- 메뉴 구조 변경 시 API만 수정

### 3. 상태 지속성
- 로컬 스토리지에 탭 상태 저장
- 페이지 새로고침 시 상태 복원
- 탭 닫기 시 상태 정리

### 4. 반응형 디자인
- 모바일 친화적 탭 UI
- 스크롤 가능한 탭바
- 적응형 레이아웃

## 🔄 데이터 흐름

```
API 메뉴 데이터 → Header → TabProvider → TabBar/StatefulTabContent
     ↓
LocalStorage ← TabStateManager → 각 탭의 상태
```

## 🚀 확장 방법

### 새로운 페이지 추가

1. 페이지 컴포넌트 생성
2. `componentMapper.ts`에 컴포넌트 등록
3. API 메뉴 데이터에 추가

### 새로운 기능 추가

1. `useTabState` 훅으로 상태 관리
2. `StatefulTabContent`에서 컴포넌트 렌더링
3. 필요한 경우 새로운 훅 생성

## 🐛 문제 해결

### 탭 상태가 사라지는 경우
- `useTabState` 훅이 올바르게 사용되었는지 확인
- 로컬 스토리지 권한 확인

### 컴포넌트가 로드되지 않는 경우
- `componentMapper.ts`에 컴포넌트가 등록되었는지 확인
- API 응답의 `componentName` 필드 확인

### 메뉴가 표시되지 않는 경우
- API 응답 구조 확인
- `useMenuAPI` 훅의 에러 상태 확인
