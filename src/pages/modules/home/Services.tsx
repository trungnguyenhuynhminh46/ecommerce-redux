import React from "react";
import services from "../../../assets/data/serviceData";

const Services = () => {
  return (
    <section className="my-10">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className={`p-4 flex items-center gap-2 cursor-pointer transition-all duration-300 ease-linear hover:scale-105`}
                style={{ background: service.bg }}
              >
                <div className="w-12 h-12 rounded-[50%] bg-black text-white flex justify-center items-center text-3xl">
                  <i className={service.icon}></i>
                </div>
                <div>
                  <h4 className="font-semibold">{service.title}</h4>
                  <p className="text-sm">{service.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
