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
  hash?: InputMaybe<Scalars["Bytes"]>;
  number?: InputMaybe<Scalars["Int"]>;
  number_gte?: InputMaybe<Scalars["Int"]>;
};

export type Message = {
  __typename?: "Message";
  children: Array<Message>;
  from: Scalars["Bytes"];
  id: Scalars["ID"];
  mentions: Array<Scalars["Bytes"]>;
  message: Scalars["String"];
  parents: Array<Message>;
  timestamp: Scalars["Int"];
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
  from?: InputMaybe<Scalars["Bytes"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  from_not?: InputMaybe<Scalars["Bytes"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  mentions?: InputMaybe<Array<Scalars["Bytes"]>>;
  mentions_contains?: InputMaybe<Array<Scalars["Bytes"]>>;
  mentions_not?: InputMaybe<Array<Scalars["Bytes"]>>;
  mentions_not_contains?: InputMaybe<Array<Scalars["Bytes"]>>;
  message?: InputMaybe<Scalars["String"]>;
  message_contains?: InputMaybe<Scalars["String"]>;
  message_ends_with?: InputMaybe<Scalars["String"]>;
  message_gt?: InputMaybe<Scalars["String"]>;
  message_gte?: InputMaybe<Scalars["String"]>;
  message_in?: InputMaybe<Array<Scalars["String"]>>;
  message_lt?: InputMaybe<Scalars["String"]>;
  message_lte?: InputMaybe<Scalars["String"]>;
  message_not?: InputMaybe<Scalars["String"]>;
  message_not_contains?: InputMaybe<Scalars["String"]>;
  message_not_ends_with?: InputMaybe<Scalars["String"]>;
  message_not_in?: InputMaybe<Array<Scalars["String"]>>;
  message_not_starts_with?: InputMaybe<Scalars["String"]>;
  message_starts_with?: InputMaybe<Scalars["String"]>;
  parents?: InputMaybe<Array<Scalars["String"]>>;
  parents_contains?: InputMaybe<Array<Scalars["String"]>>;
  parents_not?: InputMaybe<Array<Scalars["String"]>>;
  parents_not_contains?: InputMaybe<Array<Scalars["String"]>>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
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
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  message?: Maybe<Message>;
  messages: Array<Message>;
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
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  message?: Maybe<Message>;
  messages: Array<Message>;
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
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]>;
  /** The block number */
  number: Scalars["Int"];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type MessageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type MessageQuery = {
  __typename?: "Query";
  message?:
    | {
        __typename?: "Message";
        id: string;
        timestamp: number;
        from: any;
        message: string;
      }
    | null
    | undefined;
};

export type TimelineQueryVariables = Exact<{ [key: string]: never }>;

export type TimelineQuery = {
  __typename?: "Query";
  messages: Array<{
    __typename?: "Message";
    id: string;
    timestamp: number;
    from: any;
    message: string;
  }>;
};

export const MessageDocument = gql`
  query Message($id: ID!) {
    message(id: $id) {
      id
      timestamp
      from
      message
    }
  }
`;

export function useMessageQuery(
  options: Omit<Urql.UseQueryArgs<MessageQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MessageQuery>({ query: MessageDocument, ...options });
}
export const TimelineDocument = gql`
  query Timeline {
    messages(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      from
      message
    }
  }
`;

export function useTimelineQuery(
  options: Omit<Urql.UseQueryArgs<TimelineQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<TimelineQuery>({ query: TimelineDocument, ...options });
}
