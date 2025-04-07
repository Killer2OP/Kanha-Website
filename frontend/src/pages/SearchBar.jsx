// import { useState } from "react";

// export default function SearchBar() {
//     const [selectedPackage, setSelectedPackage] = useState("Kanha Fun Tour with 1 Jeep Safari");
//     const [selectedDate, setSelectedDate] = useState("02 Apr '25 (Wed)");
//     const [selectedRooms, setSelectedRooms] = useState("1 Room, 2 Guests");
//     const [selectedNationality, setSelectedNationality] = useState("Indian");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({
//             package: selectedPackage,
//             date: selectedDate,
//             rooms: selectedRooms,
//             nationality: selectedNationality
//         });
//     };

//     const data = [
//         { label: "PACKAGE", value: selectedPackage, setValue: setSelectedPackage, options: ["Kanha Fun Tour with 1 Jeep Safari", "Kanha Explorer Tour with 2 Jeep Safaris", "Kanha Premium Tour Package"] },
//         { label: "DATE", value: selectedDate, setValue: setSelectedDate, options: ["02 Apr '25 (Wed)", "03 Apr '25 (Thu)", "04 Apr '25 (Fri)"] },
//         { label: "GUESTS", value: selectedRooms, setValue: setSelectedRooms, options: ["1 Room, 2 Guests", "1 Room, 1 Guest", "2 Rooms, 4 Guests"] },
//         { label: "NATIONALITY", value: selectedNationality, setValue: setSelectedNationality, options: ["Indian", "International"] }
//     ];

//     return (
//         <div className="bg-white shadow-xl sticky top-1 z-10 rounded-xl p-4 md:p-6 mx-auto max-w-6xl border border-gray-100 mt-1 mb-1">
//             <form onSubmit={handleSubmit} className="space-y-6 md:space-y-0">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//                     {
//                         data.map((field, index) => (
//                             <div key={index} className="relative group">
                                
//                                 <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 block transition-all group-hover:text-blue-600">
//                                     {field.label}
//                                 </label>
                                
//                                 <div className="relative">
//                                     <select
//                                         className="w-full p-3 pl-4 pr-10 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg text-gray-700 text-sm appearance-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm group-hover:border-blue-300"
//                                         value={field.value}
//                                         onChange={(e) => field.setValue(e.target.value)}
//                                     >
//                                         {
//                                             field.options.map((option, idx) => (
//                                                 <option className="text-black " key={idx}>{option}</option>
//                                             ))
//                                         }
//                                     </select>
//                                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                                         <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                                         </svg>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>
//                 <div className="flex justify-center lg:justify-end mt-2">
//                     <button
//                         type="submit"
//                         className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 text-white rounded-lg transition-all duration-200 px-8 py-3 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 active:translate-y-0"
//                     >
//                         Search Tours
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
import { useState } from "react";

export default function SearchBar() {
    const [selectedPackage, setSelectedPackage] = useState("Kanha Fun Tour with 1 Jeep Safari");
    const [selectedDate, setSelectedDate] = useState("02 Apr '25 (Wed)");
    const [selectedRooms, setSelectedRooms] = useState("1 Room, 2 Guests");
    const [selectedNationality, setSelectedNationality] = useState("Indian");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            package: selectedPackage,
            date: selectedDate,
            rooms: selectedRooms,
            nationality: selectedNationality
        });
    };

    const data = [
        { label: "PACKAGE", value: selectedPackage, setValue: setSelectedPackage, options: ["Kanha Fun Tour with 1 Jeep Safari", "Kanha Explorer Tour with 2 Jeep Safaris", "Kanha Premium Tour Package"] },
        { label: "DATE", value: selectedDate, setValue: setSelectedDate, options: ["02 Apr '25 (Wed)", "03 Apr '25 (Thu)", "04 Apr '25 (Fri)"] },
        { label: "GUESTS", value: selectedRooms, setValue: setSelectedRooms, options: ["1 Room, 2 Guests", "1 Room, 1 Guest", "2 Rooms, 4 Guests"] },
        { label: "NATIONALITY", value: selectedNationality, setValue: setSelectedNationality, options: ["Indian", "International"] }
    ];

    return (
        <div className="backdrop-blur-md bg-green-900/20 sticky top-1 z-10 rounded-2xl p-4 md:p-6 mx-auto max-w-6xl border border-white/20 mt-1 mb-1">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {
                        data.map((field, index) => (
                            <div key={index} className="relative group">
                                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1 block transition-all">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    {
                                        field.label === "DATE" ? (
                                            <input
                                                type="date"
                                                value={field.value}
                                                onChange={(e) => field.setValue(e.target.value)}
                                                className="w-full p-3 pl-4 pr-10 backdrop-blur-sm bg-white/40 hover:bg-white/50 border border-white/40 rounded-lg text-gray-800 text-sm transition-all"
                                            />
                                        ) : (
                                        <>
                                            <select
                                                className="w-full p-3 pl-4 pr-10 backdrop-blur-sm bg-white/40 hover:bg-white/50 border border-white/40 rounded-lg text-gray-800 text-sm appearance-none transition-all"
                                                value={field.value}
                                                onChange={(e) => field.setValue(e.target.value)}
                                            >
                                                {
                                                    field.options.map((option, idx) => (
                                                        <option className="bg-white text-gray-800" key={idx}>
                                                            {option}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-600 group-hover:text-blue-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 9l-7 7-7-7"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                        
                    }
                </div>
                <div className="flex justify-center lg:justify-end mt-2">
                    <button
                        type="submit"
                        className="backdrop-blur-sm text-white rounded-lg transition-all duration-200 px-8 py-3 font-medium hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Search Tours
                    </button>
                </div>
            </form>
        </div>
    );
}