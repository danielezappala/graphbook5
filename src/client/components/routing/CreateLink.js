import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';

const ADD_SEASON = gql`
  mutation addSeason($name : String!, $startDate : Date!) {
    addSeason(name : $name, startDate : $startDate) {
      name
      startDate
    }
 }`;

const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });
  const history = useHistory();
  const [createLink] = useMutation(ADD_SEASON, {
    variables: {
      description: formState.description,
      url: formState.url
    },
    onCompleted: () => history.push('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
