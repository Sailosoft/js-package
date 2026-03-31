import { Route, Switch } from "react-router-dom";
import { AppRoute } from "./route.interface.ts";

export default function RouteRender({
  routes,
  NotFound,
}: {
  routes: AppRoute[];
  NotFound?: React.ComponentType<any>;
}) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Route component={NotFound || (() => <div>404 Not Found</div>)} />
    </Switch>
  );
}
