import { useState, useEffect } from 'react';
import { graniteEvent } from '@apps-in-toss/web-framework'; // 💡 SDK 임포트
import Home from './pages/Home';
import JobList, { Job } from './pages/JobList'; // 💡 Job 타입 가져오기
import JobDetail from './pages/JobDetail';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'list' | 'detail'>(
    'home',
  );
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // 💡 [핵심] 토스 전용 뒤로가기 이벤트 감지
  useEffect(() => {
    let unsubscription: (() => void) | undefined;

    try {
      // 💡 브라우저 환경에서는 에러가 날 수 있으므로 try-catch로 감싸줍니다.
      unsubscription = graniteEvent.addEventListener('backEvent', {
        onEvent: () => {
          if (currentPage === 'detail') {
            setCurrentPage('list');
          } else if (currentPage === 'list') {
            setCurrentPage('home');
          } else {
            window.close();
          }
        },
        onError: (error) => {
          console.error('뒤로가기 처리 중 에러가 발생했습니다:', error);
        },
      });
    } catch (error) {
      // 일반 크롬 브라우저 등에서 접속했을 때 앱이 죽지 않도록 방어합니다.
      console.warn(
        '토스 앱 환경이 아니므로 네이티브 뒤로가기 설정을 건너뜁니다.',
      );
    }

    return () => {
      if (unsubscription) {
        unsubscription();
      }
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
