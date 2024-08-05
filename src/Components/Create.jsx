import React,{useEffect, useState} from 'react'
import TopBar from '../common/TopBar';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useNavigate,useParams } from 'react-router-dom';

function Create() {
  const {id} = useParams()

  const navigate = useNavigate()
  const [initialState,setInitialState] = useState({
    name:'',
    username:'',
    email:'',
    address:'',
    phone:'',
    website:'',
    company:''
  })

  const UserSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email:Yup.string().required('Required'),
    address:Yup.string().required('Required'),
    phone:Yup.string().required('Required'),
    website:Yup.string().required('Required'),
    company:Yup.string().required('Required')
  });

  const handleCreate = async(values)=>{
    try {
      let body = {...values,
      }

      let res = await axios.post('https://66afaefbb05db47acc5a83c7.mockapi.io/users',body)
      if(res.status===201)
      {
        toast.success("Book Created Successfully")
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const handleEdit = async(values)=>{
    try {
      let body = {...values}

      let res = await axios.put(`https://66afaefbb05db47acc5a83c7.mockapi.io/users/${id}`,body)
      if(res.status===200)
      {
        toast.success("Data Edited Successfully")
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  let formik = useFormik({
    initialValues:initialState,
    enableReinitialize:true,
    validationSchema:UserSchema,
    onSubmit: values => {
      if(id)
      {
        handleEdit(values)
      }
      else
      {
        handleCreate(values)
      }
    }
  })

  const getData = async(id)=>{
    try {
      let res = await axios.get(`https://66afaefbb05db47acc5a83c7.mockapi.io/users/${id}`)
      if(res.status===200)
      {
        toast.success("Data Fetched Successfully")
        setInitialState({
          name:res.data.name,
          username:res.data.username,
          email:res.data.email,
          address:res.data.address,
          phone:res.data.phone,
          website:res.data.website,
          company:res.data.company,
        })
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  useEffect(()=>{
    if(id)
    {
      getData(id)
    }
  },[])

  return <>
    <TopBar/>
    <div>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.name && formik.errors.name ?<div style={{color:"red"}}>{formik.errors.name}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>UserName</Form.Label>
        <Form.Control type="text" placeholder="Enter UserName" id='UserName' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.username && formik.errors.username ?<div style={{color:"red"}}>{formik.errors.username}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter Email" id='Email' value={formik.values.email} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ?<div style={{color:"red"}}>{formik.errors.email}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter Address" id='Address' value={formik.values.address} name='address' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.address && formik.errors.address ?<div style={{color:"red"}}>{formik.errors.address}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Enter Phone" id='Phone' value={formik.values.phone} name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.phone && formik.errors.phone ?<div style={{color:"red"}}>{formik.errors.phone}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Website</Form.Label>
        <Form.Control type="text" placeholder="Enter Website" id='Website' value={formik.values.website} name='website' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.website && formik.errors.website ?<div style={{color:"red"}}>{formik.errors.website}</div> : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Company</Form.Label>
        <Form.Control type="text" placeholder="Enter Company" id='Company' value={formik.values.company} name='company' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.company && formik.errors.company ?<div style={{color:"red"}}>{formik.errors.company}</div> : null}
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
    </div>
  </>
}

export default Create