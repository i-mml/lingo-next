const SmallOrangeLine = ({ align = "center" }) => {
  return (
    <div
      className={`bg-[#ff6d00] w-[100px] h-[2px]
          ${
            align === "center"
              ? "mx-auto"
              : align === "left"
              ? "mr-auto"
              : "ml-auto"
          }
          my-[30px] md:my-[30px] mb-[35px] md:mb-[35px]
          max-[750px]:my-[10px] max-[750px]:mb-[15px]`}
    />
  );
};

export default SmallOrangeLine;
