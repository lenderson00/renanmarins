import Link from 'next/link'

type Props = {
  title: string
  url: string
}

export const Button: React.FC<Props> = (props) => {
  return (
    <Link href={props.url} >
      <a target='_blank'>
        <li className='text-center text-lg active:scale-95 font-bold w-full animated bg-white py-4 rounded-lg hover:shadow-lg hover:-translate-y-1'>{props.title}</li>
      </a>
    </Link>
  )
}