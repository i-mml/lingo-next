import { Switch } from "@mui/material";
import { styled } from "@mui/system";

const IosSwitch = styled(Switch)(({ theme }) => ({
  width: 46,
  height: 28,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: "2px",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#4cd764",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#fff",
    width: 24,
    height: 24,
    boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 14,
    backgroundColor: "#bbb",
    opacity: 1,
  },
}));

const IosCheckbox = ({ checked, onChange }: any) => {
  return (
    <IosSwitch
      checked={checked}
      onChange={onChange}
      disableRipple
      sx={{
        "& .MuiSwitch-switchBase": {
          "&.Mui-checked": {
            "& + .MuiSwitch-track": {
              backgroundColor: "#4cd764",
            },
          },
        },
      }}
    />
  );
};

export default IosCheckbox;
