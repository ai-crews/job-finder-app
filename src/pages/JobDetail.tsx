import { useState } from 'react';
import { Asset, Text, Spacing } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface Props {
  jobData: any;
}

export default function JobDetail({ jobData }: Props) {
  const [imgError, setImgError] = useState(false);

  if (!jobData) return null;

  const displayDeadline =
    !jobData.deadline || jobData.deadline === '9999-12-31'
      ? '마감일 없음'
      : jobData.deadline;

  return (
    <>
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

      <Spacing size={40} />
    </>
  );
}
