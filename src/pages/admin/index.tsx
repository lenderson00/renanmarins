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
  console.log(props)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [link, setLink] = useState<Link | null>(null);


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
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="flex items-baseline ml-10 space-x-4">
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
                    <div className="flex items-center ml-4 md:ml-6">

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={user.imageUrl} alt="" />
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
                          <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  <div className="flex -mr-2 md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
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
                      <img className="w-10 h-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="px-2 mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
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
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Replace with your content */}
              <Form />
            {/* /End replace */}
            <div>
            <div className="px-4 py-4 mx-auto mt-16 border-2 border-gray-200 border-solid max-w-7xl sm:px-6 lg:px-8 rounded-xl">
              <h1 className="text-3xl font-bold text-gray-900">Links</h1>
            </div>
            <ul className='flex flex-col gap-4 px-4 py-8 lg:px-8'>
            {props.links.map(item => {
            return (
              <li key={item.title} className="flex items-center gap-4 text-xl font-bold">
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
        <button className='mr-4 cursor-pointer' onClick={() => props.closeModal()}> X </button>
      </div>
      <div className='flex flex-col gap-8 py-4'>
        <p className='text-lg font-semibold'>Are you sure you want to delete this link?</p>
        <div className='flex justify-end '>
          <div className='flex gap-4'>
          <button className='px-4 py-2 font-semibold text-black rounded-md bg-slate-200' onClick={() => {
            props.closeModal()
          }}>Cancelar</button>
          <button className='px-4 py-2 text-white bg-red-500 rounded-md' onClick={() => {
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
        loading: 'Verificando usu??rio...',
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
                <div className="py-5 space-y-6 bg-white sm:p-6">
                  
                <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <div className="mt-1">
                      <input
                        id="about"
                        className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="T??tulo"
                        defaultValue={link.title}
                        {...register("title")}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                    Breve descri????o para o seu perfil. URLs s??o hiperlinks.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <div className="flex mt-1 rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                          http://
                        </span>
                        <input
                          {...register("url")}
                          type="text"
                          defaultValue={link.url}
                          id="company-website"
                          className="flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                 
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-4 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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