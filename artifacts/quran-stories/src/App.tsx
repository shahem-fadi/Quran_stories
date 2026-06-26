import { Switch, Route, Router as WouterRouter } from "wouter";
import HomePage from "@/pages/Home";
import StoriesPage from "@/pages/Stories";
import StoryDetailPage from "@/pages/StoryDetail";
import AboutPage from "@/pages/About";
import ProphetsPage from "@/pages/Prophets";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/stories" component={StoriesPage} />
      <Route path="/stories/:slug" component={StoryDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/prophets" component={ProphetsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
