from flask import Flask, request, jsonify, render_template
import sqlite3 as sq
import json
import threading

prds = []

price = 0

dta = sq.connect("Ravi_stores1.db",check_same_thread=False)

dta.execute("create table if not exists datas1 (slno int,name varchar(100),phone int, amount int, items varchar(300))")

def insert_data(sln,name,phn,amount,item):
	
	dta.execute("insert into datas1 values(?,?,?,?,?)",(sln,name,phn,amount,(json.dumps(item,))))
	dta.commit()

def view_data():
	
	data = dta.execute("select * from datas1").fetchall()
	
	return jsonify(data)
	print("\n")

def delete_data():
	
	dta.execute("delete from datas1 where 1==1")
	
#delete_data()

app = Flask(__name__)


@app.route('/')
def check():
	
	return render_template("htmlpy.html")


@app.route('/api/bill',methods=['GET'])
def chk():
	
	val = view_data()
	print(val)
	return val

@app.route('/view')
def call():
	
	return render_template("htmlpy2.html")


@app.route('/api/bill',methods=['POST'])
def bill():
	
	data = request.get_json()
	
	sln = data.get('slno')
	name = data.get('Customer')
	phone = data.get('Phone')
	products = data.get('Products')
	
	age = 20
	
	process(products)
	
	insert_data(sln,name,phone,price,prds)

	view_data()
	
	return jsonify({'Sl.No.':f'{sln}','Name':f'{name}','Phone':f'{phone}','Products':f'{products}'})


def process(products):
	
	lst = products
	
	global prds
	
	global price
	
	secondary = 0
	
	restrict = 0
	restrict1 = 0
	
	for i in lst:
		
		if restrict==0:
			
			prds.append(i)
		
		if restrict>0:
			
			if restrict1==0:
				
				secondary = int(i)
				
				if restrict1==1:
					restrict1=0
				else:
					restrict1+=1
				
			elif restrict1==1:
				
				price += secondary*int(i)
				
				if restrict1==1:
					restrict1=0
				else:
					restrict1+=1
		
		if restrict==2:
			
			restrict = 0
		else:
			restrict+=1

if __name__ == '__main__':
	
	app.run(debug=True)
