import axiosInstance from "../configs";

export const getPaymentPackageList = async () => {
  const response = await axiosInstance.get("/payment/packagelist");

  return response;
};

export const getPaymentTransactions = async () => {
  const response = await axiosInstance.get("/payment/transactions");

  return response;
};

export const getPaymentCurrentSubscription = async () => {
  const response = await axiosInstance.get("/payment/current-subscription");

  return response;
};

export const postPaymentDiscountValidate = async (body: {
  discount_code: string;
  package_id: number;
}) => {
  const response = await axiosInstance.post(
    "/payment/discounts/validate/",
    body
  );

  return response;
};
