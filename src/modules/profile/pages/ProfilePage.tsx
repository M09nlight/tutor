import { FC, useEffect, useState } from "react";
import Container from "../../../common/components/container/Container";
import { useAuth } from "../../auth/hooks/use-auth";
import { format } from "date-fns";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const { auth, isLoggedIn } = useAuth();
  const [formatATED, setFormatATED] = useState<string>("");
  const [formatRTED, setFormatRTED] = useState<string>("");

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
  }, [isLoggedIn, accessTokenExpiredDate, refreshTokenExpiredDate]);
  return (
    <main>
      <Container>
        <main className="main">
          <div className="blocks blocks--tokens">
            <div className="block">
              <div className="token">
                Access токен: {auth.tokens?.access_token}
              </div>
              <div>Дата окончания access токена: {formatATED}</div>
            </div>
            <div className="block">
              <div className="token">
                Refresh токен: {auth.tokens?.refresh_token}
              </div>
              <div>Дата окончания refresh токена: {formatRTED}</div>
            </div>
          </div>
        </main>
      </Container>
    </main>
  );
};

export default ProfilePage;
