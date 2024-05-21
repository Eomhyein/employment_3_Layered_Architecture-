2024.05.21_test
[폴더 구조 생성]</br>
.env.example // Git에 올라감, .env의 복사본으로 Key만 있고 Value는 삭제할 것!</br>
API 명세서 README 예시임 수정될 예정 완성본 아님

# 🤝나만의 채용 서비스 백엔드 서버 만들기
## [기간]
2024.05.23 (목) ~ 
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
4) **데이터베이스**: 대표적인 **NoSQL** 중 하나인 **MongoDB**를 직접 설치하지 않고, Cloud 서비스 **[MongoDB Atlas]****(https://www.mongodb.com/products/platform/cloud)**에서 대여해 사용합니다.
5) **ODM**: **MongoDB**의 데이터를 쉽게 읽고 쓰게 해주는 **[mongoose]****(https://mongoosejs.com/docs/guide.html) ODM**을 사용합니다.

## **API 명세서**

**[예시]**
|분류|설명|Method|URL|
|------|---|---|---|
|  |공통 명세 사항|  |   |
|인증|회원가입|POST|/auth/sign-up|

### [공통 명세 사항]
## **👉 Request**</br>
**[Headers]**

**[정의]**
|이름|타입|필수여부|설명|
|------|---|---|---|
|Authorization|string|Y|인증 토큰 값|

**[예시]**
<pre><code>{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}</code></pre>

**[Path Parameters]**

**[정의]**
|이름|타입|필수여부|설명|
|------|---|---|---|
|id|number|Y|사용자 ID|

**[예시]**
<pre><code>
  /user/1
</code></pre>


**[Body]**

**[정의]**
|이름|타입|필수여부|설명|
|------|---|---|---|
|email|string|Y|이메일|

**[예시]**
<pre><code>{
  "email": "spartan@spartacodingclub.kr"
}</code></pre>

## **👈 Response**</br>
**[Success]**

**[정의]**
|이름|타입|설명|
|------|---|---|
|status|number|HTTP Status Code|
|message|string|API 호출 성공 메세지|
|data|Object|API 호출 결과 메세지|

**[예시]**
<pre><code>{
  "status": 201,
  "message": "회원가입에 성공했습니다.",
  "data": {
    "id": 1,
	  "email": "spartan@spartacodingclub.kr",
	  "name": "스파르탄",
	  "role": "APPLICANT",
    "createdAt": "2024-05-01T05:11:06.285Z",
    "updatedAt": "2024-05-01T05:11:06.285Z"
  }
}</code></pre>

**[Failure]**

**[정의]**
|이름|타입|설명|
|------|---|---|
|status|number|HTTP Status Code|
|message|string|API 호출 실패 메세지|

|status|message|
|------|---|
|401|지원하지 않는 인증 방식입니다.|
|401|인증 정보가 없습니다.|
|401|인증 정보가 만료되었습니다.|
|401|유효하지 않은 인증 정보입니다.|
|401|인증 정보와 일치하는 사용자가 없습니다.|
|403|접근 권한이 없습니다.|
|500|예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.|

**[예시]**
<pre><code>{
  "status": 500,
  "message": "예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.",
}</code></pre>


### [회원가입]
|Method|URL|
|------|---|
|POST|/auth/sign-up|

## **👉 Request**</br>
**[Body]**
**[정의]**
|이름|타입|필수여부|설명|
|------|---|---|--------|
|email|string|Y|이메일|
|password|string|Y|비밀번호|
|passwordConfirm|string|Y|비밀번호 확인|
|name|string|Y|이름|

**[예시]**
<pre><code>{
  "email": "spartan@spartacodingclub.kr",
  "password": "spartan!!123",
  "passwordConfirm": "spartan!!123",
  "name": "스파르탄"
}</code></pre>