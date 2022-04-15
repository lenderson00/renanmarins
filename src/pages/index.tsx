import type { NextPage } from 'next'
import Image from 'next/image'

import { Button } from '../components/Button/Button'

const listOfData = [
  {
    title: 'Next.js',
    url: 'https://nextjs.org/',
  }, {
    title: 'React',
    url: 'https://reactjs.org/',
  }, {
    title: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
  }
]

const Home: NextPage = () => {
  return (
    <div className='px-[5vw] py-8 bg-gradient-to-b from-green-400 to-blue-400 min-h-screen flex justify-center items-center'>
      <div className='w-full '>
        <div className='text-center flex flex-col items-center gap-4'>
          <div className='h-24 w-24 bg-white rounded-full relative overflow-hidden shadow-xl'>
          <Image src="https://instagram.fcgr4-1.fna.fbcdn.net/v/t51.2885-15/119043415_629999107947178_6153278004285483640_n.jpg?stp=c0.120.960.960a_dst-jpg_e35&_nc_ht=instagram.fcgr4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=Y6wkfU1T_TYAX9ZnZOJ&edm=AABBvjUBAAAA&ccb=7-4&ig_cache_key=MjM5NTk1ODc3OTIyMjg1MDU2NA%3D%3D.2-ccb7-4&oh=00_AT-SFHZJT27lfNNa5YQx_AdFwkUEEqSil3rrRCcrClPE3Q&oe=625FFA5F&_nc_sid=83d603" alt="avatar image" layout='fill' objectFit='cover'/>
          </div>
        
          <p className='font-bold text-2xl text-white'>Renan Marins</p>
        </div>
        <ul className=' flex flex-col gap-4 py-4 mt-8  max-w-2xl mx-auto px-[5vw]'>
          {listOfData.map(item => {
            return (
              <Button title={item.title} url={item.url} key={item.title}/>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Home
