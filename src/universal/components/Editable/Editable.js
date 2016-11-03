import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import appTheme from 'universal/styles/theme/appTheme';
import ui from 'universal/styles/ui';
import makePlaceholderStyles from 'universal/styles/helpers/makePlaceholderStyles';
import FontAwesome from 'react-fontawesome';

const Editable = (props) => {
  const {
    hideIconOnValue,
    icon,
    input,
    isEditing,
    placeholder,
    styles
  } = props;

  const renderEditing = () => {
    const inputStyles = css(
      styles.static,
      styles.input
    );

    return (
      <input
        className={inputStyles}
        placeholder="email@domain.co"
        type="text"
        value={input.value}
      />
    );
  };

  const renderStatic = () => {
    const staticStyles = css(
      styles.static,
      !input.value && styles.placeholder
    );

    const hideIcon = input.value && hideIconOnValue;

    return (
      <div className={css(styles.staticBlock)}>
        <div className={staticStyles}>
          {input.value || placeholder}
        </div>
        {!hideIcon &&
          <FontAwesome
            className={css(styles.icon)}
            name={icon || 'pencil'}
          />
        }
      </div>
    );
  };

  return (
    <div className={css(styles.editableRoot)}>
      {isEditing ? renderEditing() : renderStatic()}
    </div>
  );
};

Editable.propTypes = {
  // NOTE: Use 'hideIconOnValue' when you want to hide
  //       the pencil icon when there is a value. (TA)
  hideIconOnValue: PropTypes.bool,
  icon: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string
  }),
  isEditing: PropTypes.bool,
  placeholder: PropTypes.string,
  styles: PropTypes.object,
  typeStyles: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.string,
    lineHeight: PropTypes.string,
    placeholderColor: PropTypes.string
  })
};

const styleThunk = (customTheme, props) => ({
  editableRoot: {
    display: 'block',
    width: '100%'
  },

  staticBlock: {
    display: 'inline-block',
    fontSize: 0,

    ':hover': {
      cursor: 'pointer',
      opacity: '.5'
    }
  },

  static: {
    color: props.typeStyles.color,
    display: 'inline-block',
    fontSize: props.typeStyles.fontSize,
    lineHeight: props.typeStyles.lineHeight,
    verticalAlign: 'middle'
  },

  placeholder: {
    color: props.typeStyles.placeholderColor
  },

  icon: {
    color: appTheme.palette.dark,
    display: 'inline-block !important',
    fontSize: `${ui.iconSize} !important`,
    marginLeft: '.375rem',
    verticalAlign: 'middle !important'
  },

  input: {
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0,
    display: 'inline-block',
    outline: 'none',
    padding: 0,
    verticalAlign: 'middle',
    width: '100%',

    ...makePlaceholderStyles(props.typeStyles.placeholderColor)
  }
});

export default withStyles(styleThunk)(Editable);