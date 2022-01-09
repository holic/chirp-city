import { gql } from "urql";
import * as Urql from "urql";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Block_Height = {
  readonly hash?: InputMaybe<Scalars["Bytes"]>;
  readonly number?: InputMaybe<Scalars["Int"]>;
  readonly number_gte?: InputMaybe<Scalars["Int"]>;
};

export type Message = {
  readonly __typename?: "Message";
  readonly children: ReadonlyArray<Message>;
  readonly from: Scalars["Bytes"];
  readonly id: Scalars["ID"];
  readonly mentions: ReadonlyArray<Scalars["Bytes"]>;
  readonly message: Scalars["String"];
  readonly parents: ReadonlyArray<Message>;
  readonly timestamp: Scalars["Int"];
};

export type MessageChildrenArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Message_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Message_Filter>;
};

export type MessageParentsArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Message_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Message_Filter>;
};

export type Message_Filter = {
  readonly from?: InputMaybe<Scalars["Bytes"]>;
  readonly from_contains?: InputMaybe<Scalars["Bytes"]>;
  readonly from_in?: InputMaybe<ReadonlyArray<Scalars["Bytes"]>>;
  readonly from_not?: InputMaybe<Scalars["Bytes"]>;
  readonly from_not_contains?: InputMaybe<Scalars["Bytes"]>;
  readonly from_not_in?: InputMaybe<ReadonlyArray<Scalars["Bytes"]>>;
  readonly id?: InputMaybe<Scalars["ID"]>;
  readonly id_gt?: InputMaybe<Scalars["ID"]>;
  readonly id_gte?: InputMaybe<Scalars["ID"]>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars["ID"]>>;
  readonly id_lt?: InputMaybe<Scalars["ID"]>;
  readonly id_lte?: InputMaybe<Scalars["ID"]>;
  readonly id_not?: InputMaybe<Scalars["ID"]>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars["ID"]>>;
  readonly mentions?: InputMaybe<ReadonlyArray<Scalars["Bytes"]>>;
  readonly mentions_contains?: InputMaybe<ReadonlyArray<Scalars["Bytes"]>>;
  readonly mentions_not?: InputMaybe<ReadonlyArray<Scalars["Bytes"]>>;
  readonly mentions_not_contains?: InputMaybe<ReadonlyArray<Scalars["Bytes"]>>;
  readonly message?: InputMaybe<Scalars["String"]>;
  readonly message_contains?: InputMaybe<Scalars["String"]>;
  readonly message_ends_with?: InputMaybe<Scalars["String"]>;
  readonly message_gt?: InputMaybe<Scalars["String"]>;
  readonly message_gte?: InputMaybe<Scalars["String"]>;
  readonly message_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly message_lt?: InputMaybe<Scalars["String"]>;
  readonly message_lte?: InputMaybe<Scalars["String"]>;
  readonly message_not?: InputMaybe<Scalars["String"]>;
  readonly message_not_contains?: InputMaybe<Scalars["String"]>;
  readonly message_not_ends_with?: InputMaybe<Scalars["String"]>;
  readonly message_not_in?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly message_not_starts_with?: InputMaybe<Scalars["String"]>;
  readonly message_starts_with?: InputMaybe<Scalars["String"]>;
  readonly parents?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly parents_contains?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly parents_not?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly parents_not_contains?: InputMaybe<ReadonlyArray<Scalars["String"]>>;
  readonly timestamp?: InputMaybe<Scalars["Int"]>;
  readonly timestamp_gt?: InputMaybe<Scalars["Int"]>;
  readonly timestamp_gte?: InputMaybe<Scalars["Int"]>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars["Int"]>>;
  readonly timestamp_lt?: InputMaybe<Scalars["Int"]>;
  readonly timestamp_lte?: InputMaybe<Scalars["Int"]>;
  readonly timestamp_not?: InputMaybe<Scalars["Int"]>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars["Int"]>>;
};

export enum Message_OrderBy {
  Children = "children",
  From = "from",
  Id = "id",
  Mentions = "mentions",
  Message = "message",
  Parents = "parents",
  Timestamp = "timestamp",
}

export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Query = {
  readonly __typename?: "Query";
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly message?: Maybe<Message>;
  readonly messages: ReadonlyArray<Message>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryMessageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMessagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Message_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Message_Filter>;
};

export type Subscription = {
  readonly __typename?: "Subscription";
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly message?: Maybe<Message>;
  readonly messages: ReadonlyArray<Message>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionMessageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMessagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Message_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Message_Filter>;
};

export type _Block_ = {
  readonly __typename?: "_Block_";
  /** The hash of the block */
  readonly hash?: Maybe<Scalars["Bytes"]>;
  /** The block number */
  readonly number: Scalars["Int"];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  readonly __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars["String"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars["Boolean"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type ChirpMessageFragment = {
  readonly __typename?: "Message";
  readonly id: string;
  readonly timestamp: number;
  readonly from: any;
  readonly message: string;
};

export type TimelineQueryVariables = Exact<{ [key: string]: never }>;

export type TimelineQuery = {
  readonly __typename?: "Query";
  readonly messages: ReadonlyArray<{
    readonly __typename?: "Message";
    readonly id: string;
    readonly timestamp: number;
    readonly from: any;
    readonly message: string;
  }>;
};

export type MessageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type MessageQuery = {
  readonly __typename?: "Query";
  readonly message?:
    | {
        readonly __typename?: "Message";
        readonly id: string;
        readonly timestamp: number;
        readonly from: any;
        readonly message: string;
      }
    | null
    | undefined;
};

export type NotificationsQueryVariables = Exact<{
  address: ReadonlyArray<Scalars["Bytes"]> | Scalars["Bytes"];
}>;

export type NotificationsQuery = {
  readonly __typename?: "Query";
  readonly messages: ReadonlyArray<{
    readonly __typename?: "Message";
    readonly id: string;
    readonly timestamp: number;
    readonly from: any;
    readonly message: string;
  }>;
};

export const ChirpMessageFragmentDoc = gql`
  fragment ChirpMessage on Message {
    id
    timestamp
    from
    message
  }
`;
export const TimelineDocument = gql`
  query Timeline {
    messages(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      ...ChirpMessage
    }
  }
  ${ChirpMessageFragmentDoc}
`;

export function useTimelineQuery(
  options: Omit<Urql.UseQueryArgs<TimelineQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<TimelineQuery>({ query: TimelineDocument, ...options });
}
export const MessageDocument = gql`
  query Message($id: ID!) {
    message(id: $id) {
      ...ChirpMessage
    }
  }
  ${ChirpMessageFragmentDoc}
`;

export function useMessageQuery(
  options: Omit<Urql.UseQueryArgs<MessageQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MessageQuery>({ query: MessageDocument, ...options });
}
export const NotificationsDocument = gql`
  query Notifications($address: [Bytes!]!) {
    messages(
      where: { mentions: $address }
      first: 100
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      ...ChirpMessage
    }
  }
  ${ChirpMessageFragmentDoc}
`;

export function useNotificationsQuery(
  options: Omit<Urql.UseQueryArgs<NotificationsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<NotificationsQuery>({
    query: NotificationsDocument,
    ...options,
  });
}
