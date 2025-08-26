"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import doctorPhoto from "@/assets/photos/douturaDeolane.png"; // exemplo

export default function DoctorCarousel() {
  const doctors = [
    {
      name: "Dra. Ellen",
      specialty: "Dermatologista",
      location: "Moema, SP",
      distance: "3,0km",
      photo: doctorPhoto,
    },
    {
      name: "Dr. João",
      specialty: "Cardiologista",
      location: "Pinheiros, SP",
      distance: "2,5km",
      photo: doctorPhoto,
    },
    {
      name: "Dra. Maria",
      specialty: "Pediatra",
      location: "Vila Mariana, SP",
      distance: "4,1km",
      photo: doctorPhoto,
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl"
      >
        {doctors.map((doctor, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative w-full h-72">
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-blue-900">{doctor.name}</h2>
                  <p className="text-gray-700">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">📍 {doctor.location}</p>
                </div>
                <span className="text-sm font-semibold text-blue-700">
                  {doctor.distance}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
