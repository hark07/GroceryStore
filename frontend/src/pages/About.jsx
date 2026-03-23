import { assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-green-50">
      
      {/* Section Title */}
      <div className="text-2xl text-center border-gray-300 pt-8">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Content */}
      <div className="my-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        
        {/* Image */}
        <img
          src={assets.hero_img} // replace with grocery store image
          alt="FreshBite Grocery Store"
          className="w-full md:max-w-[400px] h-[300px] rounded-lg shadow-lg object-cover"
        />

        {/* Text Content */}
        <div className="flex flex-col gap-5 text-gray-700 md:w-3/5 text-justify">
          
          <p>
            Welcome to <span className="font-semibold text-gray-900">Grocery-Store</span> — 
            your one-stop online grocery store for fresh fruits, vegetables, dairy, pantry essentials, and daily needs. 
            We bring high-quality groceries straight to your doorstep with care and convenience.
          </p>

          <h2 className="text-lg font-semibold text-gray-900">Why Choose Grocery-Store</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Fresh fruits and vegetables daily</li>
            <li>High-quality organic and local products</li>
            <li>Affordable prices for every household</li>
            <li>Fast and reliable doorstep delivery</li>
            <li>Easy returns and customer satisfaction guaranteed</li>
          </ul>

        </div>
      </div>
    </section>
  );
};

export default About;