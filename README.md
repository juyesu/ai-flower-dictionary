# AI Flower dictionary
<img src="https://github.com/user-attachments/assets/1ff72fbd-bf33-4619-92db-b4583ce58916" width="60%" />

#### 사용자가 궁금해하는 식물 이미지를 AI모델로 분석해주고, 좋아하는 식물들로 이루어진 나만의 도감을 완성해 나가는 사이트
<br>

## 개발 타임 라인
#### [1차 개발] (2024.04.10 ~ 2024.06.16) <br>
유한대학교 인공지능전공에서 진행하는 AI 프로젝트의 팀 리더를 맡아 프로젝트 전반의 설계 및 일정 관리를 담당하
였고, 개발 파트에도 참여하여 Teachable Machine 학습 모델을 JavaScript로 가져오고, 웹 페이지의 UI 제작 및 인
식 결과에 따른 결과 출력 로직 구현, Netlify로 웹 사이트 배포를 진행하였습니다.
<br><br>
#### [2차 개발] (20205.01.17 ~ 2025.04(진행 중)) <br>
현재 개인 프로젝트로 전환하여 전반적인 프로젝트 리팩토링과 UI 리뉴얼 및 기능 추가를 진행하고 있습니다.
<br><br>

## 기술 스택
<div align=start> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/react table-FF4154?style=for-the-badge&logo=reacttable&logoColor=black"> 
  <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=black">
  <img src="https://img.shields.io/badge/zustand-ECB63F?style=for-the-badge&logo=zustand&logoColor=black">
  <br>

  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=black"> 
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=black">
  <br>
</div>
<br>

## 폴더 구조
```📦src
 ┣ 📂components
 ┃ ┣ 📂ai-flower-detection
 ┃ ┣ 📂common
 ┃ ┣ 📂homepage
 ┃ ┣ 📂login
 ┃ ┣ 📂modal
 ┃ ┣ 📂my-dictionary
 ┃ ┣ 📂plant-detail
 ┃ ┣ 📂plant-info
 ┃ ┗ 📂register
 ┣ 📂context
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂assets
 ┃ ┣ 📂view
 ┃ ┃ ┗ 📜[plant-detail].tsx
 ┃ ┣ 📜ai-flower-detection.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜login.tsx
 ┃ ┣ 📜my-dictionary.tsx
 ┃ ┣ 📜plant-info.tsx
 ┃ ┣ 📜register.tsx
 ┃ ┣ 📜_app.tsx
 ┃ ┗ 📜_document.tsx
 ┣ 📂store
 ┣ 📂types
 ┣ 📂utils
 ┗ 📜env.d.ts
```
폴더명|폴더 설명
---|---|
components/common |둘 이상의 페이지 또는 컴포넌트에서 사용되는 공통 컴포넌트를 포함합니다.|
components/modal |Modal 관련 컴포넌트들을 포함합니다. Modal 컴포넌트는 (1) 공통 UI를 담당하는 기본 Modal 컴포넌트와 (2) 특정 용도에 따라 메시지, 배경 오버레이 여부 등을 Props로 제어하는 개별 Modal 컴포넌트로 구분됩니다.|
context |여러 페이지에서 전역적으로 상태를 공유하기 위한 Context를 포함합니다. |
hooks |둘 이상의 페이지 또는 컴포넌트에서 재사용되는 공통 커스텀 훅을 포함합니다. 특정 페이지에서만 사용되는 커스텀 훅은 components/페이지명/hooks 폴더에서 관리합니다.|
assets |SVG를 React 컴포넌트처럼 import하여 사용하는 .svg 파일들을 포함합니다.|
store |Zustand를 사용한 전역 상태 관리 파일들을 포함합니다. |
types |TypeScript에서 사용되는 Type Alias와 Zustand store의 타입을 구분하여 포함합니다. |
utils |프로젝트에서 재사용되는 유틸리티 함수들을 포함합니다.|
<br>

