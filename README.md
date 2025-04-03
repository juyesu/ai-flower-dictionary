# AI Flower dictionary

#### 사용자가 궁금해하는 식물 이미지를 AI모델로 분석해주고, 좋아하는 식물들로 이루어진 나만의 도감을 완성해 나가는 사이트<br>  

## 개발 타임 라인
- 1차 개발 (2024.04.10 ~ 2024.06.16)
- 2차 개발 (20205.01.17 ~ 2025.04(진행 중))


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

## 페이지 소개
### [홈페이지]
![홈페이지](https://github.com/user-attachments/assets/50d7cb29-515d-4440-9551-a2d0e2b3bca0)


### [Ai Flower Detection(Ai 식물인식)]
![AiFlowerDetection](https://github.com/user-attachments/assets/43b1be2f-0dd4-4d9c-aa9f-a5c371f01568)

### [plant-info(식물 정보)]
![plnatInfo](https://github.com/user-attachments/assets/ee61f99b-e8b4-4a20-8db0-80292c79e657)

### [My Dictionary(나의 도감)]
![MyDictionary](https://github.com/user-attachments/assets/8cfea76d-a023-426f-810d-efb23a808ce0)

### [Login & Register(로그인, 회원가입)]
<div align="start">
  <img src="https://github.com/user-attachments/assets/9ace6a30-5542-432d-89f7-374bf70db3e5" width="49%">
  <img src="https://github.com/user-attachments/assets/e976e399-67e5-4284-9cb5-fde093b3f301" width="49%">
</div>


