/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/friends` | `/(tabs)/settlements` | `/_sitemap` | `/add-friend` | `/add-friend-to-settlement-group` | `/add-settlement-group` | `/add-settlement-group-participant` | `/friends` | `/settlements`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
