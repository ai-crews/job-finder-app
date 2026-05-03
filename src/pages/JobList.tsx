import { useState, useEffect } from 'react';
import { Asset, Text, SearchField, ListRow, Spacing } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

export interface Job {
  id: string | number;
  company: string;
  title: string;
  logo: string;
  job: string[];
  deadline?: string;
  tag?: string;
}

interface Props {
  // 💡 부모에게 홈으로 가라고 신호를 보낼 통로를 다시 열어줍니다.
  onBack: () => void;
  onDetail: (job: Job) => void;
}

function CompanyLogo({ src, name }: { src: string; name: string }) {
  const [isError, setIsError] = useState(false);
  if (!src || isError) {
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          backgroundColor: adaptive.grey100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.05)',
          boxSizing: 'border-box',
        }}
      >
        <Asset.Icon
          frameShape={Asset.frameShape.CleanW24}
          name="icon-picture-mono"
          color={adaptive.grey400}
        />
      </div>
    );
  }
  return (
    <img
      src={src}
      onError={() => setIsError(true)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        objectFit: 'contain',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
      alt={`${name} 로고`}
    />
  );
}

const JOB_TAGS = [
  '전체',
  'ML엔지니어',
  '데이터엔지니어',
  '데이터분석가',
  'AI리서치',
  'AI기획자',
];

export default function JobList({ onBack, onDetail }: Props) {
  const [selectedJob, setSelectedJob] = useState('전체');
  const [keyword, setKeyword] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 💡 [핵심] 리스트 화면에서도 물리 뒤로가기를 감지합니다.
  useEffect(() => {
    // 1. 리스트에 진입하면 히스토리 스택 추가
    window.history.pushState(null, '', window.location.href);

    // 2. 뒤로가기 발생 시 실행할 로직
    const handlePopState = () => {
      onBack(); // App.tsx의 setCurrentPage('home') 실행
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBack]);

  useEffect(() => {
    fetch('https://job-finder-web-production.up.railway.app/api/sheet-jobs')
      .then((res) => res.json())
      .then((data: Job[]) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('데이터를 불러오는데 실패했습니다.', err);
        setIsLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchJob =
      selectedJob === '전체' || (job.job && job.job.includes(selectedJob));
    const matchKeyword =
      keyword === '' ||
      (job.company &&
        job.company.toLowerCase().includes(keyword.toLowerCase())) ||
      (job.title && job.title.toLowerCase().includes(keyword.toLowerCase()));
    return matchJob && matchKeyword;
  });

  return (
    <>
      <Spacing size={12} />
      <SearchField
        placeholder="기업명 또는 공고명을 검색해보세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '0 16px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {JOB_TAGS.map((tag) => {
          const isSelected = selectedJob === tag;
          return (
            <div
              key={tag}
              onClick={() => setSelectedJob(tag)}
              style={{
                padding: '8px 14px',
                backgroundColor: isSelected
                  ? adaptive.grey800
                  : adaptive.grey100,
                borderRadius: '8px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Text
                color={isSelected ? '#ffffff' : adaptive.grey700}
                typography="t6"
                fontWeight={isSelected ? 'semibold' : 'medium'}
              >
                {tag}
              </Text>
            </div>
          );
        })}
      </div>

      <Spacing size={24} />

      {isLoading ? (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <Text color={adaptive.grey500} typography="t5">
            공고를 불러오는 중입니다...
          </Text>
        </div>
      ) : filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <ListRow
            key={job.id}
            onClick={() => onDetail(job)}
            left={<CompanyLogo src={job.logo} name={job.company} />}
            contents={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text
                  typography="t4"
                  color={adaptive.grey900}
                  fontWeight="bold"
                >
                  {job.company}
                </Text>
                <div style={{ marginTop: '-4px' }}>
                  <Text typography="t6" color={adaptive.grey700}>
                    {job.title}
                  </Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    marginTop: '6px',
                  }}
                >
                  {job.job &&
                    job.job.map((position: string) => (
                      <span
                        key={position}
                        style={{
                          backgroundColor: 'rgba(3, 178, 108, 0.1)',
                          color: '#03B26C',
                          padding: '4px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                        }}
                      >
                        {position}
                      </span>
                    ))}
                </div>
              </div>
            }
            verticalPadding="small"
            arrowType="right"
          />
        ))
      ) : (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <Text color={adaptive.grey500} typography="t5">
            조건에 맞는 공고가 없습니다.
          </Text>
        </div>
      )}
    </>
  );
}
