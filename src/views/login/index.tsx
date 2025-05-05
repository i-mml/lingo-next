"use client";

import React, { FormEvent, useState } from "react";
import useThemeCreator from "@/hooks/use-theme";
import { useLoginModal } from "@/store/use-login-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "@/store";
import BackIconComponent from "@/components/shared/BackIconComponent";
import Image from "next/image";
import PrimaryButton from "@/components/shared/PrimaryButton";
import WaveLoading from "@/components/shared/WaveLoading";
import DeviceBrowserModal from "@/components/modals/DeviceBrowserModal";
import { useGoogleLogin } from "@react-oauth/google";
import {
  PatchAuthLoginSetPassword,
  PostAuthForgetPassword,
  PostAuthGoogleLogin,
  PostAuthLogin,
  PostAuthLoginPassword,
  PostAuthLoginVerify,
} from "@/api/services/auth";
import clsx from "clsx";
import PhoneNumberStep from "./components/PhoneNumberStep";
import PasswordStep from "./components/PasswordStep";
import OtpStep from "./components/OtpStep";
import ResetPasswordStep from "./components/ResetPasswordStep";

type LoginStepsType = "otp" | "login" | "password" | "set_password";
type ITitleObjet = {
  [key in LoginStepsType]: string;
};

const TitleDictionary: ITitleObjet = {
  otp: "کد ارسال شده به شماره همراه خود را وارد کنید",
  login: "به پلتفرم آموزش زبان زبانو خوش آمدید",
  password: "رمز عبور خود را وارد کنید",
  set_password: "تنظیم رمز عبور",
};

