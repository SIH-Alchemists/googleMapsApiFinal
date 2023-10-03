import React from "react";

function Card({ imageUrl, title, date, author, body }) {
  return (
    <div className="bg-yellow-400 py-5 rounded-lg px-2">
      <div
        className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <img src={imageUrl} className="w-full  mx-auto h-36" alt={title} />
        <a href="#!">
          <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></div>
        </a>
      </div>

      <h5 className="mb-3 text-lg font-bold">{title}</h5>
      <div className="mb-3 flex items-center justify-center text-sm font-medium text-yellow-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="mr-2 h-5 w-5"
        >
          {/* SVG Path */}
        </svg>
        Contribute
      </div>
      <p className="mb-6 text-neutral-500 dark:text-neutral-500">
        <small>
          Published <u>{date}</u> by <a href="#!">{author}</a>
        </small>
      </p>
      <p className="text-neutral-500 dark:text-neutral-500">{body}</p>
    </div>
  );
}

export default Card;
