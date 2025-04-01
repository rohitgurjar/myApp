import Image from "next/image";

const steps = [
  {
    icon: "/images/link.svg",
    title: "We give you a link",
    description:
      "It’s customized with your name so everyone will recognize it’s from you.",
  },
  {
    icon: "/images/send.svg",
    title: "Send your link to family and friends",
    description:
      "We import your contacts’ emails to save you time. Or you can enter them on your own. It’s up to you!",
  },
  {
    icon: "/images/birthday.svg",
    title: "You get the birthday",
    description:
      "They enter their name, email, and birth date in our short form and you’re all set!",
  },
];

const features = [
  {
    icon: "/images/smile-face.png",
    title: "Free and Easy",
    description: "We keep it simple to help you keep it simple.",
  },
  {
    icon: "/images/privacy-policy.png",
    title: "Safe and Private",
    description:
      "Your contacts are kept under (virtual) lock and key and we’ll never share those email addresses with anyone. Period.",
  },
  {
    icon: "/images/phone-book.png",
    title: "We do the Work",
    description:
      "After you send the email we take over. We collect and store everything for you and you can relax.",
  },
  {
    icon: "/images/email.png",
    title: "You get Reminders",
    description:
      "We’ll watch the calendar and let you know when a birthday is approaching. You never miss a special day and you’re a birthday super hero!",
  },
];

export default function Home() {
  return (
    <>
      <div className="realtive flex h-[500px] justify-center items-center bg-white">
        <Image
          src="/images/banner.jpg"
          alt=""
          width={500}
          height={500}
          className="h-full w-full object-fill"
        />
        <div className="absolute text-center space-y-5">
          <h1
            className="text-center text-white font-bold text-4xl font-sans"
            style={{ textShadow: "2px 2px 4px #000" }}
          >
            Never Miss a Birthday Again!
          </h1>
          {/* <button className="bg-green-700 py-3 px-8 rounded-3xl text-white font-bold">
            GET BIRTHDAYS
          </button> */}
        </div>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center bg-white py-20">
        <h1 className="font-sans font-semibold text-3xl text-black text-center mb-10 ">
          3 Steps to Birthday Mastery!
        </h1>

        <div className="flex space-x-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <Image
                src={step.icon}
                alt={step.title}
                width={80}
                height={80}
                className="w-1/2 object-fill"
              />
              <h2 className="text-2xl text-center text-black mt-4">
                {step.title}
              </h2>
              <p className="text-lg text-black w-[22rem] text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* <button className="bg-green-700 py-3 px-8 rounded-3xl text-white font-bold mt-10 mb-10">
          LEARN MORE
        </button> */}
      </div>

      <div className="flex flex-col items-center justify-center bg-[#f5f5f5] py-20">
        <h1 className="text-4xl font-medium text-black mb-10 text-center">
          The Good Stuff
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={80}
                height={80}
                className="w-16 h-16"
              />
              <h2 className="text-2xl font-medium text-black">
                {feature.title}
              </h2>
              <p className="text-sm text-gray-700 w-[16rem]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="mt-10">
          <button className="bg-green-700 py-3 px-8 rounded-3xl text-white font-bold mt-10">
            LET'S DO IT
          </button>
        </div> */}
      </div>

      <div className="flex lg:flex-row flex-col items-center justify-center bg-white space-y-5 p-10">
        <div className="flex lg:flex-row flex-col justify-center">
          <div className="w-[20%] flex  justify-center">
            <Image
              src="/images/bday.svg"
              alt="Timer"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="w-[40%] flex items-center">
            <p className="text-2xl text-gray-700">
              Established in 2001, BirthdayAlarm is the trusted FREE reminder
              service with over 50 Million users. We remember the date, so you
              can celebrate!
            </p>
          </div>
        </div>
      </div>

      <div className="flex relative bg-white justify-center items-center h-[500px]">
        <div className="w-1/2 h-full flex flex-col items-center justify-center bg-[#fef9d1] space-y-5">
          <Image
            src="/images/birthday-promo-2.webp"
            alt="birthday greeting"
            width={400}
            height={400}
          />
          <p className="text-md text-black w-[21rem] text-center">
            Choose the perfect birthday greeting from our collection of 1000+
            one-of-a-kind eCards!
          </p>
          {/* <Button text='BIRTHDAY CARDS' className={''} /> */}

          <button className="bg-green-700 py-3 px-8 rounded-3xl text-white font-bold">
            BIRTHDAY CARDS
          </button>
        </div>
        <div className="w-1/2 bg-red-green-200 h-full flex flex-col items-center justify-center space-y-5 bg-[repeating-linear-gradient(75deg,#fcf4f4_10px,#fcf4f4_12px,#FFF9F9_12px,#FFF9F9_20px)]">
          <Image
            src="/images/anniversary-promo.webp"
            alt="Anniversary greeting"
            width={320}
            height={320}
          />
          <p className="text-black w-[23rem] text-center">
            Let your husband, wife or partner know how much they mean with an
            online anniversary greeting card!
          </p>
          {/* <Button text='ANNIVERSARY CARDS' className={'bg-[#951c1c] hover:bg-red-900'} /> */}

          <button className="bg-green-700 py-3 px-8 rounded-3xl text-white font-bold">
            ANNIVERSARY CARDS
          </button>
        </div>
      </div>

      <div className="flex relative bg-[#fff] justify-center items-center h-[400px]">
        <div className="h-full flex-col flex justify-center  space-y-5 pr-10">
          <h1 className="text-[#17a17e] text-lg text-left">NEW FEATURE</h1>
          <h2 className="text-4xl text-black text-left w-[17rem]">
            Effortless Messages with AI Magic!
          </h2>
          <p className="text-black w-[24rem]">
            Struggling to find the right words? Our new AI-powered tool helps
            you craft personalized, heartfelt messages for any occasion in
            seconds.
          </p>
          {/* <Button text={'TRY MESSAGE GENERATION NOW'} className={''} /> */}

          <button className="bg-green-700 py-3 px-8 rounded-3xl text-white font-bold">
            TRY MESSAGE GENERATION NOW
          </button>
        </div>
        <div className="h-full flex-col flex">
          <video autoPlay loop muted playsInline className="h-full w-full">
            <source src="/images/generate-2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}
