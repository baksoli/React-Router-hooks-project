const express=require("express")
// 라이브러리 로드
// 서버 생성
const app=express();
// 서버 구동
/*
서버 구동시
   -> bind() 생성 => IP, PORT를 연결 => 개통
        -> listen() => 대기 상태
            -> accept() => 클라이언트가 접속시에 처리

listen() 이용시 위에 bind~accept 까지 구동
 */
app.listen(3355,()=>{
    console.log("Server Start...","http://localhost:3355")
})
// 서버 port 충돌 방지
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
// 클라이언트와 통신
// 사용자(클라이언트)의 URI를 받아온다.

// 몽고 디비 연결
// 몽고디비 클라이언트
const Client=require("mongodb").MongoClient;
// MongoDB Connection
/*
    java 식
    MongoClient mc = new MongoClient("localhost", 27017);
    DB db = mc.getDB("mydb");
    DBCollection dbc=db.getCollection('recipe');
 */
// response 에 요청한 사용자의 ip를 가지고 있기 때문에 사용자의 ip로 값을 보내준다.
// request 는 사용자가 요청한 데이터가 담겨있다.
// /recipe?page=1
app.get('/recipe',(request,response)=>{
    // request=사용자가 보내준 요청 정보 : page, id, pwd 등을 요청할 수 있다.
    // 요청을 처리
    // 결과를 전송 ==> ,response
    var page=request.query.page; //java :: request.getParameter("page")
    var rowSize=12;
    var skip=(page*rowSize)-rowSize;
    /*
        1Page 요청시 => skip 0
        2Page => 12(버림) ==> 13부터 시작
     */
    var url="mongodb://211.238.142.181:27017"; //몽고디비 주소
    Client.connect(url,(err,client)=>{
        var db=client.db('mydb');
        // SELECT * FROM recipe ▽▽
        // select == find
        // SELECT * FROM recipe WHERE no=1 => find({no:1})
        // SELECT * FROM recipe WHERE tile LIKE '%값%' => find({"title:{"$regex":".*"+값}})
        /*
            {}
            {}
            {}
            ..
            .12개 낱개로 들어온다.
            -> 배열로 묶어달라 = .toArray()
         */
        db.collection('recipe').find({}).skip(skip).limit(rowSize).toArray((err,docs)=>{
            // 요청한 사용자 => 데이터 전송
            response.json(docs);
            console.log(docs);
            client.close();
        })

    })

})

// SELECT CEIL(COUNT(*)/12.0 FROM recipe
app.get('/recipe_total', (request,response)=>{
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        // count 함수는 리턴함수를 가지고 있기 때문에 return count; 를 해줘야한다.
        db.collection('recipe').find({}).count((err,count)=>{
            response.json({total:Math.ceil(count/12.0)})
            client.close();
            return count;
        })
    })
})

/*
    http://localhost:3355/recipe_detail?no=1&page=1
    ==================== ============== ====
    서버 주소              URI           request에 담겨서 들어오는 데이터
    request.query.no;
    request.query.page;
 */
app.get('/recipe_detail',(request,response)=>{
    // 요청 => 처리 => 결과값 전송
    var no=request.query.no;
    console.log(no);
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection('recipe_detail').find({no:Number(no)}).toArray((err,docs)=>{
            //데이터 전달(전송)
            response.json(docs[0]);
            console.log(docs[0]);
            client.close();
        })


    })
})

app.get('/chef',(request,response)=>{
    // request=사용자가 보내준 요청 정보 : page, id, pwd 등을 요청할 수 있다.
    // 요청을 처리
    // 결과를 전송 ==> ,response
    var page=request.query.page; //java :: request.getParameter("page")
    var rowSize=50;
    var skip=(page*rowSize)-rowSize;
    /*
        1Page 요청시 => skip 0
        2Page => 12(버림) ==> 13부터 시작
     */
    var url="mongodb://211.238.142.181:27017"; //몽고디비 주소
    Client.connect(url,(err,client)=>{
        var db=client.db('mydb');
        // SELECT * FROM recipe ▽▽
        // select == find
        // SELECT * FROM recipe WHERE no=1 => find({no:1})
        // SELECT * FROM recipe WHERE tile LIKE '%값%' => find({"title:{"$regex":".*"+값}})
        /*
            {}
            {}
            {}
            ..
            .12개 낱개로 들어온다.
            -> 배열로 묶어달라 = .toArray()
         */
        db.collection('chef').find({}).skip(skip).limit(rowSize).toArray((err,docs)=>{
            // 요청한 사용자 => 데이터 전송
            response.json(docs);
            console.log(docs);
            client.close();
        })

    })

})

// SELECT CEIL(COUNT(*)/12.0 FROM recipe
app.get('/chef_total', (request,response)=>{
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        // count 함수는 리턴함수를 가지고 있기 때문에 return count; 를 해줘야한다.
        db.collection('chef').find({}).count((err,count)=>{
            response.json({total:Math.ceil(count/50.0)})
            client.close();
            return count;
        })
    })
})

/*
    @RequestMapping()
    public String recipe_news(Request req, Response res){ }
 */
// XML => JSON 으로 변경할때 사용
const xml2js=require("xml2js");
// 외부 서버에서 데이터를 읽어 올 때, request
const request=require("request");
app.get('/recipe_news',(req,res)=>{
    var query=encodeURIComponent(req.query.fd);
    var url="http://newssearch.naver.com/search.naver?where=rss&query="+query;
    // xml을 JSON으로 변경하는 파서기
    var parser=new xml2js.Parser({

    })
    request({url:url},(err,request,xml)=>{
        parser.parseString(xml,function(err,pJson){
            // xml 을 pJson으로 바꿔준다.
            console.log(pJson.rss.channel.item);

        })
    })
})