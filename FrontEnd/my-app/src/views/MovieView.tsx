import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Genre } from '../interface/Genre';
import { Movie } from '../interface/Movie';
import { Person } from '../interface/Person';
import { ratingColor } from '../styleClasses/ratingColor';
interface RolesObject {
  [key: string]: Array<string>
}


export function MovieView() {
  const [movie, setMovie] = useState<Movie>();
  const [people, setPeople] = useState<RolesObject>({ "Actors": [], "Directors": [], "Producers": [] });
  let { id } = useParams();
  function transformPerson(person: Person) {
    let peopleObj = Object.assign({}, people);
    person.rolesList.forEach((item: string) => {
      const key = item + "s";
      peopleObj[key].push(person.firstName + " " + person.lastName + "_" + person.id)
    })
    console.log(peopleObj)
    setPeople(peopleObj)
  }
  useEffect(() => {
    fetch("https://localhost:7121/api/movies/" + id, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        data.people.forEach((element: Person) => {
          transformPerson(element)
        });
      })
    fetch("https://localhost:7121/api/stats/" + id, {
      method: "POST"
    })
  }, [])
  const carouselItems = movie?.imageLinks.map((item, index) =>
    <div key={index} className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="">
      <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800"></span>
      <img src={item} className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." />
    </div>
  )
  const genreItems = movie?.genres.map((genre, index) =>
    <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 mx-2 rounded dark:bg-gray-700 dark:text-gray-300">{genre.category}</span>
  )

  const crew = Object.keys(people).map((item, index) =>
    <div key={index}><span className='text-2xl'>{item}</span> <div className='flex border-t my-4'>{people[item].map((item, index) => {
      const items = item.split("_");
      const fullName = items[0];
      const id = items[1]
      return <Link
        to={"/people/" + id}
        key={index}
        className="
px-6
py-2
xl:w-full
rounded-t-lg
text-blue-600
cursor-pointer
"
      >
        <span key={index}>{fullName}</span>
      </Link>

    })}</div></div>
  )
  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-l bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">


        <div id="default-carousel" className="relative" data-carousel="static">

          <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
            {carouselItems}
          </div>

          <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
            {movie?.imageLinks.map((item, index) =>
              <button key={index} type="button" className="w-3 h-3 rounded-full bg-white dark:bg-gray-800" aria-current="true" aria-label={"Slide " + index + 1} data-carousel-slide-to={index}></button>
            )}


          </div>

          <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev="">
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              <span className="hidden">Previous</span>
            </span>
          </button>
          <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next="">
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              <span className="hidden">Next</span>
            </span>
          </button>
        </div>


        <div className="px-5 pb-5 mt-5">
          <div className='flex justify-between'>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{movie?.title} ({movie?.year})</h2>
            <h5 className='text-1xl font-semibold tracking-tight text-gray-900 dark:text-white'>Viewed {movie?.clickedCounter} times</h5>
          </div>

          <div className="flex justify-between items-center my-5">
            <span className="font-bold text-gray-900 dark:text-white">Length: {movie?.length} min</span>
            <div className="flex items-center">
              <span className='px-5 font-bold'>User Score</span> <p className="text-lg font-semibold inline-flex items-center px-2 py-1 rounded" style={ratingColor(movie?.rating)} >{movie?.rating}</p>
            </div>
          </div>
          <p>{movie?.description}</p>
          <div className='my-5 flex justify-between'>
            <div>{genreItems}</div>
            <a href={movie?.imdbLink ? movie.imdbLink : ""} className="text-blue-600">IMDB</a>
          </div>
          <div>
            <div className="flex justify-center flex-col">

              {crew}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}