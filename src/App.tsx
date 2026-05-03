import { useState, useEffect } from 'react';
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
      // 액세서리(X) 버튼 등록 (항상 동작)
      accessoryUnsubscription = tdsEvent.addEventListener(
        'navigationAccessoryEvent',
        {
          onEvent: ({ id }: { id: string }) => {
            if (id === 'close-app') closeView();
          },
        },
      );

      // 💡 홈 화면이 '아닐 때만' 뒤로가기를 가로챕니다.
      // 홈 화면일 때는 아무것도 가로채지 않으므로, 토스 앱이 알아서 '네이티브 종료 모달'을 띄워줍니다!
      if (currentPage !== 'home') {
        backUnsubscription = graniteEvent.addEventListener('backEvent', {
          onEvent: () => {
            if (currentPage === 'detail') {
              setCurrentPage('list');
            } else if (currentPage === 'list') {
              setCurrentPage('home');
            }
          },
          onError: (error) => console.error('뒤로가기 에러:', error),
        });
      }
    } catch (error) {
      console.warn('토스 앱 환경이 아니므로 이벤트를 건너뜁니다.');
    }

    return () => {
      if (backUnsubscription) backUnsubscription();
      if (accessoryUnsubscription) accessoryUnsubscription();
    };
  }, [currentPage]); // currentPage 상태가 바뀔 때마다 이벤트 등록/해제가 새로고침됩니다.

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
