import { SchemaTypeOpts, Schema, Types } from 'mongoose';
import { Extract, ConvertObject } from './types';

const createType = <T>(type: any) => (options: SchemaTypeOpts<T> = {}) => {
  return ({
    required: true,
    ...options,
    type,
  } as any) as T;
};

const createOptionalType = <T>(type: any) => (
  options: SchemaTypeOpts<T> = {}
) => {
  return ({
    ...options,
    type,
  } as any) as T | null | undefined;
};

export const Type = {
  string: createType<string>(String),
  optionalString: createOptionalType<string>(String),
  number: createType<number>(Number),
  optionalNumber: createOptionalType<number>(Number),
  boolean: createType<boolean>(Boolean),
  optionalBoolean: createOptionalType<boolean>(Boolean),
  date: createType<Date>(Date),
  optionalDate: createOptionalType<Date>(Date),
  mixed: createType<any>(Schema.Types.Mixed),
  optionalMixed: createOptionalType<any>(Schema.Types.Mixed),
  objectId: createType<Types.ObjectId>(Schema.Types.ObjectId),
  optionalObjectId: createOptionalType<Types.ObjectId>(Schema.Types.ObjectId),
  object: (options: SchemaTypeOpts<object> = {}) => ({
    of<T>(schema: T) {
      return ({
        required: true,
        ...options,
        type: schema,
      } as any) as ConvertObject<T>;
    },
  }),
  optionalObject: (options: SchemaTypeOpts<object> = {}) => ({
    of<T>(schema: T) {
      return ({
        ...options,
        type: schema,
      } as any) as ConvertObject<T> | null | undefined;
    },
  }),
  array: (options: SchemaTypeOpts<Array<any>> = {}) => ({
    of<T>(schema: T) {
      return ({
        required: true,
        ...options,
        type: [schema],
      } as any) as ConvertObject<T>[];
    },
  }),
  optionalArray: (options: SchemaTypeOpts<Array<any>> = {}) => ({
    of<T>(schema: T) {
      return ({
        ...options,
        type: [schema],
      } as any) as ConvertObject<T>[] | null | undefined;
    },
  }),
  schema: (options: SchemaTypeOpts<object> = {}) => ({
    of<T>(schema: T) {
      return ({
        required: true,
        ...options,
        type: schema,
      } as any) as Extract<T>;
    },
  }),
  optionalSchema: (options: SchemaTypeOpts<object> = {}) => ({
    of<T>(schema: T) {
      return ({
        ...options,
        type: schema,
      } as any) as Extract<T> | null | undefined;
    },
  }),
  ref: <T>(schema: T) => ({
    to<TSchema>(name: string) {
      return ({
        ...(schema as any),
        ref: name,
      } as any) as Extract<TSchema> | T;
    },
  }),
};
