2024.05.21_test
[폴더 구조 생성]</br>
.env.example // Git에 올라감, .env의 복사본으로 Key만 있고 Value는 삭제할 것!</br>

# 🤝나만의 채용 서비스 백엔드 서버 만들기
## [기간]
2024.05.23 (목) ~ 29 (수)
## [목표]
**: "Node.js와 Express.js를 활용한 나만의 채용 서비스 백엔드 서버 만들기"**
1) Node.js를 이용해서 Javascript 코드를 실행할 수 있습니다.
2) Express.js를 기반으로 웹 서버를 만들고, **CRUD(Create, Read, Update, Delete)** 기능이 포함된 REST API를 만들 수 있습니다.
3) MongoDB와 mongoose를 이용하여 원하는 데이터베이스를 설계하고 활용할 수 있습니다.
4) AWS EC2에 Express.js를 이용한 웹 서비스를 배포할 수 있습니다.
5) 프로젝트에 요구 사항을 토대로 API 리스트를 작성하고, 백엔드 서버를 설계할 수 있습니다.

## [기술 스택]
1) **웹 프레임워크**: Node.js에서 가장 대표적인 웹 프레임워크인 **Express.js**를 사용합니다.
2) **패키지 매니저**: 대형 코드의 일관성, 보안, 성능 문제 해결에 적합한 **yarn** 패키지 매니저를 사용합니다. **(npm을 사용해도 되지만, 두 가지를 혼용하지는 마세요)**
3) **모듈 시스템**: 최신 JS 문법을 지원하는 **ESM**(**ES6 모듈 시스템**)을 사용합니다.
4) **데이터베이스**: 대표적인 **NoSQL** 중 하나인 **MongoDB**를 직접 설치하지 않고, Cloud 서비스 **[MongoDB Atlas](https://www.mongodb.com/products/platform/cloud)** 에서 대여해 사용합니다.
5) **ODM**: **MongoDB**의 데이터를 쉽게 읽고 쓰게 해주는 **[mongoose](https://mongoosejs.com/docs/guide.html) ODM**을 사용합니다.

## **API 명세서**
- **[Notion](https://humorous-krill-a4e.notion.site/Node-js-API-c3dc5b534692415fb2c4bb75fa989d36?pvs=4)**

## **ERD**
- **[ERD](https://drawsql.app/teams/-1294/diagrams/employment)**

## **DB**
- MYSQL DB : employment
- .env 파일 : DATABASE_URL 저장