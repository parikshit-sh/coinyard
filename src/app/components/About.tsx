import Image from "next/image";

const About = () => {
  return (
    <div id="about">
      <div
        className="flex flex-col md:flex-row items-center justify-center 
      md:justify-between text-[var(--text-color)] relative px-4 md:px-16 py-8 bg-gradient-to-r from-[var(--background-start-rgb)] 
      to-[var(--background-end-rgb)]"
      >
        <div
          className="flex flex-col items-center md:items-start justify-center 
        md:text-left w-full md:w-1/2"
        >
          <h2 className="text-5xl">
            Track and Trade with confidence with
            <span
              className="bg-gradient-to-r from-blue-900 via-violet-500 to-pink-400 
            text-transparent bg-clip-text ml-2"
            >
              our platform.
            </span>
          </h2>
          <p className="pt-2 text-base md:text-lg lg:text-xl opacity-70">
            Stay ahead in the crypto world with TokenStats. Get real-time
            updates and expert market insights to guide your investments.
          </p>
          <a
            href="#"
            className="btn bg-transparent border-[var(--text-color)] border p-2 
              rounded-full text-center sm:w-80 m:w-20 lg:w-36 hover:bg-[#610AEC] 
              transition ease-in-out hover:text-white mt-8"
          >
            Explore Now
          </a>
        </div>
        <div
          className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end 
        mt-8 md:mt-0"
        >
          <div className="relative w-full max-w-xs md:max-w-lg lg:max-w-xl">
            <Image
              src="/images/about.png"
              width={700}
              height={700}
              alt="3D Cash Money"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row-reverse items-center justify-center 
      md:justify-between text-[var(--text-color)] relative px-4 md:px-16 py-2 
      bg-gradient-to-r from-[var(--background-start-rgb)] to-[var(--background-end-rgb)]"
      >
        <div
          className="flex flex-col items-center md:items-start justify-center 
        md:text-left w-full md:w-1/2"
        >
          <h2 className="text-5xl">
            <span
              className="bg-gradient-to-r from-blue-900 via-violet-500 to-pink-400 
            inline-block text-transparent bg-clip-text"
            >
              24/7
            </span>{" "}
            Access to Customer Support
          </h2>
          <p className="pt-2 text-base md:text-lg lg:text-xl opacity-70">
            Our dedicated support team is available around the clock to assist
            you with any queries or issues. Whether you&apos;re a beginner or an
            expert, we&apos;re here to help.
          </p>
          <a
            href="#"
            className="btn bg-transparent border-[var(--text-color)] border p-2 
              rounded-full text-center sm:w-80 m:w-20 lg:w-36 hover:bg-[#610AEC] 
              transition ease-in-out hover:text-white mt-8"
          >
            Learn More
          </a>
        </div>
        <div
          className="flex-col md:flex w-full md:w-1/2 justify-center 
        md:justify-end md:mt-0"
        >
          <div className="relative w-full max-w-sm md:max-w-lg lg:max-w-xl mx-auto">
            <Image
              src="/images/24-7.png"
              width={700}
              height={700}
              alt="3D Cash Money"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row items-center justify-center 
      md:justify-between text-[var(--text-color)] relative px-4 md:px-16 py-8
       bg-gradient-to-r from-[var(--background-start-rgb)] to-[var(--background-end-rgb)]"
      >
        <div
          className="flex flex-col items-center md:items-start justify-center md:text-left
         w-full md:w-1/2"
        >
          <h2 className="text-5xl ">
            <span
              className="bg-gradient-to-r from-blue-900 via-violet-500
             to-pink-400 inline-block text-transparent bg-clip-text"
            >
              Effortless
            </span>{" "}
            <br></br>
            Wallet Integration
          </h2>
          <p className="pt-2 text-base md:text-lg lg:text-xl opacity-70">
            Integrate your wallet seamlessly and gain instant access to all our
            powerful features. Whether you&apos;re a seasoned trader or a crypto
            newcomer, our platform supports a wide range of wallets to suit your
            needs.
          </p>
       
        </div>
        <div id="__wallet__" className="md:flex w-full md:w-1/2 justify-end md:justify-center mt-8 md:mt-0">
          <div className="relative w-full max-w-xs md:max-w-lg lg:max-w-[25rem] mx-auto">
            <Image
              src="/images/stars.png"
              alt="Star"
              className="absolute object-cover"
              width={200}
              height={200}
              style={{
                width: "20%",
                height: "auto",
                top: "29%",
                left: "15%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <Image
              src="/images/stars.png"
              alt="Star"
              className="absolute object-cover"
              width={159}
              height={159}
              style={{
                width: "20%",
                height: "auto",
                top: "76%",
                left: "90%",
                transform: "translate(-50%, -50%) scaleX(-1)",
              }}
            />

            <Image
              src="/images/3d-wallet.png"
              width={700}
              height={700}
              alt="3D Cash Money"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
