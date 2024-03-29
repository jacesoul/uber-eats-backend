### INTRODUCTION

- nest g application
- gitignore extension 설치

### GraphQl API

- npm i @nestjs/graphql graphql@^15 apollo-server-express
- app.module.ts는 main.ts로 import되는 유일한 모듈이다. 
- main.ts는 application을 실행시키기 위한 것이다. 그러니 모든것들은 결국에 AppModule로 import된다.
- forRoot는 root module을 설정하는것이다. 이 경우에는 GraphQl이 forRoot에 해당한다.
- GraphQl Query는 첫번째 argument로 function이 필요하다.   
- autoSchemaFile: true로 설정하면 메모리에 sche ma.graphql파일이 생성된다.
- InputType은 그저 하나의 object로 보면된다. argument로써 graphql에 전달하기 위한 용도이다. 
- ArgsType은 기본적으로 하나의 object에 모든것을 담지 않고 GraphQl argument로 전달해 줄수 있도록 해준다.
- npm i class-validator class-transformer

### Database Configuration

- TypeORM은 Object Relational Mapping(객체 관계 매핑)이란 뜻이다. 
- PostgreSQL 설치 
- https://postgresapp.com/
- Postico 설치 (데이터베이스 시각화 툴)
- https://eggerapps.at/postico/
- 데이터베이스 생성 => uber-eats
- 데이터베이스 터미널에서 유저명과 비밀번호 변경 
- \du; => 모든 유저확인 
- ALTER USER 'jiwooseol' WITH PASSWORD '12345'
- TypeORM이 Sequelize보다 TypeScript에 더 친화적이다.
- npm install --save @nestjs/typeorm typeorm pg
- localhost로 연결이 되어있을때는 PostgreSQL가 패스워드를 물어보지 않는다.
- synchronize: true는 TypeORM이 데이터베이스에 연결할때 데이터베이스를 모듈의 현재 상태로 마이그래에션한다는 뜻이다.
- logging은 데이터베이스에서 무슨일이 일어나는지 콜솔에 표시하는것이다.
- dotenv는 .env 파일에서 환경변수를 로드하는데 process.env."환경변수이름" 방식으로 그 변수에 접근할수 있다. 
- NestJS는 configuration module이 있는데 dotenv의 최상위에서 실행이 된다. 
- npm i --save @nestjs/config
- ConfigModuleOptions의 isGlobal은 어플리케이션 어디서나 config 모듈에 접근할수 있다는것이다.
- .env.test/ .env.dev / .env.prod 파일 생성
- cross-env는 가상변수를 설정할수 있게 해주는데 MacOS, Windows, Linux에 관계없이 사용할수 있다. 
- npm i cross-env
- ignoreEnvFile은 서버에 deploy할때 환경변수 파일을 사용하지 않는다는것이다. 
- ConfigModuleOptions의 validationSchema는 원하는 모든 환경변수를 validate할수 있다. 
- joi는 자바스크립트용의 가장 강력한 스키마 설명 언어이자 데이터 유효성 검사 툴이다.
- npm i joi
- import * as Joi from 'joi'; 은 타입스크립트나 NestJS로 되어있지 않은 패키지를 import 하는 방법이다.
- Joi 덕분에 환경변수 마저도 그 유효성 검사를 할수 있어서 앱을 돌릴때 더 좋은 보안을 제공한다.
- TypeOrm의 Entity는 데이터베이스를에 저장되는 데이터의 형태를 보여주는 모델이다. 
- Entity는 DB table(MongoDB를 사용하는 경우 collection)에 매핑되는 클래스이다.
- ObjectType은 자동으로 스키마를 빌드하기 위해 사용하는 GraphQl decorator이다.
- ObjectType과 Entity는 같이 사용될수 있다.
- Data Mapper에서는 Repository라는것을 사용한다. Repository는 Entity랑 상호작용하는것을 담당한다.
- Data Mapper는 유지관리하는것을 도와주고 대규모 앱에서 유용하다.
- Active Record는 소규모 앱에서 단순하게 사용할 수 있도록 도와준다.
- NestJS 어플리케이션에서 Data Mapper를 사용하려는 이유는 Nest+TypeORM 개발환경에서 Repository를 사용하는 모듈을 쓸수 있기 때문이다. 
- Repository를 사용하면 어디서든지 접근할수가 있다. 실제로 구현하는 서비스에서도 접근이 가능하고 테스팅할 때도 접근이 가능하다.
- Data Mapper 패턴을 이용해서 Repository를 test하고 simulate해볼 수 있다.
- method는 class안에 있는 function이다.
- Repository.create()는 DB는 건드리지 않고 새로운 instance를 생성한다.
- DB에 저장하고 싶다면 save method를 사용해야한다.
- Mapped Types는 base type을 바탕으로 다른 버전들을 만들수 있게 해준다.
- Mapped Types에는 4가지의 타입이 있다. Partial, Pick, Omit, Intersection
- Partial type은 base type, base class를 가져다가 export하고 모든 field가 required가 아닌 class를 만들어준다.
- Pick type은 input type에서 몇가지 property를 선택해 새로운 class를 만들어준다.
- Omit type은 base class에서 class를 만드는데 몇몇 field를 제외하고 만드는것이다.
- Intersection type은 두 input을 합쳐주는 역할을 한다.
- [에러]GraphQLError [Object]: Input Object type CreateRestaurantDto must define one or more fields.
- 상단의 에러가 나오는 이유는 DTO에서 Mapped type을 사용하기위해서는 entity도 Input type을 사용해야한다. Mapped type의 마지막 인자에 InputType을 입력해주면 entity의 데코레이터를 변경할수있다. 이렇게 명시하지 않으면 child class는 parent class와 같은 데코레이터를 사용하게된다.
- 다른 방법으로는 entity에 @InputType({ isAbstract: true }) 데코레이터를 넣어줄수 있다. isAbstract: true의 의미는 이 InputType이 스키마에 포함되지 않길 원한다는 것이다.
- abstract는 직접 쓰는게 아니라 어떤것으로 확장시킨다는 의미이다.
- default value VS nullable value
- default value는 내가 isVegan을 정의해주지 않는 이상 isVegan은 true로 나온다.
- nullable value은 isVegan의 결과가 나오지 않는다. 
- DTO에서 InputType을 사용한다면 argument에 이름이 있어야한다. ArgsType을 쓴다면 비워놓아야한다. 
- update()가 Promise를 return한다는건 매우 중요하다. DB에 entity가 있는지 없는지 확인하지 않고 update query를 실행한다. 존재하지 않는 id를 넣더라도 에러가 나오지 않는다.


