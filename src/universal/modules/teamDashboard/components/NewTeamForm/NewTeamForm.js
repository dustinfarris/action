import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import appTheme from 'universal/styles/theme/appTheme';
import ui from 'universal/styles/ui';
import Button from 'universal/components/Button/Button';
import InputField from 'universal/components/InputField/InputField';
import {randomPlaceholderTheme} from 'universal/utils/makeRandomPlaceholder';
import {Field, reduxForm} from 'redux-form';
import {cashay} from 'cashay';
import emailAddresses from 'email-addresses';
import shortid from 'shortid';
import {withRouter} from 'react-router';
import {showSuccess} from 'universal/modules/notifications/ducks/notifications';
import trim from 'universal/utils/formFieldTrimmer';

const quickValidation = (values) => {
  const errors = {};
  const {teamName} = values;
  if (!teamName) {
    errors.teamName = 'Oops! Please add a team name.';
  }
  // if (!invitedTeamMembers) {
  //   errors.invitedTeamMembers = 'Oops! Please check for valid email addresses.';
  // }
  return errors;
};

const NewTeamForm = (props) => {
  const {dispatch, formName, handleSubmit, router, styles} = props;
  const onSubmit = (submittedData) => {
    const {teamName, invitedTeamMembers} = trim(submittedData);
    const invitees = emailAddresses
      .parseAddressList(invitedTeamMembers)
      .map(email => ({
        email: email.address,
        fullName: email.fullName
      }));
    const id = shortid.generate();
    const options = {
      variables: {
        newTeam: {
          id,
          name: teamName
        },
        invitees
      }
    };
    cashay.mutate('addTeam', options);
    router.push(`/team/${id}`);
    dispatch(showSuccess({
      title: 'Team successfully created!',
      message: `Here's your new team dashboard for ${teamName}`
    }));
  };
  return (
    <form className={css(styles.form)} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css(styles.heading)}>{formName}</h1>
      <div className={css(styles.formBlock)}>
        <Field
          colorPalette="gray"
          component={InputField}
          label="Team Name (required)"
          name="teamName"
          placeholder={randomPlaceholderTheme.teamName}
        />
      </div>
      <div className={css(styles.formBlock)}>
        <Field
          colorPalette="gray"
          component={InputField}
          name="invitedTeamMembers"
          label="Invite Team Members (optional)"
          placeholder={randomPlaceholderTheme.emailMulti}
          useTextarea
        />
      </div>
      <Button
        colorPalette="warm"
        isBlock
        label="Create Team"
        size="small"
        type="submit"
      />
    </form>
  );
};

NewTeamForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formName: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  styles: PropTypes.object
};

NewTeamForm.defaultProps = {
  formName: 'Create a New Team'
};

// const inlineBlock = {
//   display: 'inline-block',
//   verticalAlign: 'top'
// };

const styleThunk = () => ({
  form: {
    margin: 0,
    maxWidth: '20rem',
    padding: 0
  },

  heading: {
    color: appTheme.palette.mid,
    fontSize: appTheme.typography.s6,
    fontWeight: 400,
    lineHeight: '2rem',
    margin: '0 auto 1.5rem',
    padding: `0 ${ui.fieldPaddingHorizontal}`
  },

  formBlock: {
    margin: '0 auto 2rem'
  }
});

export default withRouter(
  reduxForm({form: 'newTeam', validate: quickValidation})(
    withStyles(styleThunk)(NewTeamForm)
  )
);
