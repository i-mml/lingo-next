"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import UserIcon from "@/assets/user.svg";
import { toEnDigit } from "@/utils/to-en-digit";
import { onlyNumberInput } from "@/utils/only-number-input";
import InputWithIcon from "@/components/shared/InputWithIcon";

interface IProps {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const PhoneNumberStep = ({
  phoneNumber,
  setPhoneNumber,
  error,
  setError,
}: IProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^09\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handleChangePhoneNumber = (number: string) => {
    let newValue = toEnDigit(number);
    if (!onlyNumberInput(newValue)) return;

    setPhoneNumber(newValue);
    setError(
      validatePhoneNumber(newValue)
        ? ""
        : "شماره همراه باید با 09 شروع شود و 11 رقم باشد."
    );
  };

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 500);
  }, []);

  return (
    <div className="w-full">
      <label className="block text-right text-sm font-medium text-gray-700 mb-2 mt-8">
        شماره همراه
      </label>

      <InputWithIcon
        icon={<UserIcon className="w-5 h-5 text-gray-400" />}
        inputProps={{
          placeholder: "مثلا: ۰۹۱۲۳۴۵۶۷۸۹",
          type: "tel",
          value: phoneNumber,
          onChange: (e) => handleChangePhoneNumber(e.target.value),
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
          // @ts-ignore
          ref: inputRef,
          className: "w-full px-4 py-3 border rounded-lg focus:border-blue-500",
        }}
        focused={focused}
      />

      {error && <p className="text-red-500 text-sm text-right mt-2">{error}</p>}
    </div>
  );
};

export default PhoneNumberStep;