### USER CRUD

- CreateDateColumn, UpdateDateColumn은 entity를 만들었을때 자동으로 설정해주는 special column이다. 
- hash는 단방향 함수(one-way function)이다.
- listener는 기본적으로 entity에 무슨일이 생길때 실행되는것이다.
- npm i bcrypt
- npm i @types/bcrypt --dev-only

### USER AUTHENTICATION

- npm i jsonwebtoken
- npm i @types/jsonwebtoken --only-dev
- jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
- 사용자는 본인의 token안에 무엇이 들어가 있는지 볼수있다.(토큰에 들어있는 암호를 해독가능하다)
- sign의 첫번째 인자에는 중요한 정보를 넣지 않고 어떤 회원인지 알수 있는 id를 넣는게 좋다.
- privateKey를 이용해서 token을 지정해주는 목적은 사용자가 token을 수정했는지 확인할수 있기 때문이다. 
- Config module을 설치 및 설정하고 configService를 요청하게 되면 nestjs가 이미 configModule의 존재를 인지하고 필요한 정보를 전달해준다. 그저 constructor에서 요청하기만 하면 된다.
- dependency injection은 우리가 원하는 것의 class만 적어주면 nestjs가 그 정보를 가져다준다.
- jsonwebtoken을 사용하는 이유는 만들고 있는 서비스만의 유효한 인증을 할수있게 하는것이다.(내부에 담겨진 정보자체가 아닌, 정보의 진위여부가 중요하다)
- Module에는 static모듈과 dynamic 모듈이 있다.
- dynamic모듈은 설정이 적용되어 있는 모듈이다. static모듈은 어떤한 설정도 적용되어 있지 않다.
- dynamic모듈은 또 다른 module을 반환해주는 모듈이다.
- providers: [JwtService]는 사실 아래의 코드의 축소형이다. 
- providers: [
          {
            provide: JwtService,
            useClass: JwtService,
          },
        ],

