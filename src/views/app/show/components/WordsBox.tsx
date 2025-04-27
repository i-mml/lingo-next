import React from "react";
import { styled } from "@mui/system";
import { FlashCardActions } from "../../review/components/FlashCardActions";
import { isMobile } from "react-device-detect";

const Container = styled("div")`
  width: 100%;
  height: 100%;
  max-height: 90px;
  position: relative;
  background: #262626;
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  :hover {
    .flashcard-actions-wrapper {
      transform: translateY(0);
    }
  }
`;
const InfoContainer = styled("div")`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  gap: 12px;
  flex: 1;
`;
const Title = styled("div")`
  color: #ff6974;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
`;
const Description = styled("div")`
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

export function WordsBox({ item, refetchFlashCards, onClickHandler }: any) {
  return (
    <Container>
      <InfoContainer onClick={onClickHandler} className="flex-1">
        <Title>{item?.word}</Title>
        <Description>{item?.word_translation}</Description>
        {!isMobile && (
          <FlashCardActions
            item={item}
            refetch={refetchFlashCards}
            sx={{ "& > button": { minWidth: "45px" } }}
          />
        )}
      </InfoContainer>
    </Container>
  );
}
