# 4thviz

4th CREATIVE PARTY 프리비즈·스토리보드 툴 (iPad용 웹앱)

## 설치 (GitHub Pages)
1. 이 폴더의 파일을 저장소 루트에 그대로 올린다 (index.html, manifest.json, sw.js, 아이콘 4개).
2. Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save.
3. 1~3분 후 https://계정이름.github.io/4thviz/ 접속.
4. iPad Safari → 공유 → 홈 화면에 추가.

## AI 배치
앱 상단 [설정] → Anthropic API 키 입력 (console.anthropic.com에서 발급, 사용량 별도 과금).
키는 그 기기에만 저장된다.

## 업데이트
새 index.html을 같은 이름으로 다시 올리고, sw.js 첫 줄의 VERSION 숫자를 하나 올린다 (예: 4thviz-v2).
iPad에서 앱을 완전히 닫았다 다시 열면 반영된다.
