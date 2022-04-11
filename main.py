from flask import Flask, render_template, request, flash, redirect, url_for
from sql_module import * 

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



# @app.route("/login", methods=["POST"])
# def login():        
#     #######################문제#########################
#     # db에서 id와 비번을 가져오기
#     # select문으로 조회
#     # 결과값이 존재하면 return login_not 없으면 fail
#     ####################################################
#     ##내가 생각했던 방식은 2가지였음
#     ##(1.리스트를가져와서 비교대조, 2.input을 보내서 boolean)
#     #기본적인 방식은 노션에 있음!!        
#     #count로 0,1 값을 확인할수 있음 => 하지만 결국 데이터값을 가져와서 처리해야 하는 건 마찬가지
#     #count값의 경우 다중쿼리나 계산한 값을 활용할때 주로 사용하게됨
#     _id = request.form["input_id"]
#     _pw = request.form["input_pw"]
#     search_sql = '''
#         SELECT * From user_info WHERE ID = %s AND password = %s
#     '''
#     _values=[_id, _pw]    
#     db_= mod_sql.Database()
#     result = db_.executeAll(search_sql, _values) 
#     if result:
#         flash("환영합니다!")
#         return render_template("welcome.html", 
#                             name = result[0]["name"], id=result[0]["ID"])
#         #딕셔너리 형태로 가져온 데이터기 때문에 컬럼명으로검색함
#     else:
#         flash("다시입력해주세요!")
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