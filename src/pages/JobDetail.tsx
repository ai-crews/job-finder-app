import {
  Asset,
  Text,
  Post,
  FixedBottomCTA,
  Spacing,
  ListHeader,
} from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

// 💡 1. JobList에서 넘겨줄 jobData를 받을 수 있도록 추가했습니다.
interface Props {
  jobData: any;
  onBack: () => void;
}

export default function JobDetail({ jobData, onBack }: Props) {
  // 💡 2. 만약 데이터가 전달되지 않았을 경우를 대비한 방어 코드
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

  return (
    <>
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
          잡파인더{' '}
        </Text>
      </div>

      <Spacing size={24} />

      <ListHeader
        title={
          <ListHeader.TitleParagraph
            color={adaptive.grey800}
            fontWeight="bold"
            typography="t4"
          >
            {/* 💡 3. 하드코딩된 '기업명' 대신 실제 데이터를 넣습니다. */}
            {jobData.company}{' '}
          </ListHeader.TitleParagraph>
        }
      />

      <Spacing size={32} />

      <div style={{ padding: '0 24px' }}>
        <Text
          display="block"
          color={adaptive.grey800}
          typography="t5"
          fontWeight="semibold"
        >
          {/* 💡 4. 하드코딩된 '공고명' 대신 실제 데이터를 넣습니다. */}
          {jobData.title}{' '}
        </Text>
        <Spacing size={12} />

        <Post.Paragraph paddingBottom={8} typography="t6">
          해당 채용공고의 상세 요약 정보입니다.
        </Post.Paragraph>

        <Post.Hr paddingBottom={8} />

        <Post.Ul paddingBottom={24} typography="t6">
          {/* 💡 5. Post.Ul 틀을 유지하면서 실제 직무와 마감일 데이터를 넣습니다. */}
          <Post.Li>
            모집 직무: {jobData.job ? jobData.job.join(', ') : '무관'}
          </Post.Li>

          <Post.Ul paddingBottom={8} typography="t6">
            <Post.Li>마감일: {jobData.deadline || '상시채용'}</Post.Li>
            {jobData.tag && <Post.Li>채용형태: {jobData.tag}</Post.Li>}
          </Post.Ul>
        </Post.Ul>
      </div>

      {/* 💡 앱인토스 정책에 맞게 외부 링크 이동을 제거하고 목록으로 돌아가기 기능으로 수정했습니다. */}
      <FixedBottomCTA
        color="dark"
        variant="weak" // 너무 강한 강조보다는 자연스럽게 돌아가기를 유도하는 weak 스타일
        loading={false}
        onClick={onBack} // 새 창을 띄우는 대신 상단 뒤로가기 화살표와 똑같은 함수를 연결
      >
        목록으로 돌아가기
      </FixedBottomCTA>
    </>
  );
}