## 페이지 소개
### [홈페이지]

라이트 모드| 다크 모드 |
---|---|
![홈페이지](https://github.com/user-attachments/assets/50d7cb29-515d-4440-9551-a2d0e2b3bca0) | ![홈페이지(다크모드)](https://github.com/user-attachments/assets/009c1ed2-8526-4d96-b511-ee0ff97d27ca) |


각 페이지 바로가기 섹션 |
---|
![홈페이지(다크모드)](https://github.com/user-attachments/assets/4a15f010-d7db-4b81-9b3d-3a76993cdcf0) |

모바일 타이틀| 모바일 바로가기 섹션 |
---|---|
![홈페이지 수정본(모바일)](https://github.com/user-attachments/assets/29a802b0-76b4-4863-9220-d0f57316739b) | ![홈페이지 섹션(모바일)](https://github.com/user-attachments/assets/1551fe18-602b-4afb-b874-a08ff0105885) |



- 홈페이지에서는 원하는 식물을 바로 검색해볼 수 있는 검색창과, 웹 페이지의 주요 기능들에 대한 설명과 바로가기 링크를 제공합니다.
- 초기 빌드 시 정적 페이지를 생성하는 Next.js의 ISR(Incremental Static Regeneration) 방식을 적용하여 초기 로딩 속도를 향상시켰습니다.
<br>

### [Ai Flower Detection(Ai 식물인식)]
![AiFlowerDetection](https://github.com/user-attachments/assets/43b1be2f-0dd4-4d9c-aa9f-a5c371f01568)

| 카메라 인식 | 파일 인식 |
|---|---|
| <img src="https://github.com/user-attachments/assets/0cf12bea-25ff-4b89-b6b5-f26e649d0ac5" width="100%"/> | <img src="https://github.com/user-attachments/assets/daa38f1c-3995-4d10-bcb4-e9eb50f0bd1e" width="100%"/> |

- 사용자는 카메라로 식물을 비추는 '카메라 인식 모드'와 저장된 식물 이미지를 업로드하는 '파일 인식 모드' 중에서 선택할 수 있습니다.
- 로그인된 사용자가 식물 인식에 성공하면, my-dictionary 페이지의 '내가 발견한 식물' 목록에 자동으로 추가되어 나중에 다시 확인할 수 있습니다.
- 식물 인식 모델의 작동 프로세스는 다음과 같습니다:
  - 식물 인식에 성공하고, 해당 식물이 API 식물 인덱스에 존재할 경우 -> 식물 상세 페이지로 이동하여 정보를 제공합니다.
  - 식물 인식에 성공했지만, 해당 식물이 API 식물 인덱스에 존재하지 않을 경우 -> ChatGPT API를 사용하여 해당 식물에 대한 정보를 제공합니다.
  - 모델에 학습되지 않은 식물이거나, 정확도가 낮아 인식에 실패하였을 경우 -> 사용자에게 인식 실패 결과를 알립니다.
<br>

### [plant-info(식물 정보)]
![plnatInfo](https://github.com/user-attachments/assets/ee61f99b-e8b4-4a20-8db0-80292c79e657)

| 카드 레이아웃 | 테이블 레이아웃 |
|---|---|
| <img src="https://github.com/user-attachments/assets/c09d6603-838e-48e8-bbad-0514c38df354" width="100%"/> | <img src="https://github.com/user-attachments/assets/bb57a5f4-fd1d-4f52-b8d6-6e3184893219" width="100%"/> |

- 홈페이지와 마찬가지로 plant-info페이지에서도 식물 검색이 가능합니다.
- 정렬 버튼을 통해 카드형 레이아웃과 테이블 레이아웃 중에 원하는 디스플레이로 정보를 확인할 수 있습니다.
- 각 식물 상세 페이지에 대한 링크 URL 복사가 가능하며, 로그인 유저는 좋아요 버튼을 클릭할 수 있습니다.
<br>

### [My Dictionary(나의 도감)]
![MyDictionary](https://github.com/user-attachments/assets/24752ac6-1e4c-47df-a091-fb2819050d6e)

| 로그인되지 않은 상태에서 접근 | 좋아요 누른 식물 또는 발견한 식물이 존재하지 않을 경우 |
|---|---|
| <img src="https://github.com/user-attachments/assets/f6620577-891d-46da-ba39-2d2727712a6e" width="100%"/> | <img src="https://github.com/user-attachments/assets/890202f7-1280-43ad-a2de-266b2b26a3ce" width="100%"/> |

- 로그인된 회원만 접근할 수 있는 페이지로, ai-flower-detecteion에서 식별한 적 있는 식물이나, 좋아요 표시한 식물들을 한번에 모아서 확인할 수 있습니다. <br>
- 추후에 식물 도감 달성률에 따른 원형 그래프 UI 또는 업적 뱃지 형태 등의 요소가 추가될 예정입니다.
<br>

### [Login & Register(로그인, 회원가입)]
<div align="start">
  <img src="https://github.com/user-attachments/assets/9ace6a30-5542-432d-89f7-374bf70db3e5" width="49%">
  <img src="https://github.com/user-attachments/assets/e976e399-67e5-4284-9cb5-fde093b3f301" width="49%">
</div>

- 계정을 새롭게 만들거나, 존재하는 계정으로 로그인할 수 있는 페이지입니다.
- React Hook Form을 사용하여 폼 데이터를 관리하고, 필드 유효성 검사를 적용했습니다.
<br>

## 성능 최적화 진행
- 홈페이지에 **ISR** (Incremental Static Regeneration)을 적용 후 getStaticProps반환 API fetch 데이터를 하위 컴포넌트로 전달하는 방식으로 변경
- 이미지, 동영상, 폰트와 같은 자원 최적화
  - img태그 대신 **Next/Image** 를 사용하여 이미지 로드
  - 페이지의 첫 화면에 보이는 타이틀 이미지 및 동영상의 경우 **preload**를, 스크롤을 내려야 보이는 이미지는 **lazy-loading**을 사용하여 효율적으로 성능 분배
  - 웹 최적화 포맷 추가 적용:
    - 이미지: JPG → WebP, AVIF
    - 동영상: MP4 → WebM
    - 폰트: TTF → WOFF2
<br>

## 📌 향후 개선/업데이트 예정 항목
- ✅ ~~prefers-color-scheme을 활용하여 시스템 테마에 따라 다크/라이트 모드 자동 적용~~ <br>
- ✅ ~~용도 및 메시지에 따라 여러 개의 개별 Modal 컴포넌트를 선언하고 있는 구조를 ModalManager 컴포넌트 하나에서 관리하도록 통합하고, alert를 사용하던 알림 메시지를 커스텀 모달로 대체하여 일관성, 유연성, 재사용성 향상~~ <br>
- ✅ ~~구형 브라우저 호환성을 고려하여 WOFF 폰트 포맷 추가 지원~~ <br>
- 🛠 인라인 핸들러 및 외부 함수 사용 규칙을 통일하여 코드 일관성 유지 <br>
- 🛠 Storybook을 도입하여 UI 구성 및 CSS 적용 테스트 자동화 <br>
- 🛠 ai-flower-detection 페이지에서 카메라/파일 업로드 시 사용자 가이드를 안내하는 문구 추가 <br>
- 🛠 my-dictionary 페이지에서 사용자가 수집한 식물의 개수를 한눈에 확인할 수 있도록 원형 그래프 UI 또는 업적 뱃지 형태로 시각화 <br>
- 🛠 plant-detail 페이지에 해당 식물에 대한 코멘트를 작성할 수 있는 댓글 게시판 기능 추가 <br>
- 🛠 localStorage 기반의 기존 로그인 방식을 NextAuth 세션 기반 인증 방식으로 리팩토링 <br>
