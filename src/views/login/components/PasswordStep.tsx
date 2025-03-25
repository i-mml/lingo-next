import InputWithIcon from "@/components/shared/InputWithIcon";

import LockForgetPassword from "@/assets/locak-forget-pass.svg";
import PasswordLockIcon from "@/assets/password-lock.svg";
import { Dispatch, SetStateAction } from "react";
import { toEnDigit } from "@/utils/to-en-digit";

interface IProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  handleChangeToForget: any;
}

const PasswordStep = (props: IProps) => {
  const { password, setPassword, handleChangeToForget } = props;
  const handleChangePassword = (password: string) => {
    let newValue = password;
    newValue = toEnDigit(password);
    setPassword(newValue);
  };

  return (
    <>
      <label className="block text-right text-sm font-medium text-gray-700 mb-2 mt-3">
        رمز عبور
      </label>
      <InputWithIcon
        icon={<PasswordLockIcon />}
        className="mt-2"
        isPassword
        inputProps={{
          placeholder: "رمز عبور",
          type: "password",
          value: password,
          onChange: (e) => handleChangePassword(e.target.value),
        }}
      />
      <div
        className="text-start flex items-center gap-2 mt-2 text-main text-sm cursor-pointer"
        onClick={handleChangeToForget}
      >
        <LockForgetPassword />
        <span>بازیابی رمز عبور</span>
      </div>
    </>
  );
};

export default PasswordStep;
