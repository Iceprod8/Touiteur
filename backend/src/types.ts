import { GraphQLResolveInfo } from 'graphql';
import { UserModel, PostModel, CommentModel } from './models';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthUserResponse = {
  __typename?: 'AuthUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CrudCommentResponse = {
  __typename?: 'CRUDCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CrudCommentsResponse = {
  __typename?: 'CRUDCommentsResponse';
  code: Scalars['Int']['output'];
  comments: Array<Maybe<Comment>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CrudPostResponse = {
  __typename?: 'CRUDPostResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Post>;
  success: Scalars['Boolean']['output'];
};

export type CrudPostsResponse = {
  __typename?: 'CRUDPostsResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  posts: Array<Maybe<Post>>;
  success: Scalars['Boolean']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likedBy?: Maybe<Array<User>>;
  post: Post;
};

export type GetFamousLikesResponse = {
  __typename?: 'GetFamousLikesResponse';
  code: Scalars['Int']['output'];
  famousComments: Array<Maybe<Comment>>;
  famousPosts: Array<Maybe<Post>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GetLikesResponse = {
  __typename?: 'GetLikesResponse';
  code: Scalars['Int']['output'];
  likedComments: Array<Maybe<Comment>>;
  likedPosts: Array<Maybe<Post>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<CrudCommentResponse>;
  createPost?: Maybe<CrudPostResponse>;
  createUser?: Maybe<AuthUserResponse>;
  deleteComment?: Maybe<CrudCommentResponse>;
  deletePost?: Maybe<CrudPostResponse>;
  likeComment?: Maybe<CrudCommentResponse>;
  likePost?: Maybe<CrudPostResponse>;
  signIn?: Maybe<AuthUserResponse>;
  unlikeComment?: Maybe<CrudCommentResponse>;
  unlikePost?: Maybe<CrudPostResponse>;
  updateComment?: Maybe<CrudCommentResponse>;
  updatePost?: Maybe<CrudPostResponse>;
  updateUser?: Maybe<RuUserResponse>;
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


export type MutationUnlikeCommentArgs = {
  commentId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUnlikePostArgs = {
  postId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likedBy?: Maybe<Array<User>>;
};

export type Query = {
  __typename?: 'Query';
  getAllLikes?: Maybe<GetLikesResponse>;
  getCommentById?: Maybe<CrudCommentResponse>;
  getComments?: Maybe<CrudCommentsResponse>;
  getCommentsPost?: Maybe<CrudCommentResponse>;
  getCommentsUser?: Maybe<CrudCommentResponse>;
  getFamousLikes?: Maybe<GetFamousLikesResponse>;
  getPostById?: Maybe<CrudPostResponse>;
  getPosts?: Maybe<CrudPostsResponse>;
  getPostsUser?: Maybe<CrudPostsResponse>;
  getUserById?: Maybe<RuUserResponse>;
  getUserByName?: Maybe<RuUserResponse>;
  getUserLikes?: Maybe<GetLikesResponse>;
  getUsers: Array<Maybe<User>>;
};


export type QueryGetCommentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCommentsPostArgs = {
  postId: Scalars['ID']['input'];
};


export type QueryGetCommentsUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetPostByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostsUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByNameArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetUserLikesArgs = {
  userId: Scalars['ID']['input'];
};

export type RuUserResponse = {
  __typename?: 'RUUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  comments?: Maybe<Array<Comment>>;
  id: Scalars['ID']['output'];
  likedComments?: Maybe<Array<Comment>>;
  likedPosts?: Maybe<Array<Post>>;
  posts?: Maybe<Array<Post>>;
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
  AuthUserResponse: ResolverTypeWrapper<Omit<AuthUserResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CRUDCommentResponse: ResolverTypeWrapper<Omit<CrudCommentResponse, 'comment'> & { comment?: Maybe<ResolversTypes['Comment']> }>;
  CRUDCommentsResponse: ResolverTypeWrapper<Omit<CrudCommentsResponse, 'comments'> & { comments: Array<Maybe<ResolversTypes['Comment']>> }>;
  CRUDPostResponse: ResolverTypeWrapper<Omit<CrudPostResponse, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  CRUDPostsResponse: ResolverTypeWrapper<Omit<CrudPostsResponse, 'posts'> & { posts: Array<Maybe<ResolversTypes['Post']>> }>;
  Comment: ResolverTypeWrapper<CommentModel>;
  GetFamousLikesResponse: ResolverTypeWrapper<Omit<GetFamousLikesResponse, 'famousComments' | 'famousPosts'> & { famousComments: Array<Maybe<ResolversTypes['Comment']>>, famousPosts: Array<Maybe<ResolversTypes['Post']>> }>;
  GetLikesResponse: ResolverTypeWrapper<Omit<GetLikesResponse, 'likedComments' | 'likedPosts'> & { likedComments: Array<Maybe<ResolversTypes['Comment']>>, likedPosts: Array<Maybe<ResolversTypes['Post']>> }>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<PostModel>;
  Query: ResolverTypeWrapper<{}>;
  RUUserResponse: ResolverTypeWrapper<Omit<RuUserResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthUserResponse: Omit<AuthUserResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  Boolean: Scalars['Boolean']['output'];
  CRUDCommentResponse: Omit<CrudCommentResponse, 'comment'> & { comment?: Maybe<ResolversParentTypes['Comment']> };
  CRUDCommentsResponse: Omit<CrudCommentsResponse, 'comments'> & { comments: Array<Maybe<ResolversParentTypes['Comment']>> };
  CRUDPostResponse: Omit<CrudPostResponse, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  CRUDPostsResponse: Omit<CrudPostsResponse, 'posts'> & { posts: Array<Maybe<ResolversParentTypes['Post']>> };
  Comment: CommentModel;
  GetFamousLikesResponse: Omit<GetFamousLikesResponse, 'famousComments' | 'famousPosts'> & { famousComments: Array<Maybe<ResolversParentTypes['Comment']>>, famousPosts: Array<Maybe<ResolversParentTypes['Post']>> };
  GetLikesResponse: Omit<GetLikesResponse, 'likedComments' | 'likedPosts'> & { likedComments: Array<Maybe<ResolversParentTypes['Comment']>>, likedPosts: Array<Maybe<ResolversParentTypes['Post']>> };
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Post: PostModel;
  Query: {};
  RUUserResponse: Omit<RuUserResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  String: Scalars['String']['output'];
  User: UserModel;
};

export type AuthUserResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['AuthUserResponse'] = ResolversParentTypes['AuthUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CrudCommentResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CRUDCommentResponse'] = ResolversParentTypes['CRUDCommentResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CrudCommentsResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CRUDCommentsResponse'] = ResolversParentTypes['CRUDCommentsResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CrudPostResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CRUDPostResponse'] = ResolversParentTypes['CRUDPostResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CrudPostsResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['CRUDPostsResponse'] = ResolversParentTypes['CRUDPostsResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likedBy?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetFamousLikesResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetFamousLikesResponse'] = ResolversParentTypes['GetFamousLikesResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  famousComments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  famousPosts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetLikesResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['GetLikesResponse'] = ResolversParentTypes['GetLikesResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likedComments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  likedPosts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<Maybe<ResolversTypes['CRUDCommentResponse']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'authorId' | 'content' | 'postId'>>;
  createPost?: Resolver<Maybe<ResolversTypes['CRUDPostResponse']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'authorId' | 'content'>>;
  createUser?: Resolver<Maybe<ResolversTypes['AuthUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'password' | 'username'>>;
  deleteComment?: Resolver<Maybe<ResolversTypes['CRUDCommentResponse']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deletePost?: Resolver<Maybe<ResolversTypes['CRUDPostResponse']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  likeComment?: Resolver<Maybe<ResolversTypes['CRUDCommentResponse']>, ParentType, ContextType, RequireFields<MutationLikeCommentArgs, 'commentId' | 'userId'>>;
  likePost?: Resolver<Maybe<ResolversTypes['CRUDPostResponse']>, ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postId' | 'userId'>>;
  signIn?: Resolver<Maybe<ResolversTypes['AuthUserResponse']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'password' | 'username'>>;
  unlikeComment?: Resolver<Maybe<ResolversTypes['CRUDCommentResponse']>, ParentType, ContextType, RequireFields<MutationUnlikeCommentArgs, 'commentId' | 'userId'>>;
  unlikePost?: Resolver<Maybe<ResolversTypes['CRUDPostResponse']>, ParentType, ContextType, RequireFields<MutationUnlikePostArgs, 'postId' | 'userId'>>;
  updateComment?: Resolver<Maybe<ResolversTypes['CRUDCommentResponse']>, ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'content' | 'id'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['CRUDPostResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'content' | 'id'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['RUUserResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'password' | 'username'>>;
};

export type PostResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likedBy?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllLikes?: Resolver<Maybe<ResolversTypes['GetLikesResponse']>, ParentType, ContextType>;
  getCommentById?: Resolver<Maybe<ResolversTypes['CRUDCommentResponse']>, ParentType, ContextType, RequireFields<QueryGetCommentByIdArgs, 'id'>>;
  getComments?: Resolver<Maybe<ResolversTypes['CRUDCommentsResponse']>, ParentType, ContextType>;
  getCommentsPost?: Resolver<Maybe<ResolversTypes['CRUDCommentResponse']>, ParentType, ContextType, RequireFields<QueryGetCommentsPostArgs, 'postId'>>;
  getCommentsUser?: Resolver<Maybe<ResolversTypes['CRUDCommentResponse']>, ParentType, ContextType, RequireFields<QueryGetCommentsUserArgs, 'userId'>>;
  getFamousLikes?: Resolver<Maybe<ResolversTypes['GetFamousLikesResponse']>, ParentType, ContextType>;
  getPostById?: Resolver<Maybe<ResolversTypes['CRUDPostResponse']>, ParentType, ContextType, RequireFields<QueryGetPostByIdArgs, 'id'>>;
  getPosts?: Resolver<Maybe<ResolversTypes['CRUDPostsResponse']>, ParentType, ContextType>;
  getPostsUser?: Resolver<Maybe<ResolversTypes['CRUDPostsResponse']>, ParentType, ContextType, RequireFields<QueryGetPostsUserArgs, 'userId'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['RUUserResponse']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUserByName?: Resolver<Maybe<ResolversTypes['RUUserResponse']>, ParentType, ContextType, RequireFields<QueryGetUserByNameArgs, 'username'>>;
  getUserLikes?: Resolver<Maybe<ResolversTypes['GetLikesResponse']>, ParentType, ContextType, RequireFields<QueryGetUserLikesArgs, 'userId'>>;
  getUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
};

export type RuUserResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['RUUserResponse'] = ResolversParentTypes['RUUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likedComments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  likedPosts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  AuthUserResponse?: AuthUserResponseResolvers<ContextType>;
  CRUDCommentResponse?: CrudCommentResponseResolvers<ContextType>;
  CRUDCommentsResponse?: CrudCommentsResponseResolvers<ContextType>;
  CRUDPostResponse?: CrudPostResponseResolvers<ContextType>;
  CRUDPostsResponse?: CrudPostsResponseResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  GetFamousLikesResponse?: GetFamousLikesResponseResolvers<ContextType>;
  GetLikesResponse?: GetLikesResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RUUserResponse?: RuUserResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