const LoginView = ({ inModal = false, inModalCallback = () => {} }) => {
  const { theme }: any = useThemeCreator();
  const { toggleLoginModal } = useLoginModal();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpCode, steOtpCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confNewPass, setConfNewPass] = useState<string>("");
  const [formType, setFormType] = useState<LoginStepsType>("login");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [devieBrowserModal, setDevieBrowserModal] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const currentLocationPassToOnBoarding = inModal
    ? pathname.substring(1)
    : "public/home";
  const isFromInstagram =
    !!searchParams.get("from_instagram") || !!searchParams.get("fbclid");

  const rdcLink = searchParams.get("rdc")
    ? searchParams.get("rdc")
    : currentLocationPassToOnBoarding;
  const redirectLink = searchParams.get("rdc")
    ? "/" + searchParams.get("rdc")
    : "/public/home";

  const { setUser } = useUserInfo();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse?.access_token) {
        PostAuthGoogleLogin({ token: codeResponse?.access_token }).then(
          (res) => {
            if (res?.data?.token_data) {
              setUser(res?.data);
              handleLoginApp(
                res?.data?.token_data,
                res?.data?.is_onboard
                  ? redirectLink
                  : `/app/on-boarding?rdc=${rdcLink}`,
                res?.data?.is_onboard
              );
            }
          }
        );
      }
    },
  });

  const handleLoginApp = (
    token: { access: string; refresh: string },
    redirectLink: string,
    isOnBoarded: boolean
  ) => {
    setCookie("zabano-access-token", token?.access, {
      path: "/",
      expires: new Date("2100-12-31"),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    setCookie("zabano-refresh-token", token?.refresh, {
      path: "/",
      expires: new Date("2100-12-31"),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    queryClient.invalidateQueries();
    queryClient.removeQueries();
    setTimeout(() => {
      if (inModal && isOnBoarded) {
        inModalCallback();
      } else {
        if (inModal) {
          toggleLoginModal();
        }
        router.replace(redirectLink);
      }
    }, 1000);
  };

  const handleChangeToForget = () => {
    setIsLoading(true);

    PostAuthForgetPassword({ phone: phoneNumber })
      .then((res) => {
        setFormType(res?.data?.next_step);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    await PostAuthLoginVerify({
      phone: phoneNumber,
      otp_code: otpCode,
    })
      .then((res) => {
        if (res?.data?.next_step) {
          setFormType(res?.data?.next_step);
        }
        if (res?.data?.token_data) {
          setUser(res?.data);
          handleLoginApp(
            res?.data?.token_data,
            res?.data?.is_onboard
              ? redirectLink
              : `/app/on-boarding?rdc=${rdcLink}`,
            res?.data?.is_onboard
          );
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSetPassword = async () => {
    setIsLoading(true);
    await PatchAuthLoginSetPassword({
      phone: phoneNumber,
      otp_code: otpCode,
      password: newPassword,
    })
      .then((res) => {
        if (res?.data?.token_data) {
          setUser(res?.data);
          handleLoginApp(
            res?.data?.token_data,
            res?.data?.is_onboard
              ? redirectLink
              : `/app/on-boarding?rdc=${rdcLink}`,
            res?.data?.is_onboard
          );
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePasswordSubmit = async () => {
    setIsLoading(true);
    await PostAuthLoginPassword({
      phone: phoneNumber,
      password,
    })
      .then((res) => {
        if (res?.data) {
          setUser(res?.data);
          handleLoginApp(
            res?.data?.token_data,
            res?.data?.is_onboard ? redirectLink : "/app/on-boarding",
            res?.data?.is_onboard
          );
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginSubmit = async () => {
    setIsLoading(true);
    await PostAuthLogin({
      phone: phoneNumber,
    })
      .then((res) => {
        if (res?.data?.next_step) {
          setFormType(res?.data?.next_step);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleActionClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === "otp") {
      handleOtpSubmit();
    }
    if (formType === "set_password") {
      handleSetPassword();
    }
    if (formType === "password") {
      handlePasswordSubmit();
    }
    if (formType === "login") {
      handleLoginSubmit();
    }
  };

  const toggleDeviceBrowserModal = () => {
    setDevieBrowserModal((prev) => !prev);
  };

  return (
    <div
      dir={theme.direction}
      className="grid place-items-center text-center w-full"
    >
      <div
        className={clsx(
          `bg-backgroundMain border border-borderMain w-[88.88%] md:w-[31.11%] md:min-w-[420px] px-8 md:px-5 py-[4.7%] md:py-10
          rounded-2xl
          `
        )}
      >
        {formType !== "login" && (
          <BackIconComponent
            clickHandler={() => setFormType("login")}
            className=""
          />
        )}
        <div className="flex justify-center mb-5">
          <Image
            alt="zabano logo"
            width={54}
            height={54}
            src="/zabano-main-logo.png"
            className="w-[54px] h-[54px] rounded-xl bg-primary mx-auto"
          />
        </div>
        <form onSubmit={handleActionClick}>
          <div className="text-main text-[16px] font-medium text-center">
            {TitleDictionary[formType]}
          </div>
          {formType === "login" ||
            (formType === "set_password" && (
              <div className="text-gray400 text-sm mt-3">
                {formType === "set_password"
                  ? "رمز عبور خود را وارد کنید"
                  : "برای ورود لطفا شماره همراه خود وارد کنید"}
              </div>
            ))}

          {formType === "login" ? (
            <PhoneNumberStep
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setError={setError}
              error={error}
            />
          ) : null}
          {formType === "password" ? (
            <PasswordStep
              password={password}
              setPassword={setPassword}
              handleChangeToForget={handleChangeToForget}
            />
          ) : null}
          {formType === "otp" ? (
            <OtpStep
              resendOtp={handleLoginSubmit}
              otpCode={otpCode}
              setOtpCode={steOtpCode}
            />
          ) : null}

          {formType === "set_password" ? (
            <ResetPasswordStep
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              setConfNewPass={setConfNewPass}
            />
          ) : null}

          <PrimaryButton
            onClick={handleActionClick}
            className="w-full mt-8"
            buttonProps={
              formType === "login"
                ? {
                    disabled:
                      phoneNumber?.length !== 11 || error !== "" || isLoading,
                    type: "submit",
                  }
                : formType === "password"
                ? {
                    disabled: password?.length < 6 || error !== "" || isLoading,
                  }
                : formType === "set_password"
                ? {
                    disabled:
                      newPassword?.length < 6 ||
                      confNewPass !== newPassword ||
                      error !== "" ||
                      isLoading,
                  }
                : {
                    disabled:
                      otpCode?.length !== 6 || error !== "" || isLoading,
                  }
            }
          >
            {isLoading ? (
              <WaveLoading />
            ) : formType === "password" ? (
              "تایید و ورود"
            ) : (
              "ادامه"
            )}
          </PrimaryButton>
        </form>
        <div className="flex items-center my-4">
          <span className="border border-gray-600 flex-1 h-[1px]"></span>
          <span className="text-gray400 px-2">یا</span>
          <span className="border border-gray-600 flex-1 h-[1px]"></span>
        </div>

        <button
          className={`w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-main mb-5`}
          onClick={
            isFromInstagram ? () => toggleDeviceBrowserModal() : () => login()
          }
        >
          <div className="text-[16px] lg:text-lg font-semibold text-backgroundMain">
            ورود با گوگل
          </div>
          <img src="/images/google.png" alt="google" className="w-6 h-6" />
        </button>
      </div>
      {devieBrowserModal && (
        <DeviceBrowserModal
          open={devieBrowserModal}
          toggleModal={toggleDeviceBrowserModal}
          page="LOGIN"
        />
      )}
    </div>
  );
};

export default LoginView;
