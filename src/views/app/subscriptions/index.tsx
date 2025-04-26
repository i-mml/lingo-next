"use client";

import {
  getPaymentPackageList,
  getPaymentPackageStart,
} from "@/api/services/payment";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { useState } from "react";
import { toast } from "react-toastify";
import StockLottie from "@/assets/lotties/stock_lineal.json";
import NewSubscriptionItem from "./components/NewSubscriptionItem";
import LoginModal from "@/components/modals/LoginModal";
import { useAuth } from "@/hooks/use-auth";

const SubscriptionsView = () => {
  const { isGuest } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["get-movie-data"],
    queryFn: getPaymentPackageList,
  });

  const [isRedirecting, setIsRedirecting] = useState(false);

  const errorOptions: any = {
    variant: "error",
    anchorOrigin: { horizontal: "right", vertical: "top" },
  };
  const handleGetGateWay = async (gateWayLink: string) => {
    try {
      setIsRedirecting(true);
      await getPaymentPackageStart(gateWayLink).then((res) => {
        if (res?.data?.url) {
          window.location.href = res?.data?.url;
        } else {
          toast.error("خطا در انتقال به درگاه", errorOptions);
          setIsRedirecting(false);
        }
      });
    } catch {
      setIsRedirecting(false);
    }
  };

  if (isLoading || isGuest) {
    return (
      <div className="h-[74vh] w-full flex items-center justify-center">
        <WaveLoading />
        {isGuest && <LoginModal open={true} onClose={() => {}} />}
      </div>
    );
  }

  return (
    <div className="py-10 lg:py-8 px-[4.86%]">
      <div className="flex items-center gap-4 !justify-start mb-0">
        <Lottie
          animationData={StockLottie}
          className="w-16 h-16 lg:w-20 lg:h-20"
        />
        <h1 className="text-lg lg:text-3xl font-bold text-main">خرید اشتراک</h1>
      </div>

      <div className="lg:px-[5%] mt-4 lg:mt-8">
        {data?.data?.map((item: any, index: number) => (
          <NewSubscriptionItem
            key={index}
            {...item}
            handleGetGateWay={handleGetGateWay}
            isRedirecting={isRedirecting}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsView;
