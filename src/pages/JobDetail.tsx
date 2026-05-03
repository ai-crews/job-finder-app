import { useState, useEffect } from 'react';
import { Asset, Text, Spacing } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface Props {
  jobData: any;
  onBack: () => void; // 이제 이 함수는 '물리 버튼' 대응용으로만 쓰입니다.
}

export default function JobDetail({ jobData, onBack }: Props) {
  const [imgError, setImgError] = useState(false);

  // 💡 [핵심] 사용자가 폰의 뒤로가기나 토스 상단바의 백버튼을 눌렀을 때를 감지합니다.
  useEffect(() => {
    // 1. 상세 페이지에 들어오자마자 히스토리에 기록을 하나 추가합니다.
    window.history.pushState(null, '', window.location.href);

    // 2. 뒤로가기 이벤트가 발생하면 부모의 onBack(상태 변경 로직)을 실행합니다.
    const handlePopState = () => {
      onBack();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBack]);

  if (!jobData) return null;

  const displayDeadline =
    !jobData.deadline || jobData.deadline === '9999-12-31'
      ? '마감일 없음'
      : jobData.deadline;

  return (
    <>
      {/* 💡 상단 헤더 공간 확보를 위해 Spacing만 유지합니다. */}
      <Spacing size={24} />

      <div style={{ padding: '0 24px' }}>
        {/* 회사 로고 */}
        {!jobData.logo || imgError ? (
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: adaptive.grey100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0,0,0,0.05)',
              marginBottom: '16px',
            }}
          >
            <Asset.Icon
              frameShape={Asset.frameShape.CleanW24}
              name="icon-picture-mono"
              color={adaptive.grey400}
            />
          </div>
        ) : (
          <img
            src={jobData.logo}
            onError={() => setImgError(true)}
            alt={`${jobData.company} 로고`}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              objectFit: 'contain',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.05)',
              marginBottom: '16px',
            }}
          />
        )}

        <Text
          display="block"
          color={adaptive.grey700}
          typography="t5"
          fontWeight="medium"
        >
          {jobData.company}
        </Text>

        <Spacing size={4} />

        <Text
          display="block"
          color={adaptive.grey900}
          typography="t3"
          fontWeight="bold"
        >
          {jobData.title}
        </Text>

        <Spacing size={32} />

        <Text display="block" typography="t6" color={adaptive.grey700}>
          해당 채용공고의 요약 정보입니다.
        </Text>

        <Spacing size={16} />
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            width: '100%',
          }}
        />
        <Spacing size={16} />

        {/* 상세 정보 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '80px' }}>
              <Text typography="t6" color={adaptive.grey500}>
                모집 직무
              </Text>
            </div>
            <Text typography="t6" color={adaptive.grey800} fontWeight="medium">
              {jobData.job ? jobData.job.join(', ') : '무관'}
            </Text>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '80px' }}>
              <Text typography="t6" color={adaptive.grey500}>
                마감일
              </Text>
            </div>
            <Text typography="t6" color={adaptive.grey800} fontWeight="medium">
              {displayDeadline}
            </Text>
          </div>

          {jobData.tag && (
            <div style={{ display: 'flex' }}>
              <div style={{ width: '80px' }}>
                <Text typography="t6" color={adaptive.grey500}>
                  채용형태
                </Text>
              </div>
              <Text
                typography="t6"
                color={adaptive.grey800}
                fontWeight="medium"
              >
                {jobData.tag}
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* 💡 FixedBottomCTA(목록으로 돌아가기 버튼)를 삭제했습니다. */}
      <Spacing size={40} />
    </>
  );
}
