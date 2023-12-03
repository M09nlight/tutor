import "./App.scss";
import Container from "./common/components/container/Container";
import Header from "./common/components/header/Header";
import Wrapper from "./common/components/wrapper/Wrapper";

function App() {
  return (
    <Wrapper>
      <Header />
      <main className="main">
        <Container>main</Container>
      </main>
      <footer className="footer">
        <Container>footer</Container>
      </footer>
    </Wrapper>
  );
}

export default App;
