import React from "react";

const SingleUnitPage = ({ params }: { params: { unitId: string } }) => {
  const { unitId } = params;
  console.log(unitId);
  return <div>SingleUnitPage</div>;
};

export default SingleUnitPage;
