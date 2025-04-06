import React from "react";

const ApplicationContactUs = () => {
  return (
    <div
      className="grid place-items-center bg-backgroundLayout h-[100vh]"
      dir="rtl"
    >
      <div className="w-[90%] max-w-[350px] border border-primary py-8 px-4 rounded-xl cards-md-box-shadow m-2">
        <img
          alt="logo"
          src="/zabano-main-logo.png"
          className="w-24 h-24 mx-auto"
        />
        <h1 className="text-center text-main text-xl lg:text-2xl font-bold mt-6">
          پشتیبانی زبانو
        </h1>
        <p className="text-main text-lg lg:text-xl text-right mt-3">
          تمام تلاش ما در زبانو ، بر مبنای انتقال حسن رفتار با کاربران و
          پشتیبانی قدرتمند میباشد.
        </p>

        <div className="text-right text-gray400 text-lg lg:text-xl font-bold mt-8">
          چند نکته مهم:
        </div>
        <ul className="mt-3 text-main text-sm lg:text-[16px] list-disc pr-3">
          <li className="mt-2">از خاموش بودن VPN مطمئن شوید.</li>
          <li className="mt-2">
            اگر از وبسایت استفاده میکنید با مرورگر اصلی خود وارد سایت شوید.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApplicationContactUs;
