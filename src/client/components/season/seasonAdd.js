import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik, Formik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import gql from "graphql-tag";
import { ApolloProvider, Query, Mutation, useMutation } from "react-apollo";
import { ValuesOfCorrectType } from 'graphql/validation/rules/ValuesOfCorrectType';
import { Prompt } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .label('Enter a valid name')
    .required('name is required'),
  startDate: yup
    .date('Enter your startDate')
    .required('startDate is required'),
});

const ADD_SEASON = gql`
  mutation addSeason($name : String!, $startDate : Date!) {
    addSeason(name : $name, startDate : $startDate) {
      name
      startDate
    }
 }`;

 const GET_SEASONS = gql`
  query seasons { 
    seasons{
      id
      name
    }
  }
`;

 export default function SeasonAdd(props){
  const showPrompt = () => {
    return (<Prompt message="Data will be lost" />)
  }
  const [addSeason, { loading: mutationLoading, error:mutationError }] = useMutation(ADD_SEASON,{
    refetchQueries: [
      { query: GET_SEASONS }
    ]
  })

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          startDate: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          addSeason({
            variables: {
              name: values.name,
              startDate: values.startDate,
            }
          })
          showPrompt()
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="name"
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              id="startDate"
              name="startDate"
              label="startDate"
              type="date"
              onChange={handleChange}
              error={touched.startDate && Boolean(errors.startDate)}
              helperText={touched.startDate && errors.startDate}
            />
            <Button 
              color="primary" 
              variant="contained" 
              fullWidth type="submit"
              disabled={isSubmitting}>
                Submit
            </Button>
            {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
          </form>
        )}
      />
      </div>
)}