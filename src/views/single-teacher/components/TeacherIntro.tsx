"use client";

import React from "react";

const TeacherIntro = () => {
  return (
    <div className="max-w-lg mx-auto">
      <div
        className="w-full bg-gray400 rounded-lg grid place-items-center"
        style={{ aspectRatio: 16 / 9 }}
      >
        <div className="relative rounded-lg overflow-hidden w-full h-full">
          <img
            className="w-full h-full object-cover rounded-lg"
            src="https://oteacher-avatars.s3.ir-thr-at1.arvanstorage.ir/oteacher-avatars%2F2025%2F03%2F17417785102127.JPG"
            style={{ height: "unset" }}
          />
          <div className="border border-white p-3 rounded-full cursor-pointer player-hover absolute top-0 bottom-0 right-0 left-0 mx-auto my-auto w-max h-max">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex"
            >
              <path
                d="M4 12V8.44002C4 4.02002 7.13 2.21002 10.96 4.42002L14.05 6.20002L17.14 7.98002C20.97 10.19 20.97 13.81 17.14 16.02L14.05 17.8L10.96 19.58C7.13 21.79 4 19.98 4 15.56V12Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <path
                d="M4 12V8.44002C4 4.02002 7.13 2.21002 10.96 4.42002L14.05 6.20002L17.14 7.98002C20.97 10.19 20.97 13.81 17.14 16.02L14.05 17.8L10.96 19.58C7.13 21.79 4 19.98 4 15.56V12Z"
                stroke="#33A3FF"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="whitespace-pre-line text-right text-[16px] md:text-lg mt-4 text-main">
        {`سلام دوست عزیزم ، من محمدم 
با من همراه شو اگر میخوای بهترین بازخورد در سریع ترین زمان رو داشته باشی.
از تجربیاتمم بخوام بگم 20 سال مدرس تخصصی زبان انگلیسی هستم و هزاران شاگرد موفق در سراسر دنیا دارم.`}
      </div>
    </div>
  );
};

export default TeacherIntro;
