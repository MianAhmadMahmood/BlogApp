import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const SingleBlog = () => {
  const navigate =useNavigate()
  const{id }= useParams();
  const [blog,setBlog] =useState({});

  useEffect(()=>{
    const fetchSingleBlog = async ()=>{
      const res= await axios.get(`http://localhost:9000/api/v1/get/blog/${id}`,
      { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      );
      setBlog(res.data);
      
    };
    fetchSingleBlog();

  },[id]);
  console.log('blog data')
  console.log(blog)
  return (
    <>
      <div className='container shadow my-3'>
        <div className='col-md-12 d-flex items-center justify-content-center 
        bg-ligth'>
          <div className='row'>
            <h1 className='my-3'>{blog.title}</h1>
            <img
             src={`http://localhost:9000/${blog.thumbnail}`}
             className='img img-responsive img-rounded my-3'
             alt='
             '/>
             <p className=' my-3'> { blog.description}</p>
          </div>
        </div>
        <button  onClick={()=>  navigate('/')} className='btn btn-danger'>Back to Page</button>
      </div>
    </>
  )
}

export default SingleBlog