- middleware는 client가 request를 보내면 미들웨어가 처리하고 다음 handler로 넘긴다.
- implements는 extends와 다르다. 
- implements는 class가 interface처럼 행동해야한다는 것이다.
- NestModule에서 configure의 consumer는 사용자가 정의한 미들웨어를 routes에 적용하는 방법을 정의해주는 interface이다. 
- 미들웨어를 정확히 어떤 routes에 적용하고 싶은지 지정하려면 forRoutes를 적용하면 된다. 제외하고 싶은 routes가 있다면 exclude메소드를 사용하면 된다.
- Repository 혹은 class, dependency injection을 사용해야할때 미들웨어를 app.use()에 넣을수가 없다.
- app.use()에는 functional middleware만 넣을수 있다.
- class 미들웨어를 사용하려면 app.module.ts에서 해야한다.
- 무언가를 inject하고 싶다면 꼭 @Injectable()을 사용해야한다.
- jwt 미들웨어의 request를 graphql로 공유해야한다.
- 이 request는 HTTP request인데 이걸 graphql resolver에 전달해야한다.
- 이것을 구현하기 위해서 graphql module이 apollo server에서 모든걸 가져와 사용할수 있다는것을 알아야한다.
- apollo server에는 context라는 property가 존재하는데 context는 각 request에서 사용이 가능하다.
- context는 함수로 정의되고 request마다 매번 호출되며 req property를 가진 object를 받는다.
- context에 property를 넣으면 graphql resolver에서 사용할수있다.
- guard는 함수인데 request를 다음 단계로 진행할지 말지를 결정한다.
- CanActivate 또한 함수인데 true를 return하면 request를 진행시키고 false면 request를 멈추게한다.
- CanActivate는 execution context라는 것을 사용하는데 이것이 request의 context에 접근할수 있게 해준다.(graphql의 context가 아닌 현재 pipeline의 context이다)
- 여기서 context는 HTTP이기 때문에 graphql로 바꿔야한다.(graphql의 context는 http와 다르기때문)
- authentication은 누가 자원을 요청하는지 확인하는 과정이다.(token으로 identity를 확인)
- authorization은 user가 어떤일을 하기전에 permission을 가지고 있는지 확인하는 과정이다.
- 데코레이터를 만들기위한 createParamDecorator에는 factory function이 필요하다. 
- factory function에는 항상 unknown value인 data와 context가 있다.

- Send JWT Token on Header 
=> JwtMiddleware(decrypt, verify Token) 
=> GraphQl context => AuthGuard(return true / false) 
=> Auth-user Decorator(return User)

- update()메소드는 엄청 빠르고 효율적으로 query를 update한다. 그렇지만 entity가 있는지 없는지 확인하지 않는다. 이 말은 즉 직접 entity를 update하고 있지 않다는 이야기이다. 그저 DB에 query를 보낼뿐이다.
- 그렇기때문에 @BeforeUpdate를 부르지 못하는 이유이다.BeforeUpdate는 특정 entity를 update해야 부를수있다.
- update메소드 대신 save메소드를 사용한다면 만약 entity가 존재하지 않으면 entity를 create, insert하고 그렇지 않으면 update한다.

### EMAIL VERIFICATION

- 만약 User로부터 Veirification에 접근하고 싶다면 JoinColumn이 User쪽에 있어야한다.
- npm i uuid
- onDelete: 'CASCADE'의 의미는 만약 user를 삭제하면 user와 붙어있는 verification도 같이 삭제한다는 의미이다.
- resolver는 문자기 같은 역할이다. input들을 받아서 올바른 service로 전달해주는 일을 한다.
- Maingun은 이메일을 보내는 최고의 서비스이다.
- Maingun 계정을 만들고 카드를 등록하지 않으면 5명의 등록된 이메일로만 보낼수 있다.
- 샌드박스 도메인은 이 도메인으로부터 이메일을 보낸다는 것을 의미한다.
- node.js에는 프런트엔드처럼 fetch가 없다.
- npm install got
- npm i form-data
- form-data는 node.jsdptj 스트림을 만드는 라이브러리이다. 
- 이메일을 좀더 이쁘게 만들기 위해 템플릿을 사용하는것이 좋다.
- [Mailgun]-[Sending]-[Templates]
- 이메일은 모두 테이블로 이루어져있기때문에 이메일 템플릿 작업을 하는것은 악몽이다.

