import { useState, useEffect } from 'react';
import { graniteEvent, tdsEvent } from '@apps-in-toss/web-framework'; //SDK 임포트
import Home from './pages/Home';
import JobList, { Job } from './pages/JobList'; //Job 타입 가져오기
import JobDetail from './pages/JobDetail';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'list' | 'detail'>(
    'home',
  );
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // 💡 [핵심] 토스 전용 뒤로가기 이벤트 감지
  useEffect(() => {
    let backUnsubscription: (() => void) | undefined;
    let accessoryUnsubscription: (() => void) | undefined;

    try {
      // 1. 액세서리(X) 버튼은 모든 화면에서 동작해야 하므로 항상 등록합니다.
      accessoryUnsubscription = tdsEvent.addEventListener(
        'navigationAccessoryEvent',
        {
          onEvent: ({ id }) => {
            if (id === 'close-app') window.close();
          },
        },
      );

      // 💡 2. [핵심] 홈 화면이 아닐 때만 뒤로가기를 가로챕니다!
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
      // 홈 화면일 때는 backEvent를 등록하지 않으므로, 토스의 기본 동작(자연스러운 앱 종료)이 실행됩니다.
    } catch (error) {
      console.warn('토스 앱 환경이 아니므로 이벤트를 건너뜁니다.');
    }

    return () => {
      if (backUnsubscription) backUnsubscription();
      if (accessoryUnsubscription) accessoryUnsubscription();
    };
  }, [currentPage]); // 💡 currentPage가 바뀔 때마다 최신 상태를 참조하도록 합니다.

  // 💡 페이지 이동 함수 (단순히 상태만 변경합니다)
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
