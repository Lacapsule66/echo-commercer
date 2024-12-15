import ResetPassword from "@/components/Auth/ResetPassword";
import React from "react";

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  return (
    <main>
      <ResetPassword token={params.token} />
    </main>
  );
};

export default ResetPasswordPage;
