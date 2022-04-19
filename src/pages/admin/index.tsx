import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Form from '../../components/Form/Form'
import { AuthCheck } from '../../components/AuthCheck'
import { deleteLink, getAllLinks, Link, updateLink } from '../../lib/links'
import { InferGetStaticPropsType } from 'next'
import { Button } from '../../components/Button/Button'
import Modal from 'react-modal'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore';

const user = {
  name: 'Renan Marins',
  email: 'tom@example.com',
  imageUrl:
    'https://instagram.fcgr4-1.fna.fbcdn.net/v/t51.2885-15/119043415_629999107947178_6153278004285483640_n.jpg?stp=c0.120.960.960a_dst-jpg_e35&_nc_ht=instagram.fcgr4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=Y6wkfU1T_TYAX9ZnZOJ&edm=AABBvjUBAAAA&ccb=7-4&ig_cache_key=MjM5NTk1ODc3OTIyMjg1MDU2NA%3D%3D.2-ccb7-4&oh=00_AT-SFHZJT27lfNNa5YQx_AdFwkUEEqSil3rrRCcrClPE3Q&oe=625FFA5F&_nc_sid=83d603',
}
const navigation = [
  { name: 'Site', href: '#', current: false },
  
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export const getStaticProps = async () => {
  const links = await getAllLinks()
  return {
    props: {
      links
    },
  }
}

const Admin: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [link, setLink] = useState<Link | null>(null);

  const linkRef = doc(firestore, 'links')

  const [realtimePost] = useDocumentData(linkRef);

  console.log(realtimePost)


  function openModal() {
    setIsOpen(true);
  }

 
  function closeModal() {
    setIsOpen(false);
  }
  
  return (
    <AuthCheck>

      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
              <Form />
            {/* /End replace */}
            <div>
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 border-2 rounded-xl border-solid border-gray-200 mt-16">
              <h1 className="text-3xl font-bold text-gray-900">Links</h1>
            </div>
            <ul className='flex flex-col gap-4 py-8 px-4 lg:px-8'>
            {props.links.map(item => {
            return (
              <li key={item.title} className="font-bold text-xl flex items-center gap-4">
              {item.title}
                <div className='cursor-pointer' onClick={() => {
                  setLink(item)
                  setIsDelete(false)
                  openModal()
                }}>
                  <svg className="w-6 h-6 fill-yellow-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <div className='cursor-pointer' onClick={() => {
                  setLink(item)
                  setIsDelete(true)
                  openModal()
                }}>
                  <svg className="w-6 h-6 fill-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </div>
              </li>
            )
          })}
            </ul>
            </div>
          </div>
        </main>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={`shadow p-4`}
        ariaHideApp={false}
        style={{
          overlay: {
            position: 'fixed',
            zIndex: 1020,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(35, 35, 35, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          content: {
            background: 'white',
            width: '45rem',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100vh - 2rem)',
            overflowY: 'auto',
            position: 'relative',
            border: '1px solid #ccc',
            borderRadius: '0.3rem',
          }}}
      >
        {
          isDelete ?
          link && <Delete link={link} closeModal={closeModal}/> :
          link && <Edit link={link} closeModal={closeModal} />
        }
      </Modal>
    </AuthCheck>
  )
}

export default Admin


export const Delete: React.FC<{link: Link, closeModal: () => void}> = (props) => {
  return (
    <div className='py-2'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Delete Link</h1>
        <button className='cursor-pointer mr-4' onClick={() => props.closeModal()}> X </button>
      </div>
      <div className='py-4 flex flex-col gap-8'>
        <p className='text-lg font-semibold'>Are you sure you want to delete this link?</p>
        <div className='flex justify-end '>
          <div className='flex gap-4'>
          <button className='bg-slate-200 text-black font-semibold px-4 py-2 rounded-md' onClick={() => {
            props.closeModal()
          }}>Cancelar</button>
          <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => {
            deleteLink(props.link.title)
            props.closeModal()
          }}>Deletar</button>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export const Edit: React.FC<{link: Link, closeModal: () => void}>  = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [link, setLink] = useState<Link>(props.link)
  
  const onSubmit = async (data: any) =>{
    toast.promise(
      updateLink({
        id: props.link.title,
        title: data.title,
        url: data.url
      }),
      {
        loading: 'Verificando usuário...',
        success: () => {
          return (
            <b>Link adicionado</b>
          )
       },
        error: <b>Deu erro</b>,
      }
    )  
  }
  
  return (
    <div className='pt-8'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Edit Link</h1>
        <button className='cursor-pointer' onClick={() => props.closeModal()}> X </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" sm:rounded-md sm:overflow-hidden">
                <div className="py-5 bg-white space-y-6 sm:p-6">
                  
                <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <div className="mt-1">
                      <input
                        id="about"
                        className="px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Título"
                        defaultValue={link.title}
                        {...register("title")}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                    Breve descrição para o seu perfil. URLs são hiperlinks.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          {...register("url")}
                          type="text"
                          defaultValue={link.url}
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                 
                </div>
                <div className="px-4 py-3  text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  <p className='text-lg'>
                    Update Link
                  </p>
                  </button>
                </div>
              </div>
            </form>
    </div>
  )
}