### UNIT TESTING THE USER SERVICE
- npm run test:watch
- NestJS가 테스트 패키지를 가지고 있는 덕분에 유저 서비스만을 위한 독립된 모듈을 제공해주었다.   
- 유닛테스트의 포인트는 가능한 한 테스트들을 독립시키는것이다.
- Mock는 가짜 함수이다. Mock을 사용하는 이유는 유저 서비스를 단독으로 테스트하고 싶기 때문이다. 
- TypeScript의 Partial은 모든 요소를 optional로 만들어준다.
- TypeScript의 Record는 타입 T의 요소 K의 집합이다. 요소의 집합이란건 User Repository의 모든 요소들을 말한다.(findOne, save, create, update 등등) 타입은 그냥 jest.Mock이다.
- jest와 mock을 사용해서 코드에서 특정부분의 리턴값을 속일수있다.
- mockResolvedValue를 통해 데이터베이스에 유저가 있다고 속일수 있게 해준다.
- toHaveBeenCalledTimes는 해당 함수가 단 한번 불릴거라고 기대하는것이다.
- unit testing 할때는 beforeEach를 사용하고 end-to-end testing할때는 beforeAll을 사용한다. 
- mockRejectedValue와 jest.fn(() => Promise.resolve())는 똑같은 작업을 한다. 
- mockReturnValue와 mockResolvedValue의 차이는 create가 promise를 return하지 않는다는 것이다. 그러나 save는 promise를 return 한다. 
- mocking을 쓰는 이유는 코드의 return value에 영향을 주고 싶어서 라는것을 기억해야한다.

### Unit testing JWT and Mail
- dependency는 기본적으로 어떤 서비스 동작하기 위해 무언가에 '의존'해야 한다는 뜻이다. 
- jest의 멋진점은 실제로 코드에서 부를 module까지도 mock할수 있다.
- jwt를 실제 JWT package로부터 사용하지 않으려고 이런 작업을 해주는것이다. 
- dependency를 import 했지만 dependency를 mocking하고 있기 때문에 mocking한 곳으로 접근할수가 있다.
- BeforeEach, describe등은 jest를 통해 받았기 때문에 import 할 필요가 없다.
- jest는 함수를 mock function으로 만들지 않으면 그 함수를 spying할수 없다.
- 함수를 mock할수 없을때 spy를 사용한다.
- mockImplementation은 sendEmail이 호출되었을때, 그 콜을 가로채서(intercept) 나만의 구현(implementation)을 추가할수 있는 것이다.

### USER MODULE E2E
- .env.test 파일에 데이터베이스 이름만 test로 바꿔서 넣어준다. (.env.dev과 동일하게)
- beforeEach를 beforeAll로 변경하면 실제 데이터베이스가 없기 때문에 오류가 나온다. 데이터베이스에서 uber-eats-test생성하기 
- coverage폴더의 lcov-report에서 coverage의 멋진 인터페이스를 제공해준다. 코드랑 어떤 부분이 테스트가 되지 않았는지도 볼수있다.
-Jest did not exit one second after the test run has completed. 이 경고창의 의미는 뭔가가 종료되지 않은 상태에서 Jest가 종료되었기 때문에 뜨는 경고이다. 
- 이럴때는 application을 종료하는 코드를 넣어줘야한다.
- resolver를 테스트할때에도 이메일을 보내고 싶지 않기 때문에 got를 mocking한다. 
- supertest에서 header는 post뒤에 set으로 해야한다. 

