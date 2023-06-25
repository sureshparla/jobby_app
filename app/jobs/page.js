'use client'

import Loader from '@/Components/Loader/page'
import Profile from '@/Components/Profile/page'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import JobCard from '@/Components/jobCard/page'
import EmploymentType from '@/Components/EmploymentType/page'
import SalaryRange from '@/Components/SalaryRange/page'



const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConst = {
  success:"SUCCESS",
  failure:"FAILURE",
  initial: "INITIAL",
  progress:"INPROGRESS"
}

const Jobs = () => {
  const [jobsList,setJobsList] = useState([])
  const [apiStatus,setApiStatus] = useState(apiStatusConst.initial)
  const [loading,setLoading] = useState(true)
  const [searchJob,setJobSearch] = useState('')
  const [secondJobsList,setSecondsList] = useState([])
  const [employment,setEmployment] = useState("")


  useEffect(()=>{
    getJobs()
  },[])

  const getJobs = async () =>{
    setApiStatus(apiStatusConst.progress)
    const url = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwtToken')
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(url,options)
        if(response.ok === true){
          const data = await response.json()
          setJobsList(data.jobs)
          setSecondsList(data.jobs)
          setApiStatus(apiStatusConst.success)
          setLoading(false)
        }
        else{
          setApiStatus(apiStatusConst.failure)
        }
  }

  function renderSuccessView(){
    return(
        <>
         {jobsList.map((job) =>(
              <JobCard JobCardDetails={job} key={job.id}/>
            ))}
        </>
    )
}

function renderFailureView(){
  return(
    <div className='h-[50vh] flex flex-col items-center justify-center mt-7'>
      <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' alt='failure'
       className='w-[17rem] mb-3 ' />
       <h1 className='text-white text-2xl font-bold'>Oops! Something went Wrong</h1>
       <p className='text-[#abb0ac] leading-8 mt-4 mb-4'>we cannot seen to find the page are looking for..</p>
       <button type='button' className='bg-[#3f51b5] rounded text-white font-base p-2 pl-3 pr-3'>Retry</button>
    </div>
  )
}


  function renderSwitchConditions(){
    switch(apiStatus){
        case apiStatusConst.success:
            return renderSuccessView();
        case apiStatusConst.failure:
            return renderFailureView();
        case apiStatusConst.progress:
            return <Loader />
        default:
            return null
    }
}

  const onSearchName = event =>{
    setJobSearch(event.target.value)
    // console.log(event.target.value)
  }

  const onSearchBtn = () =>{
    const jobsListData = secondJobsList
    const searchResults = jobsListData.filter((job) =>
    job.title.toLowerCase().includes(searchJob)
    )
    if(searchResults.length !== 0){
      setJobsList(searchResults)
    }
    else{
      return emptyView()
    }
  }

  const emptyView = () =>{
    return(
        <div className='flex flex-col items-center justify-center h-[50vh]'>
          <img src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' alt='not-found'
           className='w-[190px]' />
           <h1 className='text-white text-2xl font-bold'>No Jobs Found</h1>
           <p className="text-[#445366] font-semibold text-xl text-center">We could not find any jobs,Try another filter..</p>
        </div>
    )
  }

  const onToggleCheckEmployment = eachType =>{
    console.log(eachType)
    setEmployment(eachType),{getJobs}
  }

  // const onToggleSalary = salaryRangeId =>{
  //   set
  //   console.log(salaryRangeId)
  // }

  return (
    <>
    {loading ? <Loader /> : (
    <div className='bg-black h-full mx-auto px-[12px] md:px-[1.5rem] md:py-28 py-24 lg:gap-x-14  lg:px-8 xl:px-[7.5rem] flex flex-col md:flex-row'>
        <div className='md:w-[420px] mb-9'>
          <Profile />
          <hr className='border-t-2 border-slate-500 mt-5 mb-5'/>

          {/* employment_type */}

          <div>
            <h1 className='text-white text-xl font-bold'>Type of Employment</h1>
            <ul>
              {employmentTypesList.map((eachType) => (
                <EmploymentType 
                employmentTypesList={eachType}
                 key={eachType.employmentTypeId}
                 onToggleCheckEmployment={onToggleCheckEmployment} 
                 />
              ))}
            </ul>
          </div>
          <hr className='border-t-2 border-slate-500 mt-5 mb-5'/>

          {/* salaryRangesList */}

          <div>
            <h1 className='text-white text-xl font-bold'>Salary range</h1>
            <ul>
              {salaryRangesList.map((salary) => (
                <SalaryRange salaryRangesList={salary}
                 key={salary.salaryRangeId}
                  />
              ))}
            </ul>
          </div>
          <div className='flex justify-between items-center mt-8 mb-2'>
            <button type='button' className='bg-red-400 text-[#fff] rounded text-xl font-medium p-2 w-28 hover:bg-red-800'>Clear</button>
            <button type='button' className='bg-indigo-400  text-[#fff] rounded text-xl font-medium p-2 w-28 hover:bg-indigo-800'>Apply</button>
          </div>
        </div>

        {/* jobsCards */}

        <div className='md:ml-[50px] md:w-[80%]'>
          <div className='flex items-center border-2 border-slate-500 rounded p-1 max-w-[340px]'>
            <input type='text' placeholder='Search Role'
             className='outline-none bg-transparent text-white w-full placeholder:italic placeholder:text-white'
             onChange={onSearchName} 
             value={searchJob}/>
            <button type='button' 
            className='bg-[#423e3a] p-3 rounded m-[-4px]'
            onClick={onSearchBtn}
            ><BsSearch className='text-white'/></button>
          </div>
          <div>
            {renderSwitchConditions()}
          </div>
        </div>
    </div>
    )}
    </>
  )
}

export default Jobs






