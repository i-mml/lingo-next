import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import LockIcon from "@/assets/lock-icon.svg";
import RoundedLockIcon from "@/assets/rounded-lock-icon.svg";
import { useMutation } from "@tanstack/react-query";
import { PutAuthChangePassword } from "@/api/services/auth";
import OutlineButton from "@/components/shared/OutlineButton";
import InputWithIcon from "@/components/shared/InputWithIcon";

const ProfileChangePassword = () => {
  const { t: translate } = useTranslation();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const validate = (pass: string, conf: string) => {
    if (pass.length === 8 || pass.length > 8 || pass !== conf) {
      setError("");
    }
    if (pass.length < 8) {
      setError(translate("defaults.errors.Minimum 8 Character"));
    }
    if (pass !== conf) {
      setError(translate("defaults.errors.Password And Confirm Same Issue"));
    }
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validate(value, confirm);
    setNewPassword(e.target.value);
  };
  const handleChangeConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validate(newPassword, value);
    setConfirm(e.target.value);
  };

  const disabledAction =
    password === "" || newPassword === "" || confirm === "" || error !== "";

  const changePassMutation = useMutation({
    mutationFn: () =>
      PutAuthChangePassword({
        old_password: password,
        new_password: newPassword,
      })
        .then((res) => {
          if (res.status === 204) {
            setPassword("");
            setNewPassword("");
            setConfirm("");
            toast.success("رمز عبور با موفقیت تغییر یافت");
          }
        })
        .catch(() => {}),
  });

  return (
    <div className="profile-content bg-backgroundMain w-[96%] md:w-[96%] md:min-w-[684px] mx-auto !mb-5 py-4 px-4 md:px-6 rounded-2xl flex items-start gap-[10%] flex-col">
      <div className="flex-title flex items-center justify-between mb-4 md:mb-6 w-full">
        <h2 className="page-title text-main text-base md:text-lg font-semibold">
          {translate("pages.profile.Change Password")}
        </h2>
        <OutlineButton
          className="save-change-button hidden md:block text-center text-sm font-semibold leading-4 py-3 px-5 rounded-xl disabled:!text-[#525252] !border-[#525252] border-primary w-[130px]"
          buttonProps={{
            disabled: disabledAction,
          }}
          onClick={() => changePassMutation.mutate()}
        >
          {translate("pages.profile.Save Changes")}
        </OutlineButton>
      </div>

      <div className="input-label text-gray400 text-xs font-medium mb-2">
        {translate("pages.profile.Current Password")}
      </div>
      <InputWithIcon
        icon={<LockIcon />}
        isPassword
        inputProps={{
          value: password,
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value),
        }}
      />

      <div className="flex-inputs w-full flex items-center gap-4 md:gap-[3.5%] flex-col md:flex-row">
        <div className="input-box w-full md:w-[48.25%] mt-6">
          <div className="input-label text-gray400 text-xs font-medium mb-2">
            {translate("pages.profile.New Password")}
          </div>
          <InputWithIcon
            icon={<RoundedLockIcon />}
            isPassword
            inputProps={{
              value: newPassword,
              onChange: handleChangePassword,
            }}
            className="w-full"
          />
        </div>
        <div className="input-box w-full mt-6 md:w-[48.25%]">
          <div className="input-label text-gray400 text-xs font-medium mb-2">
            {translate("pages.profile.Confirm New Password")}
          </div>
          <InputWithIcon
            className="w-full"
            icon={<RoundedLockIcon />}
            isPassword
            inputProps={{
              value: confirm,
              onChange: handleChangeConfirm,
            }}
          />
        </div>
      </div>
      {error && <div className="reset-password-input-error">{error || ""}</div>}
      <OutlineButton
        className="mobile-save-change-button md:hidden block mt-8 text-center text-sm font-semibold leading-4 py-3 px-5 disabled:!text-[#525252] !border-[#525252] border-primary w-full md:w-[130px]"
        buttonProps={{
          disabled: disabledAction,
        }}
        onClick={() => changePassMutation.mutate()}
      >
        {translate("pages.profile.Save Changes")}
      </OutlineButton>
    </div>
  );
};

export default ProfileChangePassword;
