import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20">
      {/* Section Title */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="Contact" text2="US" />
      </div>

      {/* Contact Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[400px] rounded-lg shadow"
          src={assets.contact_img}
          alt="Contact Ecommerce"
        />

        {/* Contact Info */}
        <div className="flex flex-col justify-center items-start gap-6 text-gray-700">
          <h2 className="font-bold text-xl">Visit Our Shop</h2>
          <p className="text-gray-600 leading-relaxed">
            50475 Mahendranagar <br />
            Bheemdatt-18, Kanchanpur, Nepal.
          </p>

          <p className="leading-relaxed">
            <strong>Phone:</strong> (+977) 986 2460 586 <br />
            <strong>Email:</strong> ecommerce@gmail.com
          </p>

          <h2 className="font-semibold text-xl">Join Our Ecommerce Family</h2>
          <p className="text-gray-600">
            Discover exciting opportunities to grow your career with us. <br />
            Explore our teams and find the perfect role to match your passion.
          </p>

          <button className="border border-black px-8 py-3 rounded hover:bg-black hover:text-white transition-all duration-300">
            Explore Careers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
