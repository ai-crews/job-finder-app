import { useState } from 'react';
import Home from './pages/Home';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'list' | 'detail'>(
    'home',
  );

  // 💡 선택한 공고의 데이터를 저장할 상태를 추가합니다.
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
        transform: 'translateZ(0)',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      }}
    >
      {currentPage === 'home' && <Home onNext={() => setCurrentPage('list')} />}

      {currentPage === 'list' && (
        <JobList
          onBack={() => setCurrentPage('home')}
          onDetail={(job) => {
            // 💡 1. 리스트에서 클릭한 공고 데이터를 저장하고
            setSelectedJob(job);
            // 💡 2. 상세 페이지로 이동합니다.
            setCurrentPage('detail');
          }}
        />
      )}

      {currentPage === 'detail' && (
        <JobDetail
          // 💡 3. 저장해둔 데이터를 JobDetail로 쏙 넘겨줍니다.
          jobData={selectedJob}
          onBack={() => setCurrentPage('list')}
        />
      )}
    </div>
  );
}

export default App;
