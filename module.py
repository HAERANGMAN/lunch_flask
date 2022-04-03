import pymysql

class Database():            
    def __init__(self):
        self._db= pymysql.connect(
        host="ls-a20f4420f7aa9967e25c1e0aecf4d8b641af5f13.cgtgapkuvqbt.ap-northeast-2.rds.amazonaws.com",
        db="ubion",
        user = "ubion",
        password= "1234",
        port = 3306)
        self.cursor = self._db.cursor(pymysql.cursors.DictCursor)        
        #딕셔너리 형태로 가져옴

    def execute(self, _sql, _values={}):###
        self.cursor.execute(_sql, _values)        
        #밸류값이 없을경우 빈딕셔너리로 놓기위함
        #sql에서는 디폴트로 딕셔너리를 많이쓰기 때문에 dic을씀(list무관)

    def executeAll(self, _sql, _values={}):
        self.cursor.execute(_sql, _values)            
        self.result = self.cursor.fetchall()### 
        #fetchall은 딕셔너리나 리스트로 나한테 바꿔서 보내줌, 출력시 사용 
        return self.result

    def commit(self):
        self._db.commit()


