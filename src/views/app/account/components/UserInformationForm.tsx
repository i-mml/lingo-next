"use client";

import { Datepicker } from "@ijavad805/react-datepicker";
import GoogleIcon from "@mui/icons-material/Google";
import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import CalenderIcon from "@/assets/calender.svg";
import MobileIcon from "@/assets/mobile.svg";
import UserIcon from "@/assets/user.svg";
import { useMutation } from "@tanstack/react-query";
import { PutAuthUpdateDetail } from "@/api/services/auth";
import OutlineButton from "@/components/shared/OutlineButton";
import InputWithIcon from "@/components/shared/InputWithIcon";

const UserInformationForm = ({ userData }: any) => {
  const { t: translate } = useTranslation();
  const [userInfo, setUserInfo] = useState({
    name: userData?.name,
    birthday: userData?.birthday,
  });

  const handleChangeBirtDate = (date: any) => {
    setUserInfo((prev: any) => ({
      ...prev,
      birthday: moment(date).format("YYYY-MM-DD"),
    }));
  };

  const disabledAction =
    (userData?.name === userInfo?.name &&
      userData?.birthday === userInfo?.birthday) ||
    userInfo?.name === "";

  const updateDetailMutatoin = useMutation({
    mutationFn: () =>
      PutAuthUpdateDetail({
        name: userInfo?.name || userData?.name,
        birthday: userInfo?.birthday || userData?.birthday,
      })
        .then((res) => {
          if (res.status === 204) {
            toast.success("ویرایش اطلاعات با موفقیت انجام شد.");
          }
        })
        .catch(() => {}),
  });

  useEffect(() => {
    setUserInfo({
      name: userData?.name,
      birthday: userData?.birthday,
    });
  }, [userData]);

  return (
    <div className="profile-content mt-4 bg-backgroundMain w-[91.11%] md:w-[96%] md:min-w-[684px] mx-auto !mb-5 py-4 px-4 md:px-6 rounded-2xl">
      <div className="flex-title flex items-center justify-between mb-4 md:mb-6">
        <h2 className="page-title text-main text-base md:text-lg font-semibold">
          {translate("pages.profile.Account Information")}
        </h2>
        <OutlineButton
          className="save-change-button hidden md:block text-center text-sm font-semibold leading-4 py-3 px-5 rounded-xl disabled:!text-[#525252] !border-[#525252] border-primary w-[130px]"
          buttonProps={{
            disabled: disabledAction,
          }}
          onClick={() => updateDetailMutatoin.mutate()}
        >
          {translate("pages.profile.Save Changes")}
        </OutlineButton>
      </div>

      <div className="input-label disabled-label text-[#737373] text-xs font-medium mb-2">
        {translate("pages.profile.Mobile Number")}
      </div>
      {userData?.phone ? (
        <div className="full-width name-input w-full h-12 p-4 flex items-center gap-2 bg-borderMain rounded-lg">
          <MobileIcon />
          <div className="mobile text-sm text-[#737373]">{userData?.phone}</div>
        </div>
      ) : (
        <div className="full-width name-input w-full h-12 p-4 flex items-center gap-2 bg-borderMain rounded-lg">
          <GoogleIcon style={{ color: "#9CA3AF" }} />
          <div className="mobile text-sm text-[#737373]">{userData?.email}</div>
        </div>
      )}
      <div className="input-box w-full mt-6">
        <div className="input-label text-gray400 text-xs font-medium mb-2">
          {translate("pages.profile.Fullname")}
        </div>
        <InputWithIcon
          icon={<UserIcon />}
          inputProps={{
            value: userInfo?.name,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setUserInfo((prev: any) => ({ ...prev, name: e.target.value })),
          }}
        />
      </div>
      <div className="input-box w-full mt-6">
        <div className="input-label text-gray400 text-xs font-medium mb-2">
          {translate("pages.profile.Birthdate")}
        </div>
        <div
          className={`with-icon-content flex items-center w-full gap-2 border border-borderMain rounded-lg h-12 py-3 px-4 hover:border-gray400 focus:border-borderSelected`}
        >
          <div className="icon w-6 h-6">
            <CalenderIcon className="w-6 h-6" />
          </div>
          <Datepicker
            modeTheme="dark"
            value={userInfo?.birthday || userData?.birthday}
            onChange={handleChangeBirtDate}
            closeWhenSelectADay
            adjustPosition="modal"
            format="YYYY-M-D"
            input={
              <input
                className="input h-full !bg-transparent border-none outline-none text-main !cursor-pointer"
                placeholder={translate("pages.profile.Select Birthdate")}
              />
            }
          />
        </div>
      </div>
      <OutlineButton
        className="mobile-save-change-button md:hidden block mt-8 text-center text-sm font-semibold leading-4 py-3 px-5 disabled:!text-[#525252] !border-[#525252] border-primary w-full md:w-[130px]"
        buttonProps={{
          disabled: disabledAction,
        }}
        onClick={() => updateDetailMutatoin.mutate()}
      >
        {translate("pages.profile.Save Changes")}
      </OutlineButton>
    </div>
  );
};

export default UserInformationForm;
