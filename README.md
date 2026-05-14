# 🔎 잡파인더 (Job Finder)

내게 딱 맞는 **AI 직무 수시채용** 공고를 한눈에 확인할 수 있는 **Apps in Toss(토스 미니앱)** 프로젝트입니다.

## 💡 프로젝트 소개

잡파인더는 파편화된 채용 정보 중 AI 엔지니어, 데이터 분석가 등 AI관련 직무 공고를 빠르게 탐색하기 위해 개발되었습니다. 토스 디자인 시스템(TDS)을 활용하여 토스 앱과 이질감 없는 UI를 제공합니다.
토스 미니앱에서 **"잡파인더"** 를 검색해보세요!

### ✨ 주요 기능

- **직무별 공고 필터링:** ML/데이터 엔지니어, AI 리서치 등 세부 직무별 원터치 필터링.
- **실시간 데이터 연동:** 구글 스프레드시트 기반의 최신 공고 자동 업데이트.

## 🛠️ 기술 스택

- **Frontend:** React, TypeScript, Vite
- **UI Framework:** `@toss/tds-mobile`, `@toss/tds-colors`
- **Bridge SDK:** `@apps-in-toss/web-framework`
- **Infrastructure:** Railway (Backend API), Apps in Toss Console

---

## 🚀 시작하기

로컬 환경에서 프로젝트를 실행하고 개발하는 방법입니다.

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev
```

## 📦 배포하기

앱인토스 배포 API 키는 [앱인토스 콘솔](https://apps-in-toss.toss.im/)에서 발급받을 수 있습니다.

```bash
# 빌드 및 배포
npm run build
npm run deploy
```

---

## 📱 테스트 및 검수

본 프로젝트는 토스 샌드박스 앱 및 시뮬레이터 환경에서 동작합니다.

- **네이티브 이벤트 확인:** 상단바의 뒤로가기 버튼이 페이지 히스토리에 맞게 동작하는지 확인.
- **종료 로직 확인:** 홈 화면에서 뒤로가기 시 토스 기본 종료 모달이 나타나는지 점검.

---

## 📱 구현 화면

|                                              🏠 시작 화면                                               |                                              📑 공고 목록                                               |                                              📋 상세 정보                                               |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/6776cdbf-18a2-4a31-bc2a-a78c3278ce07" width="240"> | <img src="https://github.com/user-attachments/assets/5ac9f8c0-7b5d-4a80-a629-68b6073bd0b9" width="240"> | <img src="https://github.com/user-attachments/assets/fafaff0f-958b-4d25-95d6-1044b75af791" width="240"> |
|                                               서비스 소개                                               |                                           직무 필터링 및 검색                                           |                                           핵심 채용 정보 요약                                           |

---


## 🔗 유용한 링크

- [앱인토스 콘솔](https://apps-in-toss.toss.im/)
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/)
- [앱인토스 개발자 커뮤니티](https://techchat-apps-in-toss.toss.im/)
