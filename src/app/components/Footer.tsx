import Image from "next/image";
import { faXTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  return (
    <footer className="w-full bg-transparent pt-12 px-4 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center">
       
        <div className="mb-4 md:mb-0 p-4 ">
          <h2 className="text-2xl font-semibold">TokenStats</h2>
        </div>

        <div className="flex space-x-12 mb-4 md:mb-0">
          <a className="hover:underline">About Us</a>


          <a className="hover:underline">Terms of Use</a>

          <a className="hover:underline">Privacy Policy</a>
        </div>

       
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl md:ml-4"
          >
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" width="23" height="22" fill="white" viewBox="0 0 50 50" className="icon icons8-Facebook-Filled " >    <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"></path></svg>
          </a>
          <a href="https://X.com" target="_blank" rel="noopener noreferrer" className="text-2xl md:ml-4">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs">
        &copy; {new Date().getFullYear()} TokenStats
      </div>
    </footer>
  );
};

export default Footer;
