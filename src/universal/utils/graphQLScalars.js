import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
import * as stock from 'graphql/type/scalars';

const validateEmail = (ast) => {
  const re = /.+@.+/;
  if (ast.kind !== Kind.STRING) {
    throw new TypeError('Email must be a string');
  }
  if (!re.test(ast.value)) {
    throw new TypeError('That is not a valid email');
  }
  if (ast.value.length < 4) {
    throw new TypeError('An email must be at least 4 characters long');
  }
  if (ast.value.length > 300) {
    throw new TypeError('An email must be no longer than 300 characters');
  }
  return ast.value.toLowerCase();
};

const strLengthValidator = (min, max) => {
  return (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError('Email must be a string');
    }
    if (ast.value.length < min) {
      throw new TypeError(`Field must be at least ${min} characters long`);
    }
    if (ast.value.length > max) {
      throw new TypeError(`Field must be no longer than ${max} characters`);
    }
    return ast.value;
  }
}

export const GraphQLEmailType = new GraphQLScalarType({
  name: 'Email',
  serialize: (value) => value.toLowerCase(),
  parseValue: (value) => validateEmail({kind: Kind.STRING, value}),
  parseLiteral: validateEmail
});

export const GraphQLPasswordType = new GraphQLScalarType({
  name: 'Password',
  serialize: String,
  parseValue: String,
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(`Query error: Password is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 6) {
      throw new TypeError('Query error: Password must have a minimum length of 6.', [ast]);
    }
    if (ast.value.length > 60) {
      throw new TypeError('Query error: Password is too long.', [ast]);
    }
    return String(ast.value);
  }
});

export const GraphQLNameType = new GraphQLScalarType({
  name: 'Name',
  serialize: String,
  parseValue: String,
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(`Query error: Title is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 1) {
      throw new TypeError('Query error: Title must have a minimum length of 1.', [ast]);
    }
    if (ast.value.length > 30) {
      throw new TypeError('Query error: Title is too long.', [ast]);
    }
    return String(ast.value);
  }
});

export const GraphQLURLType = new GraphQLScalarType({
  name: 'URL',
  serialize: String,
  parseValue: String,
  parseLiteral: ast => {
    // eslint-disable-next-line max-len, no-useless-escape
    const re = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    if (!re.test(ast.value)) {
      throw new TypeError('Query error: Not a valid URL', [ast]);
    }
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(`Query error: URL is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 1) {
      throw new TypeError('Query error: URL must have a minimum length of 1.', [ast]);
    }
    if (ast.value.length > 2083) {
      throw new TypeError('Query error: URL is too long.', [ast]);
    }
    return String(ast.value);
  }
});
