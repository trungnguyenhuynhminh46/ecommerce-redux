import React from "react";
import { Link } from "react-router-dom";
// Component
import Icons from "./Icons";

const Footer = () => {
  return (
    <section className="bg-deep-blue text-white">
      <div className="container grid-layout mt-10 py-10">
        <div>
          <h2 className="footer--heading">Multimart</h2>
          <p className="max-w-[400px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            aliquid, quasi deserunt delectus, est ipsa blanditiis eveniet
            excepturi.
          </p>
        </div>
        <div>
          <h2 className="footer--heading">Top Categories</h2>
          <div className="flex flex-col gap-5">
            <div>
              <Link to="#" className="footer--link">
                Mobile Phones
              </Link>
            </div>
            <div>
              <Link to="#" className="footer--link">
                Modern Sofa
              </Link>
            </div>
            <div>
              <Link to="#" className="footer--link">
                Arm Chair
              </Link>
            </div>
            <div>
              <Link to="#" className="footer--link">
                Smart Watches
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h2 className="footer--heading">Usefull Links</h2>
          <div className="flex flex-col gap-5">
            <div>
              <Link to="#" className="footer--link">
                Shop
              </Link>
            </div>
            <div>
              <Link to="#" className="footer--link">
                Cart
              </Link>
            </div>
            <div>
              <Link to="#" className="footer--link">
                Login
              </Link>
            </div>
            <div>
              <Link to="#" className="footer--link">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h2 className="footer--heading">Contact</h2>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <Icons.MapPin />
              <p>123 Nguyễn Thái Sơn, Gò Vấp</p>
            </div>
            <div className="flex gap-4">
              <Icons.Phone />
              <p>0123456789</p>
            </div>
            <div className="flex gap-4">
              <Icons.Mail />
              <p>trung46@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      {/* Copy right */}
      <div className="py-5 flex justify-center items-center border-t border-solid border-[#22366c]">
        &copy; Copyright 2023, All right reserved
      </div>
    </section>
  );
};

export default Footer;
