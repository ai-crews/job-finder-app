import { Asset, Text, FixedBottomCTA, Spacing } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface Props {
  //onBack: () => void;
  onNext: () => void;
}

export default function Home({ onNext }: Props) {
  return (
    <>
      {/* 상단 네비게이션 헤더 */}

      <Spacing size={40} />

      {/* 메인 카피 영역 */}
      <div style={{ padding: '0 24px' }}>
        <Text typography="t3" fontWeight="bold" color={adaptive.grey900}>
          내게 딱 맞는 AI 직무 수시채용,
        </Text>
        <Text
          typography="t3"
          fontWeight="bold"
          color={adaptive.grey900}
          display="block"
        >
          잡파인더에서 한눈에 보세요
        </Text>
      </div>

      <Spacing size={40} />

      {/* 3D 햇님 이모지 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Asset.Image
          frameShape={Asset.frameShape.CleanW100}
          backgroundColor="transparent"
          src="https://static.toss.im/3d-emojis/u1F31E.png"
          aria-hidden={true}
          style={{ width: '120px', height: '120px', aspectRatio: '1/1' }}
        />
      </div>

      <Spacing size={40} />

      {/* 💡 토스 보이스앤톤(UX Writing)에 맞게 다듬어진 핵심 기능 설명 */}
      <div
        style={{
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}
      >
        {/* 기능 1 */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <img
            src="https://static.toss.im/2d-emojis/png/4x/u1F50D.png"
            alt="돋보기"
            style={{ width: '28px', height: '28px', flexShrink: 0 }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              marginTop: '2px',
            }}
          >
            <Text typography="t5" fontWeight="bold" color={adaptive.grey900}>
              기업・공고명으로 찾기
            </Text>
            <Text typography="t6" color={adaptive.grey600}>
              관심 있는 기업이나 원하는 공고를 검색해서 바로 찾아보세요.
            </Text>
          </div>
        </div>

        {/* 기능 2 */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <img
            src="https://static.toss.im/2d-emojis/png/4x/u2728.png"
            alt="반짝이"
            style={{ width: '28px', height: '28px', flexShrink: 0 }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              marginTop: '2px',
            }}
          >
            <Text typography="t5" fontWeight="bold" color={adaptive.grey900}>
              원하는 직무만 골라보기
            </Text>
            <Text typography="t6" color={adaptive.grey600}>
              직무를 선택해 내게 맞는 공고만 모아서 볼 수 있어요.
            </Text>
          </div>
        </div>

        {/* 기능 3 */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <img
            src="https://static.toss.im/2d-emojis/png/4x/u1F5C2.png"
            alt="문서"
            style={{ width: '28px', height: '28px', flexShrink: 0 }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              marginTop: '2px',
            }}
          >
            <Text typography="t5" fontWeight="bold" color={adaptive.grey900}>
              핵심만 요약된 공고 정보
            </Text>
            <Text typography="t6" color={adaptive.grey600}>
              마감일, 채용 형태 등 꼭 필요한 정보만 한눈에 보여드려요.
            </Text>
          </div>
        </div>
      </div>

      <Spacing size={100} />

      <FixedBottomCTA loading={false} onClick={onNext}>
        수시채용 공고보기
      </FixedBottomCTA>
    </>
  );
}
