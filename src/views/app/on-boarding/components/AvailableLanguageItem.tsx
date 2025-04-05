import { Dispatch, SetStateAction } from "react";

interface IProps {
  item: any;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
  isInModal?: boolean;
}

const AvailableLanguageItem = (props: IProps) => {
  const { item, selected, setSelected } = props;
  return (
    <div
      className={`language-item py-[19px] rounded-lg border border-borderMain w-[45%] md:w-[28.9%] grid place-items-center mb-6 cursor-pointer hover:border-gray400 ${
        item?.disabled &&
        "disabled-language brightness-50 !border-0 !cursor-not-allowed"
      } ${
        selected?.id === item?.id &&
        "selected-language bg-[#3a3a3a] brightness-150"
      }`}
      key={item?.id}
      onClick={!item?.disabled ? () => setSelected(item) : () => {}}
    >
      <div className="language-icon w-8 h-8 rounded-[50%]">
        {item?.icon}
        {/* <img
                    src={item?.icon}
                    alt='language'
                /> */}
      </div>
      <div className="language-name text-gray400 text-sm mt-3">
        {item?.disabled ? "(به زودی)" : item?.name}
      </div>
    </div>
  );
};

export default AvailableLanguageItem;
