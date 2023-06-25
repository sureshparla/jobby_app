"use client"

import { useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {useParams } from 'next/navigation';
import Loader from '@/Components/Loader/page';
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn,MdWork} from 'react-icons/md'
import {RiShareBoxLine} from 'react-icons/ri'
import Skills from '@/Components/Skills/page';
import SimilarJobs from '@/Components/SimilarJobs/page';
import Link from 'next/link';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProductDetails = () => {
    const [jobsObj,setJobsObj] = useState({})
    const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial)
    const [skills,setSkills] = useState([])
    const [lifeOfCompany,setLifeCompany] = useState({})
    const [similarJobs,setSimilarJobs] = useState([])
    const pd = useParams();
    const jobId = pd.id


const getFormattedData = data => ({
    id: data.id,
    title: data.title,
    location: data.location,
    employmentType: data.employment_type,
    companyWebsiteUrl: data.company_website_url,
    jobDescription: data.job_description,
    companyLogoUrl: data.company_logo_url,
    rating: data.rating,
    packagePerAnnum: data.package_per_annum,
    imageUrl: data.img_url,
    name: data.name,
    description: data.description,
    imgUrl: data.image_url,
  })


  useEffect(()=>{
    const getJobDetails = async() =>{
      setApiStatus(apiStatusConstants.inProgress)
      const jwtToken = Cookies.get('jwtToken')
      // const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`
      const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
      const res = await fetch(`https://apis.ccbp.in/jobs/${jobId}`,options);
      if(res.ok){
        const data = await res.json()
        const updateData = getFormattedData(data.job_details)
        const skillsUpdateData = data.job_details.skills.map(skill => ({
            imageUrl: skill.image_url,
            name: skill.name,
          }))
          const lifeAtCompanyUpdate = getFormattedData(data.job_details.life_at_company)
          const similarJobsUpdate = data.similar_jobs.map(job => ({
            Id: job.id,
            title: job.title,
            location: job.location,
            employmentType: job.employment_type,
            jobDescription: job.job_description,
            companyLogoUrl: job.company_logo_url,
            rating: job.rating,
            packagePerAnnum: job.package_per_annum,
          })) 
        setJobsObj(updateData)
        setApiStatus(apiStatusConstants.success)
        setSimilarJobs(similarJobsUpdate)
        setLifeCompany(lifeAtCompanyUpdate)
        setSkills(skillsUpdateData)
      }
      else{
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getJobDetails();

  },[jobId])
  
  function SuccessView(){
    return(
        <div  className='bg-black h-full mx-auto px-2 md:px-[1.5rem] md:py-28 py-24 lg:gap-x-14  lg:px-8 xl:px-[7.5rem]'>
            <div className="bg-[#272727] p-2 mt-3 mb-4 rounded md:p-8">
                <div className='flex'>
                    <img src={jobsObj.companyLogoUrl} alt={jobsObj.title} className='h-16 w-16 rounded-sm' />
                    <div className='flex flex-col ml-4 mr-4'>
                        <h1 className='text-white text-xl md:text-xl font-base leading-10'>{jobsObj.title}</h1>
                        <div className='flex items-center'>
                            <AiFillStar className='text-[#fff700] text-2xl'/>
                            <p className='text-white text-xl font-base leading-10 ml-2 mr-3'>{jobsObj.rating}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='flex items-center'>
                            <MdLocationOn className='text-white text-xl mr-1'/>
                            <p className='text-white text-base md:text-xl font-base leading-10'>{jobsObj.location}</p>
                        </div>
                        <div className='flex items-center  mr-2 ml-2'>
                            <MdWork className='text-white text-xl mr-1'/>
                            <p className='text-white text-base md:text-xl font-base leading-10'>{jobsObj.employmentType}</p>
                        </div>
                    </div>
                    <p className='text-white text-lg font-base leading-10 pl-2'>{jobsObj.packagePerAnnum}</p>
                </div>
                <hr className='border-t-2 border-slate-500 mt-5 mb-5' />
                <div className='flex items-center justify-between mt-2 mb-2'>
                    <h1 className='text-white text-2xl font-bold'>Description</h1>
                    <a href={jobsObj.companyWebsiteUrl} target='_blank' className='text-indigo-900 text-2xl font-bold hover:text-[#042cf2] flex items-center'>Visit <span><RiShareBoxLine className='h-8 w-8 ml-3'/></span></a>
                </div>
                <p className='text-[#abb0ac] mt-4 mb-4 leading-8'>{jobsObj.jobDescription}</p>

                {/* Skills */}

                <div>
                    <h1 className='text-white text-2xl font-bold'>Skills</h1>
                    <div className='flex items-center flex-wrap mt-5 mb-5'>
                        {skills.map((skill) =>(
                            <Skills skillsList={skill} key={skill.id} />
                        ))}
                    </div>
                </div>
                {/* lifeOfCompany */}
                <div className='mt-4 mb-4'>
                    <h1 className='text-white text-2xl font-bold'>About Company</h1>
                    <div className='md:flex'>
                        <p className='text-[#abb0ac] mt-4 mb-4 leading-8'>{lifeOfCompany.description}</p>
                        <img src={lifeOfCompany.imgUrl} alt={jobsObj.title} className='w-full md:w-48 lg:w-[20rem] md:ml-4 rounded' />
                    </div>
                </div>
            </div>
            {/* similarJobs */}
            <div className='mt-8 mb-8'>
                <h1 className='text-white text-2xl font-bold'>Similar Jobs</h1>
                <div className='flex flex-wrap'>
                    {similarJobs.map((job) =>(
                        <SimilarJobs JobCardDetails={job} key={job.id}/>
                    ))}
                </div>
            </div>
        </div>
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
  

  function jobsFinalView(){
    switch(apiStatus){
      case apiStatusConstants.success:
        return SuccessView()
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return <Loader/>
      default:
        return null
    }
  }

  return (
    <div className='h-full '>
      {jobsFinalView()}
    </div>
  )
}



export default ProductDetails;