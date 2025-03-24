import React from 'react';

function App() {
  return (
    <div className=" bg-white flex items-center justify-center p-4">
      <div className=" w-full flex flex-col md:flex-row">
        {/* Left Section: Text Content */}
        <div className="p-8 md:w-2/3">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">INTRODUCTION</h2>
          <h3 className="text-2xl font-semibold mb-2">Welcome to Kanha National Park</h3>
          <p className="text-gray-700 leading-relaxed">
            Kanha National Park, also known as Kanha-Kisli National Park, is one of the famous tiger reserves of India and the largest national park located in the magical land of Madhya Pradesh, spanning the two districts of Mandla and Balaghat. The present-day Kanha area is separated into two protected areas, Hallon and Banjar, covering 250 and 300 square kilometers (97 and 116 sq mi), respectively. Kanha National Park was created on 1 June 1955 and was designated as a tiger reserve in 1973. Today, it sprawls over an area of 940 square kilometers. It is one of the most popular wildlife sanctuaries in India, attracting flocks of wildlife enthusiasts every year. Since its inception in 1862, Kanha has been rated as a top tiger zone and holds a significant place for the Barasingha.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Kanha is crowned as one of the best-administered and managed parks in India. It is one of the ‘Navratanas’ of India’s Project Tiger. A heightened tourist attraction within the Park is Bamni Dadar, popularly known as Sunset Point, which offers the most awe-inspiring backdrop of the sunset against grazing Sambhars and Gaurs, magnifying the natural splendor of the area. Aside from its diverse wildlife and bird population, the frequent sightings of tigers roaming in the wild at Kanha Wildlife Sanctuary remain the most popular tourist draw. Kanha Tiger Reserve is home to over 1,000 species of flowering plants. The lowland forest is a mixture of sal and other mixed-forest trees, interspersed with meadows. The highland forests are tropical moist, dry deciduous type, and of a completely different nature from bamboo on slopes.
          </p>
        </div>

        {/* Right Section: Tiger Image */}
        <div className="md:w-1/3 flex items-center justify-center p-4">
          {/* Placeholder for the tiger image */}
          <img
            src="https://www.akronzoo.org/sites/default/files/assets/banner/red-panda.png"
            alt="Tiger walking towards content"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;