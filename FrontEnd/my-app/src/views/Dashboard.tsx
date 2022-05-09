import React, { useState } from 'react'
import { Genre } from '../interface/Genre';
import { IDictionary } from '../interface/IDictionary';
import { Movie } from '../interface/Movie';
import { Person } from '../interface/Person';
interface MovieObject {
  [key: string]: any
}
const classList = {
  "display": "none"
}
export function Dashboard() {
  const [formValues, setFormValues] = useState<MovieObject>();
  let modal = <div style={{ "display": "none" }} id="modal" className="flex items-center mx-auto w-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-3 displayModal" role="alert">
    <svg className="fill-current  h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
    <p>Movie has been inserted in the catalogue!</p>
  </div>
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let values = {
      "id": 0,
      "clickedCounter": 0,
      "rating": 0,
      "numberOfPeopleWhoRated": 0,
      "genres": null,
      "people": null,
      "imageLinks": [],
      ...formValues
    };
    values.imageLinks = formValues?.imageLinks.split(",")

    const response = await fetch("https://localhost:7121/api/movies/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        modal = <div id="modal" className="flex items-center mt-10 mx-auto w-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-3 displayModal" role="alert">
        <svg className="fill-current  h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
        <p>Movie has been inserted in the catalogue!</p>
      </div>
      })
  }
  function handleChange(item: any) {
    let formObj = Object.assign({}, formValues);
    const target = item.currentTarget;
    const index = target.getAttribute("name");
    if (index != null) {
      formObj[index] = target.value
      setFormValues(formObj)
    }

  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-20">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
              Movie title
            </label>
            <input value={formValues?.title} onChange={handleChange} name="title" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title" type="text" placeholder="Ex. Spiderman" />

          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Length (in minutes)
            </label>
            <input value={formValues?.length} onChange={handleChange} name="length" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="150" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-link">
              IMDB link
            </label>
            <input value={formValues?.imdbLink} onChange={handleChange} name="imdbLink" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-link" type="text" />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
              Year
            </label>
            <input value={formValues?.year} onChange={handleChange} name="year" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="2005" />
          </div>
        </div>
        <div className="w-full mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-link">
            Image links (separated by a comma)
          </label>
          <input value={formValues?.imageLinks} onChange={handleChange} name="imageLinks" className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-link" type="text" />
        </div>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Summary</label>
        <input value={formValues?.description} onChange={handleChange} name="description" id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Summary"></input>
        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded">
          Button
        </button>
      </form>
      {modal}
    </div>
  )
}
