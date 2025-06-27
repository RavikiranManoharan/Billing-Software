
window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', submitdata);
  } else {
    console.error('Form not found!');
  }
});


const items = []

var Name 

var Slno 

var Phn 

var restrict = 0

function crtlst1()
{
	if(restrict==0)
	{
		var slno = document.getElementById("slno").value
	var name = document.getElementById("name").value
	var phn = document.getElementById("phn").value
	var noits = document.getElementById("noits").value
	
	Name = name
	
	Slno = slno
	
	Phn = phn
	
	var inputDiv = document.getElementById("maindiv");	
	
	
	inputDiv.appendChild(document.createElement('br'));
	inputDiv.appendChild(document.createElement('br'));
	
	var i
	var j
	
	var range = Number(noits)
	
	for(i=1;i<=range;i++)
	{
		for(j=0;j<3;j++)
		{
				
			if(j==0)
			{	
				var inputTag = document.createElement('input');
				inputTag.type = "text"
				inputTag.id = `item${i}`;
				
				var label = document.createElement('label');
				label.htmlFor=`item${i}`;
				label.textContent=`Item${i}`;
			}
			else if(j==1)
			{	
				var inputTag = document.createElement('input');
				inputTag.type = "text"
				inputTag.id = `price${i}`;
				
				
				var label = document.createElement('label');
				label.htmlFor=`price${i}`;
				label.textContent=`Price${i}`;
			}
			else if(j==2)
			{	
				var inputTag = document.createElement('input');
				inputTag.type = "text"
				inputTag.id = `quantity${i}`;
				
				
				var label = document.createElement('label');
				label.htmlFor=`quantity${i}`;
				label.textContent=`Quantity${i}`;
			}
			
			inputDiv.appendChild(label);
		
			inputDiv.appendChild(inputTag);
			
			inputDiv.appendChild(document.createElement('br'));
			inputDiv.appendChild(document.createElement('br'));
			
		}
		
			inputDiv.appendChild(document.createElement('br'));
			
	}
	
	var btn = document.createElement('button');
	btn.id = "packdata"
	btn.textContent = "Pack"
	btn.addEventListener('click',packing)
	
	inputDiv.appendChild(btn);
			
	inputDiv.appendChild(document.createElement('br'));
	inputDiv.appendChild(document.createElement('br'));
	inputDiv.appendChild(document.createElement('br'));
	}
	
	restrict++;	
}

function packing()
{	
	var slno = document.getElementById("slno").value
	var name = document.getElementById("name").value
	var phn = document.getElementById("phn").value
	var noits = document.getElementById("noits").value

	num = Number(noits)
	
	var i
	var j
	
	for(i=1;i<=num;i++)
	{
		for(j=0;j<3;j++)
		{
				
			if(j==0)
			{	
				var item = document.getElementById(`item${i}`).value;
				items.push(item)
			}
			else if(j==1)
			{	
				var price = document.getElementById(`price${i}`).value;
				items.push(price)
			}
			else if(j==2)
			{	
				var quantity = document.getElementById(`quantity${i}`).value;
				items.push(quantity)
			}
		}
	}
	
	pass_packed()
	
}

function pass_packed()
{
	var slno = document.getElementById("slnos")
	var name = document.getElementById("names")
	var phn = document.getElementById("phns")
	var itm = document.getElementById("items")
	
	slno.textContent = Slno
	
	name.textContent = Name
	
	phn.textContent = Phn
	
	itm.textContent = items
	
	var style = document.getElementById("host").style.display = "block";
}

async function handleFormSubmission(event)
{
    event.preventDefault();
}

 async function submitdata()
 {
	
	handleFormSubmission(event);
	
	var slno = document.getElementById("slno").value
	var Customer = document.getElementById("name").value
	var Phone = document.getElementById("phn").value
	var Products = items
	
	const data = {slno,Customer,Phone,Products};
	/*
	async function fetchData(data)
	{
	
		if( await fetch('/submit'))
		{
			const fet = {method:'POST',headers:{'content-type':'application/json'},body: JSON.stringify(data)}
		}
	
		return fet
	}
	 
	const response = fetchData()
	
	const result = response.json();
	console.log(result);
	*/
	try {
  const response = await fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  console.log(result);

} catch (error) {
  console.error('Something went wrong:', error);
}


}


