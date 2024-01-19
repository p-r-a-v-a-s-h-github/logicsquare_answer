
import React, { useState ,useEffect} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Modal, Button} from 'react-bootstrap';  
import { Flare } from '@mui/icons-material';


const Dashboard = () => {
    const [Emp,setEmp]=useState([])
    const [Empdet,setEmpdet]=useState([])
  const [refresh,setrefresh]=useState(false)
    const [searchVal,setSearchVal]=useState({
      name:""
    })
    const [show, setShow] = useState(false);  
    const modalClose = () => setShow(false);  
    const modalShow = () => setShow(true);  

    const [editshow, setEditShow] = useState(false);  
    const editmodalClose = () => setEditShow(false);  
    const editmodalShow = () => setEditShow(true); 
    

    const [inputFields, setInputFields] = useState({
      name:"",
      email: "",
      desg: "",
      age: null,
      
    });
    const [editinputFields, setEditInputFields] = useState({
      name:"",
      email: "",
      desg: "",
      age: null,
      id:null
    });
    const handleChange = (e) => {
      setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };
    const edithandleChange = (e) => {
      setEditInputFields({ ...editinputFields, [e.target.name]: e.target.value });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      validateValues(inputFields)
     
    };
    const edithandleSubmit = (event) => {
      event.preventDefault();
      editvalidateValues(editinputFields)
      
    };
    const validateValues = (inputValues) => {
     
      if (inputValues.email.length < 15) {
        alert( "Email is too short");

      }
      else if (!inputValues.age || inputValues.age < 18) {
      alert("Minimum age is 18")
      }
      else{
  addEmployee(inputValues)
}
      
    };
    const editvalidateValues = (inputValues) => {
     
      if (inputValues.email.length < 15) {
        alert( "Email is too short");

      }
      else if (!inputValues.age || inputValues.age < 18) {
      alert("Minimum age is 18")
      }
      else{
  editEmpDetails(inputValues)
}
      
    };
   
    const detail=()=>{
      let emp=JSON.parse(localStorage.getItem("emp_details")) || []
      
      setEmpdet(emp)
    }
  
    useEffect(()=>{
      detail()
      fetchEmployee();
      localStorage.setItem("searchArr",JSON.stringify([]))
    },[])
    useEffect(()=>{
      fetchEmployee();
      localStorage.setItem("searchArr",JSON.stringify([]))
    },[refresh])
    

    const fetchEmployee=()=>{
      let emp=JSON.parse(localStorage.getItem("emp_details")) || []
      emp.reverse()
      setEmp(emp)
      console.log(emp)
    }
    const searchEmpFetch=()=>{
      let searchlocal=JSON.parse(localStorage.getItem("searchArr")) || []
      setEmp(searchlocal) 
    }
     
    const addEmployee=(inputs)=>{
        let emp=JSON.parse(localStorage.getItem("emp_details")) || []
        let newObj=[...emp,inputs]
        localStorage.setItem("emp_details",JSON.stringify(newObj))
        fetchEmployee();
        detail()
    }
    const editEmployee=(i)=>{

      editmodalShow();
      editinputFields.name=Emp[i].name
      editinputFields.email=Emp[i].email
      editinputFields.desg=Emp[i].desg
      editinputFields.age=Emp[i].age
      editinputFields.id=Emp[i].id
      
    }
    const editEmpDetails=(inputs)=>{
      let emp=JSON.parse(localStorage.getItem("emp_details")) || []
      emp.splice(editinputFields.id,1)
      let newObj=[...emp,inputs]
      localStorage.setItem("emp_details",JSON.stringify(newObj))
      fetchEmployee();
      detail()
    }
    const deleteEmployee=(i)=>{
      let emp=JSON.parse(localStorage.getItem("emp_details")) || []
      emp.splice(editinputFields.id,1)
      let newObj=[...emp]
      localStorage.setItem("emp_details",JSON.stringify(newObj))
      fetchEmployee()
      detail()
    }
    const setSearch=(e)=>{
      setSearchVal({name:e.target.value})
      console.log(searchVal)
    }
    const searchEmployee=(searchTerm)=>{
      console.log(searchTerm)
      for(let i=0,k=0;i<Emp.length;i++)
       {
        let find=Emp[i].name.toLowerCase().includes(searchTerm.name.toLowerCase()) ||
        Emp[i].email.toLowerCase().includes(searchTerm.name.toLowerCase()) ||
        Emp[i].desg.toLowerCase().includes(searchTerm.name.toLowerCase()) 
        
               if(find){       
                    let searchlocal=JSON.parse(localStorage.getItem("searchArr")) || []
                    searchlocal=[...searchlocal,Emp[i]]
                  localStorage.setItem("searchArr",JSON.stringify(searchlocal))
                    break;
                }
            }
            searchEmpFetch();
            
        }
       
  return (
    <>
    <div className='child'>
        <div>
            <h1>Total Employee </h1>
           
        </div>
        <div>
          <table>
            {
              Empdet.map((e,i)=>{
                return (
                  <tr>
                    <td>{i}</td>
                    <td>{e.name}</td>
                    <td>{e.desg}</td>
                    <td>{e.email}</td>
                    <td>{e.age}</td>
                  </tr> 
                )
              })
            }
          </table>
        </div>
    </div>
    <div className='child'>
        <h1>Employee List</h1>
        <div>
        <input
        type="text"
        name="search"
        value={searchVal.name}
        onChange={setSearch}
      ></input>
      <Button onClick={()=>{searchEmployee(searchVal)}}><SearchIcon/></Button>
      <Button onClick={()=>{setrefresh(true)}}><RefreshIcon/></Button>

        </div>
        <table>
        {
          Emp.map((e,i)=>{
            return (
              <tr>
                <td>{i}</td>
                <td>{e.name}</td>
                <td>{e.desg}</td>
                <td>{e.email}</td>
                <td>{e.age}</td>
                <td><Button variant="primary" onClick={()=>{editEmployee(i)}}><EditIcon/></Button>  </td>
                <td><Button variant="danger" onClick={()=>{deleteEmployee(i)}}><DeleteIcon/></Button>  </td>
              </tr> 
            )
          })
        }
        </table>
        <div><button onClick={modalShow}>ADD</button></div>
        <div>
  <h4>NOTE</h4>:<p>Please Reload the page if some Functionality not work</p>
</div>
    </div>


    <div className="App p-4">     
  <Modal show={show} onHide={modalClose}>  
  <Modal.Header closeButton>  
    <Modal.Title>Add New Emplyoee</Modal.Title>  
  </Modal.Header>  
  
  <Modal.Body>  
   <form onSubmit={handleSubmit}>
   <div style={{display:'flex',flexDirection:'column'}}>
      <label for="name">NAME</label>
      <input
        type="text"
        name="name"
        value={inputFields.name}
        onChange={handleChange}
      ></input>
      <label for="email">EMAIL</label>
      <input
        type="email"
        name="email"
        value={inputFields.email}
        onChange={handleChange}
      ></input>
      <label for="age">Age</label>
      <input
        type="number"
        name="age"
        value={inputFields.age}
        onChange={handleChange}
      ></input>
      <label for="desg">DESIGNATION</label>
      <input
        type="text"
        name="desg"
        value={inputFields.desg}
        onChange={handleChange}
      ></input>
    </div>
    <Button type="submit" onClick={modalClose}>ADD</Button>
  </form>
  </Modal.Body>  
  
  <Modal.Footer>  
    <Button variant="danger" onClick={modalClose}>Close Modal</Button>  
    
  </Modal.Footer>  
</Modal>  
    </div>  



    <div className="App p-4">     
  <Modal show={editshow} onHide={editmodalClose}>  
  <Modal.Header closeButton>  
    <Modal.Title>Add New Emplyoee</Modal.Title>  
  </Modal.Header>  
  
  <Modal.Body>  
   <form onSubmit={edithandleSubmit}>
    <div style={{display:'flex',flexDirection:'column'}}>
      <label for="name">NAME</label>
      <input
        type="text"
        name="name"
        value={editinputFields.name}
        onChange={edithandleChange}
      ></input>
      <label for="email">EMAIL</label>
      <input
        type="email"
        name="email"
        value={editinputFields.email}
        onChange={edithandleChange}
      ></input>
      <label for="age">Age</label>
      <input
        type="number"
        name="age"
        value={editinputFields.age}
        onChange={edithandleChange}
      ></input>
      <label for="desg">DESIGNATION</label>
      <input
        type="text"
        name="desg"
        value={editinputFields.desg}
        onChange={edithandleChange}
      ></input>
    </div>
    <Button type="submit" onClick={editmodalClose}>EDIT</Button>
  </form>
  </Modal.Body>  
  
  <Modal.Footer>  
    <Button variant="secondary" onClick={editmodalClose}>Close Modal</Button>  
     
  </Modal.Footer>  
</Modal>


    </div>  
    </>
  )
}

export default Dashboard