import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'jobfinder',
  brand: {
    displayName: '잡파인더',
    primaryColor: '#4A733F',
    icon: 'https://static.toss.im/appsintoss/23025/e321c37d-c193-41b5-9a0f-7abef45b0b52.png',
  },
  navigationBar: {
    withBackButton: true,
    withHomeButton: true,
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
