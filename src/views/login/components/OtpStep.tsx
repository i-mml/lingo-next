import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useReadOTP } from "react-read-otp";
import ResetOtp from "@/assets/reset-otp.svg";
import { toEnDigit } from "@/utils/to-en-digit";
import { onlyNumberInput } from "@/utils/only-number-input";

interface IProps {
  otpCode: string;
  setOtpCode: Dispatch<SetStateAction<string>>;
  resendOtp: () => void;
}

const OtpStep = (props: IProps) => {
  const { otpCode, setOtpCode, resendOtp } = props;

  const [timeLeft, setTimeLeft] = useState(120);
  const [runningTimer, setRunningTimer] = useState(true);

  useReadOTP(setOtpCode, {
    enabled: true,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerId);
          setRunningTimer(false);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [runningTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const handleChangeOtp = (otp: string) => {
    let newValue = otp;
    newValue = toEnDigit(otp);
    const isNumber = onlyNumberInput(newValue);
    if (!isNumber) return;
    setOtpCode(otp);
  };

  const resetClickHandler = () => {
    setTimeLeft(120);
    setRunningTimer(true);
    resendOtp();
  };

  return (
    <>
      <div className="input-label text-gray400 text-xs font-medium mt-2">
        رمز یکبار مصرف
      </div>

      <OTPInput
        value={otpCode}
        onChange={(otp) => handleChangeOtp(otp)}
        renderInput={(props) => <input {...props} />}
        numInputs={6}
        containerStyle="flex items-center  justify-between mt-3 flex-row-reverse"
        inputStyle="rounded-lg border border-main bg-transparent !w-10 h-[55px] text-main"
        inputType="tel"
      />
      {/* <div>
        {Object.entries(otpSms)?.map((item) => (
          <div>
            {item?.[0]}: {item?.[1]}
          </div>
        ))}
      </div> */}

      <div className="flex items-center mt-4">
        <div className="text-gray400 text-[16px] mr-auto">
          {timeLeft === 0 ? (
            <div
              className="flex items-center gap-2 text-primary"
              onClick={resetClickHandler}
            >
              <ResetOtp />
              <span>ارسال مجدد کد</span>
            </div>
          ) : (
            formatTime(timeLeft)
          )}
        </div>
      </div>
    </>
  );
};

export default OtpStep;
