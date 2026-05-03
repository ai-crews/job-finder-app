import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'jobfinder',
  brand: {
    displayName: '잡파인더', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: '#4A733F', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: 'https://static.toss.im/appsintoss/23025/e321c37d-c193-41b5-9a0f-7abef45b0b52.png', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite dev',
      build: 'vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
