import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType
} from 'graphql';
import {GraphQLEmailType} from 'universal/utils/graphQLScalars';
import GraphQLISO8601Type from 'graphql-custom-datetype';

export const Invitation = new GraphQLObjectType({
  name: 'Invitation',
  description: 'An invitation to become a team member',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID), description: 'The unique invitation Id'},
    teamId: {type: new GraphQLNonNull(GraphQLID), description: 'The team invited to'},
    invitedBy: {type: GraphQLID, description: 'The CachedUserId of the person that sent the invitation'},
    createdAt: {
      type: new GraphQLNonNull(GraphQLISO8601Type),
      description: 'The datetime the invitation was created'
    },
    updatedAt: {
      type: GraphQLISO8601Type,
      description: 'The datetime the invitation was last updated'
    },
    acceptedAt: {
      type: GraphQLISO8601Type,
      description: 'The datetime the invitation was accepted was created'
    },
    isAccepted: {
      type: GraphQLBoolean,
      description: 'Has the invitation been accepted yet? Storing this as a boolean means no required indexing.'
    },
    inviteToken: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Secret token used when inviting a user',
      // lock it down
      resolve: () => null
    },
    computedName: {
      type: GraphQLString,
      description: 'The name of the invitee, derived from the email address'
    },
    email: {
      type: new GraphQLNonNull(GraphQLEmailType),
      description: 'The email of the invitee'
    },
    task: {
      type: GraphQLString,
      description: 'The task that the invitee is currently working on'
    }
  })
});

export const Invitee = new GraphQLInputObjectType({
  name: 'Invitee',
  description: 'The email and task of an invited team member',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLEmailType),
      description: 'The email address of the invitee'
    },
    fullName: {
      type: GraphQLString,
      description: 'The name derived from an RFC5322 email string'
    },
    task: {
      type: GraphQLString,
      description: 'The current task the invitee is working on'
    }
  })
});
