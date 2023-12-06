import { FC } from "react";
import Container from "../../../common/components/container/Container";
import About from "../../../common/components/about/About";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = ({}) => {
  return (
    <main>
      <Container>
        <div className="blocks blocks--main">
          <About />
        </div>
      </Container>
    </main>
  );
};

export default MainPage;
