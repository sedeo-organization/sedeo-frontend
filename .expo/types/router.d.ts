/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/friends` | `/(tabs)/settlement-groups` | `/_sitemap` | `/add-exchange-participant` | `/add-friend` | `/add-friend-to-settlement-group` | `/add-settlement` | `/add-settlement-exchange` | `/add-settlement-group` | `/add-settlement-group-participant` | `/friends` | `/login` | `/registration` | `/settlement-details` | `/settlement-groups` | `/settlements`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