### Restaurant CRUD 
- Error: Schema must contain uniquely named types but contains multiple types named "Category".
- 해당 에러가 나는 이유는 ObjectType과 InputType이 같은 이름을 사용하고 있었기 때문이다. 
- authentication은 사람에게 '너 누구야?'라고 물어보는 것과 같다. 
- authorization은 이 resource에 접근할 수 있냐고 물어보는 것과 같다. 
- APP_GUARD는 이미 nestjs에서 제공된 constant이다. 
- guard를 앱 모든곳에서 사용하고 싶다면 그냥 APP_GUARD를 provide하면 된다. 
- guard는 한가지 기능밖에 없다. true 또는 false 리턴한다. 
- guard의 canActivate는 함수인데 boolean값을 리턴해야한다.
- reflector는 metadata를 get한다.
- metadata는 resolver의 extra data이다. 
- role.decorator.ts는 decorator를 리턴하는 decorator이다.
- rosolver가 metadata나 role이 없으면 그 resolver는 public이다. 
- roles에는 client, owner, deliver, any라는 옵션이 있다.
- any라는건 유저가 로그인되어있다면 좋다는 뜻이다.
- partial type은 class의 모든 property를 가져와서 optional 취급한다. 
- typeORM에서 save할때 id를 보내지 않는 경우 새로운 entity를 생성하는 작업을 한다. id를 보내주게 되면 typeorm이 해당 entity를 찾아 update를 해준다.
- dynamic field는 db에 실제로 저장되지 않는 field이다. request가 있을때마다 계산해서(computed) 보여주는 field이다. 
- 보통 computed field, dynamic field는 로그인된 사용자의 상태에 따라 계산되는 field이다. 
- ResolveField는 매 request마다 계산된 field를 만들어준다. 
- restaurantCount에서 await을 쓰지 않아도 괜찮은 이유는 promise를 return하면 브라우저가 알아서 결과가 나올때까지 기다린다.
- findAndCount메소드는 array를 return하면서 count까지 return을 해준다.
- typeorm에서 Like는 '200%'의 경우 200으로 시작하는 value를 찾아준다.
- '%200%'라고 하면 어느곳에라도 '200'이 포함된 값을 찾아준다.
- '_00%'는 두번째, 세번째 자리에 '0'이 들어간 값을 찾아준다.
- ILIKE에서 I는 'Insensitive'를 의미한다. 대문자 또는 소문자를 상관하지 않는다.
- 모든 orm은 sql을 이용해서 db에 직접 접근할수 있게 해준다.
- CRON은 원하는 때마다 규칙적으로 수행되는 작업을 의미한다. 

### DISH and ORDER CRUD 
- type : json은 기본적으로 json data를 저장한다. 
- json은 MySQL, PostgreSQL에서 지원하는 data type이다. 
- try/catch에서 catch는 발견하는 모든 error을 잡아준다.  
- order와 dish의 manyTomany관계에서 joinTable을 Order쪽에 넣는 이유는 dish가 얼마나 많은 order를 받았는지 알 필요가 없다. 하지만 order로부터 몇개의 dish를 주문했는지는 알아야한다.
- dish의 options는 order가 생성되고 완료될때 한번 저장이된다. 나중에 주인이 음식의 옵션을 수정해도 문제가 없어진다. 이런이유로 options을 관계짓지않고 json으로 타입을 만든다.
- order-item entity의 dish ManyToOne에서는 Dish에서 어떻게 OrderItem을 가져올지 신경쓰지 않아도 된다.
- manyToOne 이나 oneToMany에서 항상 반대의 관게가 어떻게 되는지 명시해줄 필요가 없다. 
- 반대쪽 관계에서 접근을 하고 싶을때만 해주면 된다.(단지 OrderItem에서 Dish로 접근하기만 원하기 때문이다 )
- OrderItem 전체를 input으로 하고 싶지 않기에 CreateDishInput에서 picktype을 사용하지 않았다. 
- forEach에서는 return할수 없다. for of loop을 사용하면 return이 가능하다.
- flat은 만약 내부에 많은 array를 가진 array가 있다면 flat이 그것들을 없애준다.

### ORDER SUBSCRIPTIONS 
- graphql subscription을 위해 사용할 패키지의 이름은 graphql-subscriptions이다.
- PubSub은 publish와 subscribe를 말한다. 이걸로 app 내부에서 메세지를 교환할수 있다.
- pubsub.asyncIterator()에는 triggers라는게 있는데 triggers는 우리가 기다리는 이벤트를 말한다.
- Mutation과 Query는 HTTP가 필요하고 Subscription은 Web Socket이 필요하다.
- app모듈에 installSubscriptionHandlers: true를 설정하게 되면 서버가 웹소켓 기능을 가지게 된다.
- 웹소켓에서는 request가 없기 때문에 req을 읽을수 없다.
- HTTP에서는 매번 request 할때마다 토큰을 보낸다. 웹소켓은 딱 한번만 토큰을 보낸다. 연결을 시작할때 토큰을 보내는데 연결이 끝나지 않는다.
- jwt middleware는 헤더에서 토큰을 가져와서 유저를 찾았기 때문에 웹소켓에서는 사용할수가 없다.
- guard는 HTTP와 웹소켓에 모든 graphql resolver에 대해 호출을 한다.
- PubSub은 데모용이다. 서버에 단일 인스턴스가 있고 여러개의 연결로 확장하지 않는 경우에만 작동한다.
- 이건 Heroku나 AWS lightsail에 서버를 올리는 경우에 충분하다는 의미이다. 
- 동시에 많은 서버를 가지고 있는경우에는 이 PubSub으로 구현하면 안된다.
- 동시에 많은 서버를 가지고 있는 경우에는 여기 서버가 아닌 다른 분리되 서버에 저장하라는 뜻이다.
- graphql-redis-subscriptions을 사용하면 가능하다. 기존의 new PubSub()을 RedisPubSub으로만 바꿔주면 된다.
- filter function은 현재 listening하는 사용자가 update 알림을 받아야하는지 말아야하는지 결정한다.
- 첫번째 argument는 payload이고 두번째 argument는 해당 resolver의 variables이고 세번째 argument는 context이다. 
- resolve는 사용자가 받는 update 알림의 형태를 바꿔주는일을 한다.
- filter는 boolean값을 리턴해야하고 resolve는 subscription이 알려야하는걸 return하면 된다.
- entity를 create할때는 save method가 create된 entity를 return한다. 
- entity를 save할때는 entity 전체를 return하지 않는다.
- eager relation은 db에서 entity를 load할 때마다 자동으로 load되는 relationship을 말한다.
- eager relation을 사용할때 너무 많은걸 load하면 서버가 폭파한다. 

