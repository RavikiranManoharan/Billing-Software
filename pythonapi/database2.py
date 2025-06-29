import sqlite3 as sq

import json

dta = sq.connect("Ravi_stores.db")

dta.execute("create table if not exists datas (slno int,name varchar(100),age int, amount int, items varchar(300))")

def insert_data(sln,name,age,amount,item):
	
	dta.execute("insert into datas values(?,?,?,?,?)",(sln,name,age,amount,(json.dumps(item,))))
	dta.commit()

def view_data():
	
	data = dta.execute("select * from datas")
	
	print(list(data))
	print("\n")

def view_data_csv():
	
	data = dta.execute("select * from datas")
	
	return list(data)
	print("\n")

def view_specific():
	
	name = input("Enter the name: ")
	print("\n")
	
	details = dta.execute("select * from datas where name=?",(name,))
		
	print(list(details))
	print("\n")

def view_specific_for_csv(sl):
	
	details = dta.execute("select * from datas where slno=?",(sl,))
	
	return list(details)

def delete_data():
	
	dta.execute("delete from datas where 1=1")
	dta.commit()
	
	print("data deleted")
	print("\n")



