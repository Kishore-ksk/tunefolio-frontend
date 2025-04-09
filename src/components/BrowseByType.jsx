import React from "react";

const musicTypes = [
  {
    title: "Keyboard",
    image: "/assets/vitae-london-o3xm7jAUp2I-unsplash.jpg",
    color: "#F97316",
  },
  {
    title: "Percussion",
    image: "/assets/kenny-eliason-TOf0z0ykWO8-unsplash.jpg",
    color: "#6366F1",
  },
  {
    title: "Vocals",
    image: "/assets/maxwell-hunt-0fh1QNs8KF0-unsplash.jpg",
    color: "#EC4899",
  },
  {
    title: "String",
    image: "/assets/sofia-lupi-9j4PH2hXJS8-unsplash.jpg",
    color: "#22D3EE",
  },
  {
    title: "Orchestral",
    image: "/assets/larisa-birta-slbOcNlWNHA-unsplash.jpg",
    color: "#84CC16",
  },
  {
    title: "Wind",
    image: "/assets/june-o-W1qsUD-XuDc-unsplash.jpg",
    color: "#EAB308",
  },
  {
    title: "Electronic",
    image: "/assets/kelly-sikkema-4qnhBQv4qcg-unsplash.jpg",
    color: "#EC4899",
  },

];

const BrowseByType = () => {
  return (
    <section className="bg-[#0D0D0D] text-white py-20 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Browse by Type
      </h2>

      <div className="flex justify-start overflow-auto">
        {musicTypes.map((type, index) => (
          <div
            key={index}
            className="relative group min-w-[230px] shadow-lg overflow-hidden"
          >
            <img
              src={type.image}
              alt={type.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div
              className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300"
              style={{
                background: `linear-gradient(to bottom, ${type.color}10, ${type.color}CC)`,
              }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2">{type.title}</h3>
              <button className="px-4 py-2 rounded-[4px] font-medium border-[1.5px] border-white hover:bg-white hover:text-black transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByType;
