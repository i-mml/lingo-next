import { styled } from "@mui/system";
import { ReactPlayerProps } from "react-player";
import screenfull from "screenfull";

export const StyledPlayer = styled("div")<ReactPlayerProps>`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 8px;

  video,
  .react-player__preview {
    border-radius: 8px;
  }
  video {
    ${() => (screenfull?.isFullscreen ? "" : "object-fit: fill;")}
  }

  // defined from script, if props light is true then is visible
  .react-player__preview:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
  }

  // &:hover {
  //   .video-player__controls {
  //     opacity: 1;
  //   }
  // }

  .video-player__controls {
    &:hover {
      opacity: 1;
    }

    position: absolute;
    ${({ theme }) => theme.breakpoints.down("md")} {
      opacity: 1;
      ${({ state }) =>
        screenfull?.isFullscreen
          ? state?.playing
            ? "opacity: 0;"
            : "opacity: 1;"
          : "opacity: 1;"}
    }
    .MuiStack-root {
      overflow: hidden;
    }

    // caption and full screen controllers
    .MuiStack-root:nth-child(2) > .MuiStack-root:last-child {
      justify-content: end;
    }
    .MuiStack-root:nth-child(2) > .MuiStack-root:last-child button {
      margin: 0;
    }
    // caption button
    .MuiStack-root:nth-child(2) > .MuiStack-root:last-child button:first-child {
      padding: 8px;
    }
    // to disappear sound control
    .MuiStack-root:nth-child(1) > .MuiStack-root:nth-child(2) {
      ${({ theme }) => theme.breakpoints.down("md")} {
        display: none;
      }
    }
  }
`;
