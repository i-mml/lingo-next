"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Centrifuge } from "centrifuge";
import { useAuth } from "@/hooks/use-auth";
import GlobalActionModal from "@/components/GlobalActionModal";

const CentrifugeContext = createContext<Centrifuge | null>(null);

export const useCentrifuge = () => useContext(CentrifugeContext);

export const CentrifugeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const centrifugeRef = useRef<Centrifuge | null>(null);
  const { whoAmI } = useAuth();
  const [eventData, setEventData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const findChannels = async () => {
    if (whoAmI) {
      centrifugeRef.current = new Centrifuge(
        `${process.env.NEXT_PUBLIC_CENTRIFUGE_BASE_URL}/connection/websocket`,
        {
          token: whoAmI?.channel_info?.token || "0",
        }
      );

      centrifugeRef.current
        .on("connecting", function (ctx) {
          console.log(`connecting: ${ctx.code}, ${ctx.reason}`);
        })
        .on("connected", function (ctx) {
          console.log(`connected over ${ctx.transport}`);
        })
        .on("disconnected", function (ctx) {
          console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
        })
        .connect();

      const sub = centrifugeRef.current?.newSubscription(
        whoAmI?.channel_info?.public_user_channel || "0"
      );

      sub
        .on("publication", function (ctx) {
          console.log("Received question:", ctx.data);
          setEventData(ctx.data);
          setModalOpen(true);
        })
        .on("subscribing", function (ctx) {
          console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);
        })
        .on("subscribed", function (ctx) {
          console.log("subscribed", ctx);
        })
        .on("unsubscribed", function (ctx) {
          console.log(`unsubscribed: ${ctx.code}, ${ctx.reason}`);
        })
        .subscribe();
    }
  };

  useEffect(() => {
    findChannels();

    return () => {
      centrifugeRef.current?.disconnect();
    };
  }, [whoAmI?.channel_info?.token]);

  return (
    <CentrifugeContext.Provider value={centrifugeRef.current}>
      {children}
      {modalOpen && (
        <GlobalActionModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          eventData={eventData}
        />
      )}
    </CentrifugeContext.Provider>
  );
};
