import React from "react";
import Image from "next/image";

const WhyChoose: React.FC = () => {
  return (
    <div className="sm:container mx-auto p-8">
      <h2 className="text-2xl font-bold">Why Choose?</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 flex justify-start">
          <Image
            src="/images/users.jpg"
            title="React.js Developer"
            alt="Testimonial"
            width={672}
            height={745}
          />
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-lgl font-bold">Used & trusted</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Join thousands who love and use Choose.
          </p>

          <h3 className="text-lgl font-bold">156 Countries & more</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Use Choose daily to send money back home to your love ones.
          </p>

          <h3 className="text-lgl font-bold">Simple to use</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sending money is just as simple as sending a chat message.
          </p>

          <h3 className="text-lgl font-bold">Amazing Partners</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We work with the best partners in the industry to make it possible
            to send money very quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
