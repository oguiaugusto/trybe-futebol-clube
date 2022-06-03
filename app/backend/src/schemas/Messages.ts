enum Messages {
  InternalServerError = 'Internal Server Error',
  WrongCredentials = 'Incorrect email or password',
  FieldsNotFilled = 'All fields must be filled',
  TokenNotFound = 'Token not found',
  TokenInvalid = 'Invalid token',
  NoTokenUser = 'Error finding token user',
  TeamNotFound = 'There is no team with such id!',
  MatchNotFound = 'There is no match with such id!',
  MatchAlreadyEnded = 'Match is already finished',
  Finished = 'Finished',
  NoEqualTeams = 'It is not possible to create a match with two equal teams',
}

export default Messages;
