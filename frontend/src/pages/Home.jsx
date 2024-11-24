import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/Home/BooksTable";
import BooksCard from "../components/Home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table"); //

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then(response => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books-List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading
        ? <Spinner />
        : showType === "table"
          ? <BooksTable books={books} />
          : <BooksCard books={books} />}
    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Spinner from "../components/Spinner";
// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showType, setShowType] = useState("table");

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:5555/books")
//       .then((response) => {
//         setBooks(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching books:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="p-4">
//       {/* Toggle Buttons */}
//       <div className="flex justify-center items-center gap-x-4">
//         <button
//           className={`px-4 py-1 rounded-lg ${
//             showType === "table" ? "bg-sky-600 text-white" : "bg-sky-300"
//           }`}
//           onClick={() => setShowType("table")}
//         >
//           Table
//         </button>
//         <button
//           className={`px-4 py-1 rounded-lg ${
//             showType === "card" ? "bg-sky-600 text-white" : "bg-sky-300"
//           }`}
//           onClick={() => setShowType("card")}
//         >
//           Card
//         </button>
//       </div>

//       {/* Header */}
//       <div className="flex justify-between items-center mt-4">
//         <h1 className="text-3xl font-bold">Books-List</h1>
//         <Link to="/books/create">
//           <MdOutlineAddBox className="text-sky-800 text-4xl" />
//         </Link>
//       </div>

//       {/* Loading Spinner */}
//       {loading ? (
//         <Spinner />
//       ) : showType === "table" ? (
//         // Table View
//         <table className="w-full border-separate border-spacing-2 mt-4">
//           <thead>
//             <tr>
//               <th className="border border-slate-600 rounded-md">No</th>
//               <th className="border border-slate-600 rounded-md">Title</th>
//               <th className="border border-slate-600 rounded-md max-md-hidden">
//                 Author
//               </th>
//               <th className="border border-slate-600 rounded-md max-md-hidden">
//                 Publish Year
//               </th>
//               <th className="border border-slate-600 rounded-md">Operations</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book, index) => (
//               <tr key={book._id} className="h-8">
//                 <td className="border border-slate-600 rounded-md text-center">
//                   {index + 1}
//                 </td>
//                 <td className="border border-slate-600 rounded-md text-center">
//                   {book.title}
//                 </td>
//                 <td className="border border-slate-600 rounded-md text-center max-md-hidden">
//                   {book.author}
//                 </td>
//                 <td className="border border-slate-600 rounded-md text-center max-md-hidden">
//                   {book.publishYear}
//                 </td>
//                 <td className="border border-slate-600 rounded-md text-center">
//                   <div className="flex justify-center gap-x-4">
//                     <Link to={`/books/details/${book._id}`}>
//                       <BsInfoCircle className="text-2xl text-green-800" />
//                     </Link>
//                     <Link to={`/books/edit/${book._id}`}>
//                       <AiOutlineEdit className="text-2xl text-yellow-600" />
//                     </Link>
//                     <Link to={`/books/delete/${book._id}`}>
//                       <MdOutlineDelete className="text-2xl text-red-600" />
//                     </Link>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         // Card View
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//           {books.map((book) => (
//             <div
//               key={book._id}
//               className="border p-4 rounded-md shadow-md bg-white"
//             >
//               <h2 className="text-lg font-bold">{book.title}</h2>
//               <p className="text-sm text-gray-600">Author: {book.author}</p>
//               <p className="text-sm text-gray-600">
//                 Publish Year: {book.publishYear}
//               </p>
//               <div className="flex justify-between items-center mt-2">
//                 <Link to={`/books/details/${book._id}`}>
//                   <BsInfoCircle className="text-2xl text-green-800" />
//                 </Link>
//                 <Link to={`/books/edit/${book._id}`}>
//                   <AiOutlineEdit className="text-2xl text-yellow-600" />
//                 </Link>
//                 <Link to={`/books/delete/${book._id}`}>
//                   <MdOutlineDelete className="text-2xl text-red-600" />
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
