"use client";

import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import MobileIcon from "@/assets/mobile.svg";
import UserIcon from "@/assets/user.svg";
import { useMutation } from "@tanstack/react-query";
import {
  PatchAuthUpdateProfile,
  PutAuthUpdateDetail,
} from "@/api/services/auth";
import OutlineButton from "@/components/shared/OutlineButton";
import InputWithIcon from "@/components/shared/InputWithIcon";
import WaveLoading from "@/components/shared/WaveLoading";
import moment from "moment-jalaali";
import DateObject from "react-date-object";
import CustomDatePicker from "@/components/shared/CustomDatePicker";

const UserInformationForm = ({ userData, isLoading }: any) => {
  const { t: translate } = useTranslation();
  const [userInfo, setUserInfo] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    username: userData?.username || "",
    birthday: userData?.birthday || "",
    avatar: userData?.avatar || null,
  });

  const handleChangeBirthDate = (date: DateObject | null) => {
    if (date) {
      setUserInfo((prev) => ({
        ...prev,
        birthday: moment(date.toDate()).format("YYYY-MM-DD"),
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateDetailMutation = useMutation({
    mutationFn: async () => {
      // Update avatar and username with FormData
      const formData = new FormData();
      formData.append("username", userInfo.username);
      if (userInfo.avatar) {
        // If avatar is a base64 string, convert to Blob
        if (userInfo.avatar.startsWith("data:image")) {
          const arr = userInfo.avatar.split(",");
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          formData.append("avatar", blob, "avatar.png");
        } else {
          formData.append("avatar", userInfo.avatar);
        }
      }
      await PatchAuthUpdateProfile(formData);
      // Update other details
      await PutAuthUpdateDetail({
        name: userInfo.name,
        email: userInfo.email,
        birthday: userInfo.birthday,
      });
    },
    onSuccess: () => {
      toast.success(translate("profile_updated"));
    },
  });

  const disabledAction =
    (userData?.name === userInfo.name &&
      userData?.email === userInfo.email &&
      userData?.username === userInfo.username &&
      userData?.birthday === userInfo.birthday &&
      userData?.avatar === userInfo.avatar) ||
    userInfo.name === "";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-content mt-4 bg-backgroundMain w-[91.11%] md:w-[96%] md:min-w-[684px] mx-auto !mb-5 py-4 px-4 md:px-6 rounded-2xl">
      <div className="flex-title w-full flex items-center justify-between mb-4 md:mb-6">
        <h2 className="page-title text-main text-base md:text-lg font-semibold">
          {translate("pages.profile.Account Information")}
        </h2>
        <OutlineButton
          className="save-change-button hidden md:block text-center text-sm font-semibold leading-4 py-3 px-5 rounded-xl disabled:!text-[#525252] !border-[#525252] border-primary w-[130px]"
          buttonProps={{
            disabled: disabledAction,
          }}
          onClick={() => updateDetailMutation.mutate()}
        >
          {translate("pages.profile.Save Changes")}
        </OutlineButton>
      </div>

      {/* Avatar Upload */}
      <div className="flex flex-col items-center mb-6">
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="avatar-upload"
          type="file"
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary bg-backgroundMain flex items-center justify-center">
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-12 h-12 text-gray400" />
            )}
          </div>
        </label>
        <span className="text-sm text-gray400 mt-2">
          {translate("pages.profile.click_to_change_avatar")}
        </span>
      </div>

      {/* Username Field */}
      <div className="input-box w-full mt-3 md:mt-6">
        <div className="input-label text-gray400 text-xs font-medium mb-2">
          {translate("pages.profile.username")}
        </div>
        <InputWithIcon
          icon={<UserIcon />}
          inputProps={{
            name: "username",
            value: userInfo.username,
            onChange: handleChange,
            placeholder: translate("pages.profile.enter_username"),
          }}
        />
      </div>

      {/* Contact Information */}
      <div className="input-label disabled-label text-gray400 text-xs font-medium mb-2 mt-3 md:mt-6">
        {translate("pages.profile.contact_information")}
      </div>
      {userData?.phone ? (
        <>
          {/* Show phone as disabled */}
          <div className="full-width name-input w-full h-12 p-4 flex items-center gap-2 bg-borderMain rounded-lg mb-2">
            <MobileIcon />
            <div className="mobile text-sm text-gray400">{userData?.phone}</div>
          </div>
          {/* Show email input */}
          <div className="input-box w-full">
            <div className="input-label text-gray400 text-xs font-medium mb-2">
              {translate("pages.profile.Email")}
            </div>
            <InputWithIcon
              icon={<MobileIcon />}
              inputProps={{
                name: "email",
                value: userInfo.email,
                onChange: handleChange,
                placeholder: translate("pages.profile.Enter Email"),
              }}
            />
          </div>
        </>
      ) : userData?.email ? (
        // If registered by email, show email as disabled and no phone field
        <div className="full-width name-input w-full h-12 p-4 flex items-center gap-2 bg-borderMain rounded-lg">
          <MobileIcon />
          <div className="mobile text-sm text-gray400">{userData?.email}</div>
        </div>
      ) : (
        // If neither exists, show phone input
        <div className="input-box w-full">
          <InputWithIcon
            icon={<MobileIcon />}
            inputProps={{
              name: "phone",
              value: userInfo.phone,
              onChange: handleChange,
              placeholder: translate("pages.profile.Enter Phone"),
            }}
          />
        </div>
      )}

      {/* Name Field */}
      <div className="input-box w-full mt-3 md:mt-6">
        <div className="input-label text-gray400 text-xs font-medium mb-2">
          {translate("pages.profile.Fullname")}
        </div>
        <InputWithIcon
          icon={<UserIcon />}
          inputProps={{
            name: "name",
            value: userInfo.name,
            onChange: handleChange,
            placeholder: translate("pages.profile.Enter Fullname"),
          }}
        />
      </div>

      {/* Birthday Field */}
      <div className="input-box !w-full mt-3 md:mt-6">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <WaveLoading />
          </div>
        ) : (
          <CustomDatePicker
            title={translate("pages.profile.Birthdate")}
            date={userInfo.birthday}
            handleDateChange={handleChangeBirthDate}
            placeholder={translate("pages.profile.Select Birthdate")}
            wrapperClassName="w-full block"
            childeClassName="w-full"
          />
        )}
      </div>

      <OutlineButton
        className="mobile-save-change-button md:hidden block mt-8 text-center text-sm font-semibold leading-4 py-3 px-5 disabled:!text-[#525252] !border-[#525252] border-primary w-full md:w-[130px]"
        buttonProps={{
          disabled: disabledAction,
        }}
        onClick={() => updateDetailMutation.mutate()}
      >
        {translate("pages.profile.Save Changes")}
      </OutlineButton>
    </div>
  );
};

export default UserInformationForm;
