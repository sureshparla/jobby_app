
import Link from 'next/link'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn,MdWork} from 'react-icons/md'


const JobCard = (props) => {
    const {JobCardDetails} = props
    const {company_logo_url,rating,title,location,package_per_annum,employment_type,job_description,id} = JobCardDetails
  return (
    <Link href={`jobs/${id}`}><div className='bg-[#272727] p-2 md:p-8 mt-3 mb-4 rounded cards'>
        <div className='flex'>
            <img src={company_logo_url} alt={title} className='h-16 w-16 rounded-sm' />
            <div className='flex flex-col ml-4 mr-4'>
                <h1 className='text-white text-xl md:text-xl font-base leading-10 '>{title}</h1>
                <div className='flex items-center'>
                    <AiFillStar className='text-[#fff700] text-2xl'/>
                    <p className='text-white text-xl font-base leading-10 ml-2 mr-3'>{rating}</p>
                </div>
            </div>
        </div>
        <div className='flex mt-4'>
            <div className='flex items-center'>
                <MdLocationOn className='text-white text-xl mr-1'/>
                <p className='text-white text-base md:text-xl font-base leading-10'>{location}</p>
            </div>
            <div className='flex items-center  mr-2 ml-2 md:mr-4 md:ml-4'>
                <MdWork className='text-white text-xl mr-1'/>
                <p className='text-white text-base md:text-xl font-base leading-10'>{employment_type}</p>
            </div>
            <p className='text-white text-lg font-base leading-10 pl-2'>{package_per_annum}</p>
        </div>
        <hr className='border-t-2 border-slate-500 mt-5 mb-5' />
        <h1 className='text-white text-2xl font-bold'>Description</h1>
        <p className='text-[#abb0ac] mt-4 mb-4 leading-8'>{job_description}</p>
    </div></Link>
  )
}

export default JobCard