### PAYMENTS
- paddle은 거의 모든 나라에 지원이 된다.
- paddle은 은행 송금이나 여러 방법을 통해 결제 받을수 있다. 돈받기도 쉽고 회사가 없어도 개인으로 돈을 받을수있다. 
- paddle의 가장 큰 장벽은 디지털 내용물만 결제할수 있다는 것이다. 실제 물건을 팔수가 없다.
- paddle은 소프트웨어와 디지털 내용물만 거래가능하다.(티셔츠, 커피 장사를 할수 없다)
- stripe는 큰 회사들이 사용하는 프로그램인데 한국에서 지원이 되지 않는다.
- stripe는 법적으로 설립된 진짜 회사에서만 사용할수 있다.
- OneToMany가 다른편에 없어도 ManyToOne을 생성할수 있다. 이것이 restaurant에 OneToMany를 만들지 않은 이유이다. restaurant이 갖고 있는 payments에 관심 없기 때문이다. 
- eager relationship을 할때 주의할점은 pagination을 할수없다.
- 또한 eager relationship과 작업하면 test하기가 어렵다. getPayments처럼 만들어서 resolver를 test하는게 좋다. 하나의 resolver가 모든것을 다 받는 구조면 무거워질 가능성이 크다.
- Take scheduling은 원하는 time interval 또는 정해진 시간과 날짜에 function을 실행할수 있게 만든다.
- nest.js/schedule은 node-cron이라는 패키지 위에 나온다. 
- cron pattern의 의미 : *는 '매' 즉 '모든'것을 포함한다는 의미이다. 1-3,5의 의미는 1-3 또는 1-5를 의미한다. */2는 2씩 간격이라는 step을 의미한다. 
* * * * * * 
| | | | | |
| | | | | day of week 
| | | | month
| | | day of month
| | hour
| minute
second(optional)

* * * * * * 매초마다
45 * * * * * 매 45초에
* 10 * * * * 매시 10분에  
* */30 9-17 * * * 9-17시 사이의 매 30분마다
* 30 11 * * 1-5 월요일-금요일 11시 30분에 

- 매초, 매시, 매일을 스케쥴하고 싶다면 interval을 사용하면 된다.
- timeout은 interval과 비슷한데 이건 나중에 발생한다. 또한 띡 1번만 실행한다.

### UPLOADS FILES
- npm install aws-sdk
- S3는 AWS의 storage service이다. 
- AWS IAM에 들어가서 사용자 추가 클릭 
- 사용자이름 설정후 엑세스키에 체크하기 
- 기존 정책 직접 연결 클릭후 S3 검색하기 
- AmazonS3FullAccess클릭 후 권한 경계 없이 user 생성 선택 
- 태그 추가 할 필요 없음
- 사용자 만들기 클릭 
- buffer는 byte형식의 파일이다. key는 파일의 이름이다.

### PAYMENTS
- npx ngrok은 실제 URL을 만들어준다. 그리고 localhost로 redirect해준다.
- npx ngrok http 4000

### REALTIME ORDER
- query를 사용해 연결할 때는 request header를 갖고, subscription을 이용해 연결할 때는 connection context를 갖는다는걸 기억해야한다.