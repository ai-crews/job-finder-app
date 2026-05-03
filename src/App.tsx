import { useState, useEffect } from 'react';
// 💡 1. closeView 함수를 추가로 가져옵니다!
import { graniteEvent, tdsEvent, closeView } from '@apps-in-toss/web-framework';
import Home from './pages/Home';
import JobList, { Job } from './pages/JobList';
import JobDetail from './pages/JobDetail';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'list' | 'detail'>(
    'home',
  );
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    let backUnsubscription: (() => void) | undefined;
    let accessoryUnsubscription: (() => void) | undefined;

    try {
      // 액세서리(X) 버튼 등록
      accessoryUnsubscription = tdsEvent.addEventListener(
        'navigationAccessoryEvent',
        {
          onEvent: ({ id }: { id: string }) => {
            // 💡 window.close() 대신 안전한 공식 함수 closeView()를 사용합니다.
            if (id === 'close-app') closeView();
          },
        },
      );

      // 💡 2. [핵심] 홈 화면 여부와 상관없이 무조건 뒤로가기를 가로챕니다.
      backUnsubscription = graniteEvent.addEventListener('backEvent', {
        onEvent: () => {
          if (currentPage === 'detail') {
            setCurrentPage('list');
          } else if (currentPage === 'list') {
            setCurrentPage('home');
          } else if (currentPage === 'home') {
            // 홈 화면일 때 토스 앱 SDK의 공식 종료 함수를 호출합니다!
            closeView();
          }
        },
        onError: (error) => console.error('뒤로가기 에러:', error),
      });
    } catch (error) {
      console.warn('토스 앱 환경이 아니므로 이벤트를 건너뜁니다.');
    }

    return () => {
      if (backUnsubscription) backUnsubscription();
      if (accessoryUnsubscription) accessoryUnsubscription();
    };
  }, [currentPage]);

  const goToPage = (page: 'home' | 'list' | 'detail', jobData?: Job) => {
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
      {currentPage === 'detail' && selectedJob && (
        <JobDetail jobData={selectedJob} />
      )}
    </div>
  );
}

export default App;
