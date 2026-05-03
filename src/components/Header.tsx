import { Asset, Text } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface Props {
  onBack: () => void;
}

export default function Header({ onBack }: Props) {
  return (
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
      {/* 우측에 빈 공간을 주어 레이아웃을 안정적으로 유지합니다 */}
      <div style={{ flex: 1 }} />
    </div>
  );
}
