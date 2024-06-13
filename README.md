# 🤝3-Layered Architecture와 test code 적용하기
## [기간]
2024.06.12 (수) ~ 14 (금)
## [목표]
**: "3-Layered Architecture와 test code를 적용하여 유지보수성과 신뢰성을 높인다"**
1) 관심사 분리와 유지보수에 용이한 **3-Layered Architecture**를 이해하고 적용할 수 있어요.
2) 객체지향프로그래밍의 기초인 **Class**를 이해하고 사용할 수 있어요.
3) **DI(Dependency Injection, 의존성 주입)**을 통해 Layer 간의 결합도를 낮출 수 있어요.
4) **테스트 코드**를 작성하여 반복되는 테스트 작업을 줄이며, 신뢰도 높은 코드를 작성할 수 있어요.

## [기술 스택]
1) **웹 프레임워크**: Node.js에서 가장 대표적인 웹 프레임워크인 **Express.js**를 사용합니다.
2) **패키지 매니저**: 대형 코드의 일관성, 보안, 성능 문제 해결에 적합한 **yarn** 패키지 매니저를 사용합니다. **(npm을 사용해도 되지만, 두 가지를 혼용하지는 마세요)**
3) **모듈 시스템**: 최신 JS 문법을 지원하는 **ESM**(**ES6 모듈 시스템**)을 사용합니다.
4) **데이터베이스**: 대표적인 **RDBMS**인 **MySQL**을 직접 설치하지 않고, Cloud 서비스 **AWS RDS** 에서 대여해 사용합니다.
5) **ORM**: **MySQL**의 데이터를 쉽게 읽고 쓰게 해주는 **[Prisma](https://www.prisma.io/) ODM**를 사용합니다.
6) **인증**: 확장성이 뛰어나며 다양한 플랫폼에서 이용 가능한 **[JWT(JSON Web Token)] (https://jwt.io/)**를 이용합니다.
7) **테스팅 프레임워크** : 복잡한 설정이 필요 없으며 다양한 기능을 제공하는 **[Jest](https://jestjs.io/)**를 이용합니다.

## **API 명세서**
- **[Notion](https://humorous-krill-a4e.notion.site/Node-js-API-c3dc5b534692415fb2c4bb75fa989d36?pvs=4)**

## **ERD**
- **[ERD](https://drawsql.app/teams/-1294/diagrams/employment)**

## **DB**
- MYSQL DB : employment-architecture
- .env 파일 : PORT, DATABASE_URL, SECRET_KEY 저장

## **배포**

## **어려운 점**
- 3-Layered Architecture로 분리하는데 Controller, Service, Repository에 대해 완벽히 이해하지 못한 상태에서 하느라 힘들었다.
- HTTP Error class 활용하는데 잘 몰라서 물어보고 해보았으나 정확하게 사용하지 못해 아쉽다.