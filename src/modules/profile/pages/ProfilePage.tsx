import React, { FC, useEffect, useState } from "react";
import Container from "../../../common/components/container/Container";
import { useAuth } from "../../auth/hooks/use-auth";
import { format } from "date-fns";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const { auth, isLoggedIn } = useAuth();
  const [formatATED, setFormatATED] = useState("");
  const [formatRTED, setFormatRTED] = useState("");

  const accessTokenExpiredDate = auth.access_token_expired_date;
  const refreshTokenExpiredDate = auth.refresh_token_expired_date;

  useEffect(() => {
    if (accessTokenExpiredDate) {
      setFormatATED(
        format(new Date(accessTokenExpiredDate), "MMMM do yyyy, h:mm:ss a")
      );
    } else setFormatATED("");
    if (refreshTokenExpiredDate) {
      setFormatRTED(
        format(new Date(refreshTokenExpiredDate), "MMMM do yyyy, h:mm:ss a")
      );
    } else setFormatRTED("");
  }, [isLoggedIn]);
  return (
    <main>
      <Container>
        <main className="main">
          <div>Дата окончания access токена: {formatATED}</div>
          <div>Дата окончания refresh токена: {formatRTED}</div>
        </main>
      </Container>
    </main>
  );
};

export default ProfilePage;
