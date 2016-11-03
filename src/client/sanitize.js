const makeValidators = (types) => {
  const typeKeys  = Object.keys(types);
  const validators = {};
  for (let i = 0; i < typeKeys.length; i++) {
    const typeKey = typeKeys[i];
    const value = types[typeKey];
    const validator = value._scalarConfig && value._scalarConfig.parseLiteral;
    if (validator) {
      validators[value.name] = validator;
    }
  }
  return validators;
};

const tryValidation = (validator, ast) => {
  try {
    validator(ast)
  } catch(e) {
    return e.message;
  }
};

export default function makeSanitize(schema, types) {
  const validators = makeValidators(types);
  return (mutationPayload, typeName) => {
    const dfs = (payload, type, errors = {}) => {
      if (typeof payload === 'object') {
        const keys = Object.keys(payload);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          dfs(payload[key], type.inputFields[key], errors);
        }
      } else {
        const ast = {
          kind: 'StringValue',
          value: payload
        };
        const validator = validators[type.type.name];
        const error = tryValidation(validator, ast);
        if (error) {
          errors[ast.value] = error;
        }
      }
    };
    const {types} = schema;
    const type = types[typeName];
    return dfs(mutationPayload, type);
  }
};

// export default makeSanitize(cashaySchema, types);
//
// import validate from 'cashay-validation';
//
// cashay.create({validate});
//
// const validate = (values) => {
//   return cashay.validate(values, 'updateUserProfile');
// };
