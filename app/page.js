import Link from "next/link"


export default function Home() {
  return (
        <>
        <div className='p-5 bg-container h-screen bg-cover'>
            <div className="mx-auto max-w-7xl px-[0.5rem] py-28 sm:py-20 lg:gap-x-14 lg:px-8 md:flex flex-col justify-center h-screen">
                <div className='lg:w-[650px]'>
                <h1 className='text-white text-3xl leading-9 md:text-5xl md:leading-[60px]'>Find The Job That Fits Your Life</h1>
                <p className="text-white text-base leading-7 mt-6 mb-6 md:text-2xl md:leading-10">Millions are people searching for jobs,Salary information,Company reviews.Find The Job that fits you abilities
                    and potential..
                </p>
                <Link href='/jobs'><button type="button" className="bg-[#6366f1] border-0 text-white rounded p-2 pl-4 pr-4">Find jobs</button>
                </Link>
                </div>
            </div>
        </div>
        </>
  )
}
