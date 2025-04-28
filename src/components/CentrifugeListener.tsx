"use client";

import React, { useEffect, useState } from "react";
import { useCentrifuge } from "@/context/CentrifugeContext";
import GlobalActionModal from "./GlobalActionModal";

const CentrifugeListener = () => {
  const centrifuge = useCentrifuge();
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState<any>(null);

  useEffect(() => {
    if (!centrifuge) return;

    const sub = centrifuge.on("publication", (ctx) => {
      console.log("here", { ctx });
      setAction(ctx.data);
      setModalOpen(true);
    });

    return () => {
      sub.disconnect();
    };
  }, [centrifuge]);

  return (
    <GlobalActionModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      action={action}
    />
  );
};

export default CentrifugeListener;
