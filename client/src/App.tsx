import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import ValentinePage from "@/pages/valentine";
import CelebratePage from "@/pages/celebrate";
import RosePage from "@/pages/rose";
import ProposePage from "@/pages/propose";
import ChocolatePage from "@/pages/chocolate";
import TeddyPage from "@/pages/teddy";
import PromisePage from "@/pages/promise";
import KissPage from "@/pages/kiss";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/valentine" component={ValentinePage} />
      <Route path="/rose" component={RosePage} />
      <Route path="/propose" component={ProposePage} />
      <Route path="/chocolate" component={ChocolatePage} />
      <Route path="/teddy" component={TeddyPage} />
      <Route path="/promise" component={PromisePage} />
      <Route path="/kiss" component={KissPage} />
      <Route path="/celebrate" component={CelebratePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
