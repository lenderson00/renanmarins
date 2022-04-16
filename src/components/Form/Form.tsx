import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createLink, Link } from '../../lib/links';

export default function Form() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  

  
  const onSubmit = async (data: any) =>{
    toast.promise(
      createLink({
        title: data.title,
        url: 'https://'+data.url,
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
     <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  
                <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <div className="mt-1">
                      <input
                        id="about"
                        className="px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Título"
                        defaultValue={''}
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
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                  


                 
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  <p className='text-lg'>
                    Link
                  </p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
  )
}
