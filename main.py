from flask import Flask, render_template, request, flash, redirect, url_for
import pymysql

class Database():            
    def __init__(self):
        self._db= pymysql.connect(
        user = "root",
        passwd= "root",
        host="localhost",
        db="ubion")
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

#왜 갑자기 secret_key를 요구했을까? 
##여러번실행했기 때문...
app = Flask(__name__)
app.secret_key = 'super secret key'

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/check", methods=['POST'])
def login():    
    request.method = 'POST'      
    return redirect(url_for("menu"))

# 원본임 다만들고 위에 로그인과 교체
# def login():    
#     request.method = 'POST'      
#     if request.form["_username"] == "ubion" or request.form["_password"] == "5floor":
#         flash("환영합니다!")
#         return redirect(url_for("menu"))
#     else:
#         flash("다시 입력해주세요!")            
#         return redirect(url_for("index"))

@app.route('/menu')
def menu():
    return render_template('menu.html')


# @app.route("/add", methods=['POST'])
# def add():       
#     return redirect(url_for("add_info"))
    
#웹사이트
@app.route('/add_info', methods=['GET'])
def add_info():
    return render_template('add_info.html')

#웹사이트에서 가격입력
@app.route('/add_info', methods=['POST'])
def add_info_form():
    id = request.form["_id"]
    name = request.form["_name"]
    type = request.form["_type"]
    info = request.form["_info"]
    sql_ = """
                INSERT INTO lunch_recommend VALUES(%s, %s, %s, %s)
            """    
    values_=[id, name, type, info]            
    db_= Database()
    db_.execute(sql_, values_)
    db_.commit()
    return render_template('add_menu.html', id = id)


# @app.route('/add_menu', methods=['GET'])
# def add_menu():
#     return render_template('add_menu.html')


@app.route('/add_menu_form', methods=['POST'])
def add_menu_form():        
    menu_list = list(request.form.getlist("_menu"))
    price_list = list(request.form.getlist("_price"))        
    for i,j in menu_list, price_list:        
        sql_ = """
                INSERT INTO lunch_recommend_menu VALUES(%s, %s)
            """
        values_=[i, j]
        db_= Database()
        db_.execute(sql_, values_)
        db_.commit()
    return redirect('/menu')



app.run(debug = True, port=8080)

# methods = ['get', 'post']
# ??

# get
# ? 로 다 드러나게 보내는 형식
# post : 비밀형식, 속도가 느림

# if 로 걸어서 get과 post방식을 선택할 수 있음