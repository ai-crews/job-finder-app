import { useState } from 'react';
import { Asset, Text, FixedBottomCTA, Spacing } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface Props {
  jobData: any;
  onBack: () => void;
}

export default function JobDetail({ jobData, onBack }: Props) {
  // 💡 로고 이미지가 깨질 경우를 대비한 상태 추가
  const [imgError, setImgError] = useState(false);

  if (!jobData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Text typography="t5">데이터를 불러올 수 없습니다.</Text>
        <div
          onClick={onBack}
          style={{
            marginTop: '16px',
            color: adaptive.blue500,
            cursor: 'pointer',
          }}
        >
          목록으로 돌아가기
        </div>
      </div>
    );
  }

  // 💡 1. 마감일 예외 처리 ('9999-12-31' 이거나 값이 아예 없을 때)
  const displayDeadline =
    !jobData.deadline || jobData.deadline === '9999-12-31'
      ? '마감일 없음'
      : jobData.deadline;

  return (
    <>
      {/* 상단 네비게이션 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          gap: '8px',
        }}
      >
        <div onClick={onBack} style={{ display: 'flex', cursor: 'pointer' }}>
          <Asset.Icon
            frameShape={Asset.frameShape.CleanW24}
            name="icon-arrow-back-ios-mono"
            color={adaptive.grey900}
          />
        </div>
        <Asset.Image
          frameShape={Asset.frameShape.CleanW16}
          src="https://static.toss.im/appsintoss/23025/e321c37d-c193-41b5-9a0f-7abef45b0b52.png"
          style={{ aspectRatio: '1/1' }}
        />
        <Text color={adaptive.grey900} typography="t6" fontWeight="semibold">
          잡파인더
        </Text>
      </div>
      <Spacing size={24} />
      {/* 💡 2 & 3. 로고, 기업명, 공고명, 상세내용을 모두 같은 div(padding: 0 24px) 안에 넣어 줄맞춤을 완벽하게 통일했습니다. */}
      <div style={{ padding: '0 24px' }}>
        {/* 최상단 회사 로고 */}
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
              marginBottom: '16px', // 로고와 기업명 사이 간격
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
              marginBottom: '16px', // 로고와 기업명 사이 간격
            }}
          />
        )}

        {/* 기업명 */}
        <Text
          display="block"
          color={adaptive.grey700}
          typography="t5"
          fontWeight="medium"
        >
          {jobData.company}
        </Text>

        <Spacing size={4} />

        {/* 공고명 */}
        <Text
          display="block"
          color={adaptive.grey900}
          typography="t3"
          fontWeight="bold"
        >
          {jobData.title}
        </Text>

        <Spacing size={32} />

        {/* 상세 내용 안내 문구 */}
        <Text display="block" typography="t6" color={adaptive.grey700}>
          해당 채용공고의 요약 정보입니다.
        </Text>

        <Spacing size={16} />

        {/* 가로 구분선 */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            width: '100%',
          }}
        />

        <Spacing size={16} />

        {/* 토스 스타일의 깔끔한 정보 표 레이아웃 */}
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
      <Spacing size={100} /> {/* 버튼에 내용이 가려지지 않도록 여백 추가 */}
      <FixedBottomCTA
        color="dark"
        variant="weak"
        loading={false}
        onClick={onBack}
      >
        목록으로 돌아가기
      </FixedBottomCTA>
    </>
  );
}
