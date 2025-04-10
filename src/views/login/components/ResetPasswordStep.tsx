import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import PasswordLockIcon from "@/assets/password-lock.svg";
import InputWithIcon from "@/components/shared/InputWithIcon";

interface IProps {
  newPassword: string;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setConfNewPass: Dispatch<SetStateAction<string>>;
}

const ResetPasswordStep = (props: IProps) => {
  const { newPassword, setNewPassword, setConfNewPass } = props;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validate = (pass: string, conf: string) => {
    if (pass.length === 6 || pass.length > 6 || pass === conf) {
      setError("");
    }
    if (pass.length < 6) {
      setError("رمز عبور حدقال باید شامل 6 کاراکتر باشد.");
    }
    if (pass !== conf) {
      setError("رمز جدید و تکرار آن باید یکسان باشد");
    }
  };

  const handleChangePassWord = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validate(value, confirmPassword);
    setNewPassword(e.target.value);
  };
  const handleChangeConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validate(newPassword, value);
    setConfirmPassword(e.target.value);
    setConfNewPass(e.target.value);
  };

  return (
    <>
      <div className="block text-right text-sm font-medium text-gray-700 mb-2 mt-3">
        رمز عبور جدید
      </div>
      <InputWithIcon
        icon={<PasswordLockIcon />}
        className="mt-2"
        inputProps={{
          placeholder: "رمز عبور جدید",
          type: "password",
          value: newPassword,
          onChange: (e) => handleChangePassWord(e),
        }}
      />
      <div className="block text-right text-sm font-medium text-gray-700 mb-2 mt-4">
        تکرار رمز عبور
      </div>
      <InputWithIcon
        icon={<PasswordLockIcon />}
        className="mt-2"
        inputProps={{
          placeholder: "تکرار رمز عبور",
          type: "password",
          value: confirmPassword,
          onChange: (e) => handleChangeConfirm(e),
        }}
      />
      {error && (
        <div className="text-red-500 text-sm text-right mt-2">
          {error || ""}
        </div>
      )}
    </>
  );
};

export default ResetPasswordStep;
