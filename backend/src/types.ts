import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likedBy: Array<User>;
  post: Post;
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeleteCommentResponse = {
  __typename?: 'DeleteCommentResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GetPostByIdResponse = {
  __typename?: 'GetPostByIdResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type GetUserByIdResponse = {
  __typename?: 'GetUserByIdResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type GetUserByNameResponse = {
  __typename?: 'GetUserByNameResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type LikeCommentResponse = {
  __typename?: 'LikeCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type LikePostResponse = {
  __typename?: 'LikePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<CreateCommentResponse>;
  createPost?: Maybe<CreatePostResponse>;
  createUser?: Maybe<CreateUserResponse>;
  deleteComment?: Maybe<DeleteCommentResponse>;
  deletePost?: Maybe<DeletePostResponse>;
  likeComment?: Maybe<LikeCommentResponse>;
  likePost?: Maybe<LikePostResponse>;
  signIn?: Maybe<SignInUserResponse>;
  updatePost?: Maybe<UpdatePostResponse>;
};


export type MutationCreateCommentArgs = {
  authorId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};


export type MutationCreatePostArgs = {
  authorId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikeCommentArgs = {
  commentId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['ID']['output'];
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likedBy: Array<User>;
};

export type Query = {
  __typename?: 'Query';
  getCommentsByPostId: Array<Comment>;
  getPostById?: Maybe<GetPostByIdResponse>;
  getPosts: Array<Maybe<Post>>;
  getUserById?: Maybe<GetUserByIdResponse>;
  getUserByName?: Maybe<GetUserByNameResponse>;
  getUsers: Array<Maybe<User>>;
};


export type QueryGetCommentsByPostIdArgs = {
  postId: Scalars['ID']['input'];
};


export type QueryGetPostByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByNameArgs = {
  username: Scalars['String']['input'];
};

export type SignInUserResponse = {
  __typename?: 'SignInUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type UpdatePostResponse = {
  __typename?: 'UpdatePostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  id: Scalars['ID']['output'];
  likedComments: Array<Comment>;
  likedPosts: Array<Post>;
  posts: Array<Post>;
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateCommentResponse: ResolverTypeWrapper<CreateCommentResponse>;
  CreatePostResponse: ResolverTypeWrapper<CreatePostResponse>;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  DeleteCommentResponse: ResolverTypeWrapper<DeleteCommentResponse>;
  DeletePostResponse: ResolverTypeWrapper<DeletePostResponse>;
  GetPostByIdResponse: ResolverTypeWrapper<GetPostByIdResponse>;
  GetUserByIdResponse: ResolverTypeWrapper<GetUserByIdResponse>;
  GetUserByNameResponse: ResolverTypeWrapper<GetUserByNameResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LikeCommentResponse: ResolverTypeWrapper<LikeCommentResponse>;
  LikePostResponse: ResolverTypeWrapper<LikePostResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  SignInUserResponse: ResolverTypeWrapper<SignInUserResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdatePostResponse: ResolverTypeWrapper<UpdatePostResponse>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  CreateCommentResponse: CreateCommentResponse;
  CreatePostResponse: CreatePostResponse;
  CreateUserResponse: CreateUserResponse;
  DeleteCommentResponse: DeleteCommentResponse;
  DeletePostResponse: DeletePostResponse;
  GetPostByIdResponse: GetPostByIdResponse;
  GetUserByIdResponse: GetUserByIdResponse;
  GetUserByNameResponse: GetUserByNameResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LikeCommentResponse: LikeCommentResponse;
  LikePostResponse: LikePostResponse;
  Mutation: {};
  Post: Post;
  Query: {};
  SignInUserResponse: SignInUserResponse;
  String: Scalars['String']['output'];
  UpdatePostResponse: UpdatePostResponse;
  User: User;
};

export type CommentResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likedBy?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCommentResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CreateCommentResponse'] = ResolversParentTypes['CreateCommentResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePostResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CreatePostResponse'] = ResolversParentTypes['CreatePostResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCommentResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['DeleteCommentResponse'] = ResolversParentTypes['DeleteCommentResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletePostResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['DeletePostResponse'] = ResolversParentTypes['DeletePostResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetPostByIdResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetPostByIdResponse'] = ResolversParentTypes['GetPostByIdResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserByIdResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetUserByIdResponse'] = ResolversParentTypes['GetUserByIdResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserByNameResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetUserByNameResponse'] = ResolversParentTypes['GetUserByNameResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeCommentResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['LikeCommentResponse'] = ResolversParentTypes['LikeCommentResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikePostResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['LikePostResponse'] = ResolversParentTypes['LikePostResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<Maybe<ResolversTypes['CreateCommentResponse']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'authorId' | 'content' | 'postId'>>;
  createPost?: Resolver<Maybe<ResolversTypes['CreatePostResponse']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'authorId' | 'content'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'password' | 'username'>>;
  deleteComment?: Resolver<Maybe<ResolversTypes['DeleteCommentResponse']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deletePost?: Resolver<Maybe<ResolversTypes['DeletePostResponse']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  likeComment?: Resolver<Maybe<ResolversTypes['LikeCommentResponse']>, ParentType, ContextType, RequireFields<MutationLikeCommentArgs, 'commentId' | 'userId'>>;
  likePost?: Resolver<Maybe<ResolversTypes['LikePostResponse']>, ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postId' | 'userId'>>;
  signIn?: Resolver<Maybe<ResolversTypes['SignInUserResponse']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'password' | 'username'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['UpdatePostResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'content' | 'id'>>;
};

export type PostResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likedBy?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCommentsByPostId?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryGetCommentsByPostIdArgs, 'postId'>>;
  getPostById?: Resolver<Maybe<ResolversTypes['GetPostByIdResponse']>, ParentType, ContextType, RequireFields<QueryGetPostByIdArgs, 'id'>>;
  getPosts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>;
  getUserById?: Resolver<Maybe<ResolversTypes['GetUserByIdResponse']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUserByName?: Resolver<Maybe<ResolversTypes['GetUserByNameResponse']>, ParentType, ContextType, RequireFields<QueryGetUserByNameArgs, 'username'>>;
  getUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
};

export type SignInUserResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['SignInUserResponse'] = ResolversParentTypes['SignInUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePostResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['UpdatePostResponse'] = ResolversParentTypes['UpdatePostResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likedComments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  likedPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  Comment?: CommentResolvers<ContextType>;
  CreateCommentResponse?: CreateCommentResponseResolvers<ContextType>;
  CreatePostResponse?: CreatePostResponseResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  DeleteCommentResponse?: DeleteCommentResponseResolvers<ContextType>;
  DeletePostResponse?: DeletePostResponseResolvers<ContextType>;
  GetPostByIdResponse?: GetPostByIdResponseResolvers<ContextType>;
  GetUserByIdResponse?: GetUserByIdResponseResolvers<ContextType>;
  GetUserByNameResponse?: GetUserByNameResponseResolvers<ContextType>;
  LikeCommentResponse?: LikeCommentResponseResolvers<ContextType>;
  LikePostResponse?: LikePostResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInUserResponse?: SignInUserResponseResolvers<ContextType>;
  UpdatePostResponse?: UpdatePostResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

