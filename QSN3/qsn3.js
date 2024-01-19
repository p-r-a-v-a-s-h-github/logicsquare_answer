let Cafes=[]
let Places=[]
let table=document.querySelector("table")
const getData=async()=>{
    let result1=await fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json")
    let result2=await fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json")
     result1=await result1.json()
     Cafes=result1.cafes
    result2=await result2.json()
    Places=result2.places
    console.log(Cafes,Places)

    let row1=table.insertRow(0)
    let cell1=row1.insertCell(0)
    let cell2=row1.insertCell(1)
    cell1.innerHTML="CAFES NAME"
    cell2.innerHTML="ADDRESS"
    for(let i=0;i<Cafes.length;i++)
    {
        for(let j=0;j<Places.length;j++)
        {
            if(Cafes[i].location_id == Places[j].id){
                let row1=table.insertRow(i+1)
                 let cell1=row1.insertCell(0)
                 let cell2=row1.insertCell(1)
                 cell1.innerHTML=`${Cafes[i].name}`
                 cell2.innerHTML=`${Places[j].street_no}`
            }
        }
    }

}


const fetchCafe=()=>{
   table.innerHTML=""
    let searchTerm=document.getElementById("search").value
    if(!searchTerm)
    {
        getData()
        return
    }
    for(let i=0,k=0;i<Cafes.length;i++)
       {
        let cafeName=Cafes[i].name.toLowerCase().includes(searchTerm.toLowerCase())
        if(cafeName){
            for(let j=0;j<Places.length;j++)
            {
                if(Cafes[i].location_id==Places[j].id)
                {
                    
                    console.log(Cafes[i].name)
                    let row=table.insertRow(k)
                    k++;
                    let cell=row.insertCell(0)
                    let cell2=row.insertCell(1)
                    cell.innerHTML=`${Cafes[i].name}`
                    cell2.innerHTML=`${Places[j].street_no}`


                    break;
                }
            }
            
        }
       }
  
}