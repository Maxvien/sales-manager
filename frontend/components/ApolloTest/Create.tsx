import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_MOCKUP_MUATION } from '~/frontend/operations/mockup.operation';
import { CreateMockupMutationVariables } from '~/frontend/types/operations.type';

function Create() {
  const [createMockup, mockup] = useMutation(CREATE_MOCKUP_MUATION);

  const variables: CreateMockupMutationVariables = {
    input: {
      id: Date.now().toString(),
      name: Date.now().toString(),
      image: Date.now().toString()
    }
  };

  return <button onClick={() => createMockup({ variables })}>Create Mockup</button>;
}

export default Create;
