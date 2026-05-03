import { useState, useEffect } from 'react';
import Home from './pages/Home';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'list' | 'detail'>(
    'home',
  );
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // 💡 [핵심] 모달 없이 깔끔하게 페이지 이동만 통제하는 라우터
  useEffect(() => {
    // 1. 앱 초기 진입 시 히스토리에 'home' 상태를 기록합니다.
    window.history.replaceState({ page: 'home' }, '', '');

    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;

      // 2. 히스토리 상태가 있으면 해당 페이지로 이동하고,
      // 상태가 없으면(홈에서 뒤로가기) 브라우저 기본 동작에 따라 웹뷰가 종료됩니다.
      if (state && state.page) {
        setCurrentPage(state.page);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 💡 페이지 앞으로 가기 함수
  const goToPage = (page: 'home' | 'list' | 'detail', jobData?: any) => {
    window.history.pushState({ page }, '', '');
    setCurrentPage(page);
    if (jobData) setSelectedJob(jobData);
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      {currentPage === 'home' && <Home onNext={() => goToPage('list')} />}
      {currentPage === 'list' && (
        <JobList onDetail={(job) => goToPage('detail', job)} />
      )}
      {currentPage === 'detail' && <JobDetail jobData={selectedJob} />}
    </div>
  );
}

export default App;
