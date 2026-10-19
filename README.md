# 프리셀

하늘과 초원 배경의 밝고 귀여운 프리셀 카드 게임입니다. 휴대폰 홈 화면에 앱처럼 설치할 수 있고(PWA), 한 번 열고 나면 오프라인에서도 동작합니다.

## 규칙

- 전통 프리셀: 프리셀 4칸, 파운데이션 4칸, 8열, 52장 모두 공개
- 게임 번호 1~32000은 윈도우 프리셀과 같은 배치 (Microsoft 딜 알고리즘)
- 여러 장 옮기기: (빈 프리셀 + 1) × 2^(빈 열 수)
- 안전한 카드는 파운데이션으로 자동 이동

## 조작

- 카드를 끌어서 옮기거나, 탭해서 고른 뒤 놓을 곳을 탭
- 두 번 탭하면 알맞은 곳으로 자동 이동
- 힌트 / 취소 / 마술(올릴 수 있는 카드 모두 모으기) / 일시 정지
- 키보드: `Ctrl+Z` 취소, `H` 힌트, `Esc` 선택 해제

## 빌드

```bash
npm run build   # src/ → dist/
npm start       # 빌드 후 로컬 서버로 실행
```

`main`에 푸시하면 GitHub Actions가 빌드해서 GitHub Pages에 배포합니다.

## 구조

```
src/
  index.html            게임 (HTML·CSS·JS 한 파일)
  manifest.webmanifest  설치용 앱 정보
  sw.js                 오프라인 캐시
  icons/                앱 아이콘
scripts/build.mjs       의존성 없는 빌드 스크립트
.github/workflows/      Pages 배포
```
