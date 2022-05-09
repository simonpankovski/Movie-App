import React from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../../interface/Movie';
import { ratingColor } from '../../styleClasses/ratingColor';

export function MovieCard(
    { movie }: { movie: Movie }) {
    
    return (
        <Link to={"/movies/" + movie.id} className="flex flex-col mt-2 items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={movie.imageLinks[0]} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title} ({movie.year})</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.description.length > 180 ? movie.description.substring(0, 170) + '...' : movie.description}</p>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4 justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    <b>Length:</b> {movie.length} min
                                </p>

                                <div className="flex items-center">
                                    <p className="text-sm font-semibold inline-flex items-center p-1.5 rounded" style={ratingColor(movie.rating)} >{movie.rating}</p>
                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}