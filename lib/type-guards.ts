export interface ShopifyErrorLike {
  status: number;
  message: Error;
  cause?: Error;
}

export const isObject = (
  object: unknown,
): object is Record<string, unknown> => {
  return (
    typeof object === 'object' && object !== null && !Array.isArray(object)
  );
};

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
  if (!isObject(error)) return false;

  if (error instanceof Error) return true;

  return findError(error);
};

function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === '[object Error]') {
    return true;
  }

  const prototype = Object.getPrototypeOf(error) as T | null;

  return prototype === null ? false : findError(prototype);
}

export class ShopifyError extends Error {
  cause: string;
  status: number;
  query: string;

  constructor(
    message: string,
    {
      cause,
      status,
      query,
    }: { cause?: string; status?: number; query: string },
  ) {
    super(message);
    this.cause = cause || 'unknown';
    this.status = status || 500;
    this.query = query;

    Error.captureStackTrace(this, ShopifyError);

    this.name = 'ShopifyError';
  }
}
