import { Asset, Text, FixedBottomCTA, Spacing } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface Props {
  onNext: () => void;
}

export default function Home({ onNext }: Props) {
  return (
    <>
      <Spacing size={160} />
      {/* 👉 이미지를 가운데로 정렬하기 위해 flex 컨테이너로 감쌌습니다. */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Asset.Image
          frameShape={Asset.frameShape.CleanW100}
          backgroundColor="transparent"
          src="https://static.toss.im/3d-emojis/u1F31E.png"
          aria-hidden={true}
          style={{ aspectRatio: '1/1' }}
        />
      </div>

      <Spacing size={24} />
      <Text
        display="block"
        color={adaptive.grey800}
        typography="t2"
        fontWeight="bold"
        textAlign="center"
      >
        잡파인더
      </Text>
      <Text
        display="block"
        color={adaptive.grey700}
        typography="t5"
        fontWeight="regular"
        textAlign="center"
      >
        수시채용을 모아서 볼 수 있어요!
      </Text>
      <FixedBottomCTA loading={false} onClick={onNext}>
        수시채용 공고보기
      </FixedBottomCTA>
    </>
  );
}
