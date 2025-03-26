/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Heuvera
 * @version 1.0.0
 *
 * Heuvera API documentation with Swagger
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description This endpoint creates a new user based on the provided Auth0 ID.
     *
     * @tags Users
     * @name AuthUserCreate
     * @summary Create a user
     * @request POST:/api/auth/user
     * @secure
     */
    authUserCreate: (
      data: {
        /**
         * The unique identifier for the user from Auth0.
         * @example "auth0|123456789"
         */
        auth0_id: string;
        /**
         * The user's email address.
         * @format email
         * @example "user@example.com"
         */
        email: string;
        /**
         * The user's full name.
         * @example "John Doe"
         */
        name?: string | null;
        /**
         * URL to the user's profile picture.
         * @format url
         * @example "https://example.com/avatar.jpg"
         */
        picture?: string | null;
        /**
         * The user's account creation date.
         * @format date-time
         * @example "2025-03-16T12:00:00Z"
         */
        created_at: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          data?: {
            /** The created or updated user object. */
            user?: object;
          };
        },
        | {
            /** @example false */
            success?: boolean;
            /** @example "Invalid input" */
            error?: string;
            details?: object[];
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Unauthorized" */
            error?: string;
          }
        | {
            /** @example false */
            success?: boolean;
            /** @example "Internal Server Error" */
            error?: string;
          }
      >({
        path: `/api/auth/user`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches an existing user or creates a new one if they do not exist in the database.
     *
     * @tags User
     * @name AuthVerifyList
     * @summary Retrieve or create a user from the session
     * @request GET:/api/auth/verify
     * @secure
     */
    authVerifyList: (params: RequestParams = {}) =>
      this.request<
        {
          message?: string;
          newUser?: boolean;
          user?: {
            id?: string;
            auth0_id?: string;
            email?: string;
            name?: string;
            picture?: string;
          };
        },
        void
      >({
        path: `/api/auth/verify`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Allows an authenticated user to cancel their booking if it hasn't started yet.
     *
     * @tags Bookings
     * @name V1BookingsDelete
     * @summary Cancel a booking
     * @request DELETE:/api/v1/bookings
     * @secure
     */
    v1BookingsDelete: (
      query: {
        /**
         * The ID of the booking to cancel.
         * @format uuid
         */
        id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message?: string;
        },
        void
      >({
        path: `/api/v1/bookings`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches all bookings made by the authenticated user.
     *
     * @tags Bookings
     * @name V1BookingsList
     * @summary Get user bookings
     * @request GET:/api/v1/bookings
     * @secure
     */
    v1BookingsList: (params: RequestParams = {}) =>
      this.request<
        {
          bookings?: {
            /** @format uuid */
            id?: string;
            /** @format uuid */
            userId?: string;
            /** @format uuid */
            listingId?: string;
            /** @format date */
            startDate?: string;
            /** @format date */
            endDate?: string;
            guests?: number;
            totalPrice?: number;
            listing?: {
              /** @format uuid */
              id?: string;
              title?: string;
              price?: number;
            };
          }[];
        },
        void
      >({
        path: `/api/v1/bookings`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Users can book a listing by providing the listing ID, start date, end date, and the number of guests.
     *
     * @tags Bookings
     * @name V1BookingsCreate
     * @summary Create a new booking
     * @request POST:/api/v1/bookings
     * @secure
     */
    v1BookingsCreate: (
      data: {
        /**
         * The UUID of the listing to book.
         * @format uuid
         */
        listingId?: string;
        /**
         * The start date of the booking (YYYY-MM-DD).
         * @format date
         */
        startDate?: string;
        /**
         * The end date of the booking (YYYY-MM-DD).
         * @format date
         */
        endDate?: string;
        /**
         * Number of guests for the booking.
         * @min 1
         */
        guests?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          booking?: {
            /** @format uuid */
            id?: string;
            /** @format uuid */
            listingId?: string;
            /** @format uuid */
            userId?: string;
            /** @format date */
            startDate?: string;
            /** @format date */
            endDate?: string;
            guests?: number;
            totalPrice?: number;
          };
        },
        void
      >({
        path: `/api/v1/bookings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves details of a specific booking for an authenticated user.
     *
     * @tags Bookings
     * @name V1BookingsDetail
     * @summary Get booking details
     * @request GET:/api/v1/bookings/{id}
     * @secure
     */
    v1BookingsDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          booking?: object;
        },
        void
      >({
        path: `/api/v1/bookings/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates host profile details. Only approved hosts can update their information.
     *
     * @tags Host
     * @name V1HostPartialUpdate
     * @summary Update host details
     * @request PATCH:/api/v1/host
     * @secure
     */
    v1HostPartialUpdate: (
      data: {
        /**
         * @minLength 10
         * @maxLength 15
         */
        phoneNumber?: string;
        bio?: string;
        governmentId?: string;
        idVerificationStatus?: "PENDING" | "VERIFIED" | "REJECTED";
        businessName?: string;
        /** @format url */
        businessLogo?: string;
        businessRegistrationNumber?: string;
        businessAddress?: string;
        socialMediaLinks?: Record<string, string>;
        asBusiness?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          host?: object;
        },
        void
      >({
        path: `/api/v1/host`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Allows an approved host to delete one of their property listings.
     *
     * @tags Listings
     * @name V1ListingsDelete
     * @summary Delete a property listing
     * @request DELETE:/api/v1/listings
     * @secure
     */
    v1ListingsDelete: (
      query: {
        /** The ID of the listing to delete. */
        id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message?: string;
          listing?: object;
        },
        void
      >({
        path: `/api/v1/listings`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches a paginated list of property listings, sorted by creation date in descending order.
     *
     * @tags Listings
     * @name V1ListingsList
     * @summary Retrieve paginated property listings
     * @request GET:/api/v1/listings
     * @secure
     */
    v1ListingsList: (
      query?: {
        /**
         * The page number to retrieve.
         * @default 1
         */
        page?: number;
        /**
         * The number of listings per page.
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          listings?: object[];
          pagination?: {
            page?: number;
            pageSize?: number;
            totalPages?: number;
            totalCount?: number;
          };
        },
        void
      >({
        path: `/api/v1/listings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Allows an approved host to update an existing property listing.
     *
     * @tags Listings
     * @name V1ListingsPartialUpdate
     * @summary Update a property listing
     * @request PATCH:/api/v1/listings
     * @secure
     */
    v1ListingsPartialUpdate: (
      query: {
        /** The ID of the listing to update. */
        id: string;
      },
      data: {
        /** @minLength 5 */
        title?: string;
        /** @minLength 10 */
        description?: string;
        price?: number;
        listingType?: string;
        category?: string;
        address?: string;
        city?: string;
        country?: string;
        latitude?: number;
        longitude?: number;
        checkInTime?: string;
        checkOutTime?: string;
        available?: boolean;
        amenities?: string[];
        images?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          listing?: object;
        },
        void
      >({
        path: `/api/v1/listings`,
        method: "PATCH",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Allows an approved host to create a new property listing.
     *
     * @tags Listings
     * @name V1ListingsCreate
     * @summary Create a new property listing
     * @request POST:/api/v1/listings
     * @secure
     */
    v1ListingsCreate: (
      data: {
        /** @minLength 5 */
        title?: string;
        /** @minLength 10 */
        description?: string;
        price?: number;
        listingType?: string;
        category?: string;
        address?: string;
        city?: string;
        country?: string;
        latitude?: number;
        longitude?: number;
        checkInTime?: string;
        checkOutTime?: string;
        /** @default true */
        available?: boolean;
        amenities?: string[];
        /** @minItems 1 */
        images?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          listing?: object;
        },
        void
      >({
        path: `/api/v1/listings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve details of a specific listing by its ID, including host details.
     *
     * @tags Listings
     * @name V1ListingsDetail
     * @summary Get a listing by ID
     * @request GET:/api/v1/listings/{id}
     * @secure
     */
    v1ListingsDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          listing?: object;
        },
        void
      >({
        path: `/api/v1/listings/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the user's profile if it exists, otherwise creates a new one.
     *
     * @tags Profile
     * @name V1ProfilePartialUpdate
     * @summary Update or create user profile
     * @request PATCH:/api/v1/profile
     * @secure
     */
    v1ProfilePartialUpdate: (
      data: {
        country?: string;
        state?: string;
        city?: string;
        address?: string;
        isStudent?: boolean;
        isEmployed?: boolean;
        occupation?: string;
        incomeRange?: string;
        interests?: string[];
        preferredRentRange?: string;
        preferredListingTypes?: string[];
        moveInDate?: string;
        stayDuration?: string;
        hasPets?: boolean;
        hasChildren?: boolean;
        smoking?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          profile?: object;
        },
        void
      >({
        path: `/api/v1/profile`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves details of the currently authenticated user.
     *
     * @tags Users
     * @name V1UserList
     * @summary Get logged-in user
     * @request GET:/api/v1/user
     * @secure
     */
    v1UserList: (params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id?: string;
          /** @format email */
          email?: string;
          name?: string;
        },
        void
      >({
        path: `/api/v1/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
