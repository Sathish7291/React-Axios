import React,{ useState,useEffect} from 'react'
import TopBar from '../common/TopBar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

function Dashboard() {
    let [data,setData] = useState([])
    let navigate = useNavigate()
    const getData = async()=>{
        try{
            let res = await axios.get('https://66afaefbb05db47acc5a83c7.mockapi.io/users')
            console.log(res);
            if(res.status==200)
            {
                setData(res.data)
                toast.success("Data Fetch Successfully")
            }
        }
        catch(error){
            toast.error(error.response.data)
        }
        } 
        const handleDelete = async(id) =>
          {
            try {
              let res = await axios.delete(`https://66afaefbb05db47acc5a83c7.mockapi.io/users/${id}`)
             
              if(res.status===200)
              {
                toast.success("data Deleted Successfully")
                getData()
              }
            } catch (error) {
                toast.error(error.response.data)
            }
          } 
    useEffect(()=>{
        getData()
    },[])
  return <>
    <TopBar/>
    <div>

<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Address</th>
      <th>Phone</th>
      <th>Website</th>
      <th>Company</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {
      data.map((e)=>{
        return <tr key={e.id}>
          <td>{e.id}</td>
          <td>{e.name}</td>
          <td>{e.username}</td>
          <td>{e.email}</td>
          <td>{e.address.street }<br/>{e.address.suite}<br/>{e.address.city}<br/>{e.address.zipcode }</td>
          <td>{e.phone}</td>
          <td>{e.website}</td>
          <td>{e.company.name}<br/>{e.company.catchPhrase}<br/>{e.company.bs}</td>
          <td>
            <Button variant='primary' onClick={()=>navigate(`/edit/${e.id}`)}>Edit</Button>
            &nbsp;
            <Button variant='danger' onClick={()=>handleDelete(e.id)}>Delete</Button>
          </td>
        </tr>
      })
    }
  </tbody>
</Table>

</div>
  </>
}

export default Dashboard