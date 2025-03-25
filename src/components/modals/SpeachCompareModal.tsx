"use client";

import { PostEducationSpeechSimilarity } from "@/api/services/education";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "../shared/CustomModal";
import OutlineButton from "../shared/OutlineButton";
import VoiceChecker from "../shared/VoiceChecker";

interface Iprops {
  recordModal: boolean;
  toggleRecordModal: () => void;
  currentSub: any;
}

const SpeachCompareModal = (props: Iprops) => {
  const { t: translate } = useTranslation();
  const { recordModal, toggleRecordModal, currentSub } = props;

  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  const speachCompareMutation = useMutation({
    mutationFn: (body: { target_text: string; voice_text: string }) =>
      PostEducationSpeechSimilarity(body).then((res) => {
        return res?.data?.data;
      }),
  });

  const checkMicrophonePermission = useCallback(async () => {
    if ("MediaRecorder" in window) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasMicrophonePermission(true);
      } catch (err) {
        setHasMicrophonePermission(false);
        console.error("Error accessing microphone:", err);
      }
    } else {
      alert(translate("erros.BROWSER_AUDIO_RECORD_SUPPORT"));
    }
  }, [translate]);

  const checkBrowserSpeechSupport = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!!SpeechRecognition) {
      setIsSpeechSupported(true);
    } else {
      console.error("SpeechRecognition is not supported in this browser.");
      setIsSpeechSupported(false);
    }
  };

  useEffect(() => {
    checkMicrophonePermission();
    checkBrowserSpeechSupport();
  }, [checkMicrophonePermission]);

  if (!isSpeechSupported) {
    return (
      <CustomModal open={recordModal} toggle={toggleRecordModal}>
        <div className="flex items-center justify-center flex-col gap-6">
          <div className="give-mic-access">
            <div className="give-mic-title mb-3">
              مرورگر شما از این قابلیت پشتیبانی نمیکند ، با مرورگر دیگری امتحان
              کنید.
            </div>
            <OutlineButton
              onClick={toggleRecordModal}
              buttonProps={{ type: "button" }}
            >
              بستن
            </OutlineButton>
          </div>
        </div>
      </CustomModal>
    );
  }
  return (
    <CustomModal open={recordModal} toggle={toggleRecordModal}>
      <div>
        {hasMicrophonePermission ? (
          <>
            <div className="text-lg text-gray400 min-w-[80%] text-center mb-2.5">
              {translate("pages.review.GET_SPEACH_COMPARE")}
            </div>

            <VoiceChecker
              speachCompareMutation={speachCompareMutation}
              targetText={currentSub?.sentence?.subtitle || ""}
            />
          </>
        ) : (
          <div className="flex items-center gap-4 p-2">
            <div className="text-main text-center mb-3">
              {translate("errors.YOU_SHOULD_GIVE_ACCESS")}
            </div>
            <OutlineButton
              onClick={checkMicrophonePermission}
              buttonProps={{ type: "button" }}
            >
              {translate("errors.GIVE_MIC_ACCESS")}
            </OutlineButton>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default SpeachCompareModal;
