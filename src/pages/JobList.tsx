import { useState, useEffect } from 'react';
import { Asset, Text, SearchField, ListRow, Spacing } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface Props {
  onBack: () => void;
  onDetail: (job: any) => void;
}

// 💡 글씨 대신 TDS 기본 아이콘(icon-picture-mono)을 보여주도록 수정했습니다.
function CompanyLogo({ src, name }: { src: string; name: string }) {
  const [isError, setIsError] = useState(false);

  // 이미지가 없거나 로딩에 실패(isError)했을 때 보여줄 대체 UI
  if (!src || isError) {
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          backgroundColor: adaptive.grey100, // 연한 회색 배경
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.05)',
          boxSizing: 'border-box',
        }}
      >
        <Asset.Icon
          frameShape={Asset.frameShape.CleanW24}
          name="icon-picture-mono" // 👈 요청하신 TDS 기본 아이콘
          color={adaptive.grey400} // 아이콘 색상을 연한 회색으로 설정
        />
      </div>
    );
  }

  // 정상적인 이미지일 때
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

  // 💡 서버에서 데이터를 받아올 상태와 로딩 상태를 추가했습니다.
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 💡 컴포넌트 마운트 시 Railway 서버에서 구글 시트 데이터를 가져옵니다.
  useEffect(() => {
    fetch('https://job-finder-web-production.up.railway.app/api/sheet-jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('데이터를 불러오는데 실패했습니다.', err);
        setIsLoading(false);
      });
  }, []);

  //로컬 테스트용
  //   useEffect(() => {
  //     // 💡 테스트를 위해 Railway 주소 대신 로컬 주소(localhost:3000)로 변경합니다.
  //     fetch('http://localhost:3000/api/sheet-jobs')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setJobs(data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error('데이터를 불러오는데 실패했습니다.', err);
  //         setIsLoading(false);
  //       });
  //   }, []);

  const filteredJobs = jobs.filter((job) => {
    // 💡 더미 데이터 대신 서버에서 받아온 jobs를 기준으로 필터링합니다. (null 방어 코드 추가)
    const matchJob =
      selectedJob === '전체' || (job.job && job.job.includes(selectedJob));

    const matchKeyword =
      keyword === '' ||
      (job.company &&
        job.company.toLowerCase().includes(keyword.toLowerCase())) ||
      (job.title && job.title.toLowerCase().includes(keyword.toLowerCase()));
    return matchJob && matchKeyword;
  });

  // 🚨 아래 return문 내의 UI 디자인과 스타일링 코드는 요청하신 대로 100% 동일하게 유지했습니다.
  return (
    <>
      <Spacing size={12} />

      <SearchField
        placeholder="기업명 또는 공고명을 검색해보세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* <Spacing size={4} /> */}

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

      {/* 💡 데이터를 가져오는 중일 때 보여줄 로딩 UI를 추가했습니다. */}
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
              // 💡 불필요한 내부 패딩을 제거했습니다.
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* 1. 기업명 */}
                <Text
                  typography="t4"
                  color={adaptive.grey900}
                  fontWeight="bold"
                >
                  {job.company}
                </Text>

                {/* 2. 채용공고 제목 (음수 마진을 사용해 기업명과 바짝 붙였습니다) */}
                <div style={{ marginTop: '-4px' }}>
                  <Text typography="t6" color={adaptive.grey700}>
                    {job.title}
                  </Text>
                </div>

                {/* 3. 직무명 뱃지 (간격을 조금 줄였습니다) */}
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
            // 💡 ListRow 전체의 상하 여백을 대폭 줄였습니다 (large -> small)
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
